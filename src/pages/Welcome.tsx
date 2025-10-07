import { useEffect, useMemo, useState } from 'react';
import { getTelegramTheme, getTelegramWebApp } from '../utils/telegram';

function WelcomeComponent() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getTelegramTheme());
  const [isExpanded, setIsExpanded] = useState<boolean>(() => !!getTelegramWebApp()?.isExpanded);

  useEffect(() => {
    const applyAll = () => {
      const current = getTelegramTheme();
      setTheme(current);
      setIsExpanded(!!getTelegramWebApp()?.isExpanded);
      const bg = current === 'dark' ? '#172032' : '#F3E2D0';
      document.documentElement.style.backgroundColor = bg;
      document.body.style.backgroundColor = bg;
      if (current === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyAll();
    const webApp = getTelegramWebApp();
    webApp?.onEvent?.('themeChanged', applyAll);
    webApp?.onEvent?.('viewportChanged', applyAll);
    return () => {
      webApp?.offEvent?.('themeChanged', applyAll as any);
      webApp?.offEvent?.('viewportChanged', applyAll as any);
    };
  }, []);

  const wavesSrc = useMemo(() => (theme === 'dark' ? '/lines_dark.png' : '/lines_light.png'), [theme]);

  return (
    <div style={{ minHeight: '100vh' }}>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          pointerEvents: 'none'
        }}
      >
        <img
          src={wavesSrc}
          alt=""
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      </div>
    </div>
  );
}

export default WelcomeComponent;
export const Welcome = WelcomeComponent;


