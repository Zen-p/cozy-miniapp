
import { useEffect, useMemo, useState } from 'react';
import { getTelegramTheme } from '../utils/telegram';

export default function Dashboard() {
  const [, setTheme] = useState<'light' | 'dark'>(() => getTelegramTheme());
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
  const cardBorder = useMemo(
    () => (getTelegramTheme() === 'dark' ? '1px solid #FFFFFF' : '1px solid #000000'),
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

  if (isMobile) {
    // Mobile layout (existing)
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
          Let's Learn New Stuff!
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
            };

            return (
              <div key={idx} style={baseStyle}>
                {isPast && (
                  <img
                    src={idx === 0 ? '/dashbord/cross.png' : '/dashbord/check.png'}
                    alt=""
                    style={{ width: 24, height: 24, display: 'block', margin: '4px auto 0' }}
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
        <button
          style={{
            width: 358,
            height: 170,
            margin: '20px auto 0',
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            backgroundColor: '#D3191C',
            border: cardBorder,
            boxSizing: 'border-box',
            borderRadius: 32,
            padding: 0,
            cursor: 'pointer'
          }}
          onClick={() => {
            window.location.href = '/learn/java';
          }}
        >
          <img
            src={'/dashbord/persona_coffee.png'}
            alt=""
            style={{ width: 170, height: 170, display: 'block', borderTopLeftRadius: 28, borderBottomLeftRadius: 28 }}
          />
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start'
            }}
          >
            <div
              style={{
                width: '100%',
                color: '#FFFFFF',
                fontSize: 32,
                fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
                textAlign: 'left',
                marginTop: 17,
                lineHeight: 1.1,
              }}
            >
              Learn Java
            </div>
            <div
              style={{
                width: '100%',
                color: '#000000',
                fontSize: 20,
                fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
                textAlign: 'left',
                lineHeight: 1.2,
              }}
            >
              Straight to the point.
              <br />
              Straight to Java.
            </div>
          </div>
        </button>
        <button
          style={{
            width: 358,
            height: 170,
            margin: '19px auto 0',
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            backgroundColor: getTelegramTheme() === 'dark' ? '#1A1A1A' : '#FFFFFF',
            border: cardBorder,
            boxSizing: 'border-box',
            borderRadius: 32,
            padding: 0,
            cursor: 'pointer'
          }}
          onClick={() => {
            window.location.href = '/learn/spring';
          }}
        >
          <img
            src={'/dashbord/persona_spring.png'}
            alt=""
            style={{ width: 170, height: 170, display: 'block', borderTopLeftRadius: 28, borderBottomLeftRadius: 28 }}
          />
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start'
            }}
          >
            <div
              style={{
                width: '100%',
                color: getTelegramTheme() === 'dark' ? '#FFFFFF' : '#000000',
                fontSize: 32,
                fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
                textAlign: 'left',
                marginTop: 17,
                lineHeight: 1.2,
              }}
            >
              Learn Spring
            </div>
            <div
              style={{
                width: '100%',
                color: getTelegramTheme() === 'dark' ? 'rgba(255, 255, 255, 0.5)' : '#D3191C',
                fontSize: 20,
                fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
                textAlign: 'left',
                lineHeight: 1.2,
              }}
            >
            From Zero
            <br />
            To Hero.
            </div>
          </div>
        </button>
      </div>
    );
  }

  // Desktop layout
  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '120px 120px 0',
      maxWidth: '1920px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '60px' }}>
        <div
          style={{
            color: titleColor,
            fontSize: 48,
            fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
            lineHeight: 1.2,
            marginBottom: '20px'
          }}
        >
          Let's Learn New Stuff!
        </div>
        <div
          style={{
            color: streakColor,
            fontSize: 36,
            fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
            lineHeight: 1.3,
            marginBottom: '30px'
          }}
        >
          Your Streak: 2
        </div>
        
        {/* Streak block */}
        <div
          style={{
            width: 480,
            height: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '40px'
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
              width: 48,
              height: 100,
              borderRadius: 100,
              backgroundColor: isPast ? '#D3191C' : isToday ? '#000000' : '#FFFFFF',
              border: borderForState,
              boxSizing: borderForState !== 'none' ? 'border-box' as const : undefined,
              position: 'relative',
            };

            return (
              <div key={idx} style={baseStyle}>
                {isPast && (
                  <img
                    src={idx === 0 ? '/dashbord/cross.png' : '/dashbord/check.png'}
                    alt=""
                    style={{ width: 32, height: 32, display: 'block', margin: '8px auto 0' }}
                  />
                )}
                {isToday && (
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      margin: '8px auto 0'
                    }}
                  />
                )}
                {isFuture && (
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: '#000000',
                      margin: '16px auto 0'
                    }}
                  />
                )}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 16,
                    textAlign: 'center',
                    fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif'
                  }}
                >
                  <div
                    style={{
                      fontSize: 20,
                      lineHeight: 1,
                      color: isPast || isToday ? '#FFFFFF' : '#000000'
                    }}
                  >
                    {weekDates[idx]}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
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

      {/* Course cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <button
          style={{
            width: '100%',
            maxWidth: '600px',
            height: 200,
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            backgroundColor: '#D3191C',
            border: cardBorder,
            boxSizing: 'border-box',
            borderRadius: 40,
            padding: 0,
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          onClick={() => {
            window.location.href = '/learn/java';
          }}
        >
          <img
            src={'/dashbord/persona_coffee.png'}
            alt=""
            style={{ width: 200, height: 200, display: 'block', borderTopLeftRadius: 36, borderBottomLeftRadius: 36 }}
          />
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '0 32px'
            }}
          >
            <div
              style={{
                color: '#FFFFFF',
                fontSize: 40,
                fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
                textAlign: 'left',
                lineHeight: 1.1,
                marginBottom: '12px'
              }}
            >
              Learn Java
            </div>
            <div
              style={{
                color: '#000000',
                fontSize: 24,
                fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
                textAlign: 'left',
                lineHeight: 1.2,
              }}
            >
              Straight to the point.
              <br />
              Straight to Java.
            </div>
          </div>
        </button>

        <button
          style={{
            width: '100%',
            maxWidth: '600px',
            height: 200,
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            backgroundColor: getTelegramTheme() === 'dark' ? '#1A1A1A' : '#FFFFFF',
            border: cardBorder,
            boxSizing: 'border-box',
            borderRadius: 40,
            padding: 0,
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          onClick={() => {
            window.location.href = '/learn/spring';
          }}
        >
          <img
            src={'/dashbord/persona_spring.png'}
            alt=""
            style={{ width: 200, height: 200, display: 'block', borderTopLeftRadius: 36, borderBottomLeftRadius: 36 }}
          />
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '0 32px'
            }}
          >
            <div
              style={{
                color: getTelegramTheme() === 'dark' ? '#FFFFFF' : '#000000',
                fontSize: 40,
                fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
                textAlign: 'left',
                lineHeight: 1.1,
                marginBottom: '12px'
              }}
            >
              Learn Spring
            </div>
            <div
              style={{
                color: getTelegramTheme() === 'dark' ? 'rgba(255, 255, 255, 0.5)' : '#D3191C',
                fontSize: 24,
                fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
                textAlign: 'left',
                lineHeight: 1.2,
              }}
            >
              From Zero
              <br />
              To Hero.
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
