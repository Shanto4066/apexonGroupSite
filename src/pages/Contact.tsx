import React, { useEffect, useRef, useState } from 'react';

interface Props { onNavigate: (page: string) => void; }

export const Contact: React.FC<Props> = () => {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', division: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
    }, { threshold: 0.08 });
    revealRefs.current.forEach(ref => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);
  const addRef = (el: HTMLDivElement | null, i: number) => { revealRefs.current[i] = el; };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 18px', borderRadius: 10,
    border: '1.5px solid #e8edf7', background: '#f8f9fc',
    fontSize: '0.9rem', color: '#0d1b3e', fontFamily: 'Inter, sans-serif',
    outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box'
  };

  return (
    <div className="page-enter">
      <section className="page-hero" style={{ paddingTop: 76, paddingBottom: 80 }}>
        <div className="deco-blob" style={{ width: 600, height: 600, top: -200, right: -100, background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '80px 32px 0', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 100, padding: '7px 18px', marginBottom: 24 }}>
            <span style={{ color: '#c9a84c', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Get In Touch</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', marginBottom: 20, lineHeight: 1.1 }}>
            Let's Build Something <span className="gradient-text-gold">Extraordinary Together</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', maxWidth: 560, lineHeight: 1.75 }}>
            Whether you need enterprise software, agro commodities, healthcare supplies, or anything in between — Apexon Group has the expertise to deliver.
          </p>
        </div>
      </section>

      <section style={{ background: '#f8f9fc', padding: '96px 32px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 56, alignItems: 'start' }}>

          {/* Contact Info */}
          <div ref={el => addRef(el, 0)} className="reveal">
            <div className="section-line" style={{ marginBottom: 20 }} />
            <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 800, color: '#0f1f4b', marginBottom: 16 }}>Contact Information</h2>
            <p style={{ color: '#6b7fa8', lineHeight: 1.75, marginBottom: 36, fontSize: '0.95rem' }}>
              Our team of experts is ready to understand your requirements and chart the best solution for your business.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { label: 'Head Office', value: 'Apexon Tower, Business District, Dhaka-1000, Bangladesh' },
                { label: 'Phone', value: '+880 1700 000 000' },
                { label: 'Email', value: 'info@apexongroup.com' },
                { label: 'Business Hours', value: 'Sun – Thu: 9:00 AM – 6:00 PM' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, background: '#ffffff',
                    border: '1px solid #e8edf7', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, boxShadow: '0 2px 12px rgba(15,31,75,0.06)'
                  }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#0f1f4b', opacity: 0.3 }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#c9a84c', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ color: '#3a4a6b', fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.5 }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Division links */}
            <div style={{ marginTop: 40, padding: '28px', background: '#ffffff', borderRadius: 16, border: '1px solid #e8edf7' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b7fa8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Our Divisions</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['ApexonIT', 'Apexon Agro', 'Apexon Medical', 'Apexon Garage', 'Apexon Visa', 'Apexon Cart'].map(d => (
                  <span key={d} className="service-tag">{d}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={el => addRef(el, 1)} className="reveal" style={{ background: '#ffffff', borderRadius: 20, padding: '48px 44px', border: '1px solid #e8edf7', boxShadow: '0 8px 40px rgba(15,31,75,0.08)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #0f1f4b, #2a4494)', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontSize: '1.6rem' }}>✓</span>
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f1f4b', marginBottom: 12 }}>Message Received!</h3>
                <p style={{ color: '#6b7fa8', lineHeight: 1.7 }}>Our team will reach out within 24 hours. Thank you for considering Apexon Group.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f1f4b', marginBottom: 8 }}>Send Us a Message</h3>
                <p style={{ color: '#6b7fa8', fontSize: '0.875rem', marginBottom: 32, lineHeight: 1.6 }}>Fill out the form and our team will get back to you within one business day.</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#3a4a6b', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Full Name *</label>
                    <input required style={inputStyle} placeholder="John Smith" value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      onFocus={e => { e.target.style.borderColor = '#0f1f4b'; e.target.style.background = '#fff'; }}
                      onBlur={e => { e.target.style.borderColor = '#e8edf7'; e.target.style.background = '#f8f9fc'; }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#3a4a6b', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Email Address *</label>
                    <input required type="email" style={inputStyle} placeholder="john@company.com" value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      onFocus={e => { e.target.style.borderColor = '#0f1f4b'; e.target.style.background = '#fff'; }}
                      onBlur={e => { e.target.style.borderColor = '#e8edf7'; e.target.style.background = '#f8f9fc'; }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#3a4a6b', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Company / Organization</label>
                  <input style={inputStyle} placeholder="Your Company Name" value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    onFocus={e => { e.target.style.borderColor = '#0f1f4b'; e.target.style.background = '#fff'; }}
                    onBlur={e => { e.target.style.borderColor = '#e8edf7'; e.target.style.background = '#f8f9fc'; }}
                  />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#3a4a6b', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Division of Interest</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} value={formData.division}
                    onChange={e => setFormData({ ...formData, division: e.target.value })}
                    onFocus={e => { e.target.style.borderColor = '#0f1f4b'; e.target.style.background = '#fff'; }}
                    onBlur={e => { e.target.style.borderColor = '#e8edf7'; e.target.style.background = '#f8f9fc'; }}
                  >
                    <option value="">Select a division...</option>
                    <option>ApexonIT — Technology</option>
                    <option>Apexon Agro Business</option>
                    <option>Apexon Medical Accessories</option>
                    <option>Apexon Car Garage</option>
                    <option>Apexon Visa Consult & Ticketing</option>
                    <option>Apexon Cart — E-Commerce</option>
                    <option>General Inquiry — Group Level</option>
                  </select>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#3a4a6b', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Message *</label>
                  <textarea required rows={5} style={{ ...inputStyle, resize: 'vertical' as const, minHeight: 120 }} placeholder="Tell us about your project or requirements..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    onFocus={e => { e.target.style.borderColor = '#0f1f4b'; e.target.style.background = '#fff'; }}
                    onBlur={e => { e.target.style.borderColor = '#e8edf7'; e.target.style.background = '#f8f9fc'; }}
                  />
                </div>

                <button type="submit" className="btn-navy" style={{ width: '100%', padding: '15px', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
