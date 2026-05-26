import React from 'react';
import HeroSection from '../components/HeroSection';
import { Sparkles, GlassWater, Trophy, HeartHandshake } from 'lucide-react';

const Home = () => {
  const highlights = [
    { title: 'The Infinity Escape', desc: 'Sip champagne by our signature heated pool looking over the palm lines of Beverly Hills.', icon: GlassWater },
    { title: 'Personalized Conceirge', desc: 'Anything you require, at any hour. From airport shuttle services to private suite dining.', icon: HeartHandshake },
    { title: 'Awarded Spa Suites', desc: 'Organic treatment chambers equipped with hot basalt therapies and deep vapor pools.', icon: Sparkles }
  ];

  return (
    <>
      <HeroSection />

      {/* Brand Attributes */}
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <h3 className="serif-text" style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '10px' }}>
          <span className="serif-text" style={{ fontStyle: 'italic', fontWeight: 400 }}>Uncompromising</span> Luxury
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto', marginBottom: '50px' }}>
          We provide a seamless stay experience backed by state-of-the-art facilities and dedicated staff members.
        </p>

        <div className="grid-3">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="glass-card glass-card-hover animate-fade-in" 
                style={{ 
                  padding: '40px 30px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '15px',
                  textAlign: 'center'
                }}
              >
                <div 
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(212, 175, 55, 0.08)',
                    border: '1px solid rgba(212, 175, 55, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-gold)'
                  }}
                >
                  <Icon size={28} />
                </div>
                <h4 className="serif-text" style={{ fontSize: '1.25rem', fontWeight: 700 }}>{item.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
