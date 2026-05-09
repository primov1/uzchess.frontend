import { useState } from 'react';
import { User, Mail, Phone, Camera, Shield, Bell, LogOut, ChevronRight, Edit3 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export const Profile = () => {
  const navigate = useNavigate();

  const [user] = useState({
    name: 'Abdulloh Karimov',
    email: 'abdulloh@example.com',
    phone: '+998 90 123 45 67',
    avatar: '',
    role: "O'quvchi",
    joinDate: "2026-yil Yanvar",
    coursesCount: 3,
    certificatesCount: 1,
  });

  const menuItems = [
    { icon: <Edit3 size={20} />, label: "Profilni tahrirlash", path: '/profile/edit', color: '#00d2ff' },
    { icon: <Shield size={20} />, label: "Xavfsizlik", path: '/profile/security', color: '#4e46ff' },
    { icon: <Bell size={20} />, label: "Bildirishnomalar", path: '/profile/notifications', color: '#9d4edd' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="page-container container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Profil</h1>
        <p className="page-subtitle">Shaxsiy ma'lumotlaringiz va sozlamalar</p>
      </div>

      <div className="profile-layout">
        {/* Profile Card */}
        <div className="glass-panel profile-main-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <User size={48} />
              )}
              <button className="profile-avatar-edit">
                <Camera size={16} />
              </button>
            </div>
            <h2>{user.name}</h2>
            <span className="profile-role-badge">{user.role}</span>
            <p className="profile-join-date">A'zo bo'lgan: {user.joinDate}</p>
          </div>

          <div className="profile-stats">
            <div className="profile-stat">
              <span className="profile-stat-value">{user.coursesCount}</span>
              <span className="profile-stat-label">Kurslar</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-value">{user.certificatesCount}</span>
              <span className="profile-stat-label">Sertifikatlar</span>
            </div>
          </div>

          <div className="profile-info-list">
            <div className="profile-info-item">
              <Mail size={18} color="var(--text-secondary)" />
              <span>{user.email}</span>
            </div>
            <div className="profile-info-item">
              <Phone size={18} color="var(--text-secondary)" />
              <span>{user.phone}</span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="profile-menu-section">
          {menuItems.map((item, i) => (
            <Link to={item.path} key={i} className="glass-panel profile-menu-item">
              <div className="profile-menu-icon" style={{ background: `${item.color}15`, color: item.color }}>
                {item.icon}
              </div>
              <span className="profile-menu-label">{item.label}</span>
              <ChevronRight size={18} color="var(--text-secondary)" />
            </Link>
          ))}

          <button onClick={handleLogout} className="glass-panel profile-menu-item profile-logout-btn">
            <div className="profile-menu-icon" style={{ background: 'rgba(255,78,78,0.1)', color: '#ff4e4e' }}>
              <LogOut size={20} />
            </div>
            <span className="profile-menu-label" style={{ color: '#ff4e4e' }}>Chiqish</span>
            <ChevronRight size={18} color="#ff4e4e" />
          </button>
        </div>
      </div>
    </div>
  );
};
