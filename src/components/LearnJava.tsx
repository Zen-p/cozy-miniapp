import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTelegramTheme } from '../utils/telegram';

export default function LearnJava() {
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

  const topics = [
    {
      id: 'introduction-to-java',
      title: 'Introduction to Java',
      description: 'Learn the fundamentals and ecosystem of Java programming'
    },
    {
      id: 'setting-up-workspace',
      title: 'Setting up the workspace',
      description: 'Configure your development environment and tools'
    },
    {
      id: 'commands-and-first-program',
      title: 'Commands and the first program',
      description: 'Write your first Java program and understand the basics'
    },
    {
      id: 'basic-syntax',
      title: 'Basic syntax',
      description: 'Master Java syntax, data types, and operators'
    },
    {
      id: 'control-flow-statements',
      title: 'Control flow statements',
      description: 'Learn conditional statements and loops'
    },
    {
      id: 'working-with-strings',
      title: 'Working with strings',
      description: 'String manipulation and memory management'
    },
    {
      id: 'arrays',
      title: 'Arrays',
      description: 'Working with arrays and collections'
    },
    {
      id: 'methods',
      title: 'Methods',
      description: 'Creating and using methods effectively'
    },
    {
      id: 'input-handling',
      title: 'Input handling',
      description: 'Reading and processing user input'
    },
    {
      id: 'errors-and-debugging',
      title: 'Errors and debugging',
      description: 'Error handling and debugging techniques'
    }
  ];

  const handleTopicClick = (topicId: string) => {
    navigate(`/learn/java/${topicId}`);
  };

  if (isMobile) {
    // Mobile layout - single column
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
          Java Learning Path
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '0 18px' }}>
          {topics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => handleTopicClick(topic.id)}
              style={{
                width: '100%',
                height: 120,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: '#D3191C',
                border: cardBorder,
                boxSizing: 'border-box',
                borderRadius: 32,
                padding: 0,
                cursor: 'pointer'
              }}
            >
              <img
                src={'/dashbord/persona_coffee.png'}
                alt=""
                style={{ width: 120, height: 120, display: 'block', borderTopLeftRadius: 28, borderBottomLeftRadius: 28 }}
              />
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  padding: '0 16px'
                }}
              >
                <div
                  style={{
                    color: '#FFFFFF',
                    fontSize: 24,
                    fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
                    textAlign: 'left',
                    lineHeight: 1.1,
                    marginBottom: '8px'
                  }}
                >
                  {topic.title}
                </div>
                <div
                  style={{
                    color: '#000000',
                    fontSize: 16,
                    fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
                    textAlign: 'left',
                    lineHeight: 1.2,
                  }}
                >
                  {topic.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop layout - 2 columns
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
        Java Learning Path
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '24px',
        maxWidth: '1200px'
      }}>
        {topics.map((topic) => (
          <div
            key={topic.id}
            onClick={() => handleTopicClick(topic.id)}
            style={{
              width: '100%',
              height: 160,
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'flex-start',
              backgroundColor: '#D3191C',
              border: cardBorder,
              boxSizing: 'border-box',
              borderRadius: 40,
              padding: 0,
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <img
              src={'/dashbord/persona_coffee.png'}
              alt=""
              style={{ width: 160, height: 160, display: 'block', borderTopLeftRadius: 36, borderBottomLeftRadius: 36 }}
            />
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                padding: '0 24px'
              }}
            >
              <div
                style={{
                  color: '#FFFFFF',
                  fontSize: 32,
                  fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
                  textAlign: 'left',
                  lineHeight: 1.1,
                  marginBottom: '12px'
                }}
              >
                {topic.title}
              </div>
              <div
                style={{
                  color: '#000000',
                  fontSize: 18,
                  fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
                  textAlign: 'left',
                  lineHeight: 1.2,
                }}
              >
                {topic.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
