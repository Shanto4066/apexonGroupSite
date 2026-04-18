import { useEffect, useRef } from 'react';

interface Props { onNavigate: (page: string) => void; }

export const VisaPage: React.FC<Props> = () => {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
    }, { threshold: 0.08 });
    revealRefs.current.forEach(ref => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);
  const addRef = (el: HTMLDivElement | null, i: number) => { revealRefs.current[i] = el; };

  const services = [
    { title: 'Visa Consultation & Processing', desc: 'Expert visa consultation for 50+ countries — tourist, business, student, work, and immigration visas. We handle every document, form, and embassy requirement with meticulous precision.' },
    { title: 'International Air Ticketing', desc: 'Best-in-class international and domestic ticketing with access to all major airlines. Exclusive corporate rates, group booking discounts, and 24/7 rebooking support for business travelers.' },
    { title: 'Corporate Travel Management', desc: 'Complete travel management services for corporations — policy management, expense control, preferred vendor relationships, and dedicated travel desk operations.' },
    { title: 'Immigration Advisory', desc: 'Comprehensive immigration guidance for individuals seeking permanent residency, work permits, and citizenship pathways in Canada, Australia, UK, UAE, and more.' },
    { title: 'Holiday Packages', desc: 'Curated international holiday packages — from luxury Maldives retreats to European multi-country tours — designed by travel experts with 10+ years in leisure travel.' },
    { title: 'Hajj & Umrah Services', desc: 'Fully managed Hajj and Umrah packages with premium accommodation near Haram, comfortable transportation, and experienced group leaders ensuring a spiritually fulfilling journey.' },
  ];

  const countries = ['🇺🇸 USA', '🇬🇧 UK', '🇨🇦 Canada', '🇦🇺 Australia', '🇩🇪 Germany', '🇫🇷 France', '🇦🇪 UAE', '🇸🇦 Saudi Arabia', '🇯🇵 Japan', '🇨🇳 China', '🇲🇾 Malaysia', '🇸🇬 Singapore'];

  return (
    <div className="page-enter">
      <section style={{ background: 'linear-gradient(135deg, #1a0a40 0%, #2d1a6b 50%, #1a0a50 100%)', paddingTop: 76, paddingBottom: 80, minHeight: '60vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="deco-blob" style={{ width: 700, height: 700, top: -200, right: -150, background: 'radial-gradient(circle, rgba(150,100,255,0.12) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '80px 32px 0', position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(150,100,255,0.12)', border: '1px solid rgba(150,100,255,0.3)', borderRadius: 100, padding: '7px 18px', marginBottom: 24 }}>
            <span style={{ color: '#b080ff', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Travel & Immigration Division</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', marginBottom: 24, lineHeight: 1.1 }}>
            Apexon Visa Consult —{' '}
            <span style={{ background: 'linear-gradient(135deg, #b080ff, #d4b0ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'block' }}>
              Your World, Without Borders.
            </span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: '1.05rem', maxWidth: 640, lineHeight: 1.8, marginBottom: 40 }}>
            Apexon Visa Consult and Ticketing is the region's most trusted travel and immigration solutions provider. With deep expertise in visa processing for 50+ countries and access to world-class airfares — we make global mobility seamless, reliable, and stress-free.
          </p>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[['50+', 'Countries Covered'], ['5000+', 'Visas Processed'], ['99%', 'Approval Rate'], ['10+', 'Years Experience']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#b080ff' }}>{v}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginTop: 4, fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#f8f9fc', padding: '96px 32px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div ref={el => addRef(el, 0)} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg, #5a1a7c, #b080ff)', borderRadius: 2, margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 800, color: '#0f1f4b', marginBottom: 12 }}>Comprehensive Travel Services</h2>
            <p style={{ color: '#6b7fa8', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
              From visa applications to luxury holidays — every aspect of your journey, handled by experts.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {services.map((s, i) => (
              <div key={i} ref={el => addRef(el, 1 + i)} className="reveal pro-card" style={{ padding: '36px 32px' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f5e8fa', border: '1px solid #5a1a7c22', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#5a1a7c', opacity: 0.5 }} />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f1f4b', marginBottom: 12 }}>{s.title}</h3>
                <p style={{ color: '#6b7fa8', fontSize: '0.875rem', lineHeight: 1.75 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#ffffff', padding: '96px 32px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div ref={el => addRef(el, 7)} className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: '#0f1f4b', marginBottom: 14 }}>Countries We Cover</h2>
            <p style={{ color: '#6b7fa8', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
              Visa processing expertise for 50+ countries across 6 continents.
            </p>
          </div>
          <div ref={el => addRef(el, 8)} className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {countries.map((c, i) => (
              <span key={i} style={{
                padding: '12px 22px', borderRadius: 100, background: '#f0f3fa',
                border: '1px solid #e8edf7', fontWeight: 600, color: '#3a4a6b', fontSize: '0.9rem',
                transition: 'all 0.3s', cursor: 'default'
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#5a1a7c'; (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = '#5a1a7c'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#f0f3fa'; (e.currentTarget as HTMLElement).style.color = '#3a4a6b'; (e.currentTarget as HTMLElement).style.borderColor = '#e8edf7'; }}
              >{c}</span>
            ))}
            <span style={{ padding: '12px 22px', borderRadius: 100, background: '#5a1a7c', color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>+38 More Countries</span>
          </div>
        </div>
      </section>
    </div>
  );
};
