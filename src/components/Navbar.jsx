import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { Sparkles, Compass, CalendarCheck, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="navbar-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        {/* Brand Logo */}
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="serif-text" style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--text-main)' }}>Hotel</span>
            <span className="gradient-text">California</span>
          </h2>
        </NavLink>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <NavLink 
            to="/rooms" 
            style={({ isActive }) => ({ 
              color: isActive ? 'var(--accent-gold)' : 'var(--text-main)', 
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            })}
          >
            <Compass size={16} />
            <span>Discover Suites</span>
          </NavLink>

          {isAuthenticated && (
            <NavLink 
              to="/bookings" 
              style={({ isActive }) => ({ 
                color: isActive ? 'var(--accent-gold)' : 'var(--text-main)', 
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              })}
            >
              <CalendarCheck size={16} />
              <span>My Stays</span>
            </NavLink>
          )}

          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '20px' }}>
              <NavLink 
                to="/profile" 
                style={{ 
                  color: 'var(--text-main)', 
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justify: 'center', color: '#08080c', fontWeight: 700 }}>
                  {user?.name ? user.name[0] : 'U'}
                </div>
                <span>{user?.name}</span>
              </NavLink>
              <button 
                onClick={handleLogout} 
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: 'var(--danger)', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <NavLink to="/login" className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                Sign In
              </NavLink>
              <NavLink to="/register" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                Join Club
              </NavLink>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
