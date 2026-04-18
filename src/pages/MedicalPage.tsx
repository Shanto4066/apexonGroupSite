import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, FC } from 'react';

interface Props {
  onNavigate: (page: string) => void;
}

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

const heroStats = [
  {
    value: '500+',
    label: 'Product SKUs',
    sub: 'Accessory catalog',
    accent: '#0d9488',
    cardGradient: 'linear-gradient(155deg, #5eead4 0%, #ccfbf1 38%, #ffffff 100%)',
    border: '1px solid rgba(13, 148, 136, 0.32)',
    labelColor: '#0f766e',
    subColor: '#475569',
    shadow: '0 6px 22px rgba(13, 148, 136, 0.14)',
  },
  {
    value: '200+',
    label: 'Healthcare clients',
    sub: 'Hospitals & labs',
    accent: '#2563eb',
    cardGradient: 'linear-gradient(155deg, #93c5fd 0%, #dbeafe 40%, #ffffff 100%)',
    border: '1px solid rgba(37, 99, 235, 0.28)',
    labelColor: '#1e40af',
    subColor: '#475569',
    shadow: '0 6px 22px rgba(37, 99, 235, 0.12)',
  },
  {
    value: '15+',
    label: 'Quality certifications',
    sub: 'ISO · CE · GMP',
    accent: '#7c3aed',
    cardGradient: 'linear-gradient(155deg, #c4b5fd 0%, #ede9fe 42%, #ffffff 100%)',
    border: '1px solid rgba(124, 58, 237, 0.28)',
    labelColor: '#5b21b6',
    subColor: '#5b576b',
    shadow: '0 6px 22px rgba(124, 58, 237, 0.12)',
  },
  {
    value: '24hr',
    label: 'Emergency supply',
    sub: 'Critical lanes',
    accent: '#ea580c',
    cardGradient: 'linear-gradient(155deg, #fdba74 0%, #ffedd5 44%, #ffffff 100%)',
    border: '1px solid rgba(234, 88, 12, 0.3)',
    labelColor: '#9a3412',
    subColor: '#57534e',
    shadow: '0 6px 22px rgba(234, 88, 12, 0.14)',
  },
];

import diagImg from '../assets/images/medical/diag.png';
import surgicalImg from '../assets/images/medical/surgical.png';
import labImg from '../assets/images/medical/lab.jpg';
import ppeImg from '../assets/images/medical/ppe.jpg';
import rehabImg from '../assets/images/medical/rehab.jpg';
import furnitureImg from '../assets/images/medical/furniture.jpg';

const medicalCategories = [
  {
    id: 'diag',
    tagline: 'Clinical precision',
    title: 'Diagnostic Equipment',
    desc: 'Premium diagnostic devices — stethoscopes, BP monitors, glucometers, pulse oximeters — meeting WHO and CE certification standards.',
    bullets: ['CE-marked devices', 'Calibration support', 'Ward & bedside ready'],
    image: diagImg,
    accent: '#0d9488',
    accentSoft: 'rgba(13, 148, 136, 0.12)',
  },
  {
    id: 'surgical',
    tagline: 'Sterile chain',
    title: 'Surgical Accessories',
    desc: 'High-grade surgical gloves, draping, sutures, and disposable supplies for hospitals, clinics, and diagnostic centres.',
    bullets: ['Lot traceability', 'Sterile packaging', 'OT-grade materials'],
    image: surgicalImg,
    accent: '#0f766e',
    accentSoft: 'rgba(15, 118, 110, 0.12)',
  },
  {
    id: 'lab',
    tagline: 'Lab integrity',
    title: 'Laboratory Supplies',
    desc: 'Reagents, test kits, slides, specimen containers, and precision lab equipment for diagnostic workflows.',
    bullets: ['Consumables & kits', 'Cold-chain where needed', 'Batch documentation'],
    image: labImg,
    accent: '#14b8a6',
    accentSoft: 'rgba(20, 184, 166, 0.12)',
  },
  {
    id: 'ppe',
    tagline: 'Infection control',
    title: 'Personal Protective Equipment',
    desc: 'Medical-grade PPE — N95 respirators, face shields, gowns, and infection-control kits for frontline teams.',
    bullets: ['NIOSH / CE respirators', 'Facility-wide programs', 'Rapid replenishment'],
    image: ppeImg,
    accent: '#115e59',
    accentSoft: 'rgba(17, 94, 89, 0.12)',
  },
  {
    id: 'rehab',
    tagline: 'Recovery paths',
    title: 'Rehabilitation Devices',
    desc: 'Physiotherapy equipment, orthopaedic supports, mobility aids, and patient-care accessories for hospital and home.',
    bullets: ['Therapy-grade devices', 'Home-care kits', 'Training-friendly SKUs'],
    image: rehabImg,
    accent: '#2dd4bf',
    accentSoft: 'rgba(45, 212, 191, 0.14)',
  },
  {
    id: 'furniture',
    tagline: 'Built for wards',
    title: 'Hospital Furniture',
    desc: 'Medical-grade beds, examination tables, IV stands, and modular ward furniture for clinical environments.',
    bullets: ['Ergonomic layouts', 'Durable finishes', 'Install coordination'],
    image: furnitureImg,
    accent: '#134e4a',
    accentSoft: 'rgba(19, 78, 74, 0.12)',
  },
];

function MedicalCategoryIcon({ kind, color }: { kind: string; color: string }) {
  const s = { stroke: color, strokeWidth: 2, fill: 'none' as const, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (kind) {
    case 'diag':
      return (
        <svg width={26} height={26} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M4.5 12.5a3.5 3.5 0 0 1 3.5-3.5H8M12 9v11M8 20h8M19.5 9a2.5 2.5 0 0 0-5 0v3a2.5 2.5 0 0 0 5 0V9z" />
        </svg>
      );
    case 'surgical':
      return (
        <svg width={26} height={26} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M14.5 4.5l5 5M4 9l9 9M4 20l3-3M9 11l4 4" />
        </svg>
      );
    case 'lab':
      return (
        <svg width={26} height={26} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M9 3h6l-1 7 4 8H6l4-8-1-7zM9 3v4h6" />
        </svg>
      );
    case 'ppe':
      return (
        <svg width={26} height={26} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M12 3l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z" />
        </svg>
      );
    case 'rehab':
      return (
        <svg width={26} height={26} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M3 12h4l3-6 4 12 3-6h4" />
        </svg>
      );
    case 'furniture':
      return (
        <svg width={26} height={26} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M3 14h18v4H3v-4zm2-4h14v4H5v-4zm2-6h10v6H7V4z" />
        </svg>
      );
    default:
      return null;
  }
}

export const MedicalPage: FC<Props> = ({ onNavigate }) => {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  const nav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    }, { threshold: 0.05, rootMargin: '0px 0px 18% 0px' });

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

  const addRef = (el: HTMLElement | null, i: number) => {
    revealRefs.current[i] = el;
  };

  return (
    <div className="page-enter medical-page" style={{ background: '#f8f9fc' }}>
      <section className="medical-hero">
        <div className="medical-hero-pattern" aria-hidden />
        <div className="medical-hero-glow medical-hero-glow--a" aria-hidden />
        <div className="medical-hero-glow medical-hero-glow--b" aria-hidden />
        <div className="noise-overlay" style={{ opacity: 0.03 }} aria-hidden />

        <div className="medical-hero-inner">
          <div className="medical-hero-grid">
            <div>
              <div className="medical-hero-badge">
                <span>Healthcare accessories division</span>
              </div>
              <h1 className="medical-hero-title">
                <span className="medical-hero-title-line">Apexon Medical —</span>
                <span className="medical-hero-title-accent">Precision tools for healing hands.</span>
              </h1>
              <p className="medical-hero-lead">
                Trusted supply partner for hospitals, clinics, diagnostic labs, and pharmacies. Internationally certified, clinically validated accessories — zero compromise in patient care.
              </p>
              <div className="medical-hero-ctas">
                <button type="button" className="medical-btn medical-btn--primary" onClick={() => nav('contact')}>
                  Request a quote
                </button>
                <button type="button" className="medical-btn medical-btn--outline" onClick={() => nav('contact')}>
                  Talk to medical desk
                </button>
              </div>
              <div className="medical-hero-ecg" aria-hidden>
                <svg className="medical-hero-ecg-svg" viewBox="0 0 640 72" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="medicalHeroEcgLine" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#99f6e4" />
                      <stop offset="45%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#0f766e" />
                    </linearGradient>
                  </defs>
                  <line className="medical-hero-ecg-base" x1="0" y1="38" x2="640" y2="38" />
                  <path
                    className="medical-hero-ecg-shadow"
                    d="M0 38h36l8-5 8 11 8-25 8 33 8-18 8 4h34l8-5 8 11 8-25 8 33 8-18 8 4h34l8-5 8 11 8-25 8 33 8-18 8 4h34l8-5 8 11 8-25 8 33 8-18 8 4h34l8-5 8 11 8-25 8 33 8-18 8 4h34l8-5 8 11 8-25 8 33 8-18 8 4h22"
                  />
                  <path
                    className="medical-hero-ecg-line"
                    d="M0 38h36l8-5 8 11 8-25 8 33 8-18 8 4h34l8-5 8 11 8-25 8 33 8-18 8 4h34l8-5 8 11 8-25 8 33 8-18 8 4h34l8-5 8 11 8-25 8 33 8-18 8 4h34l8-5 8 11 8-25 8 33 8-18 8 4h34l8-5 8 11 8-25 8 33 8-18 8 4h22"
                    stroke="url(#medicalHeroEcgLine)"
                  />
                  <path
                    className="medical-hero-ecg-tracer"
                    d="M0 38h36l8-5 8 11 8-25 8 33 8-18 8 4h34l8-5 8 11 8-25 8 33 8-18 8 4h34l8-5 8 11 8-25 8 33 8-18 8 4h34l8-5 8 11 8-25 8 33 8-18 8 4h34l8-5 8 11 8-25 8 33 8-18 8 4h34l8-5 8 11 8-25 8 33 8-18 8 4h22"
                    stroke="#99f6e4"
                  />
                </svg>
              </div>
            </div>

            <div className="medical-hero-side">
              <div className="medical-hero-ornament" aria-hidden>
                <div className="med3d-pulse-ring med3d-pulse-ring--1" />
                <div className="med3d-pulse-ring med3d-pulse-ring--2" />
                <div className="med3d-pulse-ring med3d-pulse-ring--3" />
                <div className="med3d-helix-scene">
                  <div className="med3d-helix">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="med3d-helix-rung" style={{ '--i': i } as React.CSSProperties}>
                        <div className="med3d-helix-dot med3d-helix-dot--l" />
                        <div className="med3d-helix-bar" />
                        <div className="med3d-helix-dot med3d-helix-dot--r" />
                      </div>
                    ))}
                  </div>
                  <div className="med3d-float-pill med3d-float-pill--1" />
                  <div className="med3d-float-pill med3d-float-pill--2" />
                  <div className="med3d-float-pill med3d-float-pill--3" />
                  <div className="med3d-cross-badge">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <rect x="9" y="2" width="6" height="20" rx="2" fill="#0d9488"/>
                      <rect x="2" y="9" width="20" height="6" rx="2" fill="#14b8a6"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="medical-hero-stats">
                {heroStats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="medical-stat-card animated-border"
                    style={
                      {
                        animationDelay: `${i * 0.1}s`,
                        background: stat.cardGradient,
                        border: stat.border,
                        boxShadow: stat.shadow,
                        '--border-color': stat.accent,
                        '--border-delay': `${i * -1.5}s`,
                      } as CSSProperties
                    }
                  >
                    <div className="medical-stat-card-value" style={{ color: stat.accent }}>
                      <CountUp value={stat.value} />
                    </div>
                    <div className="medical-stat-card-label" style={{ color: stat.labelColor }}>
                      {stat.label}
                    </div>
                    <div className="medical-stat-card-sub" style={{ color: stat.subColor }}>
                      {stat.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="medical-band">
        <div className="medical-band-inner">
          <div ref={el => addRef(el, 0)} className="reveal medical-band-intro">
            <div className="medical-section-rule" />
            <p className="medical-eyebrow">Product range</p>
            <h2 className="medical-section-title">Categories we supply end-to-end</h2>
            <p className="medical-section-sub">
              Same sourcing discipline as our other divisions — validated suppliers, documented batches, and logistics tuned for clinical urgency.
            </p>
          </div>

          <div className="medical-cat-list">
            {medicalCategories.map((c, i) => (
              <article key={c.id} ref={el => addRef(el, 1 + i)} className="reveal medical-cat-card">
                <div className="medical-cat-media">
                  <img src={c.image} alt={c.title} loading="lazy" />
                  <div className="medical-cat-overlay" />
                </div>
                <div className="medical-cat-icon">
                  <MedicalCategoryIcon kind={c.id} color={c.accent} />
                </div>
                <div className="medical-cat-content">
                  <p className="medical-cat-tagline" style={{ color: c.accent }}>
                    {c.tagline}
                  </p>
                  <h3 className="medical-cat-title">{c.title}</h3>
                  <p className="medical-cat-desc">{c.desc}</p>
                  <ul className="medical-cat-bullets">
                    {c.bullets.map(b => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="medical-commit">
        <div className="medical-commit-inner">
          <div ref={el => addRef(el, 7)} className="reveal medical-commit-copy">
            <div className="medical-section-rule" />
            <h2 className="medical-section-title">Quality standards</h2>
            <p className="medical-commit-text">
              Every SKU verified against international medical norms. Documentation, supplier audits, and release criteria — structured for regulators and your QA team.
            </p>
            <p className="medical-commit-text">
              When minutes matter, our emergency lanes and buffer stock programs keep critical lines moving without breaking compliance.
            </p>
          </div>
          <div ref={el => addRef(el, 8)} className="reveal medical-commit-grid">
            {[
              { label: 'CE certified', detail: 'European conformity' },
              { label: 'ISO 13485', detail: 'Medical device QMS' },
              { label: 'WHO GMP', detail: 'Good manufacturing practice' },
              { label: 'FDA registered', detail: 'US FDA pathways' },
            ].map(item => (
              <div key={item.label} className="medical-commit-tile">
                <div className="medical-commit-tile-label">{item.label}</div>
                <div className="medical-commit-tile-detail">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
