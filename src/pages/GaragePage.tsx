import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { FC } from 'react';

import transparentCarImg from '../assets/images/garage/1.png';
import heroImg from '../assets/images/garage/hero-car.jpg';
import serviceImg from '../assets/images/garage/service.jpg';
import partsImg from '../assets/images/garage/parts.jpg';

// Rolling counter component (same as Medical page)
const CountUp = ({ value }: { value: string }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setHasStarted(entry.isIntersecting);
    }, { threshold: 0.1 });
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  const numStr = value.replace(/[^0-9]/g, '');
  const suffix = value.replace(/[0-9]/g, '');

  return (
    <div ref={nodeRef} className="rolling-counter">
      {numStr.split('').map((digit, i) => (
        <div
          key={i}
          className="rolling-digit"
          style={{
            transform: hasStarted ? `translateY(-${parseInt(digit, 10) * 1.2}em)` : 'translateY(0)',
            transitionDelay: `${i * 0.1}s`,
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
            <span key={n}>{n}</span>
          ))}
        </div>
      ))}
      <span style={{ marginLeft: '4px', verticalAlign: 'baseline' }}>{suffix}</span>
    </div>
  );
};

interface Props { onNavigate: (page: string) => void; }

export const GaragePage: FC<Props> = () => {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useLayoutEffect(() => {
    const nodes = revealRefs.current;
    const observer = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        } else {
          e.target.classList.remove('visible');
        }
      }
    }, { threshold: 0.05, rootMargin: '0px 0px 15% 0px' });

    const vh = typeof window !== 'undefined' ? window.innerHeight : 0;
    for (let i = 0; i < nodes.length; i++) {
      const el = nodes[i];
      if (!el) continue;
      observer.observe(el);
      if (vh > 0) {
        const r = el.getBoundingClientRect();
        if (r.bottom > 48 && r.top < vh - 32) el.classList.add('visible');
      }
    }
    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLElement | null, i: number) => { revealRefs.current[i] = el; };

  const services = [
    {
      title: 'World-Class Car Servicing',
      tag: '01 // Service Bay',
      desc: 'Our state-of-the-art service bay is equipped with the latest diagnostic machinery from Germany and Japan. Certified technicians service all makes and models to manufacturer specifications — from routine oil changes to complete engine overhauls.',
      highlights: ['Computer Diagnostics', 'Engine Overhaul', 'AC & Electrical', 'Suspension & Brakes'],
      img: serviceImg
    },
    {
      title: 'Genuine Japan Parts Sourcing',
      tag: '02 // Procurement',
      desc: 'We are your direct pipeline to authentic Japanese automotive parts. Our established supplier relationships in Japan guarantee OEM-quality components at competitive pricing — with full authenticity certificates and zero counterfeit risk.',
      highlights: ['OEM Toyota Parts', 'Honda Genuine Parts', 'Nissan & Mitsubishi', 'Rare Model Parts'],
      img: partsImg
    },
    {
      title: 'Garage Business Consultancy',
      tag: '03 // Advisory',
      desc: 'Thinking of starting or expanding an automotive business? Our expert consultants bring 10+ years of garage business experience. From feasibility analysis to turnkey setup — we guide you to profitability from day one.',
      highlights: ['Business Feasibility', 'Equipment Procurement', 'Staff Training', 'Operations Setup'],
      img: heroImg
    },
  ];

  const parts = [
    { brand: 'Toyota OEM', detail: 'All models, all years' },
    { brand: 'Honda Genuine', detail: 'Performance & standard parts' },
    { brand: 'Nissan Parts', detail: 'Direct Japan sourcing' },
    { brand: 'Mitsubishi', detail: 'Original factory components' },
    { brand: 'Mazda', detail: 'Certified OEM supply' },
    { brand: 'Subaru', detail: 'Performance & standard' },
  ];

  const heroStats = [
    { 
      value: '5000+', 
      label: 'Vehicles Serviced',
      sub: 'All makes & models',
      accent: '#ea580c',
      cardGradient: 'linear-gradient(155deg, #fdba74 0%, #ffedd5 44%, #ffffff 100%)',
      border: '1px solid rgba(234, 88, 12, 0.3)',
      labelColor: '#9a3412',
      subColor: '#57534e',
      shadow: '0 6px 22px rgba(234, 88, 12, 0.14)',
    },
    { 
      value: '100%', 
      label: 'Genuine Parts',
      sub: 'Direct from Japan',
      accent: '#2563eb',
      cardGradient: 'linear-gradient(155deg, #93c5fd 0%, #dbeafe 40%, #ffffff 100%)',
      border: '1px solid rgba(37, 99, 235, 0.28)',
      labelColor: '#1e40af',
      subColor: '#475569',
      shadow: '0 6px 22px rgba(37, 99, 235, 0.12)',
    },
    { 
      value: '10+', 
      label: 'Master Techs',
      sub: 'Certified experts',
      accent: '#dc2626',
      cardGradient: 'linear-gradient(155deg, #fca5a5 0%, #fee2e2 42%, #ffffff 100%)',
      border: '1px solid rgba(220, 38, 38, 0.28)',
      labelColor: '#991b1b',
      subColor: '#7f1d1d',
      shadow: '0 6px 22px rgba(220, 38, 38, 0.12)',
    },
    { 
      value: '24hr', 
      label: 'Emergency Service',
      sub: 'Breakdown recovery',
      accent: '#475569',
      cardGradient: 'linear-gradient(155deg, #cbd5e1 0%, #f1f5f9 44%, #ffffff 100%)',
      border: '1px solid rgba(71, 85, 105, 0.3)',
      labelColor: '#334155',
      subColor: '#475569',
      shadow: '0 6px 22px rgba(71, 85, 105, 0.14)',
    },
  ];

  return (
    <div className="page-enter garage-page">
      <section className="garage-hero">
        <div className="garage-grid">
          <div>
            <div className="garage-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
              Automotive Excellence
            </div>
            <h1 className="garage-title">
              Apexon Automotive —
              <span>Where Precision<br />Meets Passion.</span>
            </h1>
            <p className="garage-lead">
              We don't service cars — we elevate them. Master technicians, verified JDM parts, and high-performance tuning for drivers uncompromising on quality.
            </p>
          </div>

          <div className="garage-3d-wrapper">
            <div className="garage-speed-lines" />
            <img src={transparentCarImg} alt="Honda Performance Car HD" className="garage-car-model" />
          </div>
          
          <div className="garage-hero-stats">
            {heroStats.map((s, i) => (
              <div 
                key={s.label} 
                className="garage-hero-stat-card" 
                style={{ 
                  animationDelay: `${0.3 + i * 0.12}s`,
                  background: s.cardGradient,
                  border: s.border,
                  boxShadow: s.shadow,
                } as React.CSSProperties}
              >
                <div className="garage-hero-stat-val" style={{ color: s.accent }}>
                  <CountUp value={s.value} />
                </div>
                <div className="garage-hero-stat-label" style={{ color: s.labelColor }}>{s.label}</div>
                <div style={{ color: s.subColor, fontSize: '0.75rem', marginTop: '4px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="garage-section">
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div ref={el => addRef(el, 0)} className="reveal">
            <h2 className="garage-section-title">Performance Capabilities</h2>
            <p className="garage-section-sub">
              Three synchronized areas of expertise ensuring your vehicle performs flawlessly whether on the track or the commute.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {services.map((s, i) => (
              <article key={i} ref={el => addRef(el, i + 1)} className="reveal garage-service-card">
                <div className="garage-service-media">
                  <img src={s.img} alt={s.title} loading="lazy" />
                </div>
                <div className="garage-service-content">
                  <div className="garage-service-tag">{s.tag}</div>
                  <h3 className="garage-service-h3">{s.title}</h3>
                  <p className="garage-service-desc">{s.desc}</p>
                  <div className="garage-service-bullets">
                    {s.highlights.map(h => (
                      <div key={h} className="garage-service-bullet">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff8060" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="garage-section" style={{ background: '#f8f9fc', paddingBottom: '160px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div ref={el => addRef(el, 4)} className="reveal" style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 className="garage-section-title" style={{ justifyContent: 'center' }}>JDM Direct Line</h2>
            <p className="garage-section-sub" style={{ margin: '0 auto' }}>
              Access to Japan's tier-1 automotive parts manufacturers. Full provenance and authentic serial numbers. Zero counterfeit risk.
            </p>
          </div>

          <div className="garage-parts-grid">
            {parts.map((item, i) => (
              <div key={i} ref={el => addRef(el, 5 + i)} className="reveal garage-part-item">
                <h4>{item.brand}</h4>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
