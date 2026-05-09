import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Camera } from 'lucide-react';

export const ProfileEdit = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: 'Abdulloh',
    lastName: 'Karimov',
    email: 'abdulloh@example.com',
    phone: '+998 90 123 45 67',
    bio: "Shaxmat o'rganuvchi. 2 yildan beri shaxmat bilan shug'ullanaman.",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      navigate('/profile');
    }, 1000);
  };

  return (
    <div className="page-container container animate-fade-in">
      <div className="page-header">
        <button onClick={() => navigate('/profile')} className="back-link">
          <ChevronLeft size={20} /> Profilga qaytish
        </button>
        <h1 className="page-title">Profilni tahrirlash</h1>
      </div>

      <div className="profile-edit-layout">
        <div className="glass-panel profile-edit-card">
          <div className="profile-edit-avatar">
            <div className="profile-avatar" style={{ width: 100, height: 100 }}>
              <User size={40} />
              <button className="profile-avatar-edit">
                <Camera size={16} />
              </button>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Rasm yuklash uchun ustiga bosing</p>
          </div>

          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="input-group">
                <label className="input-label">Ism</label>
                <input
                  type="text"
                  className="input-field"
                  value={form.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label">Familiya</label>
                <input
                  type="text"
                  className="input-field"
                  value={form.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Elektron pochta</label>
              <input
                type="email"
                className="input-field"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Telefon raqam</label>
              <input
                type="text"
                className="input-field"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Bio</label>
              <textarea
                className="input-field"
                value={form.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                rows={4}
                style={{ resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="button" className="btn btn-glass" onClick={() => navigate('/profile')}>Bekor qilish</button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saqlanmoqda...' : 'Saqlash'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
