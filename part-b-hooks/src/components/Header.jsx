import { useState } from 'react';
import Clock from './Clock';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const [showClock, setShowClock] = useState(true);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <h1>Sổ chi tiêu cá nhân (Hooks)</h1>
      <div className="header-actions">
        {showClock && <Clock />}
        <button
          type="button"
          className="btn-secondary"
          onClick={() => setShowClock((prev) => !prev)}
        >
          {showClock ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
        </button>
        <button type="button" className="btn-secondary" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
        </button>
      </div>
    </header>
  );
}
