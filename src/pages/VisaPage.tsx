import { useLayoutEffect, useRef } from 'react';
import type { FC } from 'react';

interface Props { onNavigate: (page: string) => void; }

export const VisaPage: FC<Props> = () => {
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
      icon: '✈',
      title: 'Visa Consultation & Processing',
      desc: 'Expert visa consultation for 50+ countries — tourist, business, student, work, and immigration visas. We handle every document, form, and embassy requirement with meticulous precision.',
      color: '#7c3aed'
    },
    {
      icon: '🎫',
      title: 'International Air Ticketing',
      desc: 'Best-in-class international and domestic ticketing with access to all major airlines. Exclusive corporate rates, group booking discounts, and 24/7 rebooking support.',
      color: '#6366f1'
    },
    {
      icon: '🏢',
      title: 'Corporate Travel Management',
      desc: 'Complete travel management services for corporations — policy management, expense control, preferred vendor relationships, and dedicated travel desk operations.',
      color: '#8b5cf6'
    },
    {
      icon: '🌍',
      title: 'Immigration Advisory',
      desc: 'Comprehensive immigration guidance for individuals seeking permanent residency, work permits, and citizenship pathways in Canada, Australia, UK, UAE, and more.',
      color: '#a78bfa'
    },
    {
      icon: '🏝',
      title: 'Holiday Packages',
      desc: 'Curated international holiday packages — from luxury Maldives retreats to European multi-country tours — designed by travel experts with 10+ years in leisure travel.',
      color: '#7c3aed'
    },
    {
      icon: '🕌',
      title: 'Hajj & Umrah Services',
      desc: 'Fully managed Hajj and Umrah packages with premium accommodation near Haram, comfortable transportation, and experienced group leaders ensuring a spiritually fulfilling journey.',
      color: '#6366f1'
    },
  ];

  const countries = [
    '🇺🇸 USA', '🇬🇧 UK', '🇨🇦 Canada', '🇦🇺 Australia',
    '🇩🇪 Germany', '🇫🇷 France', '🇦🇪 UAE', '🇸🇦 Saudi Arabia',
    '🇯🇵 Japan', '🇨🇳 China', '🇲🇾 Malaysia', '🇸🇬 Singapore'
  ];

  return (
    <div className="page-enter visa-page">
      {/* Hero */}
      <section className="visa-hero">
        <div className="visa-hero-grid">
          <div className="visa-hero-content">
            <div className="visa-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              Travel & Immigration Division
            </div>
            <h1 className="visa-title">
              Apexon Visa Consult —
              <span>Your World,<br/>Without Borders.</span>
            </h1>
            <p className="visa-lead">
              The region's most trusted travel and immigration solutions provider. Deep expertise in visa processing for 50+ countries with world-class airfares — making global mobility seamless.
            </p>
            <div className="visa-stats">
              {[['50+', 'Countries'], ['5000+', 'Visas'], ['99%', 'Approval'], ['10+', 'Years']].map(([v, l]) => (
                <div key={l} className="visa-stat">
                  <div className="visa-stat-val">{v}</div>
                  <div className="visa-stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="visa-globe-wrapper">
            <div className="visa-globe">
              <div className="visa-globe-ring visa-globe-ring--1" />
              <div className="visa-globe-ring visa-globe-ring--2" />
              <div className="visa-globe-ring visa-globe-ring--3" />
              <div className="visa-globe-core" />
              <div className="visa-globe-dot" style={{ top: '22%', left: '30%', animationDelay: '0s' }} />
              <div className="visa-globe-dot" style={{ top: '45%', left: '65%', animationDelay: '0.8s' }} />
              <div className="visa-globe-dot" style={{ top: '68%', left: '40%', animationDelay: '1.6s' }} />
              <div className="visa-globe-dot" style={{ top: '35%', left: '78%', animationDelay: '2.4s' }} />
              <div className="visa-globe-dot" style={{ top: '55%', left: '20%', animationDelay: '3.2s' }} />
              {/* Flight path arc */}
              <svg className="visa-flight-path" viewBox="0 0 300 300">
                <path d="M 60,200 Q 150,40 240,180" fill="none" stroke="url(#visaFlightGrad)" strokeWidth="1.5" strokeDasharray="6 4" />
                <circle r="4" fill="#c084fc">
                  <animateMotion dur="4s" repeatCount="indefinite" path="M 60,200 Q 150,40 240,180" />
                </circle>
                <defs>
                  <linearGradient id="visaFlightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#c084fc" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#c084fc" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Services — Boarding Pass Cards */}
      <section className="visa-services">
        <div className="visa-container">
          <div ref={el => addRef(el, 0)} className="reveal">
            <div className="visa-section-rule" />
            <h2 className="visa-section-title">Comprehensive Travel Services</h2>
            <p className="visa-section-sub">
              From visa applications to luxury holidays — every aspect of your journey, handled by experts.
            </p>
          </div>
          <div className="visa-service-grid">
            {services.map((s, i) => (
              <div key={i} ref={el => addRef(el, i + 1)} className="reveal visa-boarding-card">
                <div className="visa-boarding-left">
                  <div className="visa-boarding-icon" style={{ background: `${s.color}15`, borderColor: `${s.color}30` }}>
                    <span>{s.icon}</span>
                  </div>
                  <h3 className="visa-boarding-title">{s.title}</h3>
                  <p className="visa-boarding-desc">{s.desc}</p>
                </div>
                <div className="visa-boarding-divider">
                  <div className="visa-boarding-notch visa-boarding-notch--top" />
                  <div className="visa-boarding-dashes" />
                  <div className="visa-boarding-notch visa-boarding-notch--bottom" />
                </div>
                <div className="visa-boarding-right">
                  <div className="visa-boarding-num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="visa-boarding-gate">GATE</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries — Passport Stamps */}
      <section className="visa-countries">
        <div className="visa-container">
          <div ref={el => addRef(el, 7)} className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 className="visa-section-title" style={{ textAlign: 'center' }}>Countries We Cover</h2>
            <p className="visa-section-sub" style={{ margin: '0 auto' }}>
              Visa processing expertise for 50+ countries across 6 continents.
            </p>
          </div>
          <div ref={el => addRef(el, 8)} className="reveal visa-stamp-grid">
            {countries.map((c, i) => (
              <div key={i} className="visa-stamp" style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="visa-stamp-text">{c}</span>
              </div>
            ))}
            <div className="visa-stamp visa-stamp--accent">
              <span className="visa-stamp-text">+38 More</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
