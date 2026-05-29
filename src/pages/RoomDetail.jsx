import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createBookingThunk } from '../store/bookingSlice';
import { fetchRoomsThunk } from '../store/roomSlice';
import { Compass, Calendar, ArrowRight, ShieldCheck, Heart, AlertTriangle } from 'lucide-react';

const RoomDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rooms = useSelector((state) => state.rooms.list);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const room = rooms.find((r) => (r._id || r.id) === id);

  useEffect(() => {
    if (rooms.length === 0) {
      dispatch(fetchRoomsThunk());
    }
  }, [dispatch, rooms.length]);

  const [checkIn, setCheckIn] = useState(searchParams.get('in') || '');
  const [checkOut, setCheckOut] = useState(searchParams.get('out') || '');
  const [stayNights, setStayNights] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    if (checkIn && checkOut) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      if (outDate > inDate) {
        setDateError('');
        const diffTime = Math.abs(outDate - inDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
        setStayNights(diffDays);
        if (room) {
          setTotalCost(room.pricePerNight * diffDays);
        }
      } else {
        setDateError('Check-out date must be after check-in date');
        setStayNights(0);
        setTotalCost(0);
      }
    } else {
      setDateError('Please select check-in & check-out dates');
      if (room) {
        setTotalCost(room.pricePerNight);
      }
    }
  }, [checkIn, checkOut, room]);

  if (!room) {
    return <div style={{ textAlign: 'center', padding: '100px' }}><h3>Suite not found.</h3></div>;
  }

  const handleBooking = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      setDateError('Please select both check-in and check-out dates.');
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setDateError('Check-out date must be after check-in date.');
      return;
    }

    if (!isAuthenticated) {
      // Redirect to login page and preserve booking intention
      navigate(`/login?redir=/rooms/${id}?in=${checkIn}&out=${checkOut}`);
      return;
    }

    // Dispatch booking action
    dispatch(createBookingThunk({
      roomId: room._id || room.id,
      checkIn,
      checkOut
    }))
      .unwrap()
      .then(() => {
        // Redirect to active stays desk
        navigate('/bookings');
      })
      .catch((err) => {
        setDateError(err || 'Booking failed');
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }} className="animate-fade-in">
      
      {/* Back to Discovery */}
      <button onClick={() => navigate('/rooms')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: 'var(--accent-gold)', cursor: 'pointer', alignSelf: 'flex-start', fontWeight: 600 }}>
        <Compass size={18} />
        <span>Return to Discovery Catalog</span>
      </button>

      {/* Main Suite detail columns split */}
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        
        {/* Left Column - Details */}
        <div style={{ flex: '1.4', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ height: '400px', width: '100%', borderRadius: '20px', overflow: 'hidden' }}>
            <img src={room.image} alt={room.type} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <h2 className="serif-text" style={{ fontSize: '2.5rem' }}>{room.type} Suite {room.roomNumber}</h2>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-glass)', paddingBottom: '20px' }}>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Suite Capacity</span>
              <strong style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>Up to {room.capacity} Guests</strong>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Starting Rate</span>
              <strong style={{ color: 'var(--accent-gold)', fontSize: '1.1rem' }}>₹{room.pricePerNight} / Night</strong>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Security Policy</span>
              <strong style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>Flexible Cancel</strong>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3 className="serif-text" style={{ fontSize: '1.5rem' }}>Included Premium Amenities</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {room.amenities.map((a, i) => (
                <span key={i} style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', fontSize: '0.85rem' }}>
                  {typeof a === 'object' ? a.name : a}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Reservation Desk Widget */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <form 
            onSubmit={handleBooking}
            className="glass-card" 
            style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid rgba(212, 175, 55, 0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.6)', position: 'sticky', top: '120px' }}
          >
            <h3 className="serif-text" style={{ fontSize: '1.6rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '15px' }}>Reservation Desk</h3>

            <div className="form-group">
              <label className="form-label">Check-In Date</label>
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

            <div className="form-group">
              <label className="form-label">Check-Out Date</label>
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

            {/* Calculations Breakdown */}
            {checkIn && checkOut && (
              <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span>Rate: ₹{room.pricePerNight} x {stayNights} Nights</span>
                  <span>₹{totalCost}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span>Resort Fees & Taxes (12%)</span>
                  <span>₹{(totalCost * 0.12).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px', fontSize: '1rem' }}>
                  <span>Estimated Total</span>
                  <span style={{ color: 'var(--accent-gold)' }}>₹{(totalCost * 1.12).toFixed(2)}</span>
                </div>
              </div>
            )}

            {dateError && (
              <div style={{ color: 'var(--danger)', fontSize: '0.85rem', background: 'rgba(255,23,68,0.08)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,23,68,0.15)', display: 'flex', gap: '6px', alignItems: 'center' }}>
                <AlertTriangle size={14} />
                <span>{dateError}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', gap: '10px', padding: '16px' }} disabled={!!dateError}>
              <span>Confirm Stay Reservation</span>
              <ArrowRight size={18} />
            </button>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', textAlign: 'center', marginTop: '10px' }}>
              <ShieldCheck size={14} style={{ color: 'var(--success)' }} />
              <span>Timeless Luxury Guarantee enabled</span>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
};

export default RoomDetail;
