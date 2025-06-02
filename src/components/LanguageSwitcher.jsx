import { useState, useRef, useEffect } from 'react';
import enFlag from '../assets/gb.png';
import frFlag from '../assets/fr.png';
import '../styles/LanguageSwitcher.css';
import { useI18n } from '../contexts/I18nContext';





function LanguageSwitcher() {

  const { t, i18n, changeMyLanguage } = useI18n();
  const languages = [
    { code: 'en', label: t('navbar.langEng'), flag: enFlag },
    { code: 'fr', label: t('navbar.langFr'), flag: frFlag },
  ];


  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button className="active-lang" onClick={() => setOpen(!open)}>
        <img src={currentLang.flag} alt={currentLang.label} />
        <span className="arrow">▼</span>
      </button>
      {open && (
        <div className="lang-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeMyLanguage(lang.code)}
              className={`lang-option ${lang.code === i18n.language ? 'selected' : ''}`}
            >
              <img src={lang.flag} alt={lang.label} />
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


export default LanguageSwitcher;
