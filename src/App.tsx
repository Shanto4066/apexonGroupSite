import { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const ApexonIT = lazy(() => import('./pages/ApexonIT').then(m => ({ default: m.ApexonIT })));
const AgroPage = lazy(() => import('./pages/AgroPage').then(m => ({ default: m.AgroPage })));
const MedicalPage = lazy(() => import('./pages/MedicalPage').then(m => ({ default: m.MedicalPage })));
const GaragePage = lazy(() => import('./pages/GaragePage').then(m => ({ default: m.GaragePage })));
const VisaPage = lazy(() => import('./pages/VisaPage').then(m => ({ default: m.VisaPage })));
const CartPage = lazy(() => import('./pages/CartPage').then(m => ({ default: m.CartPage })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));

type Page = 'home' | 'about' | 'apexonit' | 'agro' | 'medical' | 'garage' | 'visa' | 'cart' | 'contact';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  useEffect(() => {
    let rafId = 0;
    let lenisInstance: { raf: (t: number) => void; destroy: () => void } | null = null;

    import('lenis').then(({ default: Lenis }) => {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      function raf(time: number) {
        lenisInstance?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance?.destroy();
    };
  }, []);

  useEffect(() => {
    const titles: Record<Page, string> = {
      home: 'Apexon Group — Excellence Across Industries',
      about: 'About Us — Apexon Group',
      apexonit: 'ApexonIT — Technology Division | Apexon Group',
      agro: 'Apexon Agro Business | Apexon Group',
      medical: 'Apexon Medical Accessories | Apexon Group',
      garage: 'Apexon Car Garage | Apexon Group',
      visa: 'Apexon Visa Consult & Ticketing | Apexon Group',
      cart: 'Apexon Cart — E-Commerce | Apexon Group',
      contact: 'Contact Us — Apexon Group',
    };
    document.title = titles[currentPage] || 'Apexon Group';
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={navigate} />;
      case 'about': return <About onNavigate={navigate} />;
      case 'apexonit': return <ApexonIT onNavigate={navigate} />;
      case 'agro': return <AgroPage onNavigate={navigate} />;
      case 'medical': return <MedicalPage onNavigate={navigate} />;
      case 'garage': return <GaragePage onNavigate={navigate} />;
      case 'visa': return <VisaPage onNavigate={navigate} />;
      case 'cart': return <CartPage onNavigate={navigate} />;
      case 'contact': return <Contact onNavigate={navigate} />;
      default: return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8f9fc' }}>
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      <main style={{ flex: 1 }}>
        <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
          {renderPage()}
        </Suspense>
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
