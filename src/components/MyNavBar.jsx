import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/MyNavBar.css';
import logo from '../assets/logo.png';
import { FaChevronLeft, FaBars, FaTimes } from 'react-icons/fa'; // Import des icônes

function MyNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); // État pour le menu

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false); // Ferme le menu après un clic
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
        <img src={logo} alt="Logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#333' }} />
      </div>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {/* Ancres visibles uniquement sur la page d'accueil */}
        {location.pathname === '/' && (
          <>
            <button
              onClick={() => scrollToSection('features-section')}
              className={`nav-link ${activeSection === 'features-section' ? 'active' : ''}`}
            >
              Pourquoi Explo-Math ?
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className={`nav-link ${activeSection === 'how-it-works' ? 'active' : ''}`}
            >
              Comment ça marche ?
            </button>
            <button
              onClick={() => scrollToSection('final-cta')}
              className={`nav-link ${activeSection === 'final-cta' ? 'active' : ''}`}
            >
              Prêt à commencer ?
            </button>
          </>
        )}

        {/* Liens spécifiques à la page AnalyseNum */}
        {location.pathname === '/AnalyseNum' && (
          <>
            <button onClick={() => navigate('/')} className="nav-link">
              Accueil
            </button>
            <button onClick={() => navigate('/about')} className="nav-link">
              À propos
            </button>
          </>
        )}

        {/* Liens spécifiques à la page A Propos */}
        {location.pathname === '/about' && (
          <>
            <button onClick={() => navigate('/')} className="nav-link">
              Accueil
            </button>
            <button onClick={() => navigate('/AnalyseNum')} className="nav-link">
              Passer à l'exploration
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MyNavBar;
