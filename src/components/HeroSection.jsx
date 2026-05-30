import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Search } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [roomType, setRoomType] = useState('Any');
  const [roomsCount, setRoomsCount] = useState('1');
  const [validationError, setValidationError] = useState('');

  const validateCapacity = (g, r) => {
    const guestsNum = parseInt(g, 10);
    const roomsNum = parseInt(r, 10);
    if (guestsNum > roomsNum * 2) {
      setValidationError(`Strict Luxury Policy: Maximum of 2 guests per room is allowed.`);
    } else {
      setValidationError('');
    }
  };

  const handleGuestsChange = (val) => {
    setGuests(val);
    validateCapacity(val, roomsCount);
  };

  const handleRoomsChange = (val) => {
    setRoomsCount(val);
    validateCapacity(guests, val);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) return;
    
    const guestsNum = parseInt(guests, 10);
    const roomsNum = parseInt(roomsCount, 10);
    if (guestsNum > roomsNum * 2) {
      return;
    }
    
    // Pass queries to Rooms page
    navigate(`/rooms?in=${checkIn}&out=${checkOut}&guests=${guests}&type=${roomType}&rooms=${roomsCount}`);
  };

  return (
    <div 
      style={{
        height: '65vh',
        minHeight: '520px',
        borderRadius: '24px',
        background: 'linear-gradient(to bottom, rgba(250, 250, 249, 0.1) 0%, rgba(250, 250, 249, 0.85) 100%), url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=80") center/cover no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 10px 40px rgba(178, 144, 40, 0.08)'
      }}
    >
      {/* Luxury Brand Tag */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '800px', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 400, lineHeight: 1.1 }}>
          <span className="serif-text" style={{ fontStyle: 'italic', color: 'var(--text-main)' }}>Welcome to the </span>
          <br />
          <span className="gradient-text serif-text" style={{ fontWeight: 800 }}>Golden Standard of Luxury</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          "You can check out any time you like, but you can never leave." Experience timeless tranquility in our historic Beverly Hills suites.
        </p>
      </div>

      {/* Date Search Widget Form */}
      <form 
        onSubmit={handleSearch} 
        className="glass-card animate-fade-in"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '24px 30px',
          width: '100%',
          maxWidth: '960px',
          borderRadius: '16px',
          border: '1px solid rgba(212, 175, 55, 0.15)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', width: '100%' }}>
          <div className="form-group" style={{ flex: '1', minWidth: '160px' }}>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Check-In Date</label>
            <div style={{ position: 'relative' }}>
              <Calendar size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-gold)' }} />
              <input 
                type="date" 
                className="form-input" 
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                style={{ paddingLeft: '42px', width: '100%' }}
                required 
              />
            </div>
          </div>

          <div className="form-group" style={{ flex: '1', minWidth: '160px' }}>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Check-Out Date</label>
            <div style={{ position: 'relative' }}>
              <Calendar size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-gold)' }} />
              <input 
                type="date" 
                className="form-input" 
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                style={{ paddingLeft: '42px', width: '100%' }}
                required 
              />
            </div>
          </div>

          <div className="form-group" style={{ flex: '0.8', minWidth: '120px' }}>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Room Type</label>
            <select className="form-input" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
              <option value="Any">Any Suite</option>
              <option value="Standard">Standard Suite</option>
              <option value="Deluxe">Deluxe Suite</option>
              <option value="Suite">Premium Suite</option>
              <option value="Penthouse">Penthouse</option>
            </select>
          </div>

          <div className="form-group" style={{ flex: '0.6', minWidth: '100px' }}>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Rooms</label>
            <select className="form-input" value={roomsCount} onChange={(e) => handleRoomsChange(e.target.value)}>
              <option value="1">1 Room</option>
              <option value="2">2 Rooms</option>
              <option value="3">3 Rooms</option>
              <option value="4">4 Rooms</option>
            </select>
          </div>

          <div className="form-group" style={{ flex: '0.6', minWidth: '100px' }}>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Guests</label>
            <select className="form-input" value={guests} onChange={(e) => handleGuestsChange(e.target.value)}>
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5 Guests</option>
              <option value="6">6 Guests</option>
              <option value="7">7 Guests</option>
              <option value="8">8 Guests</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', flex: '0.8', minWidth: '160px' }}>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', gap: '10px' }}
              disabled={!!validationError}
            >
              <Search size={16} />
              <span>Search Availability</span>
            </button>
          </div>
        </div>

        {validationError && (
          <div 
            style={{ 
              color: 'var(--danger)', 
              fontSize: '0.85rem', 
              background: 'rgba(255, 23, 68, 0.08)', 
              padding: '8px 16px', 
              borderRadius: '8px', 
              border: '1px solid rgba(255, 23, 68, 0.15)',
              textAlign: 'left',
              marginTop: '10px'
            }}
          >
            {validationError}
          </div>
        )}
      </form>
    </div>
  );
};

export default HeroSection;
