import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import enFlag from '../assets/gb.png';
import frFlag from '../assets/fr.png';
import '../styles/LanguageSwitcher.css';
import { useI18n } from '../contexts/I18nContext';

const LanguageSwitcher = forwardRef(function LanguageSwitcher({ onOpen, onSelect }, ref) {
  const { t, i18n, changeMyLanguage } = useI18n();
  const languages = [
    { code: 'en', label: t('navbar.langEng'), flag: enFlag },
    { code: 'fr', label: t('navbar.langFr'), flag: frFlag },
  ];

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  useImperativeHandle(ref, () => ({
    close: () => setOpen(false),
    isOpen: () => open,
  }), [open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOpen = () => {
    setOpen(prev => {
      const next = !prev;
      if (next && onOpen) onOpen(); // si on ouvre le switcher → fermer le burger
      return next;
    });
  };

  const handleChangeLanguage = (code) => {
    changeMyLanguage(code);
    setOpen(false);
    if (onSelect) onSelect(code); // après choix langue → fermer le burger
  };

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button className="active-lang" onClick={toggleOpen}>
        <img src={currentLang.flag} alt={currentLang.label} />
        <span className="arrow">▼</span>
      </button>
      {open && (
        <div className="lang-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChangeLanguage(lang.code)}
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
});

export default LanguageSwitcher;
