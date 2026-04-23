import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { FC } from 'react';

interface Props { onNavigate: (page: string) => void; }

// CountUp component
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

  const decimalMatch = value.match(/^(\d+)\.(\d+)(.*)$/);
  if (decimalMatch) {
    const [, whole, frac, suffix] = decimalMatch;
    const renderDigits = (digits: string, offset: number) =>
      digits.split('').map((digit, i) => (
        <div
          key={`${offset}-${i}`}
          className="rolling-digit"
          style={{
            transform: hasStarted ? `translateY(-${parseInt(digit, 10) * 1.2}em)` : 'translateY(0)',
            transitionDelay: `${(offset + i) * 0.1}s`,
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
            <span key={n}>{n}</span>
          ))}
        </div>
      ));
    return (
      <div ref={nodeRef} className="rolling-counter">
        {renderDigits(whole, 0)}
        <span className="rolling-decimal" aria-hidden="true">.</span>
        {renderDigits(frac, whole.length)}
        <span style={{ marginLeft: '4px', verticalAlign: 'baseline' }}>{suffix}</span>
      </div>
    );
  }

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

export const CartPage: FC<Props> = () => {
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

  const heroStats = [
    { value: '500k+', label: 'Products Listed' },
    { value: '5000+', label: 'Active Sellers' },
    { value: '2M+', label: 'Customers' },
    { value: '4.9★', label: 'App Rating' },
  ];

  const features = [
    { title: 'Multi-Vendor Marketplace', icon: '🛒', desc: 'A thriving ecosystem where hundreds of curated vendors sell to millions of buyers — with full quality control, secure payments, and trusted dispute resolution.' },
    { title: 'B2B Wholesale Platform', icon: '🏢', desc: 'Bulk ordering, tiered pricing, business accounts, and net payment terms — Apexon Cart\'s B2B platform is purpose-built for corporate procurement teams.' },
    { title: 'Same-Day Delivery', icon: '⚡', desc: 'Lightning-fast logistics network covering major cities with same-day delivery on thousands of SKUs — powered by our own fleet and 3PL partners.' },
    { title: 'Mobile-First Shopping', icon: '📱', desc: 'Best-in-class iOS and Android apps with AR try-on, voice search, personalized recommendations, and one-tap checkout for the modern digital consumer.' },
    { title: 'Secure Payment Ecosystem', icon: '💳', desc: 'Bank transfers, cards, mobile banking (bKash, Nagad, Rocket), and buy-now-pay-later — we support every payment method your customers prefer.' },
    { title: 'Seller Growth Programs', icon: '📈', desc: 'Dedicated account management, promotional co-funding, seller analytics dashboard, and training programs to help our vendor partners grow exponentially.' },
  ];

  const categories = [
    'Electronics & Gadgets', 'Fashion & Apparel', 'Home & Living', 'Health & Beauty',
    'Food & Grocery', 'Sports & Outdoors', 'Books & Stationery', 'Automotive Accessories',
    'Office Supplies', 'Baby & Kids', 'Agricultural Products', 'Medical Accessories'
  ];

  return (
    <div className="page-enter cart-page">
      {/* Hero Section */}
      <section className="cart-hero"> 
        <div className="cart-hero-grid">
          <div>
            <div className="cart-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              E-Commerce Division
            </div>
            <h1 className="cart-title">
              Apexon Cart —
              <span>Commerce Without Limits.</span>
            </h1>
            <p className="cart-lead">
              Apexon Cart is not just another online store — it's a complete digital commerce ecosystem connecting consumers, vendors, and businesses in one powerful platform.
            </p>
            <div className="cart-hero-stats">
              {heroStats.map((s, i) => (
                <div key={s.label} className="cart-hero-stat-card" style={{ animationDelay: `${0.3 + i * 0.12}s` }}>
                  <div className="cart-hero-stat-val">
                    <CountUp value={s.value} />
                  </div>
                  <div className="cart-hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="cart-3d-wrapper">
            <div className="cart-3d-scene">
              <div className="cart-3d-cube">
                <div className="cube-face cube-front"></div>
                <div className="cube-face cube-back"></div>
                <div className="cube-face cube-right"></div>
                <div className="cube-face cube-left"></div>
                <div className="cube-face cube-top"></div>
                <div className="cube-face cube-bottom"></div>
              </div>
              <div className="cart-3d-shadow"></div>
              {/* Floating particles */}
              <div className="cart-orbit cart-orbit-1"><div className="cart-orbit-orb" /></div>
              <div className="cart-orbit cart-orbit-2"><div className="cart-orbit-orb" /></div>
              <div className="cart-orbit cart-orbit-3"><div className="cart-orbit-orb" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="cart-features-section">
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div ref={el => addRef(el, 0)} className="reveal cart-section-header">
            <div className="cart-section-rule" />
            <h2 className="cart-section-title">Platform Features</h2>
            <p className="cart-section-sub">
              A feature-rich commerce infrastructure built for scale, trust, and exceptional user experience.
            </p>
          </div>
          
          <div className="cart-features-grid">
            {features.map((f, i) => (
              <div key={i} ref={el => addRef(el, i + 1)} className="reveal cart-feature-card">
                <div className="cart-feature-icon">{f.icon}</div>
                <h3 className="cart-feature-title">{f.title}</h3>
                <p className="cart-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="cart-categories-section">
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div ref={el => addRef(el, 7)} className="reveal cart-section-header">
            <h2 className="cart-section-title">Endless Aisles</h2>
            <p className="cart-section-sub">
              Curated product categories spanning everyday essentials to specialized corporate procurement.
            </p>
          </div>
          <div ref={el => addRef(el, 8)} className="reveal cart-categories-flex">
            {categories.map((c, i) => (
              <span key={i} className="cart-category-pill">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cart-cta-section">
        <div ref={el => addRef(el, 9)} className="reveal cart-cta-box">
          <h2>Become an Apexon Cart Seller</h2>
          <p>
            Join thousands of successful sellers. Zero listing fees for the first 3 months, dedicated onboarding support, and immediate access to millions of active buyers.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="cart-cta-btn">Apply to Sell Now</button>
            <button className="cart-cta-btn secondary" onClick={() => window.open('https://apexoncart.com', '_blank')}>Shop Now</button>
          </div>
        </div>
      </section>
    </div>
  );
};
