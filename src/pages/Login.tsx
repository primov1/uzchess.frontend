import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiClient } from '../api/apiClient';
import { X, ChevronLeft, Eye, EyeOff } from 'lucide-react';

type Mode = 'SIGN_IN' | 'SIGN_UP' | 'FORGOT_PASSWORD' | 'OTP' | 'CREATE_PASSWORD';
type Tab = 'PHONE' | 'EMAIL';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [mode, setMode] = useState<Mode>(location.pathname === '/register' ? 'SIGN_UP' : 'SIGN_IN');
  const [tab, setTab] = useState<Tab>('PHONE');
  
  const [loginField, setLoginField] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '']);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    navigate('/');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'SIGN_IN') {
      setError('');
      setLoading(true);
      try {
        const res = await apiClient.post('/auth/login', {
          login: loginField,
          password,
        });
        localStorage.setItem('token', res.data.accessToken);
        navigate('/courses');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Login failed. Check your credentials.');
      } finally {
        setLoading(false);
      }
    } else if (mode === 'SIGN_UP' || mode === 'FORGOT_PASSWORD') {
      // Move to OTP screen
      setMode('OTP');
    } else if (mode === 'OTP') {
      // Move to create password
      setMode('CREATE_PASSWORD');
    } else if (mode === 'CREATE_PASSWORD') {
      // Finalize setup
      setMode('SIGN_IN');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Autofocus next
    if (value && index < 4) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const renderTabs = () => (
    <div className="auth-tabs">
      <button 
        type="button"
        className={`auth-tab ${tab === 'PHONE' ? 'active' : ''}`}
        onClick={() => setTab('PHONE')}
      >
        Telefon orqali
      </button>
      <button 
        type="button"
        className={`auth-tab ${tab === 'EMAIL' ? 'active' : ''}`}
        onClick={() => setTab('EMAIL')}
      >
        E-mail orqali
      </button>
    </div>
  );

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-content animate-fade-in">
        <button onClick={handleClose} className="auth-close-btn">
          <X size={24} />
        </button>

        <div className="auth-form-side">
          {error && <div className="global-error">{error}</div>}

          {/* SIGN IN */}
          {mode === 'SIGN_IN' && (
            <>
              <div className="auth-header-wrapper">
                <h2 className="auth-title">Tizimga kirish</h2>
              </div>
              
              {renderTabs()}
              
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div className="input-group">
                  <label className="input-label">
                    {tab === 'PHONE' ? 'Telefon raqam' : 'Elektron pochta'}
                  </label>
                  <input 
                    type="text" 
                    className="input-field"
                    value={loginField}
                    onChange={(e) => setLoginField(e.target.value)}
                    placeholder={tab === 'PHONE' ? '+998 90 123 45 67' : 'e.g. johndoe@example.com'}
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label className="input-label">Parol</label>
                  <div className="relative-input">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className="input-field"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                    <button 
                      type="button" 
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <div className="auth-check-group">
                  <label className="auth-check-label">
                    <input type="checkbox" className="auth-check-input" />
                    <span>Meni eslab qolish</span>
                  </label>
                  <button type="button" className="auth-text-btn" onClick={() => setMode('FORGOT_PASSWORD')}>
                    Parolni unutdingizmi?
                  </button>
                </div>
                
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
                  {loading ? 'Kutib turing...' : 'Kirish'}
                </button>
                
                <p className="auth-bottom-text">
                  Hisobingiz yo'qmi? 
                  <button type="button" onClick={() => setMode('SIGN_UP')}>Ro'yxatdan o'tish</button>
                </p>
              </form>
            </>
          )}

          {/* SIGN UP */}
          {mode === 'SIGN_UP' && (
            <>
              <div className="auth-header-wrapper">
                <h2 className="auth-title">Ro'yxatdan o'tish</h2>
              </div>
              
              {renderTabs()}
              
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div className="input-group">
                  <label className="input-label">Ism sharifingiz</label>
                  <input 
                    type="text" 
                    className="input-field"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ismingizni kiriting"
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label className="input-label">
                    {tab === 'PHONE' ? 'Telefon raqam' : 'Elektron pochta'}
                  </label>
                  <input 
                    type="text" 
                    className="input-field"
                    value={loginField}
                    onChange={(e) => setLoginField(e.target.value)}
                    placeholder={tab === 'PHONE' ? '+998 90 123 45 67' : 'e.g. johndoe@example.com'}
                    required
                  />
                </div>
                
                <div className="auth-check-group" style={{ margin: '1rem 0' }}>
                  <label className="auth-check-label" style={{ alignItems: 'flex-start' }}>
                    <input type="checkbox" className="auth-check-input" required style={{ marginTop: '3px' }}/>
                    <span style={{ lineHeight: 1.4 }}>Qoidalarga roziman, shuningdek maxfiylik siyosatiga roziman</span>
                  </label>
                </div>
                
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Tasdiqlash
                </button>
                
                <p className="auth-bottom-text">
                  Hisobingiz bormi? 
                  <button type="button" onClick={() => setMode('SIGN_IN')}>Kirish</button>
                </p>
              </form>
            </>
          )}

          {/* FORGOT PASSWORD */}
          {mode === 'FORGOT_PASSWORD' && (
            <>
              <div className="auth-header-wrapper">
                <button onClick={() => setMode('SIGN_IN')} className="auth-back-btn"><ChevronLeft size={24}/></button>
                <h2 className="auth-title">Parolni qayta tiklash</h2>
              </div>
              
              <p className="auth-subtitle">Tasdiqlash kodini olish uchun {tab === 'PHONE' ? 'telefon raqamingizni' : 'pochta manzilingizni'} kiriting</p>
              
              {renderTabs()}
              
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div className="input-group">
                  <label className="input-label">
                    {tab === 'PHONE' ? 'Telefon raqam' : 'Elektron pochta'}
                  </label>
                  <input 
                    type="text" 
                    className="input-field"
                    value={loginField}
                    onChange={(e) => setLoginField(e.target.value)}
                    placeholder={tab === 'PHONE' ? '+998 90 123 45 67' : 'e.g. johndoe@example.com'}
                    required
                  />
                </div>
                
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 'auto', marginBottom: '2rem' }}>
                  Davom etish
                </button>
              </form>
            </>
          )}

          {/* OTP */}
          {mode === 'OTP' && (
            <>
              <div className="auth-header-wrapper">
                <button onClick={() => setMode('SIGN_UP')} className="auth-back-btn"><ChevronLeft size={24}/></button>
                <h2 className="auth-title">
                  {tab === 'PHONE' ? 'Telefon raqamini tasdiqlash' : 'E-mailni tasdiqlash'}
                </h2>
              </div>
              
              <p className="auth-subtitle">
                Tasdiqlash kodi {tab === 'PHONE' ? 'telefon raqamingizga' : 'elektron pochtangizga'} yuborildi
              </p>
              
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                <div className="auth-otp-inputs">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      className="auth-otp-input"
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      maxLength={1}
                      autoComplete="off"
                    />
                  ))}
                </div>
                
                <button type="button" className="auth-text-btn auth-resend">
                  Qayta yuborish (01:59)
                </button>
                
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 'auto', marginBottom: '2rem' }}>
                  Tasdiqlash
                </button>
              </form>
            </>
          )}

          {/* CREATE PASSWORD */}
          {mode === 'CREATE_PASSWORD' && (
            <>
               <div className="auth-header-wrapper">
                <button onClick={() => setMode('OTP')} className="auth-back-btn"><ChevronLeft size={24}/></button>
                <h2 className="auth-title">Parolni tiklash</h2>
              </div>
              
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div className="input-group">
                  <label className="input-label">Kiritish</label>
                  <div className="relative-input">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className="input-field"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                    <button 
                      type="button" 
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <div className="input-group">
                  <label className="input-label">Parolni tasdiqlang</label>
                  <div className="relative-input">
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      className="input-field"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                    <button 
                      type="button" 
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 'auto', marginBottom: '2rem' }}>
                  Saqlash
                </button>
              </form>
            </>
          )}
        </div>

        <div className="auth-image-side">
          <div className="auth-image-content">
            <h2>Shaxmatni<br/>biz bilan <span className="highlight">o'rganing!</span></h2>
            <p>O'zbekistondagi eng ilg'or shaxmat platformasi</p>
          </div>
        </div>
      </div>
    </div>
  );
};
