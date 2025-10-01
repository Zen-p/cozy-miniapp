import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="px-3 py-2 rounded text-sm"
      style={{ background: 'var(--surface, #e5e7eb)', color: 'var(--text)' }}
    >
      {theme === 'light' ? 'Dark mode' : 'Light mode'}
    </button>
  );
}


