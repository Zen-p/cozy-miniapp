import { useEffect, useMemo, useState } from 'react';
import { getTelegramTheme, getTelegramWebApp, getTelegramPlatform } from '../utils/telegram';

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

  // In fullscreen (expanded), place waves directly under Telegram navigation controls.
  // We use safe-area inset top plus a conservative nav height depending on platform.
  const platform = getTelegramPlatform();
  const navHeightPx = useMemo(() => {
    if (!isExpanded) return 0;
    switch (platform) {
      case 'ios':
        return 52; // iOS top bar approx height under WebView
      case 'android':
        return 48; // Android top bar approx height
      case 'macos':
      case 'tdesktop':
      default:
        return 44; // Desktop/unknown
    }
  }, [platform, isExpanded]);

  const topOffset = isExpanded
    ? `calc(var(--tg-safe-area-inset-top, 0px) + ${navHeightPx}px)`
    : '0px';

  return (
    <div style={{ minHeight: '100vh' }}>
      <div
        style={{
          position: 'fixed',
          top: topOffset,
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


