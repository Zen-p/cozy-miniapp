import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTelegramTheme } from '../../../../utils/telegram';

export default function Basicsyntax() {
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

  const subtopics = [
    {
        "id": "primitive-data-types",
        "title": "Primitive data types",
        "description": "int, double, boolean, char and other basic types"
    },
    {
        "id": "variables-and-constants",
        "title": "Variables and constants",
        "description": "Declaring and using variables in Java"
    },
    {
        "id": "comparison-operators",
        "title": "Comparison operators",
        "description": ">, <, >=, <=, ==, != operators"
    },
    {
        "id": "arithmetic-and-logical-operations",
        "title": "Arithmetic and logical operations",
        "description": "Mathematical and logical operators"
    },
    {
        "id": "comments-and-formatting",
        "title": "Comments and code formatting rules",
        "description": "Writing clean and documented code"
    },
    {
        "id": "variable-scope",
        "title": "Variable scope",
        "description": "Understanding where variables can be accessed"
    }
];

  const handleSubtopicClick = (subtopicId: string) => {
    navigate(`/learn/java/basic-syntax/${subtopicId}`);
  };

  const handleBackClick = () => {
    navigate('/learn/java');
  };

  if (isMobile) {
    return (
      <div style={{ paddingTop: 90, margin: 0 }}>
        <div
          style={{
            width: '85%',
            margin: '0 auto 20px',
            textAlign: 'left',
            color: titleColor,
            fontSize: 36,
            fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
            lineHeight: 1.2,
            marginLeft: 18
          }}
        >
          Basic syntax
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '0 18px' }}>
          {subtopics.map((subtopic) => (
            <div
              key={subtopic.id}
              onClick={() => handleSubtopicClick(subtopic.id)}
              style={{
                width: '100%',
                height: 100,
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
                style={{ width: 100, height: 100, display: 'block', borderTopLeftRadius: 28, borderBottomLeftRadius: 28 }}
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
                    fontSize: 20,
                    fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
                    textAlign: 'left',
                    lineHeight: 1.1,
                    marginBottom: '4px'
                  }}
                >
                  {subtopic.title}
                </div>
                <div
                  style={{
                    color: '#000000',
                    fontSize: 14,
                    fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
                    textAlign: 'left',
                    lineHeight: 1.2,
                  }}
                >
                  {subtopic.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleBackClick}
          style={{
            width: '85%',
            margin: '30px auto 0',
            display: 'block',
            backgroundColor: getTelegramTheme() === 'dark' ? '#1A1A1A' : '#FFFFFF',
            color: titleColor,
            border: cardBorder,
            borderRadius: 32,
            padding: '14px 16px',
            textAlign: 'center',
            fontSize: 20,
            fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
            cursor: 'pointer',
            boxSizing: 'border-box'
          }}
        >
          Back to Topics
        </button>
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
        Basic syntax
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '24px',
        maxWidth: '1200px',
        marginBottom: '40px'
      }}>
        {subtopics.map((subtopic) => (
          <div
            key={subtopic.id}
            onClick={() => handleSubtopicClick(subtopic.id)}
            style={{
              width: '100%',
              height: 140,
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
              style={{ width: 140, height: 140, display: 'block', borderTopLeftRadius: 36, borderBottomLeftRadius: 36 }}
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
                  fontSize: 28,
                  fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
                  textAlign: 'left',
                  lineHeight: 1.1,
                  marginBottom: '8px'
                }}
              >
                {subtopic.title}
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
                {subtopic.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleBackClick}
        style={{
          width: '200px',
          height: '60px',
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
        Back to Topics
      </button>
    </div>
  );
}