import { useEffect, useMemo, useRef, useState } from 'react';
import { getTelegramTheme, getTelegramWebApp, requestFullscreen, tgRequestFullscreen, triggerHapticFeedback } from '../utils/telegram';
import { useAuth } from '../hooks/useAuth';

function WelcomeComponent() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getTelegramTheme());
  const { isAuthenticated } = useAuth();
  const ctaRef = useRef<HTMLButtonElement | null>(null);
  const [overlayActive, setOverlayActive] = useState(false);
  const [overlayCenter, setOverlayCenter] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [overlayRadius, setOverlayRadius] = useState<number>(0);

  useEffect(() => {
    const applyAll = () => {
      const current = getTelegramTheme();
      setTheme(current);
      const bg = current === 'dark' ? '#181818' : '#FFFFFF';
      document.documentElement.style.backgroundColor = bg;
      document.body.style.backgroundColor = bg;
      if (current === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyAll();

    let cleanup: (() => void) | null = null;
    const trySubscribe = () => {
      const webApp = getTelegramWebApp();
      if (webApp?.onEvent && webApp?.offEvent) {
        webApp.onEvent('themeChanged', applyAll);
        webApp.onEvent('viewportChanged', applyAll);
        cleanup = () => {
          webApp.offEvent('themeChanged', applyAll as any);
          webApp.offEvent('viewportChanged', applyAll as any);
        };
        return true;
      }
      return false;
    };

    if (!trySubscribe()) {
      const id = window.setInterval(() => {
        if (trySubscribe()) {
          window.clearInterval(id);
        }
      }, 200);
      cleanup = () => window.clearInterval(id);
    }

    return () => {
      cleanup?.();
    };
  }, []);

  const personaSrc = useMemo(() => (theme === 'dark' ? '/persona.png' : '/persona.png'), [theme]);
  const headingColor = useMemo(() => (theme === 'dark' ? '#FFFFFF' : '#000000'), [theme]);
  const subheadingColor = useMemo(() => (theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : '#6E737C'), [theme]);
  const buttonBgColor = useMemo(() => '#D3191C', []);
  const buttonTextColor = useMemo(() => '#FFFFFF', []);

  return (
    <div style={{ 
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 20px',
      overflow: 'hidden'
    }}>
      {/* Background circles */}
      <div
        style={{
          position: 'absolute',
          top: theme === 'dark' ? '-130px' : '0px',
          left: theme === 'dark' ? '-130px' : '0px',
          width: '1063px',
          height: '1033px',
          borderRadius: '516.5px',
          backgroundColor: '#FFFFFF',
          zIndex: 0
        }}
      />
      
      {/* Persona image */}
      <img
        src={personaSrc}
        alt=""
        style={{
          width: '974px',
          height: '883px',
          borderRadius: '304px',
          objectFit: 'cover',
          marginBottom: '430px',
          zIndex: 1,
          position: 'relative'
        }}
      />

      {/* Main heading */}
      <div
        style={{
          width: '864px',
          textAlign: 'left',
          color: headingColor,
          fontSize: '128px',
          fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
          lineHeight: 1.157,
          marginBottom: '134px',
          zIndex: 2,
          position: 'relative'
        }}
      >
        Learn Java as easily as 2x2
      </div>

      {/* Subheading */}
      <div
        style={{
          width: '1007px',
          textAlign: 'left',
          color: subheadingColor,
          fontSize: '64px',
          fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
          lineHeight: 1.157,
          marginBottom: '134px',
          zIndex: 2,
          position: 'relative'
        }}
      >
        Let's unravel the mysteries of programming together, in the coziest way possible.
      </div>

      {/* Get Started button */}
      <button
        style={{
          width: '1007px',
          height: '213px',
          backgroundColor: buttonBgColor,
          color: buttonTextColor,
          border: 'none',
          borderRadius: '143px',
          fontSize: '64px',
          fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
          lineHeight: 1.157,
          textAlign: 'center',
          cursor: 'pointer',
          zIndex: 2,
          position: 'relative'
        }}
        ref={ctaRef}
        onClick={() => {
          if (overlayActive) return;
          triggerHapticFeedback('medium');
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
        Get Started
      </button>

      {/* Overlay animation */}
      {overlayActive && (
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
            clipPath: `circle(${overlayRadius}px at ${overlayCenter.x}px ${overlayCenter.y}px)`,
            transition: 'clip-path 650ms ease-out'
          }}
        />
      )}
    </div>
  );
}

export default WelcomeComponent;
export const Welcome = WelcomeComponent;


