
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, LogOut, User, ShoppingCart, Menu, X } from 'lucide-react';
import {useState} from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Bosh sahifa' },
    { path: '/courses', label: "Ta'lim" },
    { path: '/news', label: 'Yangiliklar' },
    { path: '/library', label: 'Kutubxona' },
    { path: '/live', label: 'Live' },
    { path: '/contact', label: "Bog'lanish" },
  ];

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="nav-logo">
          <BookOpen className="text-accent-primary" size={28} color="#00d2ff"/>
          <span className="text-gradient">Uzchess</span>
        </Link>

        <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className={`nav-links ${mobileOpen ? 'nav-links-open' : ''}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          {token ? (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Link to="/cart" className="nav-icon-btn" title="Savat">
                <ShoppingCart size={20} />
              </Link>
              <Link to="/profile" className="nav-icon-btn" title="Profil">
                <User size={20} />
              </Link>
              <button 
                onClick={handleLogout}
                className="btn btn-primary" 
                style={{ padding: '0.5rem 1rem', background: 'rgba(255, 78, 78, 0.1)', color: '#ff4e4e', border: '1px solid rgba(255, 78, 78, 0.3)', boxShadow: 'none' }}
              >
                <LogOut size={18} /> Chiqish
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to="/login" className="btn btn-glass" onClick={() => setMobileOpen(false)}>Kirish</Link>
              <Link to="/register" className="btn btn-primary" onClick={() => setMobileOpen(false)}>Ro'yxatdan o'tish</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
