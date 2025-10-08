
import { useEffect, useState } from 'react';
import { getTelegramTheme, getTelegramWebApp } from '../utils/telegram';

export default function Dashboard() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getTelegramTheme());

  useEffect(() => {
    const applyTheme = () => {
      const current = getTelegramTheme();
      setTheme(current);
      const bg = current === 'dark' ? '#172032' : '#F3E2D0';
      document.documentElement.style.backgroundColor = bg;
      document.body.style.backgroundColor = bg;
      if (current === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyTheme();
    const webApp = getTelegramWebApp();
    webApp?.onEvent?.('themeChanged', applyTheme);
    return () => {
      webApp?.offEvent?.('themeChanged', applyTheme as any);
    };
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: theme === 'dark' ? '#172032' : '#F3E2D0',
      margin: 0,
      padding: 0
    }}>
      <div style={{
        margin: 0,
        padding: 0
      }}>
        <h1 style={{ 
          margin: 0,
          padding: 0,
          color: theme === 'dark' ? '#F9FAFB' : '#3B5635'
        }}>
          Welcome to CozyCode Dashboard
        </h1>
        <p style={{ 
          margin: 0,
          padding: 0,
          color: theme === 'dark' ? '#9CA3AF' : 'rgba(59, 86, 53, 0.5)'
        }}>
          Here you will see your courses, progress, etc.
        </p>
      </div>
    </div>
  );
}
