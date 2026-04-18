import { useEffect, useRef } from 'react';

interface AboutProps {
  onNavigate: (page: string) => void;
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
    { title: 'Integrity', desc: 'We operate with absolute transparency and ethical responsibility in every decision we make.', icon: '◈' },
    { title: 'Excellence', desc: 'Mediocrity is not in our vocabulary. Every deliverable is held to the highest standard.', icon: '◆' },
    { title: 'Innovation', desc: 'We embrace change and leverage emerging technologies to create future-ready solutions.', icon: '◉' },
    { title: 'Client First', desc: "Our clients' success is our success. We are deeply invested in every partnership we forge.", icon: '◇' },
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
      <section className="page-hero" style={{ paddingTop: 76, paddingBottom: 80 }}>
        <div className="deco-blob" style={{
          width: 600, height: 600, top: -200, right: -100,
          background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)'
        }} />
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '80px 32px 0', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: 100, padding: '7px 18px', marginBottom: 24
          }}>
            <span style={{ color: '#c9a84c', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Our Story</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', marginBottom: 20, lineHeight: 1.15 }}>
            About <span className="gradient-text-gold">Apexon Group</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.1rem', maxWidth: 620, lineHeight: 1.75 }}>
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
          <div ref={el => addRef(el, 2)} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-line" style={{ margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, color: '#0f1f4b', marginBottom: 12 }}>Our Core Values</h2>
            <p style={{ color: '#6b7fa8', maxWidth: 460, margin: '0 auto', lineHeight: 1.7 }}>
              The principles that guide every decision, product, and relationship within Apexon Group.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {values.map((v, i) => (
              <div key={i} ref={el => addRef(el, 3 + i)} className="reveal pro-card" style={{ padding: '40px 32px', textAlign: 'center' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 18, margin: '0 auto 24px',
                  background: 'linear-gradient(135deg, #0f1f4b10, #0f1f4b1a)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid #0f1f4b22'
                }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M14 2L26 8V20L14 26L2 20V8L14 2Z" fill="#0f1f4b" opacity="0.15" stroke="#0f1f4b" strokeWidth="1.5" />
                    <circle cx="14" cy="14" r="4" fill="#0f1f4b" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f1f4b', marginBottom: 12 }}>{v.title}</h3>
                <p style={{ color: '#6b7fa8', fontSize: '0.875rem', lineHeight: 1.7 }}>{v.desc}</p>
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
      <section style={{ background: '#f8f9fc', padding: '96px 32px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div ref={el => addRef(el, 14)} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-line" style={{ margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, color: '#0f1f4b', marginBottom: 12 }}>Leadership Team</h2>
            <p style={{ color: '#6b7fa8', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
              Visionary leaders driving Apexon Group's mission across continents and industries.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 28 }}>
            {[
              { name: 'Abdullah Rahman', role: 'Chairman & Founder', initials: 'AR' },
              { name: 'Farid Ahmed', role: 'Group CEO', initials: 'FA' },
              { name: 'Nusrat Jahan', role: 'Chief Technology Officer', initials: 'NJ' },
              { name: 'Kamal Hossain', role: 'Chief Financial Officer', initials: 'KH' },
            ].map((leader, i) => (
              <div key={i} ref={el => addRef(el, 15 + i)} className="reveal pro-card" style={{ padding: '36px 28px', textAlign: 'center' }}>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%', margin: '0 auto 20px',
                  background: 'linear-gradient(135deg, #0f1f4b, #2a4494)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#ffffff', fontWeight: 800, fontSize: '1.3rem', letterSpacing: '0.05em'
                }}>{leader.initials}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f1f4b', marginBottom: 6 }}>{leader.name}</h3>
                <p style={{ color: '#6b7fa8', fontSize: '0.85rem', fontWeight: 500 }}>{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
