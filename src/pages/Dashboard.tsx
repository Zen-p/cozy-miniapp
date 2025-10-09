
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
          lineHeight: 1.2
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
          lineHeight: 1.3
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
          const isFirstThree = idx <= 2;
          const isMiddle = idx === 3;
          const isLastThree = idx >= 4;

          const baseStyle: React.CSSProperties = {
            width: 34,
            height: 76,
            borderRadius: 100,
            backgroundColor: isFirstThree ? '#D3191C' : isMiddle ? '#000000' : '#FFFFFF',
            border: isLastThree ? '1px solid #000000' : 'none',
            boxSizing: isLastThree ? 'border-box' as const : undefined,
            position: 'relative'
          };

          return (
            <div key={idx} style={baseStyle}>
              {isFirstThree && (
                <img
                  src={idx === 0 ? '/dashbord/cross.png' : '/dashbord/check.png'}
                  alt=""
                  style={{ width: 24, height: 24, display: 'block', margin: '5px auto 0' }}
                />
              )}
              {isMiddle && (
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
              {isLastThree && (
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
