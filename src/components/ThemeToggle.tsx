import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      role="switch"
      aria-checked={isDark}
      className="theme-switch"
    >
      <span className="switch-label">
        {isDark ? 'NIGHTMODE' : 'DAYMODE'}
      </span>
      <span
        className={`switch-thumb ${isDark ? 'switch-thumb--right' : 'switch-thumb--left'}`}
      >
        <img
          src={isDark ? '/moon.png' : '/sun.png'}
          alt={isDark ? 'Dark' : 'Light'}
          width={24}
          height={24}
        />
      </span>
    </button>
  );
}


