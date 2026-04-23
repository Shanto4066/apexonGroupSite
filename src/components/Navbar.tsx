import React, { useState, useEffect } from 'react';
import mainLogo from '../assets/logo/1-mainlogo.svg';
import itLogo from '../assets/logo/2-itlogo.svg';
import agroLogo from '../assets/logo/3-agrologo.svg';
import medLogo from '../assets/logo/4-medlogo.svg';
import visaLogo from '../assets/logo/5-visalogo.svg';
import cartLogo from '../assets/logo/6-cartlogo.svg';
import homeLogo from '../assets/logo/homelogo.svg';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const companies = [
  { id: 'apexonit', name: 'Apexon IT', tag: 'Technology' },
  { id: 'agro', name: 'Apexon Agro', tag: 'Agriculture' },
  { id: 'medical', name: 'Apexon Medical', tag: 'Healthcare' },
  { id: 'garage', name: 'Apexon Automotive', tag: 'Automotive' },
  { id: 'visa', name: 'Apexon Visa', tag: 'Travel & Visa' },
  { id: 'cart', name: 'Apexon Cart', tag: 'E-Commerce' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nav = (page: string) => {
    onNavigate(page);
    setMenuOpen(false);
    setDropOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageLogoMap: Record<string, string> = {
    home: homeLogo,
    about: mainLogo,
    contact: mainLogo,
    apexonit: itLogo,
    agro: agroLogo,
    medical: medLogo,
    visa: visaLogo,
    cart: cartLogo,
  };

  const activeLogo = pageLogoMap[currentPage] || mainLogo;

  const ctaStyleMap: Record<string, React.CSSProperties> = {
    home: {
      background: 'linear-gradient(135deg, #111827 0%, #3f1d2e 42%, #be185d 100%)',
      color: '#ffffff',
      boxShadow: '0 10px 24px rgba(190, 24, 93, 0.32)',
    },
    apexonit: {
      background: 'linear-gradient(135deg, #0f1f4b 0%, #1d4ed8 55%, #22d3ee 100%)',
      color: '#ffffff',
      boxShadow: '0 10px 24px rgba(29, 78, 216, 0.32)',
    },
    agro: {
      background: 'linear-gradient(135deg, #14532d 0%, #166534 55%, #22c55e 100%)',
      color: '#ffffff',
      boxShadow: '0 10px 24px rgba(22, 101, 52, 0.32)',
    },
    medical: {
      background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 55%, #2dd4bf 100%)',
      color: '#ffffff',
      boxShadow: '0 10px 24px rgba(13, 148, 136, 0.3)',
    },
    garage: {
      background: 'linear-gradient(135deg, #ea580c, #f97316, #fb923c)',
      color: '#ffffff',
      boxShadow: '0 10px 24px rgba(234, 88, 12, 0.32)',
    },
    visa: {
      background: 'linear-gradient(135deg, #7c3aed, #a78bfa, #c084fc)',
      color: '#ffffff',
      boxShadow: '0 10px 24px rgba(124, 58, 237, 0.32)',
    },
    cart: {
      background: 'linear-gradient(135deg, #ed1c24, #b91c1c)',
      color: '#ffffff',
      boxShadow: '0 10px 24px rgba(237, 28, 36, 0.32)',
    },
  };

  const ctaThemeStyle = ctaStyleMap[currentPage];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(15,31,75,0.08)',
        boxShadow: scrolled ? '0 4px 30px rgba(15,31,75,0.1)' : '0 2px 15px rgba(15,31,75,0.03)',
      }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 76 }}>
          {/* Logo */}
          <button onClick={() => nav('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <img src={activeLogo} alt="Apexon Logo" style={{ height: 42 }} />
          </button>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="desktop-nav">
            <button className="nav-link" onClick={() => nav('home')} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px',
              borderRadius: 8, fontWeight: currentPage === 'home' ? 700 : 500,
              color: currentPage === 'home' ? '#0f1f4b' : '#3a4a6b',
              fontSize: '0.875rem', letterSpacing: '0.02em', transition: 'all 0.3s'
            }}>Home</button>

            {/* Companies Dropdown */}
            <div style={{ position: 'relative' }} onMouseEnter={() => setDropOpen(true)} onMouseLeave={() => setDropOpen(false)}>
              <button style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px',
                borderRadius: 8, fontWeight: 500, color: '#3a4a6b', fontSize: '0.875rem',
                letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.3s'
              }}>
                Our Companies
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 5l4 4 4-4" stroke="#6b7fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className={`dropdown-menu ${dropOpen ? 'open' : ''}`}>
                {companies.map(c => (
                  <button key={c.id} onClick={() => nav(c.id)} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', padding: '10px 16px', borderRadius: 10, background: 'none',
                    border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                    textAlign: 'left', gap: 12, whiteSpace: 'nowrap',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f0f3fa')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                  >
                    <span style={{ fontWeight: 600, color: '#0f1f4b', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>{c.name}</span>
                    <span style={{ fontSize: '0.7rem', background: '#f0f3fa', color: '#6b7fa8', padding: '3px 8px', borderRadius: 100, fontWeight: 500, flexShrink: 0, whiteSpace: 'nowrap' }}>{c.tag}</span>
                  </button>
                ))}
              </div>
            </div>

            <button className="nav-link" onClick={() => nav('about')} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px',
              borderRadius: 8, fontWeight: currentPage === 'about' ? 700 : 500,
              color: currentPage === 'about' ? '#0f1f4b' : '#3a4a6b',
              fontSize: '0.875rem', letterSpacing: '0.02em', transition: 'all 0.3s'
            }}>About</button>

            <button className="nav-link" onClick={() => nav('contact')} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px',
              borderRadius: 8, fontWeight: currentPage === 'contact' ? 700 : 500,
              color: currentPage === 'contact' ? '#0f1f4b' : '#3a4a6b',
              fontSize: '0.875rem', letterSpacing: '0.02em', transition: 'all 0.3s'
            }}>Contact</button>

            <button onClick={() => nav('contact')} style={{
              padding: '10px 24px', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontSize: '0.875rem', marginLeft: 8,
              fontWeight: 700,
              letterSpacing: '0.01em',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease',
              ...(ctaThemeStyle || {
                background: 'linear-gradient(135deg, #0f1f4b 0%, #1e3a8a 100%)',
                color: '#ffffff',
              }),
            }}>
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none', background: 'none', border: '1px solid #e8edf7',
              borderRadius: 8, padding: '8px 10px', cursor: 'pointer'
            }}
            className="mobile-toggle"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ display: 'block', width: 20, height: 2, background: '#0f1f4b', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
              <span style={{ display: 'block', width: 20, height: 2, background: '#0f1f4b', borderRadius: 2, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: 20, height: 2, background: '#0f1f4b', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'white', borderTop: '1px solid #e8edf7', padding: '16px 32px 24px',
          display: 'flex', flexDirection: 'column', gap: 4
        }}>
          {[{ id: 'home', label: 'Home' }, { id: 'about', label: 'About' }, { id: 'contact', label: 'Contact' }].map(item => (
            <button key={item.id} onClick={() => nav(item.id)} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '12px 0',
              textAlign: 'left', fontWeight: 600, color: '#0f1f4b', fontSize: '1rem', borderBottom: '1px solid #f0f3fa'
            }}>{item.label}</button>
          ))}
          <div style={{ paddingTop: 8, fontWeight: 700, color: '#6b7fa8', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Our Companies</div>
          {companies.map(c => (
            <button key={c.id} onClick={() => nav(c.id)} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '10px 0',
              textAlign: 'left', fontWeight: 600, color: '#0f1f4b', fontSize: '0.9rem', borderBottom: '1px solid #f0f3fa',
              whiteSpace: 'nowrap',
            }}>{c.name}</button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
};
