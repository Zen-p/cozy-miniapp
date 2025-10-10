import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import { Welcome } from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import JavaLearn from './pages/JavaLearn';
import LearnSpring from './pages/LearnSpring';
import { AuthProvider } from './context/AuthContext';
import { expandWebApp, tgRequestFullscreen, onTgFullscreenChanged, getTelegramWebApp } from './utils/telegram';

function App() {
  const [isTelegram, setIsTelegram] = useState<boolean | null>(null);

  useEffect(() => {

    const webApp = getTelegramWebApp();
    const isInTelegram = !!(webApp && webApp.initData);
    setIsTelegram(isInTelegram);

    if (isInTelegram) {
      expandWebApp();
      tgRequestFullscreen();
      onTgFullscreenChanged(() => {

      });
    }
  }, []);


  if (isTelegram === false) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3E2D0',
        fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '400px',
          backgroundColor: '#3B5635',
          color: '#F3E2D0',
          padding: '40px 30px',
          borderRadius: '20px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
        }}>
          <h1 style={{ fontSize: '24px', marginBottom: '20px', margin: '0 0 20px 0' }}>
            📱 Telegram Required
          </h1>
          <p style={{ fontSize: '16px', lineHeight: '1.5', margin: '0 0 20px 0' }}>
            This app can only be accessed through Telegram. Please open it in your Telegram app.
          </p>
          <p style={{ fontSize: '14px', opacity: 0.8, margin: '0' }}>
            Open this link in Telegram to continue.
          </p>
        </div>
      </div>
    );
  }

  // Show loading while checking
  if (isTelegram === null) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3E2D0',
        fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif'
      }}>
        <div style={{ fontSize: '18px', color: '#3B5635' }}>Loading...</div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/learn/java" element={<JavaLearn />} />
          <Route path="/learn/spring" element={<LearnSpring />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
