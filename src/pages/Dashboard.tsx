import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="surface rounded-lg p-6 shadow-sm mb-6">
        <h1 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
          Welcome to CozyCode Dashboard
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
          Here you will see your courses, progress, etc.
        </p>
      </div>
    </div>
  );
}
