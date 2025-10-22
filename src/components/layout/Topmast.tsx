// src/components/layout/Topmast.tsx
import { Link } from 'react-router-dom';

export default function Topmast() {
  return (
    <header className="topmast" role="banner">
      <div className="topmast__brand">
        <Link to="/" className="topmast__logo">
          Mindful Art
        </Link>
      </div>
      <nav className="topmast__nav" aria-label="Primary">
        <ul className="topmast__list">
          <li>
            <Link to="/search" className="topmast__link">
              Search
            </Link>
          </li>
          <li>
            <Link to="/galleries" className="topmast__link">
              Your Galleries
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
