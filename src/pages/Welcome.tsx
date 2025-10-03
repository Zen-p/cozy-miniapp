import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTelegramWebApp } from '../utils/telegram';

export default function Welcome() {
  const [fullscreenPadding, setFullscreenPadding] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const webApp = getTelegramWebApp();
    webApp?.expand?.();
    const isFullscreen = !!webApp?.isExpanded;
    setFullscreenPadding(isFullscreen ? 56 : 0);

    const scheme = (webApp?.colorScheme as 'light' | 'dark' | undefined) || 'light';
    setTheme(scheme);

    const onThemeChanged = () => {
      const s = (webApp?.colorScheme as 'light' | 'dark' | undefined) || 'light';
      setTheme(s);
    };
    webApp?.onEvent?.('themeChanged', onThemeChanged);
    return () => webApp?.offEvent?.('themeChanged', onThemeChanged as any);
  }, []);

  const onStart = () => {
    if (!containerRef.current) return;
    setAnimating(true);
    setTimeout(() => {
      localStorage.setItem('cozy_welcome_seen', '1');
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen relative overflow-hidden ${theme === 'dark' ? 'welcome-bg-dark' : 'welcome-bg-light'}`}
      style={{ paddingTop: fullscreenPadding }}
    >
      {/* Waves background */}
      <svg
        className="absolute -top-24 left-0 w-[140%] h-[50%] pointer-events-none"
        viewBox="0 0 800 400"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M0,120 C200,20 400,220 800,100 L800,0 L0,0 Z" fill="var(--accent)" opacity="0.12" />
        <path d="M0,200 C220,120 420,320 800,180 L800,0 L0,0 Z" fill="var(--success)" opacity="0.08" />
      </svg>

      {/* Palette strip */}
      <div className="hidden sm:flex flex-col gap-2 absolute right-3 top-1/3">
        {['#F4A261','#F1C0A8','#E9B08C','#9CA27E','#B08968','#3B82F6'].map((c) => (
          <div key={c} style={{ background: c, width: 10, height: 40, borderRadius: 4 }} />
        ))}
      </div>

      {/* Content */}
      <div className={`relative z-10 flex flex-col items-center justify-center px-6 pt-16 ${animating ? 'animate-fadeout' : ''}`} style={{ minHeight: '80vh' }}>
        <img src={theme === 'dark' ? '/persona_cozy.png' : '/persona.png'} alt="CozyCode Character" className="mb-6" style={{ maxWidth: '70%', height: 'auto' }} />
        <h1 className="text-3xl font-extrabold text-center mb-3" style={{ color: 'var(--text)' }}>
          Learn Java as easily as 2x2
        </h1>
        <p className="text-base text-center" style={{ color: 'var(--text-muted)' }}>
          Let's unravel the mysteries of programming together, in the coziest way possible.
        </p>
      </div>

      {/* Get Started Button */}
      <div className="absolute left-0 right-0 bottom-8 flex justify-center">
        <button
          onClick={onStart}
          className={`welcome-cta ${animating ? 'welcome-cta--expand' : ''}`}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}



