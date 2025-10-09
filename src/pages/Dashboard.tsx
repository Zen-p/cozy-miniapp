
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
          fontSize: 16,
          fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
          lineHeight: 1.3
        }}
      >
        Your Streak: 2
      </div>
    </div>
  );
}
