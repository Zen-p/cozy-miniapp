import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTelegramTheme } from '../../../../../utils/telegram';

export default function PurposeandareasofapplicationofJava() {
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
    navigate('/learn/java/introduction-to-java/platform-independence');
  };

  const handleBackToTopic = () => {
    navigate('/learn/java/introduction-to-java');
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
          Purpose and areas of application of Java
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
            Picture this: you’re building an app that runs on your phone, a bank’s server, and maybe even a tiny IoT device in your smart fridge—all with the same code. That’s the magic of Java. When it dropped in 1995 from the folks at Sun Microsystems, it changed the game with its big promise: "write once, run anywhere." And guess what? It actually delivers. Java’s purpose is to let you, the coder, create software that doesn’t care if it’s running on Windows, macOS, Linux, or even a random embedded chip in a coffee maker. How? It’s all thanks to the Java Virtual Machine (JVM), but we’ll get to that in a bit. For now, let’s talk about why Java’s such a big deal and where you’ll see it in the wild.
Java’s core mission is to be your go-to tool for building all kinds of apps—big, small, simple, or crazy complex. It’s like a Swiss Army knife for programming. Want to whip up a quick desktop tool? Java’s got you. Need to power a massive e-commerce platform handling millions of users? Java’s there. It’s designed to be easy to learn (well, easier than some other languages), super reliable, and secure enough that banks and hospitals trust it with their most sensitive systems. Plus, it’s got this thing called garbage collection, which means you don’t have to stress about manually cleaning up memory like in some other languages—Java’s got your back.
So, where does Java show up? Let’s start with enterprise software. Think of those huge systems that keep companies like Amazon or your bank running smoothly—Java’s often the backbone. Frameworks like Spring or Java EE power things like payroll systems, customer databases, or even the software that processes your online pizza order. These are the heavy-duty apps that need to handle tons of data, never crash, and scale up when Black Friday hits. Java’s rock-solid performance and ability to juggle multiple tasks at once make it a favorite for these big players.
Now, let’s talk web development. Ever wonder what’s running the backend of websites you use every day? A lot of them are powered by Java. Servlets, JavaServer Pages (JSP), or frameworks like Spring MVC handle the heavy lifting—think user logins, shopping carts, or streaming your favorite show. Java’s great at connecting to databases, crunching data, and keeping things fast even when thousands of users are clicking around.
Mobile apps? Oh yeah, Java’s huge there too. If you’ve got an Android phone, most of the apps you’re swiping through were probably built with Java (or its buddy Kotlin). The Android SDK leans heavily on Java to create everything from games to fitness trackers to social media apps. It’s got all the tools you need to make slick user interfaces and connect to the internet, GPS, or whatever else your app needs.
Then there’s the Internet of Things—yep, Java’s even in your smart devices. From tiny sensors to smartwatches, Java’s lightweight versions (like Java ME) let coders squeeze apps into devices with barely any memory. Imagine writing code for a thermostat that talks to your phone—Java makes that possible.
Big data’s another playground for Java. Ever heard of Apache Hadoop or Spark? These are the tools data scientists use to crunch massive datasets—like figuring out what ads to show you or predicting weather patterns. Java’s ability to handle complex, distributed systems and its knack for multithreading (running multiple tasks at once) make it a beast for these jobs.
Oh, and don’t forget gaming, desktop apps, and even science. Minecraft? Built with Java. Cross-platform tools like media players or code editors? Java’s behind a bunch of them with libraries like Swing and JavaFX. Scientists use Java for simulations and number-crunching because it’s precise and runs everywhere.
Why does Java keep winning? It’s got a massive community, a treasure chest of libraries, and constant updates (thanks, Oracle, who took over from Sun). Whether you’re dreaming of coding the next killer app or just want to automate your coffee maker, Java’s versatility and power make it a language you’ll want in your toolbox. So, what do you think—ready to build something cool with it?
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
        Purpose and areas of application of Java
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
          Understanding where Java is used and why it's popular
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