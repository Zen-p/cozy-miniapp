import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { logout } = useAuth();
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome to CozyCode Dashboard</h1>
        <button
          onClick={logout}
          className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
        >
          Logout
        </button>
      </div>
      <p>Here you will see your courses, progress, etc.</p>
    </div>
  );
}
