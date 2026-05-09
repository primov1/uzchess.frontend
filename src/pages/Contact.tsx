import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';

export const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: <MapPin size={22} />, title: 'Manzil', value: "Toshkent shahri, Amir Temur ko'chasi, 108", color: '#00d2ff' },
    { icon: <Phone size={22} />, title: 'Telefon', value: '+998 71 200 00 00', color: '#4e46ff' },
    { icon: <Mail size={22} />, title: 'Email', value: 'info@uzchess.uz', color: '#9d4edd' },
    { icon: <Clock size={22} />, title: 'Ish vaqti', value: 'Du-Ju: 9:00 - 18:00', color: '#ff6b35' },
  ];

  return (
    <div className="page-container container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Bog'lanish</h1>
        <p className="page-subtitle">Savollaringiz bormi? Biz bilan bog'laning!</p>
      </div>

      <div className="contact-layout">
        {/* Contact Info Cards */}
        <div className="contact-info-grid">
          {contactInfo.map((info, i) => (
            <div key={i} className="glass-panel contact-info-card">
              <div className="contact-info-icon" style={{ background: `${info.color}15`, color: info.color }}>
                {info.icon}
              </div>
              <div>
                <h4 style={{ color: '#fff', marginBottom: '0.25rem' }}>{info.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{info.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="contact-main">
          {/* Map */}
          <div className="glass-panel contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.0654513078!2d69.27935!3d41.31115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzQwLjEiTiA2OcKwMTYnNDUuNyJF!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Uzchess Location"
            />
          </div>

          {/* Contact Form */}
          <div className="glass-panel contact-form-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <MessageCircle size={24} color="#00d2ff" />
              <h3 style={{ color: '#fff' }}>Xabar yuborish</h3>
            </div>

            {sent && (
              <div style={{ background: 'rgba(0, 210, 255, 0.1)', border: '1px solid rgba(0, 210, 255, 0.3)', color: '#00d2ff', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>
                Xabaringiz muvaffaqiyatli yuborildi! ✓
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">Ismingiz</label>
                  <input type="text" className="input-field" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Ismingiz" required />
                </div>
                <div className="input-group">
                  <label className="input-label">Email</label>
                  <input type="email" className="input-field" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="email@example.com" required />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Mavzu</label>
                <input type="text" className="input-field" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="Xabar mavzusi" required />
              </div>

              <div className="input-group">
                <label className="input-label">Xabar</label>
                <textarea className="input-field" value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Xabaringizni yozing..." rows={5} style={{ resize: 'vertical' }} required />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <Send size={18} /> Yuborish
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
