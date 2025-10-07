import { useEffect } from 'react';
import { getTelegramTheme, getTelegramWebApp } from '../utils/telegram';

function WelcomeComponent() {
  useEffect(() => {
    const applyTheme = () => {
      const theme = getTelegramTheme();
      const bg = theme === 'dark' ? '#172032' : '#F3E2D0';
      document.documentElement.style.backgroundColor = bg;
      document.body.style.backgroundColor = bg;
      if (theme === 'dark') {
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
    <div style={{ minHeight: '100vh' }} />
  );
}

export default WelcomeComponent;
export const Welcome = WelcomeComponent;


