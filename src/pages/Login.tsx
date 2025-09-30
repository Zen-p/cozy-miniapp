import React, { useEffect, useState } from 'react';
import { authenticateWithTelegram } from '../api/auth';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { getInitData, markReady } from '../utils/telegram';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      window.location.replace('/dashboard');
      return;
    }

    const initData = getInitData();
    if (!initData) {
      setError('Open this app inside Telegram');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const resp = await authenticateWithTelegram(initData);
        login(resp.token);
        markReady();
        window.location.replace('/dashboard');
      } catch (e: any) {
        console.error('Auth error:', e);
        setError(e.response?.data || e.message || 'Authentication failed');
      } finally {
        setLoading(false);
      }
    })();
  }, [isAuthenticated, login]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
        <h2 className="text-lg font-medium mb-4">Authenticating…</h2>
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
      </div>
    </div>
  );
}
