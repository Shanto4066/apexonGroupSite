import { useEffect, useRef } from 'react';

interface Props { onNavigate: (page: string) => void; }

export const CartPage: React.FC<Props> = () => {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
    }, { threshold: 0.08 });
    revealRefs.current.forEach(ref => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);
  const addRef = (el: HTMLDivElement | null, i: number) => { revealRefs.current[i] = el; };

  const features = [
    { title: 'Multi-Vendor Marketplace', desc: 'A thriving ecosystem where hundreds of curated vendors sell to millions of buyers — with full quality control, secure payments, and trusted dispute resolution.' },
    { title: 'B2B Wholesale Platform', desc: 'Bulk ordering, tiered pricing, business accounts, and net payment terms — Apexon Cart\'s B2B platform is purpose-built for corporate procurement teams.' },
    { title: 'Same-Day Delivery Network', desc: 'Lightning-fast logistics network covering major cities with same-day delivery on thousands of SKUs — powered by our own fleet and third-party logistics partners.' },
    { title: 'Mobile-First Shopping', desc: 'Best-in-class iOS and Android apps with AR try-on, voice search, personalized recommendations, and one-tap checkout for the modern digital consumer.' },
    { title: 'Secure Payment Ecosystem', desc: 'Bank transfers, cards, mobile banking (bKash, Nagad, Rocket), and buy-now-pay-later — we support every payment method your customers prefer.' },
    { title: 'Seller Growth Programs', desc: 'Dedicated account management, promotional co-funding, seller analytics dashboard, and training programs to help our vendor partners grow exponentially.' },
  ];

  const categories = [
    'Electronics & Gadgets', 'Fashion & Apparel', 'Home & Living', 'Health & Beauty',
    'Food & Grocery', 'Sports & Outdoors', 'Books & Stationery', 'Automotive Accessories',
    'Office Supplies', 'Baby & Kids', 'Agricultural Products', 'Medical Accessories'
  ];

  return (
    <div className="page-enter">
      <section style={{ background: 'linear-gradient(135deg, #1a0f05 0%, #4a2a0a 50%, #2a1505 100%)', paddingTop: 76, paddingBottom: 80, minHeight: '60vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="deco-blob" style={{ width: 600, height: 600, top: -150, right: -100, background: 'radial-gradient(circle, rgba(255,180,60,0.12) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '80px 32px 0', position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,180,60,0.12)', border: '1px solid rgba(255,180,60,0.3)', borderRadius: 100, padding: '7px 18px', marginBottom: 24 }}>
            <span style={{ color: '#ffb43c', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>E-Commerce Division</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', marginBottom: 24, lineHeight: 1.1 }}>
            Apexon Cart —{' '}
            <span style={{ background: 'linear-gradient(135deg, #ffb43c, #ffd48a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'block' }}>
              Commerce Without Limits.
            </span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: '1.05rem', maxWidth: 640, lineHeight: 1.8, marginBottom: 40 }}>
            Apexon Cart is not just another online store — it's a complete digital commerce ecosystem connecting consumers, vendors, and businesses in one powerful platform. We're redefining what e-commerce means in our market.
          </p>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[['50k+', 'Products Listed'], ['500+', 'Active Sellers'], ['200k+', 'Customers Served'], ['4.8★', 'App Rating']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ffb43c' }}>{v}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginTop: 4, fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#f8f9fc', padding: '96px 32px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div ref={el => addRef(el, 0)} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg, #7c5a1a, #ffb43c)', borderRadius: 2, margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 800, color: '#0f1f4b', marginBottom: 12 }}>Platform Features</h2>
            <p style={{ color: '#6b7fa8', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
              A feature-rich commerce infrastructure built for scale, trust, and exceptional user experience.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} ref={el => addRef(el, 1 + i)} className="reveal pro-card" style={{ padding: '36px 32px' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#faf0e8', border: '1px solid #7c5a1a22', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: '#7c5a1a', opacity: 0.5 }} />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f1f4b', marginBottom: 12 }}>{f.title}</h3>
                <p style={{ color: '#6b7fa8', fontSize: '0.875rem', lineHeight: 1.75 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#ffffff', padding: '96px 32px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div ref={el => addRef(el, 7)} className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: '#0f1f4b', marginBottom: 14 }}>Product Categories</h2>
            <p style={{ color: '#6b7fa8', maxWidth: 460, margin: '0 auto', lineHeight: 1.7 }}>
              Curated categories spanning everyday essentials to specialized professional products.
            </p>
          </div>
          <div ref={el => addRef(el, 8)} className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {categories.map((c, i) => (
              <span key={i} style={{
                padding: '12px 22px', borderRadius: 12, background: '#f8f9fc',
                border: '1px solid #e8edf7', fontWeight: 600, color: '#3a4a6b', fontSize: '0.875rem',
                transition: 'all 0.3s', cursor: 'pointer'
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#7c5a1a'; (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = '#7c5a1a'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#f8f9fc'; (e.currentTarget as HTMLElement).style.color = '#3a4a6b'; (e.currentTarget as HTMLElement).style.borderColor = '#e8edf7'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
              >{c}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg, #4a2a0a, #7c5a1a)', padding: '80px 32px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: '#fff', marginBottom: 16 }}>
            Become an Apexon Cart Seller
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', marginBottom: 36, lineHeight: 1.7 }}>
            Join 500+ successful sellers on Apexon Cart. Zero listing fees for the first 3 months, dedicated onboarding support, and access to 200,000+ active buyers.
          </p>
          <button className="btn-gold" style={{ padding: '14px 40px', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
            Apply to Sell Now
          </button>
        </div>
      </section>
    </div>
  );
};
