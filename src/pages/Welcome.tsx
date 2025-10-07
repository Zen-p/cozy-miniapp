import { useEffect, useMemo, useRef, useState } from 'react';
import { getTelegramTheme, getTelegramWebApp } from '../utils/telegram';

function WelcomeComponent() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getTelegramTheme());
  const [wavesHeight, setWavesHeight] = useState<number>(0);
  const wavesImgRef = useRef<HTMLImageElement | null>(null);

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
    <div style={{ minHeight: '100vh', paddingTop: wavesHeight }}>
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
          margin: '45px auto 0',
          textAlign: 'left',
          color: subheadingColor,
          fontSize: 25,
          fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
          lineHeight: 1.3
        }}
      >
        Let's unravel the mysteries of programming together, in the coziest way possible.
      </div>
    </div>
  );
}

export default WelcomeComponent;
export const Welcome = WelcomeComponent;


