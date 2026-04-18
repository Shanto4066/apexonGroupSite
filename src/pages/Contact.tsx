import React, { useEffect, useRef, useState } from 'react';

interface Props { onNavigate: (page: string) => void; }

function ContactInfoIcon({ kind }: { kind: 'office' | 'phone' | 'email' | 'hours' }) {
  const s = { stroke: '#0f1f4b', strokeWidth: 1.9, fill: 'none' as const, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (kind) {
    case 'office':
      return (
        <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M3 21h18M5 21V7l7-4 7 4v14M9 11h6M9 15h6" />
        </svg>
      );
    case 'phone':
      return (
        <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.12.9.33 1.78.63 2.62a2 2 0 0 1-.45 2.11L8 9.8a16 16 0 0 0 6.2 6.2l1.4-1.3a2 2 0 0 1 2.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0 1 22 16.9z" />
        </svg>
      );
    case 'email':
      return (
        <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
          <path {...s} d="M22 7l-10 7L2 7" />
        </svg>
      );
    case 'hours':
      return (
        <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden>
          <circle {...s} cx={12} cy={12} r={9} />
          <path {...s} d="M12 7v5l3 2" />
        </svg>
      );
    default:
      return null;
  }
}

export const Contact: React.FC<Props> = ({ onNavigate }) => {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', division: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
    }, { threshold: 0.08 });
    revealRefs.current.forEach(ref => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);
  const addRef = (el: HTMLDivElement | null, i: number) => { revealRefs.current[i] = el; };

  const MAIL_API = import.meta.env.VITE_MAIL_API?.trim() || '/api/send-mail';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);

    const fullMessage = [
      `Company: ${formData.company || 'Not specified'}`,
      `Division: ${formData.division || 'General Inquiry'}`,
      '',
      'Message:',
      formData.message
    ].join('\n');

    try {
      const res = await fetch(MAIL_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Message from ${formData.name} (Apexon Group)`,
          _replyto: formData.email,
          name: formData.name,
          email: formData.email,
          message: fullMessage
        })
      });

      const data = await res.json();
      if (res.ok && data.success !== false) {
        setSubmitted(true);
        setFormData({ name: '', email: '', company: '', division: '', message: '' });
      } else {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message.');
    } finally {
      setIsSending(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 18px', borderRadius: 10,
    border: '1.5px solid #e8edf7', background: '#f8f9fc',
    fontSize: '0.9rem', color: '#0d1b3e', fontFamily: 'Inter, sans-serif',
    outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box'
  };

  return (
    <div className="page-enter">
      <section
        className="page-hero"
        style={{
          paddingTop: 76,
          paddingBottom: 80,
          background: 'linear-gradient(165deg, #f7fffe 0%, #ecfeff 42%, #f5f3ff 100%)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.45,
          backgroundImage:
            'radial-gradient(circle at 14% 18%, rgba(20,184,166,0.15) 0%, transparent 35%), radial-gradient(circle at 86% 16%, rgba(124,58,237,0.1) 0%, transparent 36%), repeating-linear-gradient(102deg, rgba(15,31,75,0.035) 0 1px, transparent 1px 64px)'
        }} />
        <div className="deco-blob" style={{ width: 560, height: 560, top: -190, right: -110, background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)' }} />
        <div className="deco-blob" style={{ width: 420, height: 420, bottom: -140, left: -90, background: 'radial-gradient(circle, rgba(20,184,166,0.14) 0%, transparent 72%)' }} />
        <div className="noise-overlay" style={{ opacity: 0.02 }} aria-hidden />
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '80px 32px 0', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(20,184,166,0.28)', borderRadius: 100, padding: '7px 18px', marginBottom: 24 }}>
            <span style={{ color: '#0d9488', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Get In Touch</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#0f1f4b', marginBottom: 20, lineHeight: 1.1 }}>
            Let's Build Something <span className="gradient-text-gold">Extraordinary Together</span>
          </h1>
          <p style={{ color: '#6b7fa8', fontSize: '1.05rem', maxWidth: 560, lineHeight: 1.75 }}>
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
                { label: 'Head Office', value: 'House-115, Road-06, Mohakhali DOHS, Dhaka-1206', icon: 'office' as const },
                { label: 'Phone', value: '+88 01719-183756', icon: 'phone' as const },
                { label: 'Email', value: 'info@apexongroup.net', icon: 'email' as const },
                { label: 'Business Hours', value: 'Sun – Thu: 9:00 AM – 6:00 PM', icon: 'hours' as const },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, background: '#ffffff',
                    border: '1px solid #e8edf7', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, boxShadow: '0 2px 12px rgba(15,31,75,0.06)'
                  }}>
                    <ContactInfoIcon kind={item.icon} />
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
                {[
                  { label: 'ApexonIT', page: 'apexonit' },
                  { label: 'Apexon Agro', page: 'agro' },
                  { label: 'Apexon Medical', page: 'medical' },
                  { label: 'Apexon Garage', page: 'garage' },
                  { label: 'Apexon Visa', page: 'visa' },
                  { label: 'Apexon Cart', page: 'cart' },
                ].map(d => (
                  <button
                    key={d.label}
                    type="button"
                    className="service-tag"
                    style={{ cursor: 'pointer', border: 'none' }}
                    onClick={() => onNavigate(d.page)}
                  >
                    {d.label}
                  </button>
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

                {error && (
                  <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: 16, textAlign: 'center' }}>
                    {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn-navy" 
                  disabled={isSending}
                  style={{ 
                    width: '100%', padding: '15px', borderRadius: 12, border: 'none', 
                    cursor: isSending ? 'not-allowed' : 'pointer', fontSize: '0.95rem',
                    opacity: isSending ? 0.7 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
                  }}
                >
                  {isSending && (
                    <svg className="animate-spin" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                  )}
                  {isSending ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
