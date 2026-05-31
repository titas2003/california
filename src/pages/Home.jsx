import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { 
  Sparkles, 
  Flame, 
  Wind, 
  Snowflake, 
  Trees, 
  ChevronRight,
  ShieldCheck,
  Coffee,
  UtensilsCrossed,
  Compass,
  ArrowDown,
  Mail,
  Phone,
  MapPin,
  Map,
  ExternalLink,
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from 'lucide-react';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Dynamic section calculations based on screen height positions (7 sections total now)
      const height = window.innerHeight;
      const section = Math.round(window.scrollY / height);
      setActiveSection(Math.min(Math.max(section, 0), 6));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mountainActivities = [
    { title: 'Peak Helicopter Charter', desc: 'Arrive in style. Direct luxury flight passes from Los Angeles directly to our panoramic mountain peak pads.', icon: Wind },
    { title: 'Geothermal Basalt Springs', desc: 'Soak in active volcanic thermal mineral waters heated naturally to 40°C amid freezing snowfall.', icon: Flame },
    { title: 'Glacial Cryotherapy & Spa', desc: 'Indulge in deep herbal saunas, sub-zero chambers, and local pine steam logs.', icon: Snowflake },
    { title: 'Summit Heli-Skiing', desc: 'Untouched powder awaits. Take guided runs off virgin backcountry ridges with our expert mountain patrol.', icon: Trees }
  ];

  // Mountain background images (extended to match 7 sections)
  const backdrops = [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80', // Sunrise Glow Peak
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&auto=format&fit=crop&q=80', // Luxury lobby (Search context)
    'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1920&q=80', // Snowy Spruce Pine Forest
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80', // Misty Volcanic Hot Spring Valley
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80', // Cozy Wood Dining Fireside
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80', // Epic Night Star Peak Chalet
    'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&auto=format&fit=crop&q=80'  // Epic aerial view (Map backdrop context)
  ];

  return (
    <>
      <style>{`
        /* Fullscreen Fixed Parallax Canvas behind scrolling panels */
        .parallax-canvas {
          position: fixed;
          top: 85px; /* Below Navbar */
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          overflow: hidden;
          background: #fafaf9;
        }

        .parallax-bg-slide {
          position: absolute;
          top: -5%;
          left: 0;
          width: 100%;
          height: 120%; 
          background-size: cover;
          background-position: center;
          transition: opacity 1.8s cubic-bezier(0.22, 1, 0.36, 1), transform 1.8s cubic-bezier(0.22, 1, 0.36, 1);
          opacity: 0;
          will-change: opacity, transform;
        }

        .parallax-bg-slide.active {
          opacity: 1;
        }

        .parallax-scenery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(250,250,249,0.1) 0%, rgba(250,250,249,0.65) 100%);
          z-index: 2;
          pointer-events: none;
        }

        /* Scrolling Section Panels */
        .story-section {
          position: relative;
          min-height: 100vh;
          width: 100%;
          z-index: 10;
          display: flex;
          align-items: center;
          padding: 80px 10%;
          pointer-events: none; /* Let clicks pass to items */
        }

        .story-container {
          max-width: 780px; 
          width: 100%;
          pointer-events: auto; /* Enable hover/clicks on card content */
          transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.2s ease;
        }

        /* Minimal Floating Glass Pane */
        .luxury-story-pane {
          background: rgba(255, 255, 255, 0.88);
          border: 1px solid rgba(22, 78, 53, 0.12);
          border-radius: 28px;
          padding: 60px 70px; 
          backdrop-filter: blur(20px);
          box-shadow: 0 30px 70px rgba(22, 78, 53, 0.05);
          display: flex;
          flex-direction: column;
          gap: 24px;
          transition: all 0.5s ease;
        }

        .luxury-story-pane:hover {
          border-color: rgba(22, 78, 53, 0.22);
          box-shadow: 0 35px 80px rgba(22, 78, 53, 0.08);
          transform: translateY(-4px);
        }

        @media (max-width: 991px) {
          .story-section.extreme-edge-section {
            padding-left: 20px !important;
            padding-right: 20px !important;
            justify-content: center !important;
          }
          .story-container.extreme-edge-container {
            width: 100% !important;
            max-width: 100% !important;
          }
        }

        /* Scroll indicator */
        .down-indicator {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 600;
          animation: floatIndicator 2s ease-in-out infinite;
          opacity: 0.8;
          pointer-events: none;
        }

        @keyframes floatIndicator {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -6px); }
        }

        /* Global Footer in normal document flow */
        .global-luxury-footer {
          position: relative;
          z-index: 10;
          background: #fafaf9;
          border-top: 1px solid rgba(22, 78, 53, 0.15);
          padding: 80px 10% 40px 10%;
          box-shadow: 0 -20px 50px rgba(22, 78, 53, 0.04);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-bottom-bar {
          margin-top: 60px;
          padding-top: 30px;
          border-top: 1px solid rgba(22, 78, 53, 0.1);
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          font-size: 0.8rem;
          color: var(--text-muted);
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>

      {/* Floating Scroll Indicator (Fades out past first section) */}
      {scrollY < 300 && (
        <div className="down-indicator">
          <span>Scroll to Ascent</span>
          <ArrowDown size={14} style={{ color: 'var(--accent-gold)' }} />
        </div>
      )}

      {/* Fullscreen Parallax Background Canvas */}
      <div className="parallax-canvas">
        {backdrops.map((img, idx) => {
          // Slow parallax scrolling offset translation
          const yOffset = (scrollY - (idx * window.innerHeight)) * 0.08;
          return (
            <div 
              key={idx}
              className={`parallax-bg-slide ${activeSection === idx ? 'active' : ''}`}
              style={{ 
                backgroundImage: `url(${img})`,
                transform: activeSection === idx ? `translateY(${yOffset}px) scale(1.05)` : 'none'
              }}
            />
          );
        })}
        <div className="parallax-scenery-overlay" />
      </div>

      {/* Section 1: The Centered Landing Text (NO Background Card) */}
      <section className="story-section" style={{ justifyContent: 'center', textAlign: 'center' }}>
        <div 
          className="story-container"
          style={{
            maxWidth: '100%',
            opacity: activeSection === 0 ? 1 : 0,
            transform: activeSection === 0 ? 'translateY(0)' : 'translateY(-30px)',
            transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)', marginBottom: '20px' }}>
            <Sparkles size={18} />
            <span style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '4px', fontWeight: 700 }}>tima's delecacy presents</span>
          </div>
          <h2 className="serif-text" style={{ fontSize: '4.8rem', color: 'var(--text-main)', lineHeight: 1.15, fontWeight: 400, textShadow: '0 2px 10px rgba(255,255,255,0.8)' }}>
            Welcome to <br />
            <span className="serif-text" style={{ fontStyle: 'italic', color: 'var(--accent-gold)', fontWeight: 600 }}>Hotel California</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '20px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
            Scroll down to explore the peak sanctuary
          </p>
        </div>
      </section>

      {/* Section 2: Advanced Search Portal (Slides in when scrolling) */}
      <section className="story-section" style={{ justifyContent: 'center' }}>
        <div 
          className="story-container"
          style={{
            maxWidth: '960px',
            opacity: activeSection === 1 ? 1 : 0,
            transform: activeSection === 1 ? 'translateY(0)' : 'translateY(50px)',
            transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <HeroSection />
        </div>
      </section>

      {/* Section 2: Mountain Ridge Canopy (Extreme Right Edge, Wider past Middle) */}
      <section className="story-section extreme-edge-section" style={{ justifyContent: 'flex-end', paddingLeft: 0, paddingRight: 0 }}>
        <div 
          className="story-container extreme-edge-container"
          style={{
            width: '65%',
            maxWidth: '65%',
            opacity: activeSection === 2 ? 1 : 0,
            transform: activeSection === 2 ? 'translateY(0)' : 'translateY(50px)',
            transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div className="luxury-story-pane" style={{ borderRadius: '0px', paddingRight: '8%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)' }}>
              <Trees size={16} />
              <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '2px', fontWeight: 700 }}>Elevation 1,800m</span>
            </div>
            <h3 className="serif-text" style={{ fontSize: '2.4rem', color: 'var(--text-main)' }}>Among The Whispering Pines</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.7' }}>
              Your ascent continues. Traverse rocky ridge peaks and snow-dusted timber passes to arrive at a sanctuary carved directly into the mountain face. Breathe the pure, pine-infused high mountain air.
            </p>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 600 }}>
              <ShieldCheck size={16} style={{ color: 'var(--success)' }} />
              <span>Complimentary peak snow-cat and heli charters included for all guests.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Geothermal Pools (Extreme Left Edge, Wider past Middle) */}
      <section className="story-section extreme-edge-section" style={{ justifyContent: 'flex-start', paddingLeft: 0, paddingRight: 0 }}>
        <div 
          className="story-container extreme-edge-container"
          style={{
            width: '65%',
            maxWidth: '65%',
            opacity: activeSection === 3 ? 1 : 0,
            transform: activeSection === 3 ? 'translateY(0)' : 'translateY(50px)',
            transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div className="luxury-story-pane" style={{ borderRadius: '0px', paddingLeft: '8%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)' }}>
              <Flame size={16} />
              <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '2px', fontWeight: 700 }}>Thermal Basalt Pools</span>
            </div>
            <h3 className="serif-text" style={{ fontSize: '2.4rem', color: 'var(--text-main)' }}>Volcanic Basalt Springs</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.7' }}>
              Submerge into natural basalt rock pools, dynamically heated to 40°C by thermal volcanic vents deep within the alpine crust. Watch the evening snow cap the peaks while you soak in mineral-rich healing pools.
            </p>
            <div>
              <Link to="/rooms" className="btn btn-secondary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>
                Explore Wellness Spa
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Michelin Gastronomy (Extreme Right Edge, Wider past Middle) */}
      <section className="story-section extreme-edge-section" style={{ justifyContent: 'flex-end', paddingLeft: 0, paddingRight: 0 }}>
        <div 
          className="story-container extreme-edge-container"
          style={{
            width: '65%',
            maxWidth: '65%',
            opacity: activeSection === 4 ? 1 : 0,
            transform: activeSection === 4 ? 'translateY(0)' : 'translateY(50px)',
            transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div className="luxury-story-pane" style={{ borderRadius: '0px', paddingRight: '8%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)' }}>
              <Coffee size={16} />
              <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '2px', fontWeight: 700 }}>Summit Gastronomy</span>
            </div>
            <h3 className="serif-text" style={{ fontSize: '2.4rem', color: 'var(--text-main)' }}>Mountain-to-Table Art</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.7' }}>
              Dine inside "The Altitude", our three Michelin Star open-glass summit restaurant. Enjoy wood-fired white truffles and mountain cloudberry tarts paired with vintage select collections stored in barometric-pressure wine vaults.
            </p>
            <div style={{ display: 'flex', gap: '8px', color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 600 }}>
              <UtensilsCrossed size={16} />
              <span>Cozy fireplace snug corners and complimentary libraries open daily.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: The Night Star Chalet (Extreme Left Edge, Wider past Middle) */}
      <section className="story-section extreme-edge-section" style={{ justifyContent: 'flex-start', paddingBottom: '120px', paddingLeft: 0, paddingRight: 0 }}>
        <div 
          className="story-container extreme-edge-container"
          style={{
            width: '65%',
            maxWidth: '65%',
            opacity: activeSection === 5 ? 1 : 0,
            transform: activeSection === 5 ? 'translateY(0)' : 'translateY(50px)',
            transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div className="luxury-story-pane" style={{ borderRadius: '0px', paddingLeft: '8%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)' }}>
              <Snowflake size={16} />
              <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '2px', fontWeight: 700 }}>Elevation 2,800m</span>
            </div>
            <h3 className="serif-text" style={{ fontSize: '2.4rem', color: 'var(--text-main)' }}>A Chalet Under The Stars</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.7' }}>
              Your mountain home awaits. Gaze across starlit skies and snow-covered peaks from massive local stone hearth snugs. A timeless retreat you can check out from any time, but will never want to leave.
            </p>
            <div style={{ borderTop: '1px solid rgba(22, 78, 53, 0.12)', paddingTop: '20px', display: 'flex', justifyContent: 'center' }}>
              <Link to="/rooms" className="btn btn-primary" style={{ padding: '14px 32px', width: '100%', gap: '10px' }}>
                <span>Reserve Your Timeless Stay</span>
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Interactive Map & Coordinates (Center Aligned - 100% Width, Square Corners, Edge-to-Edge) */}
      <section className="story-section" style={{ justifyContent: 'center', paddingBottom: '160px', paddingLeft: '0px', paddingRight: '0px', width: '100%', maxWidth: '100%' }}>
        <div 
          className="story-container"
          style={{
            maxWidth: '100%',
            width: '100%',
            opacity: activeSection === 6 ? 1 : 0,
            transform: activeSection === 6 ? 'translateY(0)' : 'translateY(50px)',
            transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div className="luxury-story-pane" style={{ padding: '60px 10%', borderRadius: '0px', width: '100%', maxWidth: '100%', borderLeft: 'none', borderRight: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)' }}>
              <Map size={16} />
              <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '2px', fontWeight: 700 }}>Registry Coordinates</span>
            </div>
            <h3 className="serif-text" style={{ fontSize: '2.4rem', color: 'var(--text-main)' }}>Find Our Sanctuary</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.6' }}>
              Nestled securely in the serene mountain foothills of <strong>Champahati, Anandapalli, West Bengal, India (PIN-743330)</strong>. Experience high-altitude tranquility within direct travel coordinates of our private heliports and luxury shuttle lanes.
            </p>
            
            {/* Elegant Map Embed */}
            <div style={{ width: '100%', borderRadius: '0px', overflow: 'hidden', border: '1px solid rgba(22, 78, 53, 0.15)', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}>
              <iframe 
                title="Hotel California Location Map"
                src="https://maps.google.com/maps?q=Champahati,%20Anandapalli&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="380" 
                style={{ border: 0, display: 'block' }}
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grand Parallax Footer (Scrolling Naturally at the Bottom of the Flow) */}
      <footer className="global-luxury-footer">
        <div className="footer-grid">
          
          {/* Col 1: Brand details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)' }}>
              <Sparkles size={18} />
              <span className="serif-text" style={{ fontWeight: 800, fontSize: '1.15rem' }}>Hotel California</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.6' }}>
              "You can check-out any time you like, but you can never leave." Experience timeless luxury in our high-altitude wilderness sanctuary.
            </p>
            {/* Social Media Links bar */}
            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-gold)' }} aria-label="Facebook"><Facebook size={18} /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-gold)' }} aria-label="Instagram"><Instagram size={18} /></a>
              <a href="https://x.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-gold)' }} aria-label="X-Handle"><Twitter size={18} /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-gold)' }} aria-label="YouTube"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, color: 'var(--accent-gold)' }}>Explore</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <Link to="/rooms" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Discover Suites</Link>
              <Link to="/bookings" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Your Stays</Link>
              <Link to="/profile" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Guest Profile</Link>
            </div>
          </div>

          {/* Col 3: Coordinates details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, color: 'var(--accent-gold)' }}>Registry Location</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} style={{ color: 'var(--accent-gold)' }} />
                <span>Champahati, Anandapalli, pin-743330</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} style={{ color: 'var(--accent-gold)' }} />
                <span>+91-9874052056</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} style={{ color: 'var(--accent-gold)' }} />
                <span>titas20031996@gmail.com</span>
              </span>
            </div>
          </div>

          {/* Col 4: Systems */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, color: 'var(--accent-gold)' }}>Administration</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.5' }}>
              Access the secure back-of-house logistics control center for inventory and staff rosters.
            </p>
            <div>
              <a 
                href="http://localhost:5173" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-secondary" 
                style={{ 
                  padding: '8px 16px', 
                  fontSize: '0.78rem', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  width: '100%',
                  justifyContent: 'center'
                }}
              >
                <span>Admin Console</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar with Copyright Text for Titas Majumder */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} Hotel California. All rights reserved. Created & Curated by <strong>Titas Majumder</strong>.
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
