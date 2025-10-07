import { useEffect, useMemo, useRef, useState } from 'react';
import { getTelegramTheme, getTelegramWebApp, requestFullscreen, tgRequestFullscreen } from '../utils/telegram';
import { useAuth } from '../hooks/useAuth';

function WelcomeComponent() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getTelegramTheme());
  const { isAuthenticated } = useAuth();
  const [wavesHeight, setWavesHeight] = useState<number>(0);
  const wavesImgRef = useRef<HTMLImageElement | null>(null);
  const ctaRef = useRef<HTMLButtonElement | null>(null);
  const [overlayActive, setOverlayActive] = useState(false);
  const [overlayCenter, setOverlayCenter] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [overlayRadius, setOverlayRadius] = useState<number>(0);

  useEffect(() => {
    const applyAll = () => {
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
  const personaSrc = useMemo(() => (theme === 'dark' ? '/persona.png' : '/persona_cosy.png'), [theme]);
  const headingColor = useMemo(() => (theme === 'dark' ? '#F9FAFB' : '#3B5635'), [theme]);
  const subheadingColor = useMemo(() => (theme === 'dark' ? '#9CA3AF' : 'rgba(59, 86, 53, 0.5)'), [theme]);
  const buttonBgColor = useMemo(() => (theme === 'dark' ? '#F9FAFB' : '#3B5635'), [theme]);
  const buttonTextColor = useMemo(() => (theme === 'dark' ? '#172032' : '#F3E2D0'), [theme]);

  useEffect(() => {
    const updateHeight = () => {
      if (wavesImgRef.current) {
        setWavesHeight(wavesImgRef.current.clientHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div style={{ paddingTop: wavesHeight + 90 }}>
      <div
        style={{
          position: 'fixed',
          top: 90,
          left: 0,
          right: 0,
          zIndex: 1,
          pointerEvents: 'none'
        }}
      >
        <img
          src={wavesSrc}
          alt=""
          ref={wavesImgRef}
          onLoad={() => setWavesHeight(wavesImgRef.current?.clientHeight || 0)}
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
        <img
          src={personaSrc}
          alt=""
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '78%',
            height: 'auto',
            display: 'block'
          }}
        />
      </div>
      <div
        style={{
          width: '85%',
          margin: '0 auto',
          textAlign: 'left',
          color: headingColor,
          fontSize: 45,
          fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
          lineHeight: 1.2
        }}
      >
        Learn Java as easily as 2x2
      </div>
      <div
        style={{
          width: '85%',
          margin: '30px auto 0',
          textAlign: 'left',
          color: subheadingColor,
          fontSize: 20,
          fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
          lineHeight: 1.3
        }}
      >
        Let's unravel the mysteries of programming together, in the coziest way possible.
      </div>
      <button
        style={{
          width: '85%',
          margin: '30px auto 0',
          display: 'block',
          backgroundColor: buttonBgColor,
          color: buttonTextColor,
          border: 'none',
          borderRadius: 100,
          padding: '14px 16px',
          textAlign: 'center',
          fontSize: 20,
          fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
          cursor: 'pointer'
        }}
        ref={ctaRef}
        onClick={() => {
          if (overlayActive) return;
          // compute button center for circular reveal
          const rect = ctaRef.current?.getBoundingClientRect();
          const cx = (rect?.left ?? 0) + (rect?.width ?? 0) / 2;
          const cy = (rect?.top ?? 0) + (rect?.height ?? 0) / 2 + window.scrollY;
          setOverlayCenter({ x: cx, y: cy });
          // compute radius to cover entire viewport (take farthest corner)
          const vw = window.innerWidth;
          const vh = window.innerHeight + window.scrollY; // include scroll offset for fixed overlay
          const distances = [
            Math.hypot(cx - 0, cy - 0),
            Math.hypot(cx - vw, cy - 0),
            Math.hypot(cx - 0, cy - vh),
            Math.hypot(cx - vw, cy - vh)
          ];
          const needed = Math.max(...distances) * 1.25; // overshoot to avoid gaps
          setOverlayRadius(needed);
          setOverlayActive(true);
          tgRequestFullscreen();
          requestFullscreen();
          window.setTimeout(() => {
            window.location.href = isAuthenticated ? '/dashboard' : '/login';
          }, 650);
        }}
      >
        Get Starder
      </button>
      {
        (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 3,
              pointerEvents: 'none',
              backgroundColor: buttonBgColor,
              clipPath: overlayActive
                ? `circle(${overlayRadius}px at ${overlayCenter.x}px ${overlayCenter.y}px)`
                : `circle(0 at ${overlayCenter.x}px ${overlayCenter.y}px)`,
              transition: 'clip-path 650ms ease-out'
            }}
          />
        )
      }
    </div>
  );
}

export default WelcomeComponent;
export const Welcome = WelcomeComponent;


