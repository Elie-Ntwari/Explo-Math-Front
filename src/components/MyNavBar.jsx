import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/MyNavBar.css';
import logo from '../assets/logo.png';

import { FaBars, FaTimes } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '../contexts/I18nContext';



function MyNavBar() {
  const { i18n, t, changeMyLanguage } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const handleScroll = () => {
    const sections = ['features-section', 'how-it-works', 'final-cta'];
    let currentSection = '';

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = id;
        }
      }
    });

    setActiveSection(currentSection);
  };

  useEffect(() => {
    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return (
    <div className="mynavbarContainer">
      <div className="myLogo">
        <img src={logo} alt="Logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
      </div>

      {/* Sélecteur de langue avec images de drapeaux */}
      <LanguageSwitcher />

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

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
            <button onClick={() => navigate('/')} className="nav-link">
              {t('navbar.home')}
            </button>
            <button onClick={() => navigate('/about')} className="nav-link">
              {t('navbar.about')}
            </button>
          </>
        )}

        {location.pathname === '/about' && (
          <>
            <button onClick={() => navigate('/')} className="nav-link">
              {t('navbar.home')}
            </button>
            <button onClick={() => navigate('/AnalyseNum')} className="nav-link">
              {t('navbar.start2')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}


export default MyNavBar;
