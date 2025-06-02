import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MyNavBar from '../components/MyNavBar';
import '../styles/About.css';
import { useI18n } from '../contexts/I18nContext';

function About() {
    const { t } = useI18n();
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="about-container">
            <MyNavBar />
            <div className="about-content">
                <button 
                    className="back-button" 
                    onClick={() => handleNavigate('/')}
                >
                    {t('about.retour')}
                </button>

                <h1 className="about-title">{t('about.titre')}</h1>
                
                <div className="about-section">
                    <p>{t('about.description1')}</p>
                    <p>{t('about.description2')}</p>
                    <p>{t('about.description3')}</p>
                    <p>{t('about.description4')}</p>

                    <div className="contact-info">
                        <h2>{t('about.coordonnees.titre')}</h2>
                        <p>{t('about.coordonnees.adresse')}</p>
                        <p>{t('about.coordonnees.departement')}</p>
                        <p>{t('about.coordonnees.bureau')}</p>
                        <p>{t('about.coordonnees.bp')}</p>
                        <p>{t('about.coordonnees.email')} : <a href="mailto:cirem@upc.ac.cd">cirem@upc.ac.cd</a></p>
                        <p>{t('about.coordonnees.site')} : <a href="https://upc.ac.cd" target="_blank" rel="noopener noreferrer">https://upc.ac.cd</a></p>
                        <p>{t('about.coordonnees.telephone')} : +243 81 94 93 358</p>
                        <p>{t('about.coordonnees.x')} : <a href="https://twitter.com/CIREMath" target="_blank" rel="noopener noreferrer">@CIREMath</a></p>
                    </div>

                    <div className="director-info">
                        <p>{t('about.directeur')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
