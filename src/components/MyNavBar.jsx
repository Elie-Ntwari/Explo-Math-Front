import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import '../styles/MyNavBar.css';
import logo from '../assets/logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '../contexts/I18nContext';

function MyNavBar() {
  const { i18n, t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const langRef = useRef(null); // ref vers le switcher

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
    // on peut aussi fermer le switcher par sécurité
    langRef.current?.close?.();
  };

  const handleScroll = () => {
    const sections = ['features-section', 'how-it-works', 'final-cta'];
    let currentSection = '';
    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) currentSection = id;
      }
    });
    setActiveSection(currentSection);
  };

  useEffect(() => {
    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <div className="mynavbarContainer">
      <div className="myLogo">
        <img
          src={logo}
          alt="Logo"
          className="logo"
          onClick={() => { navigate('/'); setMenuOpen(false); langRef.current?.close?.(); }}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {location.pathname === '/' && (
          <>
            <button
              onClick={() => scrollToSection('features-section')}
              className={`nav-link ${activeSection === 'features-section' ? 'active' : ''}`}
            >
              {t('navbar.whyExplo')}
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className={`nav-link ${activeSection === 'how-it-works' ? 'active' : ''}`}
            >
              {t('navbar.works')}
            </button>
            <button
              onClick={() => scrollToSection('final-cta')}
              className={`nav-link ${activeSection === 'final-cta' ? 'active' : ''}`}
            >
              {t('navbar.start')}
            </button>
          </>
        )}

        {location.pathname === '/AnalyseNum' && (
          <>
            <button onClick={() => { navigate('/'); setMenuOpen(false); langRef.current?.close?.(); }} className="nav-link">
              {t('navbar.home')}
            </button>
            <button onClick={() => { navigate('/about'); setMenuOpen(false); langRef.current?.close?.(); }} className="nav-link">
              {t('navbar.about')}
            </button>
          </>
        )}

        {location.pathname === '/about' && (
          <>
            <button onClick={() => { navigate('/'); setMenuOpen(false); langRef.current?.close?.(); }} className="nav-link">
              {t('navbar.home')}
            </button>
            <button onClick={() => { navigate('/AnalyseNum'); setMenuOpen(false); langRef.current?.close?.(); }} className="nav-link">
              {t('navbar.start2')}
            </button>
          </>
        )}
      </div>

      {/* Switcher de langue */}
      <LanguageSwitcher
        ref={langRef}
        onOpen={() => setMenuOpen(false)}     // si le switcher s’ouvre → fermer burger
        onSelect={() => setMenuOpen(false)}   // après choix langue → fermer burger
      />

      <button
        className="menu-toggle"
        onClick={() => {
          setMenuOpen(prev => {
            const next = !prev;
            if (next) langRef.current?.close?.(); // si on ouvre le burger → fermer switcher
            return next;
          });
        }}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>
  );
}

export default MyNavBar;
