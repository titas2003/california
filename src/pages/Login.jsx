import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { loginCustomerThunk } from '../store/authSlice';
import { Mail, Lock, AlertTriangle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('guest@hotelcal.com');
  const [password, setPassword] = useState('password123');
  const { loading, error } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginCustomerThunk({ email, password })).then((res) => {
      if (!res.error) {
        const redirectPath = searchParams.get('redir') || '/';
        navigate(redirectPath);
      }
    });
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="animate-fade-in">
      <div className="glass-card" style={{ width: '100%', maxWidth: '440px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '30px', border: '1px solid rgba(212, 175, 55, 0.15)' }}>
        
        <div style={{ textAlign: 'center' }}>
          <h2 className="serif-text" style={{ fontSize: '2rem' }}>Sign In</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px' }}>Enjoy members-only rates, shuttle requests, and stay logs.</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(255, 23, 68, 0.08)', border: '1px solid rgba(255, 23, 68, 0.2)', color: 'var(--danger)', padding: '12px 16px', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <AlertTriangle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-gold)' }} />
              <input 
                type="email" 
                className="form-input" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '46px', width: '100%' }}
                required 
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '46px', width: '100%' }}
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginTop: '10px' }} disabled={loading}>
            {loading ? 'Entering suites...' : 'Login to Suites'}
          </button>
        </form>

        <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-glass)', paddingTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span>Don't have a stay profile? </span>
          <Link to="/register" style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: 600 }}>Create Stay Account</Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
