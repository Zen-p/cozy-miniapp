import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/Login';
import { Welcome } from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { expandWebApp } from './utils/telegram';

function App() {
  useEffect(() => {
    expandWebApp();
  }, []);
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
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
