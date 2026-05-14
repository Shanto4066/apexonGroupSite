import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import imgAbu from '../assets/images/management/Abu Shahadat Hossain.jpg.jpeg';
import imgTouhid from '../assets/images/management/Touhid.jpg.jpeg';
import imgMahabur from '../assets/images/management/Md Mahabur.jpg.jpeg';
import imgShakaouth from '../assets/images/management/Shakaouth.jpg.jpeg';
import imgMeftahul from '../assets/images/management/Md Meftahul Islam.jpg.jpeg';
import imgHarunur from '../assets/images/management/Harunur Rashid Shrabon.jpg.jpeg';

interface AboutProps {
  onNavigate: (page: string) => void;
}

function ValueIcon({ kind, color }: { kind: 'integrity' | 'excellence' | 'innovation' | 'client'; color: string }) {
  const s = { stroke: color, strokeWidth: 2, fill: 'none' as const, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (kind) {
    case 'integrity':
      return (
        <svg width={28} height={28} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M12 3l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z" />
          <path {...s} d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'excellence':
      return (
        <svg width={28} height={28} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6L12 2z" />
        </svg>
      );
    case 'innovation':
      return (
        <svg width={28} height={28} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M9 18h6M10 22h4M12 2a7 7 0 0 1 4 12.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26A7 7 0 0 1 12 2z" />
          <path {...s} d="M8 22h8" opacity="0.6" />
        </svg>
      );
    case 'client':
      return (
        <svg width={28} height={28} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
          <path {...s} d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    default:
      return null;
  }
}

export const About: React.FC<AboutProps> = ({ onNavigate: _onNavigate }) => {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
    }, { threshold: 0.1 });
    revealRefs.current.forEach(ref => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLDivElement | null, i: number) => { revealRefs.current[i] = el; };

  const values = [
    {
      iconKind: 'integrity' as const,
      title: 'Integrity',
      desc: 'We operate with absolute transparency and ethical responsibility in every decision we make.',
      accent: '#c9a84c',
      accentLight: '#fff8e8',
    },
    {
      iconKind: 'excellence' as const,
      title: 'Excellence',
      desc: 'Mediocrity is not in our vocabulary. Every deliverable is held to the highest standard.',
      accent: '#0f1f4b',
      accentLight: '#e8edf7',
    },
    {
      iconKind: 'innovation' as const,
      title: 'Innovation',
      desc: 'We embrace change and leverage emerging technologies to create future-ready solutions.',
      accent: '#2563eb',
      accentLight: '#eff6ff',
    },
    {
      iconKind: 'client' as const,
      title: 'Client First',
      desc: "Our clients' success is our success. We are deeply invested in every partnership we forge.",
      accent: '#0d9488',
      accentLight: '#f0fdfa',
    },
  ];

  const milestones = [
    { year: '2012', event: 'Apexon Group Founded', desc: 'Incorporated as a diversified business conglomerate with a vision for multi-sector dominance.' },
    { year: '2014', event: 'ApexonIT Launched', desc: 'Technology division established, delivering custom ERP, CCTV and digital transformation services.' },
    { year: '2016', event: 'Agro & Medical Arms', desc: 'Agricultural trading and medical accessories divisions launched to serve growing market needs.' },
    { year: '2019', event: 'Automotive & Travel', desc: 'Apexon Car Garage and Apexon Visa Consult joined the portfolio, expanding lifestyle services.' },
    { year: '2022', event: 'Apexon Cart Launch', desc: 'E-commerce division launched, completing a full-spectrum consumer and enterprise ecosystem.' },
    { year: '2025', event: 'Regional Expansion', desc: 'International offices, strategic alliances and landmark enterprise contracts secured.' },
  ];

  return (
    <div className="page-enter">
      {/* Hero */}
      <section
        className="page-hero"
        style={{
          paddingTop: 76,
          paddingBottom: 80,
          background: 'linear-gradient(165deg, #f7f9ff 0%, #eef3ff 44%, #f8fbff 100%)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.42,
          backgroundImage:
            'radial-gradient(circle at 14% 18%, rgba(201,168,76,0.14) 0%, transparent 34%), radial-gradient(circle at 88% 16%, rgba(37,99,235,0.1) 0%, transparent 36%), repeating-linear-gradient(102deg, rgba(15,31,75,0.04) 0 1px, transparent 1px 64px)'
        }} />
        <div className="deco-blob" style={{
          width: 520, height: 520, top: -180, right: -90,
          background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)'
        }} />
        <div className="deco-blob" style={{
          width: 420, height: 420, bottom: -140, left: -90,
          background: 'radial-gradient(circle, rgba(201,168,76,0.14) 0%, transparent 72%)'
        }} />
        <div className="noise-overlay" style={{ opacity: 0.02 }} aria-hidden />
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '80px 32px 0', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.28)',
            borderRadius: 100, padding: '7px 18px', marginBottom: 24
          }}>
            <span style={{ color: '#c9a84c', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Our Story</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#0f1f4b', marginBottom: 20, lineHeight: 1.15 }}>
            About <span className="gradient-text-gold">Apexon Group</span>
          </h1>
          <p style={{ color: '#6b7fa8', fontSize: '1.1rem', maxWidth: 620, lineHeight: 1.75 }}>
            A story of vision, discipline, and relentless pursuit of excellence — building a legacy across six transformative industries.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ background: '#ffffff', padding: '96px 32px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
          {[
            {
              label: 'Our Mission', title: 'Empowering Businesses, Enriching Lives',
              text: 'Apexon Group exists to deliver transformative, industry-defining solutions that empower businesses to scale, innovate, and lead in their respective markets. We commit to creating lasting value for every stakeholder we serve.',
              accent: '#c9a84c', bg: '#fffaf0'
            },
            {
              label: 'Our Vision', title: 'To Be the Most Trusted Conglomerate in Asia',
              text: "We envision Apexon Group as Asia's most respected multi-industry conglomerate — a name synonymous with trust, quality, and transformational impact across every sector we operate in.",
              accent: '#0f1f4b', bg: '#f0f3fa'
            }
          ].map((item, i) => (
            <div key={i} ref={el => addRef(el, i)} className="reveal" style={{
              background: item.bg, borderRadius: 20, padding: '48px 40px',
              border: `2px solid ${item.accent}22`, transition: 'all 0.4s'
            }}>
              <span style={{
                display: 'inline-block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: item.accent,
                background: `${item.accent}18`, padding: '6px 14px', borderRadius: 100, marginBottom: 20
              }}>{item.label}</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f1f4b', marginBottom: 16, lineHeight: 1.3 }}>{item.title}</h3>
              <p style={{ color: '#6b7fa8', lineHeight: 1.8, fontSize: '0.95rem' }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ background: '#f8f9fc', padding: '96px 32px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div ref={el => addRef(el, 2)} className="reveal about-values-intro">
            <div className="about-values-rule" />
            <p className="about-values-eyebrow">Principles &amp; culture</p>
            <h2 className="about-values-title">Our Core Values</h2>
            <p className="about-values-sub">
              The principles that guide every decision, product, and relationship within Apexon Group — the same standards we apply across all six divisions.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 28 }}>
            {values.map((v, i) => (
              <div
                key={v.title}
                ref={el => addRef(el, 3 + i)}
                className="reveal company-card animated-border"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  cursor: 'default',
                  background: `linear-gradient(to top, ${v.accentLight} 0%, #ffffff 100%)`,
                  borderRadius: 20,
                  padding: '40px 32px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  '--border-color': v.accent,
                  '--border-delay': `${i * -1.5}s`,
                } as CSSProperties}
              >
                <div
                  style={{
                    position: 'relative',
                    zIndex: 11,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div style={{
                    width: 64, height: 64, borderRadius: 18, marginBottom: 24,
                    background: `${v.accent}10`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1px solid ${v.accent}28`,
                  }}>
                    <ValueIcon kind={v.iconKind} color={v.accent} />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f1f4b', marginBottom: 12 }}>{v.title}</h3>
                  <p style={{ color: '#6b7fa8', fontSize: '0.875rem', lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: '#ffffff', padding: '96px 32px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div ref={el => addRef(el, 7)} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-line" style={{ margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, color: '#0f1f4b', marginBottom: 12 }}>Our Journey</h2>
            <p style={{ color: '#6b7fa8', lineHeight: 1.7 }}>From inception to industry leadership — the Apexon story.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {milestones.map((m, i) => (
              <div key={i} ref={el => addRef(el, 8 + i)} className="reveal timeline-item" style={{ paddingBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
                  <div style={{ minWidth: 64 }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#c9a84c', letterSpacing: '0.05em' }}>{m.year}</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f1f4b', marginBottom: 8 }}>{m.event}</h3>
                    <p style={{ color: '#6b7fa8', fontSize: '0.875rem', lineHeight: 1.7 }}>{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section style={{ background: '#f8f9fc', padding: 'clamp(64px, 8vw, 96px) clamp(16px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div ref={el => addRef(el, 14)} className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(36px, 6vw, 64px)' }}>
            <div className="section-line" style={{ margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, color: '#0f1f4b', marginBottom: 12 }}>Leadership Team</h2>
            <p style={{ color: '#6b7fa8', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
              Visionary leaders driving Apexon Group's mission across continents and industries.
            </p>
          </div>
          <div className="about-leadership-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(20px, 3vw, 32px)', maxWidth: 960, margin: '0 auto' }}>
            {[
              { name: 'Abu Shahadat Hossain', role: 'Chairman', img: imgAbu, desc: '30+ years of expertise in Banking, Finance, and Accounting ERP systems — providing the strategic and financial foundation that drives Apexon\'s vision forward.' },
              { name: 'Md Mahabur Islam', role: 'Managing Director', img: imgMahabur, desc: '15+ years driving business growth across Automotive & Development sectors — turning bold ideas into thriving realities.' },
              { name: 'Md Shakaouth Hossian', role: 'Deputy Managing Director', img: imgShakaouth, desc: '15+ years pioneering IT & Software solutions, architecting the digital backbone that powers Apexon\'s innovation forward.' },
              { name: 'Md Meftahul Islam', role: 'Executive Director', img: imgMeftahul, desc: '10+ years mastering Digital Marketing & Operations, building seamless systems that keep the entire group running at its best.' },
              { name: 'Md Touhidur Rahman', role: 'Director', img: imgTouhid, desc: 'A seasoned business leader with deep expertise in operations and strategic planning, steering Apexon\'s growth with clarity and discipline.' },
              { name: 'Harunur Rashid Shrabon', role: 'Director', img: imgHarunur, desc: '6+ years crafting compelling visual identities — the creative heartbeat behind Apexon\'s brand and storytelling.' },
            ].map((leader, i) => (
              <div key={i} ref={el => addRef(el, 15 + i)} className="reveal about-leadership-card" style={{
                borderRadius: 20,
                overflow: 'hidden',
                background: '#ffffff',
                boxShadow: '0 2px 12px rgba(15,31,75,0.07)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 40px rgba(15,31,75,0.14)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(15,31,75,0.07)';
                }}
              >
                {/* Image — full width, fixed height */}
                <div style={{ width: '100%', height: 'clamp(220px, 30vw, 280px)', overflow: 'hidden', position: 'relative' }}>
                  <img src={leader.img} alt={leader.name} loading="lazy" style={{
                    width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top',
                    transition: 'transform 0.4s ease',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'}
                    onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'}
                  />
                  {/* Role badge */}
                  <div style={{
                    position: 'absolute', bottom: 12, left: 12,
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.35)',
                    color: '#fff', fontSize: '0.68rem', fontWeight: 700,
                    padding: '5px 13px', borderRadius: 20, letterSpacing: '0.08em', textTransform: 'uppercase',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.2)',
                    textShadow: 'none',
                  }}>{leader.role}</div>
                </div>
                {/* Name + desc */}
                <div style={{ padding: '20px clamp(16px, 3vw, 24px) 26px' }}>
                  <div style={{ width: 32, height: 3, background: 'linear-gradient(90deg, #be185d, #9f1239)', borderRadius: 2, marginBottom: 12 }} />
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f1f4b', margin: '0 0 8px', lineHeight: 1.3 }}>{leader.name}</h3>
                  <p style={{ fontSize: '0.82rem', color: '#6b7fa8', lineHeight: 1.65, margin: 0 }}>{leader.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
