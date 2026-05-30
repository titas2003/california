import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { Users, Sparkles, ChevronRight } from 'lucide-react';
import { fetchRoomsThunk } from '../store/roomSlice';

const RoomCard = ({ room, checkIn, checkOut, guests, roomsCount }) => {
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const roomId = room._id || room.id;
  const images = room.images && room.images.length > 0 ? room.images : [room.image || 'https://images.unsplash.com/photo-1611891487122-2075b9624428?w=800'];

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div 
      className="glass-card glass-card-hover animate-fade-in" 
      style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
    >
      {/* Room Image Container with navigation arrows */}
      <div style={{ height: '220px', width: '100%', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={images[activeImageIndex]} 
          alt={room.type} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s ease' }} 
        />
        
        {/* Navigation Arrows for multi-image */}
        {images.length > 1 && (
          <>
            <button 
              onClick={handlePrevImage}
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(8, 8, 12, 0.7)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5,
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
            >
              &#8592;
            </button>
            <button 
              onClick={handleNextImage}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(8, 8, 12, 0.7)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5,
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
            >
              &#8594;
            </button>
            
            {/* Dot indicators */}
            <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 5 }}>
              {images.map((_, idx) => (
                <div 
                  key={idx}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: activeImageIndex === idx ? 'var(--accent-gold)' : 'rgba(255,255,255,0.4)',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </>
        )}

        <div 
          style={{ 
            position: 'absolute', 
            top: '15px', 
            right: '15px', 
            background: 'rgba(8, 8, 12, 0.85)', 
            backdropFilter: 'blur(8px)', 
            border: '1px solid var(--border-glass)',
            padding: '6px 12px', 
            borderRadius: '30px', 
            fontSize: '0.8rem', 
            fontWeight: 600,
            color: 'var(--accent-gold)',
            zIndex: 4 
          }}
        >
          ₹{room.pricePerNight} / Night
        </div>
      </div>

      {/* Room Description Content */}
      <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '15px', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="serif-text" style={{ fontSize: '1.4rem', fontWeight: 700 }}>{room.type} Suite {room.roomNumber}</h3>
          <span className="badge badge-success" style={{ textTransform: 'uppercase', fontSize: '0.65rem' }}>{room.status}</span>
        </div>

        <div style={{ display: 'flex', gap: '15px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Users size={14} />
            <span>Max {room.capacity} Guests</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={14} style={{ color: 'var(--accent-gold)' }} />
            <span>Premium Amenities</span>
          </span>
        </div>

        {/* Specific features list */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
          {room.amenities.map((a, i) => (
            <span key={i} style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.03)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)' }}>
              {typeof a === 'object' ? a.name : a}
            </span>
          ))}
        </div>

        {/* CTA button */}
        <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'flex-end' }}>
          <Link 
            to={`/rooms/${roomId}?in=${checkIn}&out=${checkOut}&guests=${guests}&rooms=${roomsCount}`} 
            className="btn btn-primary" 
            style={{ padding: '10px 20px', fontSize: '0.85rem', width: '100%' }}
          >
            <span>Select Suite</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Rooms = () => {
  const rooms = useSelector((state) => state.rooms.list);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchRoomsThunk());
  }, [dispatch]);

  // Read queries passed from search widget
  const checkIn = searchParams.get('in') || '';
  const checkOut = searchParams.get('out') || '';
  const guests = searchParams.get('guests') || '';
  const selectedType = searchParams.get('type') || 'Any';
  const roomsCount = searchParams.get('rooms') || '1';

  // Apply search constraints and filters
  const filteredRooms = rooms.filter((room) => {
    // 1. Room type filter
    if (selectedType !== 'Any' && room.type !== selectedType) {
      return false;
    }

    // 2. Capacity limit check: no room can be booked with more than 2 guests.
    const guestsNum = parseInt(guests, 10) || 0;
    const roomsNum = parseInt(roomsCount, 10) || 1;
    const avgGuestsPerRoom = Math.ceil(guestsNum / roomsNum);

    if (room.capacity < avgGuestsPerRoom || avgGuestsPerRoom > 2) {
      return false;
    }

    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Title */}
      <div style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '20px' }}>
        <h2 className="serif-text" style={{ fontSize: '2.5rem' }}>
          Discover <span className="serif-text" style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>Our Suites</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '4px' }}>
          {checkIn && checkOut ? (
            <span>Showing available rooms for stay from <strong>{checkIn}</strong> to <strong>{checkOut}</strong> ({roomsCount} Room{parseInt(roomsCount, 10) > 1 ? 's' : ''}, {guests} Guest{parseInt(guests, 10) > 1 ? 's' : ''})</span>
          ) : (
            'Select from our curated collections of premium and deluxe boutique accommodations.'
          )}
        </p>
      </div>

      {/* Catalog Grid */}
      <div className="grid-3">
        {filteredRooms.map((room) => {
          const roomId = room._id || room.id;
          return (
            <RoomCard 
              key={roomId} 
              room={room} 
              checkIn={checkIn} 
              checkOut={checkOut} 
              guests={guests} 
              roomsCount={roomsCount} 
            />
          );
        })}
      </div>
    </div>
  );
};

export default Rooms;
