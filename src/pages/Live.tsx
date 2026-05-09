import React from 'react';
import { Radio, Users, MessageSquare, Eye } from 'lucide-react';

export const Live = () => {
  const streams = [
    {
      id: 1,
      title: "Jahon chempionati: Yarim final",
      description: "Nodirbek Abdusattorov vs Magnus Carlsen - to'g'ridan-to'g'ri translyatsiya",
      viewers: 2340,
      isLive: true,
      thumbnail: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: "Haftalik online turnir",
      description: "Eng kuchli o'yinchilar o'rtasida musobaqalar",
      viewers: 890,
      isLive: true,
      thumbnail: 'https://images.unsplash.com/photo-1560174038-da43ac74f01b?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: "GM bilan ochiq dars",
      description: "Grandmaster bilan shaxmat dars — ochilishlar mavzusida",
      viewers: 456,
      isLive: false,
      thumbnail: 'https://images.unsplash.com/photo-1586165368502-1bad9cc70898?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const chatMessages = [
    { user: 'Sardor', message: 'Ajoyib ochilish!', time: '2 daq oldin' },
    { user: 'Nilufar', message: 'Qanday zo\'r yurish!', time: '1 daq oldin' },
    { user: 'Bexruz', message: 'Bu pozitsiya juda qiziq', time: '30 son oldin' },
    { user: 'Madina', message: 'Sizningcha kim g\'alaba qozonadi?', time: '15 son oldin' },
    { user: 'Admin', message: 'Translyatsiyani tomosha qilganingiz uchun rahmat!', time: 'Hozir' },
  ];

  return (
    <div className="page-container container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">
          <Radio size={28} color="#ff4e4e" style={{ marginRight: '0.75rem', verticalAlign: 'middle' }} />
          Live translyatsiya
        </h1>
        <p className="page-subtitle">Jonli efirlar va translyatsiyalar</p>
      </div>

      {/* Main Stream */}
      {streams[0] && (
        <div className="live-main-stream glass-panel">
          <div className="live-video-wrapper">
            <img src={streams[0].thumbnail} alt={streams[0].title} className="live-video-placeholder" />
            <div className="live-video-overlay">
              <div className="live-badge-wrapper">
                {streams[0].isLive && <span className="live-badge">● LIVE</span>}
                <span className="live-viewers"><Eye size={14} /> {streams[0].viewers} tomoshabin</span>
              </div>
              <div className="live-play-btn">
                <svg viewBox="0 0 24 24" fill="white" width="48" height="48"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              </div>
            </div>
          </div>

          <div className="live-chat">
            <div className="live-chat-header">
              <MessageSquare size={18} /> Chat
              <span className="live-chat-users"><Users size={14} /> {streams[0].viewers}</span>
            </div>
            <div className="live-chat-messages">
              {chatMessages.map((msg, i) => (
                <div key={i} className="live-chat-msg">
                  <span className="live-chat-user">{msg.user}</span>
                  <span className="live-chat-text">{msg.message}</span>
                  <span className="live-chat-time">{msg.time}</span>
                </div>
              ))}
            </div>
            <div className="live-chat-input-wrapper">
              <input type="text" className="input-field" placeholder="Xabar yozing..." style={{ fontSize: '0.85rem' }} />
              <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '8px' }}>Yuborish</button>
            </div>
          </div>
        </div>
      )}

      {/* Other Streams */}
      <h2 style={{ margin: '3rem 0 1.5rem', fontSize: '1.5rem' }}>Boshqa translyatsiyalar</h2>
      <div className="grid-cards">
        {streams.slice(1).map(stream => (
          <div key={stream.id} className="glass-panel live-card">
            <div className="live-card-thumb">
              <img src={stream.thumbnail} alt={stream.title} />
              {stream.isLive && <span className="live-badge">● LIVE</span>}
              <span className="live-viewers-small"><Eye size={12} /> {stream.viewers}</span>
            </div>
            <div style={{ padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#fff' }}>{stream.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{stream.description}</p>
              <button className="btn btn-glass" style={{ width: '100%', marginTop: '1rem', fontSize: '0.9rem' }}>
                Tomosha qilish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
