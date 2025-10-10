
import { useEffect, useMemo, useState } from 'react';
import { getTelegramTheme } from '../utils/telegram';

export default function Dashboard() {
  const [, setTheme] = useState<'light' | 'dark'>(() => getTelegramTheme());

  useEffect(() => {
    const applyAll = () => {
      const current = getTelegramTheme();
      setTheme(current);
      const bg = current === 'dark' ? '#0F0F0F' : '#FFFFFF';
      document.documentElement.style.backgroundColor = bg;
      document.body.style.backgroundColor = bg;
      if (current === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyAll();
  }, []);

  const titleColor = useMemo(() => (getTelegramTheme() === 'dark' ? '#FFFFFF' : '#000000'), []);
  const streakColor = useMemo(
    () => (getTelegramTheme() === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'),
    []
  );

  // Build current week dates (Mon..Sun)
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weekDates: number[] = useMemo(() => {
    const now = new Date();
    const day = now.getDay(); // 0..6 (Sun..Sat)
    // compute Monday as start of week
    const diffToMonday = ((day + 6) % 7); // 0 if Monday
    const monday = new Date(now);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(now.getDate() - diffToMonday);
    const arr: number[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      arr.push(d.getDate());
    }
    return arr;
  }, []);

  return (
    <div style={{ paddingTop: 90, margin: 0 }}>
      <div
        style={{
          width: '85%',
          margin: '0 auto',
          textAlign: 'left',
          color: titleColor,
          fontSize: 36,
          fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
          lineHeight: 1.2,
          marginLeft: 18
        }}
      >
        Let’s Learn New Stuff!
      </div>
      <div
        style={{
          width: '85%',
          margin: '16px auto 0',
          textAlign: 'left',
          color: streakColor,
          fontSize: 32,
          fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
          lineHeight: 1.3,
          marginLeft: 18
        }}
      >
        Your Streak: 2
      </div>
      <div
        style={{
          width: 340,
          height: 76,
          margin: '5px auto 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {Array.from({ length: 7 }).map((_, idx) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          const currentDate = new Date();
          const day = currentDate.getDay();
          const diffToMonday = ((day + 6) % 7);
          const monday = new Date(currentDate);
          monday.setHours(0, 0, 0, 0);
          monday.setDate(currentDate.getDate() - diffToMonday);
          
          const elementDate = new Date(monday);
          elementDate.setDate(monday.getDate() + idx);
          elementDate.setHours(0, 0, 0, 0);
          
          const isPast = elementDate < today;
          const isToday = elementDate.getTime() === today.getTime();
          const isFuture = elementDate > today;

          const isDarkTheme = getTelegramTheme() === 'dark';
          const borderForState = isPast
            ? (isDarkTheme ? '1px solid #FFFFFF' : '1px solid #000000')
            : isToday
            ? (isDarkTheme ? '1px solid #FFFFFF' : 'none')
            : (isDarkTheme ? 'none' : '1px solid #000000');

          const baseStyle: React.CSSProperties = {
            width: 34,
            height: 76,
            borderRadius: 100,
            backgroundColor: isPast ? '#D3191C' : isToday ? '#000000' : '#FFFFFF',
            border: borderForState,
            boxSizing: borderForState !== 'none' ? 'border-box' as const : undefined,
            position: 'relative',
            // no shadow per latest request
          };

          return (
            <div key={idx} style={baseStyle}>
              {isPast && (
                <img
                  src={idx === 0 ? '/dashbord/cross.png' : '/dashbord/check.png'}
                  alt=""
                  style={{ width: 24, height: 24, display: 'block', margin: '5px auto 0' }}
                />
              )}
              {isToday && (
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    margin: '5px auto 0'
                  }}
                />
              )}
              {isFuture && (
                <div
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: '50%',
                    backgroundColor: '#000000',
                    margin: '11px auto 0'
                  }}
                />
              )}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 12,
                  textAlign: 'center',
                  fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif'
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    lineHeight: 1,
                    color: isPast || isToday ? '#FFFFFF' : '#000000'
                  }}
                >
                  {weekDates[idx]}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    lineHeight: 1.1,
                    color: isPast ? '#000000' : isToday ? '#FFFFFF' : '#000000'
                  }}
                >
                  {weekDays[idx]}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
