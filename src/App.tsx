import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ApexonIT } from './pages/ApexonIT';
import { AgroPage } from './pages/AgroPage';
import { MedicalPage } from './pages/MedicalPage';
import { GaragePage } from './pages/GaragePage';
import { VisaPage } from './pages/VisaPage';
import { CartPage } from './pages/CartPage';
import { Contact } from './pages/Contact';

type Page = 'home' | 'about' | 'apexonit' | 'agro' | 'medical' | 'garage' | 'visa' | 'cart' | 'contact';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
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
        {renderPage()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
