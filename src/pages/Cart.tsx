import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart, Plus, Minus, CreditCard, ChevronRight } from 'lucide-react';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image?: string;
  quantity: number;
}

type CartStep = 'CART' | 'DETAILS' | 'SUCCESS';

export const Cart = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<CartStep>('CART');
  const [items, setItems] = useState<CartItem[]>([
    { id: 1, title: "Shaxmat ochilishlari bo'yicha kurs", price: 150000, quantity: 1 },
    { id: 2, title: "Endshpil strategiyalari", price: 200000, quantity: 1 },
    { id: 3, title: "Taktik mashqlar to'plami", price: 85000, quantity: 1 },
  ]);

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const handleRemove = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleQuantity = (id: number, delta: number) => {
    setItems(prev => prev.map(i =>
      i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
    ));
  };

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('SUCCESS');
  };

  // CART step
  if (step === 'CART') {
    return (
      <div className="page-container container animate-fade-in">
        <div className="page-header">
          <h1 className="page-title">Savat</h1>
          <p className="page-subtitle">{items.length} ta mahsulot</p>
        </div>

        {items.length === 0 ? (
          <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
            <ShoppingCart size={64} color="var(--text-secondary)" style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
            <h2 style={{ marginBottom: '0.5rem' }}>Savat bo'sh</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Kurslarni qo'shish uchun kurslar sahifasiga o'ting</p>
            <button className="btn btn-primary" onClick={() => navigate('/courses')}>Kurslarni ko'rish</button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="glass-panel cart-item">
                  <div className="cart-item-image">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=200&q=80'}
                      alt={item.title}
                    />
                  </div>
                  <div className="cart-item-info">
                    <h3>{item.title}</h3>
                    <span className="cart-item-price">{formatPrice(item.price)}</span>
                  </div>
                  <div className="cart-item-actions">
                    <div className="cart-quantity">
                      <button onClick={() => handleQuantity(item.id, -1)} className="cart-qty-btn"><Minus size={16} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantity(item.id, 1)} className="cart-qty-btn"><Plus size={16} /></button>
                    </div>
                    <button onClick={() => handleRemove(item.id)} className="cart-remove-btn">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-panel cart-summary">
              <h3 style={{ marginBottom: '1.5rem' }}>Buyurtma xulosasi</h3>
              {items.map(item => (
                <div key={item.id} className="cart-summary-row">
                  <span>{item.title} x{item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="cart-summary-divider"></div>
              <div className="cart-summary-row cart-summary-total">
                <span>Jami:</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }} onClick={() => setStep('DETAILS')}>
                Buyurtma berish <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // DETAILS step
  if (step === 'DETAILS') {
    return (
      <div className="page-container container animate-fade-in">
        <div className="page-header">
          <h1 className="page-title">To'lov ma'lumotlari</h1>
          <p className="page-subtitle">Buyurtmani yakunlash uchun ma'lumotlarni kiriting</p>
        </div>

        <div className="cart-layout">
          <div className="glass-panel" style={{ padding: '2rem', flex: 1 }}>
            <form onSubmit={handleCheckout}>
              <h3 style={{ marginBottom: '1.5rem', color: '#fff' }}>Shaxsiy ma'lumotlar</h3>

              <div className="input-group">
                <label className="input-label">To'liq ism</label>
                <input type="text" className="input-field" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} placeholder="Ismingiz va familiyangiz" required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">Telefon raqam</label>
                  <input type="text" className="input-field" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+998 90 123 45 67" required />
                </div>
                <div className="input-group">
                  <label className="input-label">Email</label>
                  <input type="email" className="input-field" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="email@example.com" />
                </div>
              </div>

              <h3 style={{ margin: '2rem 0 1.5rem', color: '#fff' }}>
                <CreditCard size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                To'lov ma'lumotlari
              </h3>

              <div className="input-group">
                <label className="input-label">Karta raqami</label>
                <input type="text" className="input-field" value={form.cardNumber} onChange={e => setForm({...form, cardNumber: e.target.value})} placeholder="8600 1234 5678 9012" required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">Amal qilish muddati</label>
                  <input type="text" className="input-field" value={form.cardExpiry} onChange={e => setForm({...form, cardExpiry: e.target.value})} placeholder="MM/YY" required />
                </div>
                <div className="input-group">
                  <label className="input-label">CVV</label>
                  <input type="text" className="input-field" value={form.cardCvv} onChange={e => setForm({...form, cardCvv: e.target.value})} placeholder="***" required />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-glass" onClick={() => setStep('CART')}>Ortga</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>To'lovni amalga oshirish</button>
              </div>
            </form>
          </div>

          <div className="glass-panel cart-summary">
            <h3 style={{ marginBottom: '1.5rem' }}>Buyurtma</h3>
            {items.map(item => (
              <div key={item.id} className="cart-summary-row">
                <span>{item.title}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="cart-summary-divider"></div>
            <div className="cart-summary-row cart-summary-total">
              <span>Jami:</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SUCCESS step
  return (
    <div className="page-container container animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', maxWidth: 520 }}>
        <div className="success-icon">
          <svg viewBox="0 0 52 52" width="80" height="80">
            <circle cx="26" cy="26" r="25" fill="none" stroke="#00d2ff" strokeWidth="2" className="success-circle" />
            <path fill="none" stroke="#00d2ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M14 27l7 7 16-16" className="success-check" />
          </svg>
        </div>
        <h2 style={{ fontSize: '1.8rem', margin: '1.5rem 0 0.5rem' }}>Buyurtma qabul qilindi!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
          To'lovingiz muvaffaqiyatli amalga oshirildi. Kurslaringizga kirish uchun profilingizga o'ting.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-glass" onClick={() => navigate('/courses')}>Kurslarni ko'rish</button>
          <button className="btn btn-primary" onClick={() => navigate('/profile')}>Profilga o'tish</button>
        </div>
      </div>
    </div>
  );
};
