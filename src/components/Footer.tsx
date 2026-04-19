import React from 'react';
import logoTextWhite from '../assets/logo/logo-text-white.svg';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const nav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks: { href: string; label: string; icon: React.ReactNode }[] = [
    {
      href: '#',
      label: 'LinkedIn',
      icon: (
        <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden>
          <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      href: '#',
      label: 'X',
      icon: (
        <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden>
          <path fill="#FFFFFF" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      href: '#',
      label: 'Facebook',
      icon: (
        <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden>
          <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      href: '#',
      label: 'YouTube',
      icon: (
        <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden>
          <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
          <path fill="#FFFFFF" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  const companies = [
    { id: 'apexonit', name: 'Apexon IT' },
    { id: 'agro', name: 'Apexon Agro Business' },
    { id: 'medical', name: 'Apexon Medical Accessories' },
    { id: 'garage', name: 'Apexon Car Garage' },
    { id: 'visa', name: 'Apexon Visa Consult' },
    { id: 'cart', name: 'Apexon Cart' },
  ];

  return (
    <footer className="footer-bg" style={{ paddingTop: 80, paddingBottom: 0 }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 48, paddingBottom: 64 }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ marginBottom: 24 }}>
              <img src={logoTextWhite} alt="Apexon Logo" style={{ height: 42 }} />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 28 }}>
              Apexon Group is a diversified conglomerate driving excellence across technology, agriculture, healthcare, automotive, travel, and e-commerce sectors.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {socialLinks.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', textDecoration: 'none',
                    transition: 'background 0.3s, border-color 0.3s, transform 0.3s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.14)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.55)';
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.06)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Sister Companies */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24 }}>Sister Companies</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {companies.map(c => (
                <li key={c.id}>
                  <button onClick={() => nav(c.id)} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.3s', padding: 0
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#c9a84c'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c9a84c', flexShrink: 0 }} />
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24 }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Group' },
                { id: 'apexonit', label: 'IT Solutions' },
                { id: 'contact', label: 'Contact Us' },
              ].map(link => (
                <li key={link.id}>
                  <button onClick={() => nav(link.id)} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.3s', padding: 0
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#c9a84c'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c9a84c', flexShrink: 0 }} />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24 }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: '📍', text: 'House-115, Road-06, Mohakhali DOHS, Dhaka-1206' },
                { icon: '📞', text: '+88 01719-183756' },
                { icon: '✉️', text: 'info@apexongroup.net' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.9rem', marginTop: 2 }}>{item.icon}</span>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)', padding: '24px 0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12
        }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
            © 2025 Apexon Group. All rights reserved. Apexon Corporation.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <a key={item} href="#" style={{
                color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.3s'
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#c9a84c'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'}
              >{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
