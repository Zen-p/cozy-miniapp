import { useEffect, useMemo, useRef, useState } from 'react';
import { getTelegramTheme, getTelegramWebApp, requestFullscreen, tgRequestFullscreen, triggerHapticFeedback } from '../utils/telegram';
import { useAuth } from '../hooks/useAuth';

function WelcomeComponent() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getTelegramTheme());
  const { isAuthenticated } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const ctaRef = useRef<HTMLButtonElement | null>(null);
  const [overlayActive, setOverlayActive] = useState(false);
  const [overlayCenter, setOverlayCenter] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [overlayRadius, setOverlayRadius] = useState<number>(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const applyAll = () => {
      const current = getTelegramTheme();
      setTheme(current);
      const bg = current === 'dark' ? (isMobile ? '#181818' : '#000000') : '#FFFFFF';
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
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  // Mobile styles (scaled down by 3 from Figma)
  const mobileStyles = useMemo(() => ({
    persona: {
      width: 325, // 974/3
      height: 294, // 883/3
      borderRadius: 101, // 304/3
    },
    heading: {
      fontSize: 43, // 128/3
      marginTop: 338, // 1014/3 (from 1446-430)
    },
    subheading: {
      fontSize: 21, // 64/3
      marginTop: 143, // 430/3 (from 1876-1446)
    },
    button: {
      width: 336, // 1007/3
      height: 71, // 213/3
      fontSize: 21, // 64/3
      marginTop: 143, // 430/3 (from 2222-1876)
      borderRadius: 48, // 143/3
    }
  }), []);

  // Desktop styles (1:1 from Figma)
  const desktopStyles = useMemo(() => ({
    persona: {
      width: 761,
      height: 689,
      borderRadius: 0,
    },
    heading: {
      fontSize: 75,
      marginTop: 112, // 308-196
    },
    subheading: {
      fontSize: 30,
      marginTop: 219, // 527-308
    },
    button: {
      width: 401,
      height: 85,
      fontSize: 30,
      marginTop: 119, // 646-527
      borderRadius: 143,
    }
  }), []);

  const currentStyles = isMobile ? mobileStyles : desktopStyles;
  const personaSrc = useMemo(() => (theme === 'dark' ? '/persona_new-28b1cb.png' : '/persona_light-28b1cb.png'), [theme]);
  const headingColor = useMemo(() => (theme === 'dark' ? '#FFFFFF' : '#000000'), [theme]);
  const subheadingColor = useMemo(() => '#6E737C', [theme]);
  const buttonBgColor = useMemo(() => '#D3191C', [theme]);
  const buttonTextColor = useMemo(() => '#FFFFFF', [theme]);

  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '20px' : '40px',
      position: 'relative'
    }}>
      {/* Mobile Layout */}
      {isMobile ? (
        <>
          {/* Persona Image */}
          <img
            src={personaSrc}
            alt=""
            style={{
              width: currentStyles.persona.width,
              height: currentStyles.persona.height,
              borderRadius: currentStyles.persona.borderRadius,
              objectFit: 'cover',
              marginBottom: 20
            }}
          />
          
          {/* Heading */}
          <div
            style={{
              textAlign: 'left',
              color: headingColor,
              fontSize: currentStyles.heading.fontSize,
              fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
              lineHeight: 1.2,
              marginBottom: currentStyles.heading.marginTop,
              maxWidth: '90%'
            }}
          >
            Learn Java as easily as 2x2
          </div>
          
          {/* Subheading */}
          <div
            style={{
              textAlign: 'left',
              color: subheadingColor,
              fontSize: currentStyles.subheading.fontSize,
              fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
              lineHeight: 1.3,
              marginBottom: currentStyles.subheading.marginTop,
              maxWidth: '90%'
            }}
          >
            Let's unravel the mysteries of programming together, in the coziest way possible.
          </div>
          
          {/* Button */}
          <button
            style={{
              width: currentStyles.button.width,
              height: currentStyles.button.height,
              backgroundColor: buttonBgColor,
              color: buttonTextColor,
              border: 'none',
              borderRadius: currentStyles.button.borderRadius,
              fontSize: currentStyles.button.fontSize,
              fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
              cursor: 'pointer',
              marginTop: currentStyles.button.marginTop
            }}
            ref={ctaRef}
            onClick={() => {
              if (overlayActive) return;
              triggerHapticFeedback('medium');
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
              tgRequestFullscreen();
              requestFullscreen();
              window.setTimeout(() => {
                window.location.href = isAuthenticated ? '/dashboard' : '/login';
              }, 650);
            }}
          >
            Get Started
          </button>
        </>
      ) : (
        /* Desktop Layout */
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1200px',
          gap: '40px'
        }}>
          {/* Left side - Persona */}
          <div style={{ flex: '0 0 auto' }}>
            <img
              src={personaSrc}
              alt=""
              style={{
                width: currentStyles.persona.width,
                height: currentStyles.persona.height,
                objectFit: 'cover'
              }}
            />
          </div>
          
          {/* Right side - Content */}
          <div style={{ flex: '1', paddingLeft: '40px' }}>
            {/* Heading */}
            <div
              style={{
                textAlign: 'left',
                color: headingColor,
                fontSize: currentStyles.heading.fontSize,
                fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
                lineHeight: 1.2,
                marginBottom: currentStyles.heading.marginTop
              }}
            >
              Learn Java as easily as 2x2
            </div>
            
            {/* Subheading */}
            <div
              style={{
                textAlign: 'left',
                color: subheadingColor,
                fontSize: currentStyles.subheading.fontSize,
                fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
                lineHeight: 1.3,
                marginBottom: currentStyles.subheading.marginTop
              }}
            >
              Let's unravel the mysteries of programming together, in the coziest way possible.
            </div>
            
            {/* Button */}
            <button
              style={{
                width: currentStyles.button.width,
                height: currentStyles.button.height,
                backgroundColor: buttonBgColor,
                color: buttonTextColor,
                border: 'none',
                borderRadius: currentStyles.button.borderRadius,
                fontSize: currentStyles.button.fontSize,
                fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
                cursor: 'pointer',
                marginTop: currentStyles.button.marginTop
              }}
              ref={ctaRef}
              onClick={() => {
                if (overlayActive) return;
                triggerHapticFeedback('medium');
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
                tgRequestFullscreen();
                requestFullscreen();
                window.setTimeout(() => {
                  window.location.href = isAuthenticated ? '/dashboard' : '/login';
                }, 650);
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
      
      {/* Overlay Animation */}
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


