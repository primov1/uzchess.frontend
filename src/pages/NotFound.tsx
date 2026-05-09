import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFound = () => {
  // Chess pieces for decorative layout
  const pieces = ['♔', '♕', '♖', '♗', '♘', '♙', '♚', '♛', '♜', '♝', '♞', '♟'];

  return (
    <div className="page-container not-found-container animate-fade-in">
      {/* Floating chess pieces background */}
      <div className="not-found-pieces">
        {pieces.map((piece, i) => (
          <span
            key={i}
            className="floating-piece"
            style={{
              left: `${(i * 8) + 2}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + (i % 3) * 2}s`,
              fontSize: `${1.5 + (i % 3)}rem`,
            }}
          >
            {piece}
          </span>
        ))}
      </div>

      <div className="not-found-content">
        <div className="not-found-404">
          <span>4</span>
          <div className="not-found-chess-icon">
            {/* Chess king icon */}
            <svg viewBox="0 0 100 120" width="80" height="96" fill="none" stroke="#00d2ff" strokeWidth="3">
              <line x1="50" y1="10" x2="50" y2="30" />
              <line x1="40" y1="20" x2="60" y2="20" />
              <circle cx="50" cy="40" r="12" />
              <path d="M30 55 Q50 45 70 55 L75 90 Q50 95 25 90 Z" />
              <rect x="20" y="95" width="60" height="12" rx="3" />
            </svg>
          </div>
          <span>4</span>
        </div>

        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Sahifa topilmadi!</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
          Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan. Bosh sahifaga qaytishni tavsiya etamiz.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary">
            <Home size={18} /> Bosh sahifaga
          </Link>
          <Link to="/courses" className="btn btn-glass">
            Kurslarni ko'rish
          </Link>
        </div>
      </div>
    </div>
  );
};
