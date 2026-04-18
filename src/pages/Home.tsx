import { useEffect, useRef, useState } from 'react';
import apexonIcon from '../assets/logo/Apexon-blue-only-Icon.svg';
import imgAuthority from '../assets/images/why-choose/industry_authority.png';
import imgInnovation from '../assets/images/why-choose/innovation_mindset.png';
import imgEcosystem from '../assets/images/why-choose/integrated_ecosystem.png';
import imgClient from '../assets/images/why-choose/client_centric.png';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const CountUp = ({ value }: { value: string }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  const numStr = value.replace(/[^0-9]/g, '');
  const suffix = value.replace(/[0-9]/g, '');

  return (
    <div ref={nodeRef} className="rolling-counter">
      {numStr.split('').map((digit, i) => (
        <div key={i} className="rolling-digit" style={{ 
          transform: hasStarted ? `translateY(-${parseInt(digit, 10) * 1.2}em)` : 'translateY(0)',
          transitionDelay: `${i * 0.1}s` 
        }}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => <span key={n}>{n}</span>)}
        </div>
      ))}
      <span style={{ marginLeft: '4px', verticalAlign: 'baseline' }}>{suffix}</span>
    </div>
  );
};

const companies = [
  {
    id: 'apexonit',
    name: 'ApexonIT',
    category: 'Information Technology',
    desc: 'Enterprise software, CCTV solutions, digital marketing, UI/UX design & IT-enabled services powering businesses forward.',
    icon: '⬡',
    accent: '#0f1f4b',
    accentLight: '#e8edf7',
    services: ['Custom Software', 'CCTV Solutions', 'Digital Marketing', 'UI/UX Design'],
  },
  {
    id: 'agro',
    name: 'Apexon Agro Business',
    category: 'Agriculture & Trading',
    desc: 'Revolutionizing agricultural supply chains with smart procurement, distribution, and agro-commodity trading at scale.',
    icon: '◈',
    accent: '#1a6b3a',
    accentLight: '#e8f5ee',
    services: ['Agro Trading', 'Supply Chain', 'Commodity Export', 'Farm Solutions'],
  },
  {
    id: 'medical',
    name: 'Apexon Medical',
    category: 'Healthcare Accessories',
    desc: 'Premium-grade medical accessories and healthcare supplies meeting international standards of quality and reliability.',
    icon: '◉',
    accent: '#1a4f8c',
    accentLight: '#e8f0fa',
    services: ['Medical Devices', 'Lab Equipment', 'Healthcare Supply', 'Safety Products'],
  },
  {
    id: 'garage',
    name: 'Apexon Car Garage',
    category: 'Automotive Excellence',
    desc: 'World-class automotive services, genuine Japan parts sourcing, and complete new garage business consultancy.',
    icon: '◆',
    accent: '#7c1a1a',
    accentLight: '#fae8e8',
    services: ['Car Service', 'Japan Parts', 'Garage Consultancy', 'Fleet Management'],
  },
  {
    id: 'visa',
    name: 'Apexon Visa Consult',
    category: 'Travel & Immigration',
    desc: 'Expert visa consultation and premium ticketing services making global travel seamless and stress-free.',
    icon: '◇',
    accent: '#5a1a7c',
    accentLight: '#f5e8fa',
    services: ['Visa Processing', 'Air Ticketing', 'Travel Packages', 'Immigration Advisory'],
  },
  {
    id: 'cart',
    name: 'Apexon Cart',
    category: 'E-Commerce',
    desc: 'A dynamic e-commerce ecosystem delivering an unmatched digital shopping experience across diverse product categories.',
    icon: '◎',
    accent: '#7c5a1a',
    accentLight: '#faf0e8',
    services: ['Online Retail', 'B2B Marketplace', 'Dropshipping', 'Vendor Management'],
  },
];

const stats = [
  { value: '6+', label: 'Business Verticals', sub: 'Diverse Industries' },
  { value: '12+', label: 'Years Excellence', sub: 'Industry Expertise' },
  { value: '50+', label: 'Expert Team', sub: 'Professionals' },
];

const SplitText = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <span style={{ display: 'inline-block' }}>
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ display: 'inline-block', marginRight: '0.25em', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, j) => (
            <span key={j} className="split-text">
              <span className={className} style={{ animationDelay: `${(i * 5 + j) * 0.03}s` }}>{char}</span>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    revealRefs.current.forEach(ref => ref && observer.observe(ref));
    return () => {
      observer.disconnect();
    };
  }, []);

  const addRef = (el: HTMLDivElement | null, i: number) => {
    revealRefs.current[i] = el;
  };

  const nav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-enter" style={{ background: '#f8f9fc' }}>

      {/* ── HERO ──────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: '#ffffff',
        position: 'relative', overflow: 'hidden', paddingTop: 76
      }}>
        {/* Decorative blobs - subtle for white theme */}
        <div className="deco-blob animate-blob" style={{
          width: 600, height: 600, top: -200, right: -100,
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)'
        }} />
        <div className="deco-blob" style={{
          width: 400, height: 400, bottom: -100, left: -100,
          background: 'radial-gradient(circle, rgba(15,31,75,0.04) 0%, transparent 70%)'
        }} />

        {/* Grid pattern overlay - dark for white theme */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.05,
          backgroundImage: `linear-gradient(#0f1f4b 1px, transparent 1px), linear-gradient(90deg, #0f1f4b 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        {/* Floating accent dots - darkened */}
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${6 + (i % 4) * 4}px`,
            height: `${6 + (i % 4) * 4}px`,
            borderRadius: '50%',
            background: i % 2 === 0 ? 'rgba(201,168,76,0.3)' : 'rgba(15,31,75,0.1)',
            top: `${10 + i * 10}%`,
            left: `${5 + i * 12}%`,
            animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`
          }} />
        ))}

        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '80px 32px', width: '100%', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: 60, alignItems: 'stretch' }}>
            {/* Left Column: Text Content */}
            <div>
              {/* Badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: 100, padding: '8px 18px', marginBottom: 32, animation: 'fadeInUp 0.6s ease forwards'
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#c9a84c', display: 'block', animation: 'pulse-ring 2s ease-out infinite' }} />
                <span style={{ color: '#0f1f4b', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Apexon Corporation — Multi-Industry Group
                </span>
              </div>

              {/* Headline */}
              <h1 style={{
                fontSize: 'clamp(2.8rem, 5vw, 4.8rem)', fontWeight: 900, lineHeight: 1.1,
                color: '#0f1f4b', marginBottom: 24
              }}>
                 <SplitText text="Where Vision" />{' '}
                 <span style={{
                   display: 'block',
                   backgroundSize: '200% 100%',
                   animation: 'shimmer 4s linear infinite'
                 }}>
                   <SplitText text="Meets Excellence" className="gradient-text-gold" />
                 </span>
              </h1>

              <p style={{
                fontSize: '1.15rem', color: '#6b7fa8', lineHeight: 1.75,
                marginBottom: 48, maxWidth: 620,
                animation: 'fadeInUp 0.8s ease forwards 0.25s', opacity: 0
              }}>
                Apexon Group is a forward-thinking conglomerate spanning six powerful business verticals — technology, agriculture, healthcare, automotive, travel, and e-commerce — delivering world-class solutions across every sector we enter.
              </p>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', animation: 'fadeInUp 0.8s ease forwards 0.4s', opacity: 0 }}>
                <button onClick={() => nav('about')} className="btn-gold" style={{
                  padding: '14px 36px', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: '0.95rem'
                }}>
                  Explore Our Group
                </button>
                <button onClick={() => nav('contact')} style={{
                  padding: '14px 36px', borderRadius: 12,
                  background: 'transparent', border: '1px solid #dde3f0',
                  color: '#0f1f4b', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600,
                  transition: 'all 0.3s'
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = '#f8f9fc';
                    (e.currentTarget as HTMLElement).style.borderColor = '#0f1f4b';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.borderColor = '#dde3f0';
                  }}
                >
                  Contact Us
                </button>
              </div>
            </div>

            {/* Right Column: Animated Radar & Stats */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '20px 0',
              animation: 'fadeInRight 1s ease forwards 0.5s',
              opacity: 0
            }}>
              {/* Radar at the top */}
              <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: 350, aspectRatio: '1/1' }}>
                  {/* ... Radar Content ... */}
                {/* Concentric Circles */}
                {[...Array(4)].map((_, i) => (
                  <div key={i} style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: `${25 + i * 25}%`,
                    height: `${25 + i * 25}%`,
                    border: '1px solid rgba(15,31,75,0.12)',
                    borderRadius: '50%',
                  }} />
                ))}

                {/* Orbiting Elements */}
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-spin-slow" style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    animationDuration: `${15 + i * 10}s`,
                    animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: `${12 + i * 13}%`,
                      left: '50%',
                      width: Math.round((10 - i * 2) * 0.7),
                      height: Math.round((10 - i * 2) * 0.7),
                      borderRadius: '50%',
                      background: i === 0 ? '#c9a84c' : (i === 1 ? '#0f1f4b' : '#2a4494'),
                      boxShadow: `0 0 15px ${i === 0 ? 'rgba(201,168,76,0.5)' : 'rgba(15,31,75,0.3)'}`
                    }} />
                    {/* Small secondary dots on the same orbit */}
                    <div style={{
                      position: 'absolute',
                      bottom: `${12 + i * 13}%`,
                      left: '20%',
                      width: 3,
                      height: 3,
                      borderRadius: '50%',
                      background: 'rgba(15,31,75,0.1)'
                    }} />
                  </div>
                ))}

                {/* Central Hub */}
                <div style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 70, height: 70,
                  background: '#0f1f4b',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 10px 40px rgba(15,31,75,0.25)',
                  zIndex: 10
                }}>
                  <div style={{
                    width: 42, height: 42,
                    borderRadius: '50%',
                    border: '2px solid rgba(201,168,76,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    animation: 'pulse-ring 3s linear infinite'
                  }}>
                    <img
                      src={apexonIcon}
                      alt="Apexon Logo"
                      style={{
                        width: '28px',
                        height: '28px',
                        filter: 'invert(72%) sepia(16%) saturate(1831%) hue-rotate(1deg) brightness(91%) contrast(87%)'
                      }}
                    />
                  </div>
                </div>

                {/* Radar Projection Beam (Flashlight style) */}
                <div className="animate-spin-slow" style={{
                  position: 'absolute',
                  top: '10%', left: '10%', right: '10%', bottom: '10%',
                  background: 'conic-gradient(from 0deg, rgba(201,168,76,0.25) 0deg, transparent 40deg)',
                  borderRadius: '50%',
                  animationDuration: '8s',
                  filter: 'blur(7px)',
                  zIndex: 1
                }} />

                {/* Secondary Soft Glow Beam */}
                <div className="animate-spin-slow" style={{
                  position: 'absolute',
                  top: '5%', left: '5%', right: '5%', bottom: '5%',
                  background: 'conic-gradient(from 0deg, rgba(15,31,75,0.08) 0deg, transparent 60deg)',
                  borderRadius: '50%',
                  animationDuration: '12s',
                  animationDirection: 'reverse',
                  filter: 'blur(11px)',
                  zIndex: 0
                }} />

                {/* Particles for depth */}
                {[...Array(5)].map((_, i) => (
                  <div key={`extra-${i}`} className="animate-spin-slow" style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    animationDuration: `${10 + i * 2}s`,
                    animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: `${15 + i * 15}%`,
                      left: `${20 + i * 10}%`,
                      width: 3,
                      height: 3,
                      borderRadius: '50%',
                      background: i % 2 === 0 ? '#c9a84c' : '#0f1f4b',
                      opacity: 0.4
                    }} />
                  </div>
                ))}
                </div>
              </div>

              {/* Stats aligned with buttons on the left */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 16,
                paddingTop: 40,
                borderTop: '1px solid #e8edf7'
              }}>
                {stats.map((stat, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div className="stat-number" style={{ color: '#0f1f4b', background: 'none', WebkitTextFillColor: '#0f1f4b', fontSize: 'clamp(1.5rem, 2vw, 2.2rem)' }}>
                      <CountUp value={stat.value} />
                    </div>
                    <div style={{ color: '#0f1f4b', fontWeight: 800, fontSize: '0.8rem', marginTop: 4 }}>{stat.label}</div>
                    <div style={{ color: '#6b7fa8', fontSize: '0.7rem', marginTop: 2 }}>{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO BAND ────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: '72px 32px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 560 }} ref={el => addRef(el, 0)} className="reveal">
            <div className="section-line" style={{ marginBottom: 20 }} />
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, color: '#0f1f4b', lineHeight: 1.2, marginBottom: 16 }}>
              A Conglomerate Built on <span className="gradient-text-gold">Trust & Innovation</span>
            </h2>
            <p style={{ color: '#6b7fa8', fontSize: '1rem', lineHeight: 1.75 }}>
              Founded with a vision to serve diverse industry needs under one trusted corporate umbrella, Apexon Group's sister companies are each independently expert in their domains, yet united by a shared commitment to excellence, integrity, and client success.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }} ref={el => addRef(el, 1)} className="reveal">
            {[
              { label: 'ISO Certified', sub: 'Quality Assured' },
              { label: '6 Industries', sub: 'Diversified Portfolio' },
              { label: '24/7 Support', sub: 'Always Available' },
            ].map((item, i) => (
              <div key={i} style={{
                background: '#f8f9fc', border: '1px solid #e8edf7', borderRadius: 16,
                padding: '24px 28px', textAlign: 'center', minWidth: 140, transition: 'all 0.3s'
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#c9a84c';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#e8edf7';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f1f4b' }}>{item.label}</div>
                <div style={{ color: '#6b7fa8', fontSize: '0.8rem', marginTop: 4 }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPANIES GRID ──────────────────────────── */}
      <section style={{ background: '#f8f9fc', padding: '96px 32px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }} ref={el => addRef(el, 2)} className="reveal">
            <div className="section-line" style={{ margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: '#0f1f4b', marginBottom: 16 }}>
              Our Business Verticals
            </h2>
            <p style={{ color: '#6b7fa8', fontSize: '1rem', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              Six powerful companies, each a market leader in its domain — all under the Apexon Group umbrella.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>
            {companies.map((company, i) => (
              <div
                key={company.id}
                className="company-card animated-border"
                ref={el => addRef(el, 3 + i)}
                style={{ 
                  animationDelay: `${i * 0.1}s`, 
                  cursor: 'pointer',
                  background: `linear-gradient(to top, ${company.accentLight} 0%, #ffffff 100%)`,
                  borderRadius: '12px',
                  padding: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  '--border-color': company.accent,
                  '--border-delay': `${i * -1.5}s`
                } as React.CSSProperties}
                onClick={() => nav(company.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <div style={{ 
                    width: 48, height: 48,
                    borderRadius: '10px',
                    background: `${company.accent}08`, // Very subtle tint
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 248.45 225.44" fill="none">
                      <path fill={company.accent} d="M138.45,43.08c4.61-8,16.11-8.03,20.77-.1v.02l32.8,56.79,23.32,40.37,29.61,51.29L170.99,12.84c-1.92-4.66-5.32-8.66-9.87-10.84-2.69-1.29-5.68-2-8.77-2h-38.68c-7.24,0-13.93,3.87-17.55,10.13L24.81,133.62c22.42-16.97,49.62-27.5,78.57-29.81l35.06-60.73Z"/>
                      <path fill={company.accent} d="M178.14,131.8c-.92-.47-1.69-1.2-2.21-2.1l-19.7-34.48c-2.96-5.18-10.43-5.18-13.38,0l-11.47,20.12c-.77,1.35-2.26,2.11-3.81,1.98-3.95-.35-7.94-.55-11.99-.55-48.22,0-90.55,24.71-114.4,61.87-2.52,3.92-.83,9.16,3.51,10.84l47.37,18.25c3.52,1.36,7.55-.16,9.18-3.57,15.83-33.04,50.16-55.92,89.98-55.92,47.91,0,87.88,33.13,97.23,77.2-7.39-40.76-33.98-75.04-70.3-93.64Z"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: company.accent, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{company.category}</div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f1f4b', marginTop: 2 }}>{company.name}</h3>
                  </div>
                </div>

                <p style={{ color: '#6b7fa8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 32, flex: 1 }}>
                  {company.desc}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 10px', marginBottom: 32 }}>
                  {company.services.map(s => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#3a4a6b', fontSize: '0.82rem', fontWeight: 500 }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: company.accent, flexShrink: 0 }} />
                      <span style={{ whiteSpace: 'nowrap' }}>{s}</span>
                    </div>
                  ))}
                </div>

                <div style={{ 
                  display: 'flex', alignItems: 'center', gap: 8, 
                  color: company.accent, fontWeight: 700, fontSize: '0.9rem',
                  paddingTop: 24, borderTop: '1px solid #f0f3fa'
                }}>
                  Explore Division 
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY APEXON ──────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: '96px 32px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div ref={el => addRef(el, 9)} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-line" style={{ margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#0f1f4b', marginBottom: 16 }}>
              Why Choose Apexon Group
            </h2>
            <p style={{ color: '#6b7fa8', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
              We don't just deliver services — we deliver transformation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            {[
              { title: 'Industry Authority', desc: 'Decades of specialized expertise in each business vertical, backed by proven track records and measurable outcomes.', num: '01', img: imgAuthority },
              { title: 'Innovation-First Mindset', desc: 'Every solution we build leverages cutting-edge technology and forward-thinking strategy to keep you ahead of the curve.', num: '02', img: imgInnovation },
              { title: 'Integrated Ecosystem', desc: 'Our six sister companies collaborate seamlessly, offering clients cross-industry synergies unavailable elsewhere.', num: '03', img: imgEcosystem },
              { title: 'Client-Centric Approach', desc: 'We measure our success by yours — transparent processes, dedicated support, and results that speak for themselves.', num: '04', img: imgClient },
            ].map((item, i) => (
              <div 
                key={i} 
                ref={el => addRef(el, 10 + i)} 
                className="reveal pro-card animated-border" 
                style={{ 
                  animationDelay: `${i * 0.15}s`,
                  padding: 0,
                  overflow: 'hidden',
                  borderRadius: 24,
                  background: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  '--border-color': '#c9a84c',
                  '--border-delay': `${i * -1.5}s`
                } as React.CSSProperties}
              >
                <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }}
                    className="card-image" 
                  />
                  <div style={{
                    position: 'absolute', top: 20, left: 20,
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.9rem', fontWeight: 900, color: '#0f1f4b',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}>
                    {item.num}
                  </div>
                </div>
                <div style={{ padding: '32px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f1f4b', marginBottom: 14 }}>{item.title}</h3>
                  <p style={{ color: '#6b7fa8', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #0a1535 0%, #0f1f4b 50%, #1a3069 100%)',
        padding: '96px 32px', position: 'relative', overflow: 'hidden'
      }}>
        <div className="deco-blob" style={{
          width: 500, height: 500, top: -200, right: -100,
          background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)'
        }} />
        <div ref={el => addRef(el, 14)} className="reveal" style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', marginBottom: 20, lineHeight: 1.2 }}>
            Ready to Grow With <span className="gradient-text-gold">Apexon Group?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', marginBottom: 40, lineHeight: 1.7 }}>
            Join hundreds of businesses that trust Apexon Group to power their growth. Let's build something extraordinary together.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => nav('contact')} className="btn-gold" style={{ padding: '14px 40px', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
              Start a Conversation
            </button>
            <button onClick={() => nav('about')} style={{
              padding: '14px 40px', borderRadius: 12, background: 'transparent',
              border: '1px solid rgba(255,255,255,0.3)', color: '#fff', cursor: 'pointer',
              fontSize: '0.95rem', fontWeight: 600, transition: 'all 0.3s'
            }}>
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
