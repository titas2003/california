import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Award, LogOut } from 'lucide-react';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="animate-fade-in">
      <div className="glass-card" style={{ width: '100%', maxWidth: '500px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '30px', border: '1px solid rgba(212, 175, 55, 0.15)' }}>
        
        <div style={{ textAlign: 'center', borderBottom: '1px solid var(--border-glass)', paddingBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#08080c', fontWeight: 800, fontSize: '2.5rem' }}>
            {user?.name ? user.name[0] : 'U'}
          </div>
          <div>
            <h2 className="serif-text" style={{ fontSize: '1.8rem' }}>{user?.name || 'Valued Guest'}</h2>
            <div style={{ color: 'var(--accent-gold)', display: 'flex', gap: '4px', alignItems: 'center', fontSize: '0.85rem', fontWeight: 600, justifyContent: 'center', marginTop: '4px' }}>
              <Award size={14} />
              <span>Gold Club Member</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '0.95rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.02)', paddingBottom: '10px' }}>
            <span style={{ color: 'var(--text-muted)', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Mail size={16} />
              <span>Email</span>
            </span>
            <strong>{user?.email || 'N/A'}</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.02)', paddingBottom: '10px' }}>
            <span style={{ color: 'var(--text-muted)', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Phone size={16} />
              <span>Phone</span>
            </span>
            <strong>{user?.phone || 'N/A'}</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.02)', paddingBottom: '10px' }}>
            <span style={{ color: 'var(--text-muted)', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <User size={16} />
              <span>Membership Status</span>
            </span>
            <strong style={{ color: 'var(--success)' }}>Active Stay profile</strong>
          </div>
        </div>

        <button onClick={handleLogout} className="btn btn-danger" style={{ width: '100%', gap: '10px', padding: '12px' }}>
          <LogOut size={16} />
          <span>Settle Out & Logout</span>
        </button>

      </div>
    </div>
  );
};

export default Profile;
