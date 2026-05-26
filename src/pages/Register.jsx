import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerCustomerThunk } from '../store/authSlice';
import { Mail, Lock, User, Phone, AlertTriangle } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    dispatch(registerCustomerThunk({ name, email, password, phone })).then((res) => {
      if (!res.error) {
        navigate('/');
      }
    });
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="animate-fade-in">
      <div className="glass-card" style={{ width: '100%', maxWidth: '460px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '30px', border: '1px solid rgba(212, 175, 55, 0.15)' }}>
        
        <div style={{ textAlign: 'center' }}>
          <h2 className="serif-text" style={{ fontSize: '2rem' }}>Join the Club</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px' }}>Unlock premier concierge bookings and complimentary Wi-Fi.</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(255, 23, 68, 0.08)', border: '1px solid rgba(255, 23, 68, 0.2)', color: 'var(--danger)', padding: '12px 16px', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <AlertTriangle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-gold)' }} />
              <input 
                type="text" 
                className="form-input" 
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ paddingLeft: '46px', width: '100%' }}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-gold)' }} />
              <input 
                type="email" 
                className="form-input" 
                placeholder="jane@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '46px', width: '100%' }}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <div style={{ position: 'relative' }}>
              <Phone size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-gold)' }} />
              <input 
                type="text" 
                className="form-input" 
                placeholder="555-123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ paddingLeft: '46px', width: '100%' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-gold)' }} />
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '46px', width: '100%' }}
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginTop: '10px' }} disabled={loading}>
            {loading ? 'Creating account...' : 'Create Stay Profile'}
          </button>
        </form>

        <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-glass)', paddingTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span>Already have a stay profile? </span>
          <Link to="/login" style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: 600 }}>Login here</Link>
        </div>

      </div>
    </div>
  );
};

export default Register;
