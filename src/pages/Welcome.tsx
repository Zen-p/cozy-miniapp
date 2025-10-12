import { useEffect, useMemo, useRef, useState } from 'react';
import { getTelegramTheme, getTelegramWebApp, requestFullscreen, tgRequestFullscreen, triggerHapticFeedback } from '../utils/telegram';
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

  const wavesSrc = useMemo(() => (theme === 'dark' ? '/lines_dark.png' : '/lines_light.png'), [theme]);
  const personaSrc = useMemo(() => (theme === 'dark' ? '/persona.png' : '/persona.png'), [theme]);
  const headingColor = useMemo(() => (theme === 'dark' ? '#FFFFFF' : '#D3191C'), [theme]);
  const subheadingColor = useMemo(() => (theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : '#6E737C'), [theme]);
  const buttonBgColor = useMemo(() => (theme === 'dark' ? '#D3191C' : '#000000'), [theme]);
  const buttonTextColor = useMemo(() => (theme === 'dark' ? '#FFFFFF' : '#FFFFFF'), [theme]);
  const shadowColor = useMemo(() => (theme === 'dark' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.15)'), [theme]);

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

  const handleButtonClick = () => {
    if (overlayActive) return;
    triggerHapticFeedback('medium');
    
    if (isMobile) {
      // Mobile: circular reveal animation
      const rect = ctaRef.current?.getBoundingClientRect();
      const cx = (rect?.left ?? 0) + (rect?.width ?? 0) / 2;
      const cy = (rect?.top ?? 0) + (rect?.height ?? 0) / 2 + window.scrollY;
      setOverlayCenter({ x: cx, y: cy });
      const vw = window.innerWidth;
      const vh = window.innerHeight + window.scrollY;
      const distances = [
        Math.hypot(cx - 0, cy - 0),
        Math.hypot(cx - vw, cy - 0),
        Math.hypot(cx - 0, cy - vh),
        Math.hypot(cx - vw, cy - vh)
      ];
      const needed = Math.max(...distances) * 1.25;
      setOverlayRadius(needed);
      setOverlayActive(true);
    } else {
      // Desktop: full screen overlay
      setOverlayCenter({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      setOverlayRadius(Math.max(window.innerWidth, window.innerHeight) * 1.5);
      setOverlayActive(true);
    }
    
    tgRequestFullscreen();
    requestFullscreen();
    window.setTimeout(() => {
      window.location.href = isAuthenticated ? '/dashboard' : '/login';
    }, 650);
  };

  if (isMobile) {
    // Mobile layout (existing)
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
            style={{ 
              display: 'block', 
              width: '100%', 
              height: 'auto',
              filter: `drop-shadow(0 4px 8px ${shadowColor})`
            }}
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
              display: 'block',
              filter: `drop-shadow(0 4px 8px ${shadowColor})`
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
            lineHeight: 1.2,
            textShadow: `0 2px 4px ${shadowColor}`
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
            lineHeight: 1.3,
            textShadow: `0 2px 4px ${shadowColor}`
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
            cursor: 'pointer',
            boxShadow: `0 4px 12px ${shadowColor}`
          }}
          ref={ctaRef}
          onClick={handleButtonClick}
        >
          Get Starder
        </button>
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

  // Desktop layout
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center',
      padding: '0 120px',
      maxWidth: '1920px',
      margin: '0 auto'
    }}>
      {/* Logo */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: '120px',
          color: theme === 'dark' ? '#FFFFFF' : '#000000',
          fontSize: 48,
          fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
          fontWeight: 400,
          lineHeight: 1.16
        }}
      >
        Cozy Code
      </div>

      {/* Left side - Persona image */}
      <div style={{ flex: '0 0 761px', marginRight: '40px' }}>
        <img
          src={personaSrc}
          alt=""
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '761px',
            filter: `drop-shadow(0 8px 16px ${shadowColor})`
          }}
        />
      </div>

      {/* Right side - Content */}
      <div style={{ flex: 1, paddingLeft: '40px' }}>
        <div
          style={{
            color: theme === 'dark' ? '#FFFFFF' : '#000000',
            fontSize: 75,
            fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
            fontWeight: 400,
            lineHeight: 1.16,
            marginBottom: '45px',
            textShadow: `0 4px 8px ${shadowColor}`
          }}
        >
          Learn Java as easily as 2x2
        </div>
        
        <div
          style={{
            color: '#6E737C',
            fontSize: 30,
            fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
            fontWeight: 400,
            lineHeight: 1.16,
            marginBottom: '45px',
            textShadow: `0 2px 4px ${shadowColor}`
          }}
        >
          Let's unravel the mysteries of programming together, in the coziest way possible.
        </div>

        <button
          ref={ctaRef}
          onClick={handleButtonClick}
          style={{
            width: '401px',
            height: '85px',
            backgroundColor: '#D3191C',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '143px',
            fontSize: 30,
            fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
            fontWeight: 400,
            lineHeight: 1.16,
            cursor: 'pointer',
            boxShadow: `0 8px 16px ${shadowColor}`,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 12px 24px ${shadowColor}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 8px 16px ${shadowColor}`;
          }}
        >
          Get Started
        </button>
      </div>

      {/* Desktop overlay animation */}
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
            backgroundColor: '#D3191C',
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


