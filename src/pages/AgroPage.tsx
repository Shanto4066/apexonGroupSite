import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, FC } from 'react';
import leafSvg from '../assets/images/agro/leaf.svg';

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
    value: '10k+',
    label: 'Metric tons / year',
    sub: 'Commodity throughput',
    accent: '#166534',
    accentLight: '#ecfdf5',
  },
  {
    value: '15+',
    label: 'Countries served',
    sub: 'Import & export lanes',
    accent: '#15803d',
    accentLight: '#f0fdf4',
  },
  {
    value: '500+',
    label: 'Farmer partnerships',
    sub: 'Farm-gate sourcing',
    accent: '#047857',
    accentLight: '#ecfdf5',
  },
  {
    value: '8+',
    label: 'Years in agro',
    sub: 'Trading & logistics depth',
    accent: '#14532d',
    accentLight: '#f7fee7',
  },
];

const agroServices = [
  {
    id: 'trade',
    tagline: 'Scale & liquidity',
    title: 'Agro Commodity Trading',
    desc: 'Premium agricultural commodities — rice, wheat, pulses, spices — at scale. Connects farmers with processors and exporters through a resilient supply network.',
    bullets: ['Rice, wheat, pulses, spices', 'Direct farm-gate pricing', 'Processors & exporters'],
    image:
      'https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#166534',
    accentSoft: 'rgba(22, 101, 52, 0.12)',
  },
  {
    id: 'supply',
    tagline: 'Cold chain to last mile',
    title: 'Supply Chain Management',
    desc: 'End-to-end agro logistics: procurement, warehousing, cold chain, and distribution across domestic and international markets.',
    bullets: ['Warehouse & inventory', 'Cold chain integrity', 'Last-mile distribution'],
    image:
      'https://images.pexels.com/photos/4481328/pexels-photo-4481328.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#15803d',
    accentSoft: 'rgba(21, 128, 61, 0.12)',
  },
  {
    id: 'export',
    tagline: 'Docs & compliance',
    title: 'Export & Import Solutions',
    desc: 'International agro trade with full documentation, phytosanitary compliance, and trusted buyer and seller relationships across Asia, Middle East, and Europe.',
    bullets: ['Phytosanitary & customs', 'Buyer / seller networks', 'Asia · MENA · Europe'],
    image:
      'https://images.pexels.com/photos/262353/pexels-photo-262353.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#047857',
    accentSoft: 'rgba(4, 120, 87, 0.12)',
  },
  {
    id: 'consult',
    tagline: 'Strategy on soil',
    title: 'Agricultural Consulting',
    desc: 'Advisory for agribusinesses, cooperatives, and investors — feasibility through operational setup and scale-up in the agricultural sector.',
    bullets: ['Feasibility & market entry', 'Cooperative structuring', 'Operations scale-up'],
    image:
      'https://images.pexels.com/photos/2382904/pexels-photo-2382904.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#14532d',
    accentSoft: 'rgba(20, 83, 45, 0.14)',
  },
];

function AgroServiceIcon({ kind, color }: { kind: string; color: string }) {
  const s = { stroke: color, strokeWidth: 2, fill: 'none' as const, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (kind) {
    case 'trade':
      return (
        <svg width={26} height={26} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M4 19h16M4 15l4-4 4 4 8-8M8 11V7h4" />
        </svg>
      );
    case 'supply':
      return (
        <svg width={26} height={26} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M3 7h18v10H3zM7 7V5a2 2 0 012-2h6a2 2 0 012 2v2M7 21h10" />
        </svg>
      );
    case 'export':
      return (
        <svg width={26} height={26} viewBox="0 0 24 24" aria-hidden>
          <circle {...s} cx={12} cy={12} r={10} />
          <path {...s} d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
        </svg>
      );
    case 'consult':
      return (
        <svg width={26} height={26} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M12 20h9M16 16v4M4 19h4v-4M8 8a4 4 0 1 1 8 0c0 2-2 3-2 5h-4c0-2-2-3-2-5z" />
        </svg>
      );
    default:
      return null;
  }
}

export const AgroPage: FC<Props> = ({ onNavigate }) => {
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
    <div className="page-enter agro-page" style={{ background: '#f8f9fc' }}>
      <section className="agro-hero">
        <div className="agro-hero-pattern" aria-hidden />
        <div className="agro-hero-glow agro-hero-glow--a" aria-hidden />
        <div className="agro-hero-glow agro-hero-glow--b" aria-hidden />
        <div className="noise-overlay" style={{ opacity: 0.03 }} aria-hidden />

        <div className="agro-hero-inner">
          <div className="agro-hero-grid">
            <div>
              <div className="agro-hero-badge">
                <span>Agriculture &amp; trading division</span>
              </div>
              <h1 className="agro-hero-title">
                <span className="agro-hero-title-line">Apexon Agro Business —</span>
                <span className="agro-hero-title-accent">Feeding nations. Building futures.</span>
              </h1>
              <p className="agro-hero-lead">
                Farm to global market — commodity trading, supply chain, export/import, and advisory. Value chains we strengthen, not only volumes we move.
              </p>
              <div className="agro-hero-ctas">
                <button type="button" className="agro-btn agro-btn--primary" onClick={() => nav('contact')}>
                  Start a trade inquiry
                </button>
                <button type="button" className="agro-btn agro-btn--outline" onClick={() => nav('contact')}>
                  Talk to agro desk
                </button>
              </div>
            </div>

            <div className="agro-hero-side">
              <div className="agro-hero-ornament" aria-hidden>
                <div className="agro-hero-ring agro-hero-ring--r1" />
                <div className="agro-hero-ring agro-hero-ring--r2" />
                <div className="agro-hero-ring agro-hero-ring--r3" />
                <div className="agro-hero-ring agro-hero-ring--r4" />
                <img src={leafSvg} alt="" className="agro-hero-leaf-img" width={96} height={96} decoding="async" />
              </div>
                           <div className="agro-hero-stats">
                {heroStats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="agro-stat-card animated-border"
                    style={
                      {
                        animationDelay: `${i * 0.1}s`,
                        background: `linear-gradient(to top, ${stat.accentLight} 0%, #ffffff 100%)`,
                        '--border-color': stat.accent,
                        '--border-delay': `${i * -1.5}s`,
                      } as CSSProperties
                    }
                  >
                    <div className="agro-stat-card-value" style={{ color: stat.accent }}>
                      <CountUp value={stat.value} />
                    </div>
                    <div className="agro-stat-card-label">{stat.label}</div>
                    <div className="agro-stat-card-sub">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="agro-band">
        <div className="agro-band-inner">
          <div ref={el => addRef(el, 0)} className="reveal agro-band-intro">
            <div className="agro-section-rule" />
            <p className="agro-eyebrow">Capabilities</p>
            <h2 className="agro-section-title">What we do across the chain</h2>
            <p className="agro-section-sub">
              Deep expertise from sourcing to delivery — same rigor as our tech divisions, rooted in soil and markets.
            </p>
          </div>

          <div className="agro-svc-list">
            {agroServices.map((s, i) => (
              <article
                key={s.id}
                ref={el => addRef(el, 1 + i)}
                className="reveal agro-svc-row"
              >
                <div className="agro-svc-spine" style={{ background: `linear-gradient(180deg, ${s.accent}, #4ade80)` }} aria-hidden />
                <div className="agro-svc-content">
                  <div className="agro-svc-main">
                    <div className="agro-svc-icon" style={{ background: s.accentSoft, borderColor: `${s.accent}33` }}>
                      <AgroServiceIcon kind={s.id} color={s.accent} />
                    </div>
                    <div className="agro-svc-copy">
                      <p className="agro-svc-tagline" style={{ color: s.accent }}>
                        {s.tagline}
                      </p>
                      <h3 className="agro-svc-title">{s.title}</h3>
                      <p className="agro-svc-desc">{s.desc}</p>
                      <ul className="agro-svc-bullets">
                        {s.bullets.map(b => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="agro-svc-media">
                    <img src={s.image} alt={s.title} loading="lazy" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="agro-commit">
        <div className="agro-commit-inner">
          <div ref={el => addRef(el, 5)} className="reveal agro-commit-copy">
            <div className="agro-section-rule" />
            <h2 className="agro-section-title">Quality, sustainability, trust</h2>
            <p className="agro-commit-text">
              Operations align with international food safety and quality standards. Certifications, traceability, and supplier discipline — non-negotiable.
            </p>
            <p className="agro-commit-text">
              Programs back ethical farming, fair pricing at farm-gate, and lower-impact logistics — healthy land feeds stable supply.
            </p>
          </div>
          <div ref={el => addRef(el, 6)} className="reveal agro-commit-grid">
            {[
              { label: 'Quality certified', detail: 'Food safety & compliance' },
              { label: 'Fair trade', detail: 'Ethical farm-gate sourcing' },
              { label: 'Cold chain', detail: 'Temperature-controlled lanes' },
              { label: 'Export ready', detail: 'Documentation handled end-to-end' },
            ].map(item => (
              <div key={item.label} className="agro-commit-tile">
                <div className="agro-commit-tile-label">{item.label}</div>
                <div className="agro-commit-tile-detail">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
