import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTelegramTheme } from '../../../../../utils/telegram';

export default function InstallingandverifyingtheJDK() {
  const navigate = useNavigate();
  const [, setTheme] = useState<'light' | 'dark'>(() => getTelegramTheme());
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
      const bg = current === 'dark' ? '#0F0F0F' : '#FFFFFF';
      document.documentElement.style.backgroundColor = bg;
      document.body.style.backgroundColor = bg;
      if (current === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyAll();
  }, []);

  const titleColor = useMemo(() => (getTelegramTheme() === 'dark' ? '#FFFFFF' : '#000000'), []);
  const cardBorder = useMemo(
    () => (getTelegramTheme() === 'dark' ? '1px solid #FFFFFF' : '1px solid #000000'),
    []
  );

  const handleNextLesson = () => {
    navigate('/learn/java/setting-up-workspace/configuring-ide');
  };

  const handleBackToTopic = () => {
    navigate('/learn/java/setting-up-workspace');
  };

  if (isMobile) {
    return (
      <div style={{ paddingTop: 90, margin: 0 }}>
        <div
          style={{
            width: '85%',
            margin: '0 auto 30px',
            textAlign: 'left',
            color: titleColor,
            fontSize: 36,
            fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
            lineHeight: 1.2,
            marginLeft: 18
          }}
        >
          Installing and verifying the JDK
        </div>
        
        <div
          style={{
            width: '85%',
            margin: '0 auto 30px',
            backgroundColor: getTelegramTheme() === 'dark' ? '#1A1A1A' : '#FFFFFF',
            border: cardBorder,
            borderRadius: 32,
            padding: '24px',
            boxSizing: 'border-box'
          }}
        >
          <div
            style={{
              color: titleColor,
              fontSize: 24,
              fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
              lineHeight: 1.3,
              marginBottom: '16px'
            }}
          >
            Lesson Overview
          </div>
          <div
            style={{
              color: titleColor,
              fontSize: 18,
              fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
              lineHeight: 1.4
            }}
          >
            Download and install Java Development Kit
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '0 18px' }}>
          <button
            onClick={handleNextLesson}
            style={{
              width: '100%',
              height: 60,
              backgroundColor: '#D3191C',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 32,
              fontSize: 20,
              fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
              cursor: 'pointer'
            }}
          >
            Next Lesson
          </button>
          
          <button
            onClick={handleBackToTopic}
            style={{
              width: '100%',
              height: 60,
              backgroundColor: getTelegramTheme() === 'dark' ? '#1A1A1A' : '#FFFFFF',
              color: titleColor,
              border: cardBorder,
              borderRadius: 32,
              fontSize: 20,
              fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
              cursor: 'pointer',
              boxSizing: 'border-box'
            }}
          >
            Back to Topic
          </button>
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '120px 120px 0',
      maxWidth: '1920px',
      margin: '0 auto'
    }}>
      <div
        style={{
          color: titleColor,
          fontSize: 48,
          fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
          lineHeight: 1.2,
          marginBottom: '40px'
        }}
      >
        Installing and verifying the JDK
      </div>
      
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          backgroundColor: getTelegramTheme() === 'dark' ? '#1A1A1A' : '#FFFFFF',
          border: cardBorder,
          borderRadius: 40,
          padding: '40px',
          boxSizing: 'border-box',
          marginBottom: '40px'
        }}
      >
        <div
          style={{
            color: titleColor,
            fontSize: 32,
            fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
            lineHeight: 1.3,
            marginBottom: '24px'
          }}
        >
          Lesson Overview
        </div>
        <div
          style={{
            color: titleColor,
            fontSize: 20,
            fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
            lineHeight: 1.4
          }}
        >
          Download and install Java Development Kit
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <button
          onClick={handleNextLesson}
          style={{
            width: '300px',
            height: '80px',
            backgroundColor: '#D3191C',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 40,
            fontSize: 24,
            fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Next Lesson
        </button>
        
        <button
          onClick={handleBackToTopic}
          style={{
            width: '200px',
            height: '80px',
            backgroundColor: getTelegramTheme() === 'dark' ? '#1A1A1A' : '#FFFFFF',
            color: titleColor,
            border: cardBorder,
            borderRadius: 40,
            fontSize: 24,
            fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
            cursor: 'pointer',
            boxSizing: 'border-box',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Back to Topic
        </button>
      </div>
    </div>
  );
}