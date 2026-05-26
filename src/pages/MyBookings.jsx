import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { settleInvoice, requestTransport, cancelBooking, fetchCustomerBookingsThunk } from '../store/bookingSlice';
import { Compass, Calendar, CreditCard, Car, RefreshCw, XCircle } from 'lucide-react';

const MyBookings = () => {
  const bookings = useSelector((state) => state.bookings.list);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCustomerBookingsThunk());
  }, [dispatch]);

  const [selectedPayId, setSelectedPayId] = useState(null);
  const [payMethod, setPayMethod] = useState('Card');

  const [selectedTransId, setSelectedTransId] = useState(null);
  const [vehicleType, setVehicleType] = useState('Shuttle Bus');
  const [transNotes, setTransNotes] = useState('');

  const handlePay = (id) => {
    dispatch(settleInvoice({ id, method: payMethod }));
    setSelectedPayId(null);
  };

  const handleRequestTransport = (id) => {
    dispatch(requestTransport({ id, vehicleType, notes: transNotes }));
    setSelectedTransId(null);
    setTransNotes('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }} className="animate-fade-in">
      
      {/* Title */}
      <div style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '20px' }}>
        <h2 className="serif-text" style={{ fontSize: '2.5rem' }}>
          Your <span className="serif-text" style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>Luxurious Stays</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '4px' }}>
          Review confirmed stays, settle pending bills, and request airport transport shuttles.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="glass-card" style={{ padding: '60px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <Compass size={40} style={{ color: 'var(--accent-gold)' }} />
          <h3 className="serif-text" style={{ fontSize: '1.5rem' }}>No Stay Bookings Found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '400px' }}>
            You haven't reserved any suites yet. Discover our premium rooms and book your timeless stay.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Overlays / Modals */}
          {selectedPayId && (
            <div className="glass-card" style={{ padding: '30px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <h3 className="serif-text" style={{ fontSize: '1.4rem', marginBottom: '15px' }}>Settle Suite Invoice</h3>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div className="form-group" style={{ flex: '1', minWidth: '200px' }}>
                  <label className="form-label">Payment Method</label>
                  <select className="form-input" value={payMethod} onChange={(e) => setPayMethod(e.target.value)}>
                    <option value="Card">Credit Card</option>
                    <option value="UPI">UPI / GPay</option>
                    <option value="Cash">Cash at Front Desk</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
                  <button onClick={() => handlePay(selectedPayId)} className="btn btn-primary">Process Settle</button>
                  <button onClick={() => setSelectedPayId(null)} className="btn btn-secondary">Close</button>
                </div>
              </div>
            </div>
          )}

          {selectedTransId && (
            <div className="glass-card" style={{ padding: '30px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <h3 className="serif-text" style={{ fontSize: '1.4rem', marginBottom: '15px' }}>Request Airport Shuttle / Pick-up</h3>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div className="form-group" style={{ flex: '1', minWidth: '150px' }}>
                  <label className="form-label">Shuttle Fleet</label>
                  <select className="form-input" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                    <option value="Shuttle Bus">Beverly Shuttle Bus (Free)</option>
                    <option value="Luxury Limo">Luxury Pick-up Limo ($75.00)</option>
                  </select>
                </div>
                <div className="form-group" style={{ flex: '2', minWidth: '240px' }}>
                  <label className="form-label">Flight Number & Arrival details</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. AA-104 arriving at 14:00"
                    value={transNotes}
                    onChange={(e) => setTransNotes(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
                  <button onClick={() => handleRequestTransport(selectedTransId)} className="btn btn-primary">Submit Request</button>
                  <button onClick={() => setSelectedTransId(null)} className="btn btn-secondary">Close</button>
                </div>
              </div>
            </div>
          )}

          {/* List Bookings */}
          {bookings.map((booking) => {
            const bookingId = booking._id || booking.id;
            return (
              <div 
                key={bookingId} 
                className="glass-card animate-fade-in" 
                style={{ padding: '30px', display: 'flex', gap: '30px', flexWrap: 'wrap' }}
              >
                {/* Suite meta */}
                <div style={{ flex: '1.2', minWidth: '240px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h3 className="serif-text" style={{ fontSize: '1.6rem', color: 'var(--accent-gold)' }}>
                    {booking.roomType} Suite {booking.roomNumber}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} />
                      <span>Staying: {booking.checkInDate} to {booking.checkOutDate}</span>
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <span className={`badge ${
                      booking.bookingStatus === 'Confirmed' ? 'badge-warning' :
                      booking.bookingStatus === 'CheckedIn' ? 'badge-success' : 'badge-danger'
                    }`}>
                      Stay Status: {booking.bookingStatus}
                    </span>
                  </div>
                </div>

                {/* Settle Invoices Details */}
                <div style={{ flex: '1', minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Invoice Billing</span>
                  <strong style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>${(booking.totalAmount + booking.tax).toFixed(2)}</strong>
                  <span className={`badge ${booking.paymentStatus === 'Paid' ? 'badge-success' : 'badge-warning'}`} style={{ width: 'fit-content' }}>
                    Payment: {booking.paymentStatus} {booking.paymentMethod !== 'Pending' && `(${booking.paymentMethod})`}
                  </span>
                </div>

                {/* Shuttle metadata */}
                <div style={{ flex: '1.2', minWidth: '240px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Valet / Transport Shuttles</span>
                  {booking.transportRequested ? (
                    <div style={{ padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-glass)', fontSize: '0.85rem' }}>
                      <div style={{ fontWeight: 600, color: 'var(--accent-gold)' }}>{booking.transportDetails.vehicleType}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Notes: {booking.transportDetails.notes}</div>
                      <span className="badge badge-success" style={{ marginTop: '6px', fontSize: '0.65rem' }}>{booking.transportDetails.status}</span>
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No pick-ups requested yet.</span>
                  )}
                </div>

                {/* Actions split */}
                <div style={{ width: '100%', borderTop: '1px solid var(--border-glass)', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  {booking.bookingStatus === 'Confirmed' && booking.paymentStatus === 'Unpaid' && (
                    <button onClick={() => setSelectedPayId(bookingId)} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                      <CreditCard size={14} />
                      <span>Pay Bill</span>
                    </button>
                  )}

                  {booking.bookingStatus === 'Confirmed' && !booking.transportRequested && (
                    <button onClick={() => setSelectedTransId(bookingId)} className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                      <Car size={14} />
                      <span>Request Shuttle</span>
                    </button>
                  )}

                  {booking.bookingStatus === 'Confirmed' && (
                    <button onClick={() => dispatch(cancelBooking(bookingId))} className="btn btn-danger" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                      <XCircle size={14} />
                      <span>Cancel Stay</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default MyBookings;
