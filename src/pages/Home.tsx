import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Zap, Award } from 'lucide-react';

export const Home = () => {
  return (
    <div className="page-container">
      <div className="container hero-section animate-fade-in">
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem', background: 'rgba(78, 70, 255, 0.1)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-glass)' }}>
          <span style={{ color: '#00d2ff', fontSize: '0.85rem', fontWeight: 600 }}>NEW</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Uzchess Platform is now live</span>
        </div>
        
        <h1 className="hero-title">
          Master the Game of Kings with <span className="text-gradient">Uzchess LMS</span>
        </h1>
        
        <p className="hero-subtitle">
          Experience world-class chess education with interactive lessons, advanced tracking, and premium courses tailored for champions.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Link to="/courses" className="btn btn-primary">
            Explore Courses <ChevronRight size={18} />
          </Link>
          <Link to="/register" className="btn btn-glass">
            Start Learning Free
          </Link>
        </div>

        <div className="grid-cards" style={{ marginTop: '5rem', textAlign: 'left' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <Award size={32} color="#00d2ff" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>Premium Courses</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Learn from grandmasters with our deeply analyzed, structured lesson plans and video lectures.</p>
          </div>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <Zap size={32} color="#4e46ff" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>Interactive Engine</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Practice right in your browser with our integrated engine analysis and feedback tools.</p>
          </div>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <Shield size={32} color="#9d4edd" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>Verified Progression</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Track your improvement and solve puzzles to unlock your full potential on the board.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
