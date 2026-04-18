import { useEffect, useLayoutEffect, useRef } from 'react';
import type { FC } from 'react';

import transparentCarImg from '../assets/images/garage/1.png';
import heroImg from '../assets/images/garage/hero-car.jpg';
import serviceImg from '../assets/images/garage/service.jpg';
import partsImg from '../assets/images/garage/parts.jpg';

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
              Apexon Car Garage —
              <span>Where Precision<br/>Meets Passion.</span>
            </h1>
            <p className="garage-lead">
              We don't service cars — we elevate them. Master technicians, verified JDM parts, and high-performance tuning for drivers uncompromising on quality.
            </p>
            <div className="garage-stats">
              {[['5K+', 'Serviced'], ['100%', 'Genuine'], ['24/7', 'Recovery']].map(([v, l]) => (
                <div key={l}>
                  <div className="garage-stat-val">{v}</div>
                  <div className="garage-stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="garage-3d-wrapper">
            <div className="garage-speed-lines" />
            <img src={transparentCarImg} alt="Honda Performance Car HD" className="garage-car-model" />
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
