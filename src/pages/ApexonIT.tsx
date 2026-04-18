import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { CSSProperties, FC, FormEvent, MouseEvent } from 'react';
import apexonIcon from '../assets/logo/Apexon-blue-only-Icon.svg';
import imgCoreCustomSoftware from '../assets/images/apexonit-core-services/custom-software.jpg';
import imgCoreCctv from '../assets/images/apexonit-core-services/cctv-enterprise.jpg';
import imgCoreItEnabled from '../assets/images/apexonit-core-services/it-enabled.jpg';
import imgCoreDigitalMarketing from '../assets/images/apexonit-core-services/digital-marketing.jpg';
import imgCoreUiUx from '../assets/images/apexonit-core-services/ui-ux-design.jpg';
import imgTeam01 from '../assets/images/apexonit-expert-team/team-01.jpg';
import imgTeam02 from '../assets/images/apexonit-expert-team/team-02.jpg';
import imgTeam03 from '../assets/images/apexonit-expert-team/team-03.jpg';
import imgTeam04 from '../assets/images/apexonit-expert-team/team-04.jpg';
import imgTeam05 from '../assets/images/apexonit-expert-team/team-05.jpg';
import imgTeam06 from '../assets/images/apexonit-expert-team/team-06.jpg';

interface Props { onNavigate: (page: string) => void; }

function TeamCardSocials({ memberName }: { memberName: string }) {
  const stop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };
  return (
    <div className="team-social">
      <a href="#" aria-label={`${memberName} on Facebook`} onClick={stop}>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>
      <a href="#" aria-label={`${memberName} on X`} onClick={stop}>
        <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a href="#" aria-label={`${memberName} on LinkedIn`} onClick={stop}>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
    </div>
  );
}

const CountUp = ({ value }: { value: string }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasStarted(true);
        observer.disconnect();
      }
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
  { value: '200+', label: 'Projects Delivered', sub: 'Shipped worldwide' },
  { value: '98%', label: 'Client Retention', sub: 'Long-term partners' },
  { value: '10+', label: 'Years Expertise', sub: 'Engineering depth' },
  { value: '50+', label: 'Experts', sub: 'Architects & builders' },
];

function ProductIcon({ kind, color }: { kind: string; color: string }) {
  const s = { stroke: color, strokeWidth: 2, fill: 'none' as const, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (kind) {
    case 'hr':
      return (
        <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          <path {...s} d="M20 8v6M23 11h-6M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'garage':
      return (
        <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M5 11l1.5-3h11L19 11v6H5v-6zm2.5 6.5a1.5 1.5 0 1 0 0 .01M16 17.5a1.5 1.5 0 1 0 0 .01" />
        </svg>
      );
    case 'courier':
      return (
        <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M1 3h15v13H1V3zm15 5h4l3 3v5h-7M5 18a2 2 0 1 0 0 .01M16 18a2 2 0 1 0 0 .01" />
        </svg>
      );
    case 'school':
      return (
        <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M22 10l-10-5L2 10l10 5 10-5zM6 12v5c0 1 3 3 6 3s6-2 6-3v-5" />
        </svg>
      );
    case 'freight':
      return (
        <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M3 18h18M5 18V8h10v10M15 8V5H8M3 21h2M19 21h2M8 14h4" />
        </svg>
      );
    case 'pharmacy':
      return (
        <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M12 2v4M8 6h8M10 10h4v12H10V10zM8 14h8" />
        </svg>
      );
    case 'ecommerce':
      return (
        <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden>
          <circle cx={9} cy={20} r={1} fill={color} />
          <circle cx={18} cy={20} r={1} fill={color} />
          <path {...s} d="M2 3h2l2.4 12.2A2 2 0 0 0 8.4 17H19a2 2 0 0 0 2-1.6L22 7H6" />
        </svg>
      );
    case 'document':
      return (
        <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
          <path {...s} d="M14 2v6h6M9 13h6M9 17h6" />
        </svg>
      );
    case 'accounting':
      return (
        <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M4 4h16v16H4V4zm4 4h8M4 12h16M12 4v16" />
        </svg>
      );
    default:
      return (
        <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden>
          <rect {...s} x={4} y={4} width={16} height={16} rx={2} />
        </svg>
      );
  }
}

/** Core service photos live under src/assets/images/apexonit-core-services (bundled; no hotlink). */
const services = [
  {
    title: 'Custom Software Development',
    tagline: 'Engineering that outlasts the roadmap.',
    desc: 'We architect and engineer bespoke enterprise software solutions — from concept to deployment — using modern frameworks, microservices architecture, and agile methodologies. Our software scales with your business.',
    bullets: ['Enterprise ERP Systems', 'Cloud-Native Applications', 'API Integration & Microservices', 'Legacy System Modernization'],
    accent: '#0f1f4b',
    mesh: 'rgba(15,31,75,0.72)',
    image: imgCoreCustomSoftware,
    imageAlt: 'Laptop on desk showing programming work',
  },
  {
    title: 'CCTV Enterprise Solutions',
    tagline: 'Clarity, coverage, command.',
    desc: 'Industry-grade surveillance and security infrastructure for enterprises, campuses, and smart city deployments. We design, supply, install, and maintain end-to-end IP surveillance ecosystems.',
    bullets: ['IP Camera Systems', 'NVR/DVR Enterprise Setup', 'Remote Monitoring', '24/7 NOC Support'],
    accent: '#1a3069',
    mesh: 'rgba(26,48,105,0.7)',
    image: imgCoreCctv,
    imageAlt: 'Office desk with laptop showing security and CCTV monitoring workflows',
  },
  {
    title: 'IT-Enabled Services',
    tagline: 'Your stack. Our watchtower.',
    desc: 'Comprehensive managed IT services that let you focus on your core business while we handle your entire technology stack — infrastructure, cloud, networking, cybersecurity, and helpdesk.',
    bullets: ['Managed IT Services', 'Cloud Migration & DevOps', 'Cybersecurity & Compliance', 'IT Infrastructure Design'],
    accent: '#2a4494',
    mesh: 'rgba(42,68,148,0.68)',
    image: imgCoreItEnabled,
    imageAlt: 'Digital globe and technology network concept',
  },
  {
    title: 'Digital Marketing & SEO',
    tagline: 'Attention engineered into revenue.',
    desc: 'Data-driven digital marketing strategies that put your brand in front of the right audience. From technical SEO to high-converting ad campaigns — we deliver measurable ROI.',
    bullets: ['Technical SEO', 'Google & Meta Ads', 'Content Strategy', 'Analytics & Conversion'],
    accent: '#0c4a6e',
    mesh: 'rgba(12,74,110,0.65)',
    image: imgCoreDigitalMarketing,
    imageAlt: 'Creative team collaborating on marketing strategy',
  },
  {
    title: 'UI/UX Design',
    tagline: 'Interfaces people remember.',
    desc: 'Human-centered design that transforms complex user needs into intuitive, beautiful digital interfaces. Our designs don\'t just look exceptional — they convert and retain users.',
    bullets: ['Product Design Strategy', 'Wireframing & Prototyping', 'Usability Testing', 'Design System Creation'],
    accent: '#5b21b6',
    mesh: 'rgba(91,33,182,0.62)',
    image: imgCoreUiUx,
    imageAlt: 'UX design materials, sticky notes, and interface sketches',
  },
];

const whyChooseItems = [
  {
    title: 'Senior-Led Engineering',
    desc: 'Every project is architected and led by senior engineers with 8+ years of domain expertise.',
    tintB: 'rgba(34, 211, 238, 0.22)',
    tintM: 'rgba(34, 211, 238, 0.09)',
  },
  {
    title: 'Agile Delivery',
    desc: 'Sprint-based development with weekly demos, zero surprises, and on-time delivery — guaranteed.',
    tintB: 'rgba(56, 189, 248, 0.2)',
    tintM: 'rgba(56, 189, 248, 0.085)',
  },
  {
    title: 'Post-Launch Support',
    desc: '12 months of free post-launch support and SLA-backed maintenance for all our products.',
    tintB: 'rgba(201, 168, 76, 0.18)',
    tintM: 'rgba(201, 168, 76, 0.07)',
  },
  {
    title: 'Scalable Architecture',
    desc: 'Solutions architected to scale from startup to enterprise — no rework, no technical debt.',
    tintB: 'rgba(15, 31, 75, 0.1)',
    tintM: 'rgba(15, 31, 75, 0.04)',
  },
];

const expertTeamMembers = [
  { name: 'Kamal Rahman', role: 'Chief Technology Officer', image: imgTeam01, imageAlt: 'Portrait of Chief Technology Officer' },
  { name: 'James Mitchell', role: 'Lead Solutions Architect', image: imgTeam02, imageAlt: 'Portrait of Lead Solutions Architect' },
  { name: 'Nadia Islam', role: 'Head of Security & Infrastructure', image: imgTeam03, imageAlt: 'Portrait of Head of Security and Infrastructure' },
  { name: 'David Chen', role: 'Director of Delivery', image: imgTeam04, imageAlt: 'Portrait of Director of Delivery' },
  { name: 'Sarah Ahmed', role: 'UX Practice Lead', image: imgTeam05, imageAlt: 'Portrait of UX Practice Lead' },
  { name: 'Rafiq Hassan', role: 'Principal Software Engineer', image: imgTeam06, imageAlt: 'Portrait of Principal Software Engineer' },
];

const softwareProducts = [
  {
    id: 'hr',
    kind: 'hr',
    name: 'HR Management System',
    category: 'Human Resources',
    desc: 'Full-cycle human resource management — payroll, attendance, leave, recruitment, and performance in one unified platform.',
    accent: '#0f4c75',
    accentLight: '#e8f2fa',
    features: ['Payroll & attendance', 'Leave & recruitment', 'Performance cycles', 'Unified HR dashboard'],
  },
  {
    id: 'garage',
    kind: 'garage',
    name: 'Garage Management',
    category: 'Automotive Workshop',
    desc: 'Complete workshop management with job cards, inventory, billing, customer history, and parts tracking.',
    accent: '#bc4b16',
    accentLight: '#fdf0e8',
    features: ['Job cards & billing', 'Parts inventory', 'Customer history', 'Service scheduling'],
  },
  {
    id: 'courier',
    kind: 'courier',
    name: 'Courier Management',
    category: 'Logistics',
    desc: 'End-to-end logistics and courier tracking system with real-time GPS, automated billing, and customer portal.',
    accent: '#0077b6',
    accentLight: '#e8f6fc',
    features: ['Real-time GPS tracking', 'Automated billing', 'Customer portal', 'Route optimization'],
  },
  {
    id: 'school',
    kind: 'school',
    name: 'School Management',
    category: 'Education',
    desc: 'Comprehensive academic ERP covering admissions, timetabling, grades, fees, communication, and parent portals.',
    accent: '#5a189a',
    accentLight: '#f3ebfc',
    features: ['Admissions & fees', 'Timetabling & grades', 'Parent portals', 'Staff & communication'],
  },
  {
    id: 'freight',
    kind: 'freight',
    name: 'Freight Forwarding Solution',
    category: 'Supply Chain',
    desc: 'International freight management covering air, sea, and land — with customs documentation and real-time tracking.',
    accent: '#2a6f4f',
    accentLight: '#e8f5ef',
    features: ['Air, sea & land', 'Customs documentation', 'Shipment tracking', 'Carrier integration'],
  },
  {
    id: 'pharmacy',
    kind: 'pharmacy',
    name: 'Pharmacy Management',
    category: 'Healthcare Retail',
    desc: 'Smart pharmacy POS and inventory system with expiry alerts, supplier management, and compliance reporting.',
    accent: '#c1121f',
    accentLight: '#fdecef',
    features: ['POS & dispensing', 'Expiry alerts', 'Supplier management', 'Compliance reports'],
  },
  {
    id: 'ecommerce',
    kind: 'ecommerce',
    name: 'Ecommerce Solution',
    category: 'Retail Technology',
    desc: 'Scalable multi-vendor ecommerce platform with mobile apps, payment gateway integration, and analytics dashboard.',
    accent: '#7c3aed',
    accentLight: '#f3effd',
    features: ['Multi-vendor catalog', 'Payment gateways', 'Mobile-ready storefront', 'Sales analytics'],
  },
  {
    id: 'document',
    kind: 'document',
    name: 'Document Management',
    category: 'Enterprise Content',
    desc: 'Secure, searchable digital document repository with role-based access, version control, and audit trails.',
    accent: '#0d9488',
    accentLight: '#e6faf8',
    features: ['Role-based access', 'Full-text search', 'Version control', 'Audit trails'],
  },
  {
    id: 'accounting',
    kind: 'accounting',
    name: 'Accounting Solution',
    category: 'Finance',
    desc: 'Enterprise-grade accounting and financial reporting software with multi-currency, tax compliance, and audit tools.',
    accent: '#b45309',
    accentLight: '#fff7ed',
    features: ['Multi-currency GL', 'Tax compliance', 'Financial reporting', 'Audit-ready exports'],
  },
];

const DEMO_INBOX = import.meta.env.VITE_DEMO_FORM_EMAIL?.trim() || 'info@apexongroup.net';

const getDemoFormSubmitUrl = () =>
  `https://formsubmit.co/ajax/${encodeURIComponent(DEMO_INBOX)}`;

/** `true` = white hero (matches body #f8f9fc), preview only. `false` = original dark hero. Say “make permanent” → set `false` + move light styles into CSS as default (or keep `true`). */
const IT_HERO_LIGHT_PREVIEW = true;

export const ApexonIT: FC<Props> = ({ onNavigate }) => {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const demoScrollLockY = useRef(0);
  const demoOpenerRef = useRef<HTMLButtonElement | null>(null);
  const [demoModal, setDemoModal] = useState<{ open: boolean; productName: string }>({ open: false, productName: '' });
  const [demoForm, setDemoForm] = useState({ name: '', designation: '', email: '', mobile: '', remarks: '' });
  const [demoFormError, setDemoFormError] = useState<string | null>(null);
  const [isDemoSending, setIsDemoSending] = useState(false);

  const nav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
    }, { threshold: 0.08 });
    revealRefs.current.forEach(ref => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  // Lock scroll without `position: fixed` on body (that pattern resets scroll and jumps after close).
  useLayoutEffect(() => {
    if (!demoModal.open) return;
    const y = window.scrollY;
    demoScrollLockY.current = y;
    const html = document.documentElement;
    const sbw = Math.max(0, window.innerWidth - html.clientWidth);

    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: document.body.style.overflow,
      htmlPaddingRight: html.style.paddingRight,
      bodyPaddingRight: document.body.style.paddingRight,
    };

    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (sbw > 0) {
      const pad = `${sbw}px`;
      html.style.paddingRight = pad;
      document.body.style.paddingRight = pad;
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDemoModal({ open: false, productName: '' });
        setDemoFormError(null);
      }
    };
    window.addEventListener('keydown', onKey);

    const restore = () => {
      const top = demoScrollLockY.current;
      window.scrollTo({ top, left: 0, behavior: 'auto' });
      html.scrollTop = top;
      demoOpenerRef.current?.focus({ preventScroll: true });
    };

    return () => {
      html.style.overflow = prev.htmlOverflow;
      document.body.style.overflow = prev.bodyOverflow;
      html.style.paddingRight = prev.htmlPaddingRight;
      document.body.style.paddingRight = prev.bodyPaddingRight;
      window.removeEventListener('keydown', onKey);

      restore();
      queueMicrotask(restore);
      requestAnimationFrame(() => {
        restore();
        requestAnimationFrame(restore);
      });
    };
  }, [demoModal.open]);

  const openDemoModal = (productName: string) => {
    setDemoForm({ name: '', designation: '', email: '', mobile: '', remarks: '' });
    setDemoFormError(null);
    setIsDemoSending(false);
    setDemoModal({ open: true, productName });
  };

  const closeDemoModal = () => {
    (document.activeElement as HTMLElement | null)?.blur();
    setDemoModal({ open: false, productName: '' });
    setDemoFormError(null);
    setIsDemoSending(false);
  };

  const submitDemoRequest = async (e: FormEvent) => {
    e.preventDefault();
    const name = demoForm.name.trim();
    const designation = demoForm.designation.trim();
    const email = demoForm.email.trim();
    const mobile = demoForm.mobile.trim();
    const remarks = demoForm.remarks.trim();
    if (!name || !designation || !email || !mobile) {
      setDemoFormError('Please enter your name, designation, email, and mobile number.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setDemoFormError('Please enter a valid email address.');
      return;
    }

    const message = [
      `Product: ${demoModal.productName}`,
      `Designation: ${designation}`,
      `Mobile: ${mobile}`,
      '',
      'Remarks:',
      remarks || '—',
    ].join('\n');

    setIsDemoSending(true);
    setDemoFormError(null);
    try {
      const res = await fetch(getDemoFormSubmitUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `Demo request: ${demoModal.productName} (ApexonIT)`,
          _replyto: email,
          _captcha: false,
          name,
          email,
          message,
        }),
      });
      const data: { success?: boolean | string; message?: string; error?: string } = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || data.message || `Request failed (${res.status}).`);
      }
      if (data.error) {
        throw new Error(String(data.error));
      }
      if (data.success === false || data.success === 'false') {
        throw new Error(data.message || 'Could not send this request.');
      }
      closeDemoModal();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Network error. Try again.';
      setDemoFormError(msg);
    } finally {
      setIsDemoSending(false);
    }
  };

  const addRef = (el: HTMLElement | null, i: number) => { revealRefs.current[i] = el; };

  return (
    <div className="page-enter" style={{ background: '#f8f9fc' }}>
      {/* Hero — Home-like structure (2-col + motion), IT identity: cyan grid, 3D stack, scan sweep (no radar) */}
      <section
        className={`it-hero-section${IT_HERO_LIGHT_PREVIEW ? ' it-hero-section--light-preview' : ''}`}
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          paddingTop: 76,
          paddingBottom: 48,
          ...(IT_HERO_LIGHT_PREVIEW ? { background: '#f8f9fc' } : {}),
        }}
      >
        <div
          className="deco-blob animate-blob"
          style={{
            width: 520,
            height: 520,
            top: '-12%',
            right: '-8%',
            background: IT_HERO_LIGHT_PREVIEW
              ? 'radial-gradient(circle, rgba(15,31,75,0.06) 0%, transparent 68%)'
              : 'radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 68%)',
          }}
        />
        <div
          className="deco-blob"
          style={{
            width: 380,
            height: 380,
            bottom: '-10%',
            left: '-6%',
            background: IT_HERO_LIGHT_PREVIEW
              ? 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="it-hero-diagonal-grid" />
        <div className="it-hero-scan" />
        <div className="noise-overlay" style={{ opacity: IT_HERO_LIGHT_PREVIEW ? 0.025 : 0.04 }} />

        {[0, 1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 10 + (i % 3) * 6,
              height: 10 + (i % 3) * 6,
              border: IT_HERO_LIGHT_PREVIEW ? '1px solid rgba(15,31,75,0.12)' : '1px solid rgba(34,211,238,0.25)',
              borderRadius: 4,
              transform: `rotate(${15 + i * 12}deg)`,
              top: `${8 + i * 14}%`,
              left: `${3 + i * 11}%`,
              animation: `it-drift-square ${5 + i * 0.7}s ease-in-out infinite`,
              animationDelay: `${i * 0.35}s`,
              pointerEvents: 'none',
            }}
          />
        ))}

        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '72px 32px 56px', width: '100%', position: 'relative', zIndex: 2 }}>
          <div className="it-hero-grid">
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  borderLeft: '3px solid #22d3ee',
                  background: IT_HERO_LIGHT_PREVIEW ? 'rgba(15,31,75,0.05)' : 'rgba(15,23,42,0.55)',
                  borderRadius: '4px 999px 999px 4px',
                  padding: '8px 20px 8px 14px',
                  marginBottom: 28,
                  border: IT_HERO_LIGHT_PREVIEW ? '1px solid rgba(15,31,75,0.1)' : '1px solid rgba(34,211,238,0.25)',
                  animation: 'fadeInUp 0.65s ease forwards',
                }}
              >
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: IT_HERO_LIGHT_PREVIEW ? '#475569' : '#a5f3fc',
                  }}
                >
                  Information Technology Division
                </span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2.6rem, 5vw, 4.4rem)',
                  fontWeight: 900,
                  lineHeight: 1.08,
                  color: IT_HERO_LIGHT_PREVIEW ? '#0f1f4b' : '#f8fafc',
                  marginBottom: 22,
                }}
              >
                <span style={{ display: 'block', animation: 'fadeInUp 0.7s ease forwards' }}>Apexon IT —</span>
                <span
                  className="it-hero-subline"
                  style={{
                    display: 'block',
                    opacity: 0,
                    animation: 'fadeInUp 0.75s ease forwards 0.08s',
                  }}
                >
                  <span className="gradient-text-cyan">Technology. Reimagined.</span>
                </span>
              </h1>

              <p
                className="it-hero-desc"
                style={{
                  color: IT_HERO_LIGHT_PREVIEW ? '#64748b' : 'rgba(226,232,240,0.78)',
                  fontSize: '1.12rem',
                  maxWidth: 560,
                  lineHeight: 1.78,
                  marginBottom: 36,
                  opacity: 0,
                  animation: 'fadeInUp 0.85s ease forwards 0.18s',
                }}
              >
                We are not just an IT company. We are architects of digital transformation — engineering enterprise-grade software, security infrastructure, and digital strategies that put our clients years ahead of their competition.
              </p>

              <div
                className="it-hero-ctas"
                style={{
                  display: 'flex',
                  gap: 14,
                  flexWrap: 'wrap',
                  opacity: 0,
                  animation: 'fadeInUp 0.9s ease forwards 0.28s',
                }}
              >
                <button type="button" onClick={() => nav('contact')} className="btn-gold" style={{ padding: '14px 28px', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
                  Start a project
                </button>
                <button
                  type="button"
                  onClick={() => nav('contact')}
                  style={{
                    padding: '14px 28px',
                    borderRadius: 12,
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    ...(IT_HERO_LIGHT_PREVIEW
                      ? {
                          color: '#0f1f4b',
                          background: '#fff',
                          border: '1px solid rgba(15,31,75,0.18)',
                        }
                      : {
                          color: '#e0f2fe',
                          background: 'rgba(15,23,42,0.35)',
                          border: '1px solid rgba(34,211,238,0.35)',
                        }),
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLButtonElement;
                    if (IT_HERO_LIGHT_PREVIEW) {
                      el.style.background = 'rgba(34,211,238,0.12)';
                      el.style.borderColor = 'rgba(14,116,144,0.45)';
                    } else {
                      el.style.background = 'rgba(34,211,238,0.12)';
                      el.style.borderColor = 'rgba(34,211,238,0.65)';
                    }
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLButtonElement;
                    if (IT_HERO_LIGHT_PREVIEW) {
                      el.style.background = '#fff';
                      el.style.borderColor = 'rgba(15,31,75,0.18)';
                    } else {
                      el.style.background = 'rgba(15,23,42,0.35)';
                      el.style.borderColor = 'rgba(34,211,238,0.35)';
                    }
                  }}
                >
                  Talk to engineering
                </button>
              </div>
            </div>

            <div className="it-hero-visual-col" style={{ animation: 'fadeInRight 1s ease forwards 0.35s', opacity: 0, animationFillMode: 'forwards' }}>
              <div style={{ perspective: '1100px', perspectiveOrigin: '50% 35%' }}>
                <div className="it-hero-3d-stage">
                  {[
                    { z: -105, y: 40, op: 0.38 },
                    { z: -58, y: 20, op: 0.55 },
                    { z: -18, y: 6, op: 0.72 },
                  ].map((L, i) => (
                    <div
                      key={i}
                      className="it-hero-3d-layer"
                      style={{
                        transform: `translate(-50%, calc(-50% + ${L.y}px)) translateZ(${L.z}px) rotateX(24deg)`,
                        opacity: L.op,
                        zIndex: i,
                      }}
                    />
                  ))}

                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '46%',
                      transform: 'translate(-50%, -50%) translateZ(28px)',
                      zIndex: 10,
                      width: 118,
                      height: 118,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg className="it-hero-hex" width={118} height={118} viewBox="0 0 100 100" aria-hidden style={{ position: 'absolute', opacity: 0.4 }}>
                      <defs>
                        <linearGradient id="itHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#22d3ee" />
                          <stop offset="100%" stopColor="#38bdf8" />
                        </linearGradient>
                      </defs>
                      <polygon points="50,4 92,28 92,72 50,96 8,72 8,28" fill="none" stroke="url(#itHexGrad)" strokeWidth={0.9} />
                      <polygon points="50,18 78,34 78,66 50,82 22,66 22,34" fill="none" stroke="url(#itHexGrad)" strokeWidth={0.6} opacity={0.7} />
                    </svg>
                    <div
                      style={{
                        width: 76,
                        height: 76,
                        borderRadius: '50%',
                        background: IT_HERO_LIGHT_PREVIEW
                          ? 'linear-gradient(145deg, #ffffff, #e8f4fc)'
                          : 'linear-gradient(145deg, rgba(15,31,75,0.95), rgba(8,47,73,0.9))',
                        border: IT_HERO_LIGHT_PREVIEW ? '1px solid rgba(14,116,144,0.25)' : '1px solid rgba(34,211,238,0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: IT_HERO_LIGHT_PREVIEW
                          ? '0 0 0 1px rgba(15,31,75,0.06), 0 16px 36px rgba(15,31,75,0.1)'
                          : '0 0 0 1px rgba(34,211,238,0.15), 0 20px 40px rgba(0,0,0,0.45)',
                      }}
                    >
                      <img
                        src={apexonIcon}
                        alt=""
                        style={{
                          width: 36,
                          height: 36,
                          filter: IT_HERO_LIGHT_PREVIEW ? 'none' : 'brightness(0) invert(1) opacity(0.92)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 14,
                  marginTop: 8,
                  paddingTop: 28,
                  borderTop: IT_HERO_LIGHT_PREVIEW ? '1px solid rgba(15,31,75,0.1)' : '1px solid rgba(148,163,184,0.2)',
                }}
              >
                {heroStats.map(stat => (
                  <div key={stat.label} style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        fontSize: 'clamp(1.45rem, 2.2vw, 2rem)',
                        fontWeight: 900,
                        color: IT_HERO_LIGHT_PREVIEW ? '#0369a1' : '#7dd3fc',
                        lineHeight: 1,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      <CountUp value={stat.value} />
                    </div>
                    <div
                      style={{
                        color: IT_HERO_LIGHT_PREVIEW ? '#0f1f4b' : '#f1f5f9',
                        fontWeight: 800,
                        fontSize: '0.78rem',
                        marginTop: 8,
                      }}
                    >
                      {stat.label}
                    </div>
                    <div
                      style={{
                        color: IT_HERO_LIGHT_PREVIEW ? '#64748b' : 'rgba(148,163,184,0.85)',
                        fontSize: '0.7rem',
                        marginTop: 3,
                        fontWeight: 500,
                      }}
                    >
                      {stat.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services — editorial art direction; photos bundled from src/assets/images/apexonit-core-services */}
      <section className="it-services-section" style={{ padding: '96px 32px 112px' }}>
        <div className="it-svc-bg-word" aria-hidden>CAPABILITIES</div>
        <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div ref={el => addRef(el, 0)} className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
            <div className="section-line" style={{ margin: '0 auto 20px' }} />
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b', marginBottom: 12 }}>
              What we craft
            </p>
            <h2 style={{ fontSize: 'clamp(2.1rem, 4vw, 3.25rem)', fontWeight: 900, color: '#0f1f4b', marginBottom: 16, letterSpacing: '-0.02em' }}>
              Our Core Services
            </h2>
            <p style={{ color: '#6b7fa8', maxWidth: 560, margin: '0 auto', lineHeight: 1.75, fontSize: '1.05rem' }}>
              Every engagement pairs bold creative direction with senior engineering — so the work feels as good as it performs.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            {services.map((s, i) => (
              <article
                key={s.title}
                ref={el => addRef(el, 1 + i)}
                className={`reveal it-svc-card${i % 2 === 1 ? ' it-svc-card--flip' : ''}`}
              >
                <div className="it-svc-visual">
                  <img src={s.image} alt={s.imageAlt} loading="lazy" decoding="async" width={900} height={640} />
                  <div
                    className="it-svc-mesh"
                    style={{
                      background: `linear-gradient(128deg, ${s.mesh} 0%, rgba(0,0,0,0.15) 45%, transparent 72%)`,
                    }}
                  />
                  <div
                    className="it-svc-frame"
                    style={{ borderColor: `${s.accent}44` }}
                  />
                </div>

                <div className="it-svc-body">
                  <span
                    className="it-svc-num"
                    aria-hidden
                    style={{
                      backgroundImage: `linear-gradient(142deg, ${s.accent} 0%, #0e7490 28%, #22d3ee 52%, #38bdf8 72%, #a5f3fc 100%)`,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="it-svc-tagline" style={{ color: s.accent }}>
                    {s.tagline}
                  </p>
                  <h3 style={{ fontSize: 'clamp(1.35rem, 2.2vw, 1.85rem)', fontWeight: 800, color: '#0f1f4b', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                    {s.title}
                  </h3>
                  <p style={{ color: '#64748b', lineHeight: 1.78, fontSize: '0.95rem', maxWidth: 520 }}>{s.desc}</p>
                  <div className="it-svc-chips">
                    {s.bullets.map(b => (
                      <span
                        key={b}
                        className="it-svc-chip"
                        style={{
                          borderColor: `${s.accent}55`,
                          background: `${s.accent}0f`,
                          color: '#334155',
                        }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Software Products — same card pattern as Home “Our Business Verticals” */}
      <section style={{ background: '#f8f9fc', padding: '96px 32px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div ref={el => addRef(el, 6)} className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
            <div className="section-line" style={{ margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: '#0f1f4b', marginBottom: 16 }}>
              Ready-to-Deploy Software Products
            </h2>
            <p style={{ color: '#6b7fa8', fontSize: '1rem', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              Battle-tested, industry-proven software products available for immediate deployment — or customized to your exact requirements.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>
            {softwareProducts.map((p, i) => (
              <div
                key={p.id}
                className="company-card animated-border reveal"
                ref={el => addRef(el, 7 + i)}
                style={{
                  animationDelay: `${i * 0.08}s`,
                  cursor: 'default',
                  background: `linear-gradient(to top, ${p.accentLight} 0%, #ffffff 100%)`,
                  borderRadius: 12,
                  padding: 40,
                  display: 'flex',
                  flexDirection: 'column',
                  '--border-color': p.accent,
                  '--border-delay': `${i * -1.2}s`,
                } as CSSProperties}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 10,
                      background: `${p.accent}08`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ProductIcon kind={p.kind} color={p.accent} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: p.accent,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {p.category}
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f1f4b', marginTop: 2 }}>{p.name}</h3>
                  </div>
                </div>

                <p style={{ color: '#6b7fa8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 32, flex: 1 }}>{p.desc}</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 10px', marginBottom: 32 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#3a4a6b', fontSize: '0.82rem', fontWeight: 500 }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: p.accent, flexShrink: 0 }} />
                      <span style={{ whiteSpace: 'nowrap' }}>{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="it-request-demo"
                  style={{ color: p.accent }}
                  onClick={e => {
                    demoOpenerRef.current = e.currentTarget;
                    openDemoModal(p.name);
                  }}
                >
                  <span className="it-request-demo-label">Request Demo</span>
                  <span className="it-request-demo-arrow" aria-hidden>
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1={5} y1={12} x2={19} y2={12} />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert team — tv-team-card-four pattern; portraits under apexonit-expert-team */}
      <section className="it-team-section" style={{ padding: '96px 32px', background: '#f5f7fc' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div ref={el => addRef(el, 17)} className="reveal it-team-intro">
            <div className="title-wrap three">
              <div className="sub-title-2">
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" />
                  <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Our Team
              </div>
              <h2 className="sec-title">
                Meet the expert team powering our goals and ambitions
              </h2>
              <p className="it-team-v4-lead">
                Architects, builders, and strategists — one crew aligned on outcomes, timelines, and the quality bar your stakeholders expect.
              </p>
            </div>
          </div>
          <div className="it-team-cards-grid">
            {expertTeamMembers.map((m, i) => (
              <article
                key={m.name}
                ref={el => addRef(el, 18 + i)}
                className="reveal tv-team-card-four"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="team-photo">
                  <img src={m.image} alt={m.imageAlt} loading="lazy" decoding="async" width={480} height={480} />
                  <TeamCardSocials memberName={m.name} />
                </div>
                <div className="team-info">
                  <h4 className="team-name">
                    <a href="#" onClick={e => e.preventDefault()}>{m.name}</a>
                  </h4>
                  <p className="team-role">{m.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why ApexonIT — same page body tone; cards + bottom→top hover tint */}
      <section className="it-why-section" style={{ padding: '96px 32px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div ref={el => addRef(el, 24)} className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-line" style={{ margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.85rem)', fontWeight: 900, color: '#0f1f4b', marginBottom: 14, letterSpacing: '-0.02em' }}>
              Why Enterprises Choose <span className="gradient-text-gold">Apexon IT</span>
            </h2>
            <p style={{ color: '#6b7fa8', fontSize: '1rem', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              Proof beats pitch — here is how we stay accountable after the contract is signed.
            </p>
          </div>
          <div className="it-why-grid">
            {whyChooseItems.map((item, i) => (
              <div
                key={item.title}
                ref={el => addRef(el, 25 + i)}
                className="reveal it-why-card"
                style={
                  {
                    '--why-tint-b': item.tintB,
                    '--why-tint-m': item.tintM,
                    animationDelay: `${i * 0.07}s`,
                  } as CSSProperties
                }
              >
                <div className="it-why-card-shade" aria-hidden />
                <div className="it-why-card-inner">
                  <span className="it-why-card-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="it-why-card-title">{item.title}</h3>
                  <p className="it-why-card-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {demoModal.open
        && createPortal(
          <div
            className="it-demo-modal-backdrop"
            role="presentation"
            onClick={closeDemoModal}
          >
            <div
              className="it-demo-modal-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="it-demo-modal-title"
              onClick={e => e.stopPropagation()}
            >
              <div className="it-demo-modal-head">
                <h2 id="it-demo-modal-title" className="it-demo-modal-title">
                  Request a demo
                </h2>
                <p className="it-demo-modal-product">{demoModal.productName}</p>
                <button type="button" className="it-demo-modal-close" onClick={closeDemoModal} aria-label="Close">
                  <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form className="it-demo-modal-form" onSubmit={submitDemoRequest}>
                <div className="it-demo-modal-row">
                  <label className="it-demo-modal-field">
                    <span>Name <abbr title="required">*</abbr></span>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      autoFocus
                      value={demoForm.name}
                      onChange={ev => setDemoForm(f => ({ ...f, name: ev.target.value }))}
                      required
                      placeholder="Full name"
                    />
                  </label>
                  <label className="it-demo-modal-field">
                    <span>Designation <abbr title="required">*</abbr></span>
                    <input
                      type="text"
                      name="designation"
                      autoComplete="organization-title"
                      value={demoForm.designation}
                      onChange={ev => setDemoForm(f => ({ ...f, designation: ev.target.value }))}
                      required
                      placeholder="Job title"
                    />
                  </label>
                </div>
                <div className="it-demo-modal-row">
                  <label className="it-demo-modal-field">
                    <span>Mobile <abbr title="required">*</abbr></span>
                    <input
                      type="tel"
                      name="mobile"
                      autoComplete="tel"
                      value={demoForm.mobile}
                      onChange={ev => setDemoForm(f => ({ ...f, mobile: ev.target.value }))}
                      required
                      placeholder="Phone / WhatsApp"
                    />
                  </label>
                  <label className="it-demo-modal-field">
                    <span>Email <abbr title="required">*</abbr></span>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={demoForm.email}
                      onChange={ev => setDemoForm(f => ({ ...f, email: ev.target.value }))}
                      required
                      placeholder="you@company.com"
                    />
                  </label>
                </div>
                <label className="it-demo-modal-field">
                  <span>Remarks</span>
                  <textarea
                    name="remarks"
                    rows={2}
                    value={demoForm.remarks}
                    onChange={ev => setDemoForm(f => ({ ...f, remarks: ev.target.value }))}
                    placeholder="Use case, timeline, or questions (optional)"
                  />
                </label>
                {demoFormError && <p className="it-demo-modal-error" role="alert">{demoFormError}</p>}
                <div className="it-demo-modal-actions">
                  <button type="button" className="it-demo-modal-btn it-demo-modal-btn--ghost" onClick={closeDemoModal} disabled={isDemoSending}>
                    Cancel
                  </button>
                  <button type="submit" className="it-demo-modal-btn it-demo-modal-btn--primary it-demo-modal-btn--send" disabled={isDemoSending}>
                    <svg className="it-demo-modal-mail-icon" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    {isDemoSending ? 'Sending…' : 'Send request'}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};
