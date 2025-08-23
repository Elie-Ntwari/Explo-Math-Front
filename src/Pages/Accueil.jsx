import { useNavigate } from "react-router-dom";
import "../styles/Accueil.css";
import { useEffect, useState } from "react"; // Ajout de useState
import MyNavBar from "../components/MyNavBar"; // Import de la navbar
import fondImg from '../assets/undraw_mathematics_hc2c.svg';
import TestimonialCarousel from "../components/TestimonialCarousel";
import { FaCalculator, FaShapes, FaChartBar, FaChevronUp } from "react-icons/fa"; // Import de l'icône pour le bouton
import { Trans } from 'react-i18next';
import { useI18n } from "../contexts/I18nContext";



function Accueil() {
    const { t } = useI18n();

    const navigate = useNavigate();
    const [showScrollToTop, setShowScrollToTop] = useState(false); // État pour le bouton flottant

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleScroll = () => {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            setShowScrollToTop(heroBottom < 0); // Affiche le bouton si on dépasse la section
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Remonte en haut de la page
    };

    useEffect(() => {
        document.title = "Explo-Math | Explorez les propriétés des nombres";

        // Ajout de l'écouteur de défilement
        window.addEventListener('scroll', handleScroll);

        // Nettoyage de l'écouteur lors du démontage
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="accueil-container">
            {/* Navbar */}
            <MyNavBar />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-text">
                    <h1 className="hero-title">
                        <Trans i18nKey="accueil.title">
                            Explorez les <span>propriétés des nombres</span> de manière interactive
                        </Trans></h1>
                    <p className="hero-subtitle">{t('accueil.subtitle')}</p>

                    <div className="cta-buttons">

                        <button className="cta-button primary-button" onClick={() => handleNavigate('/AnalyseNum')}>
                            {t('accueil.cta_explore')}
                        </button>
                        <button className="cta-button secondary-button" onClick={() => handleNavigate('/about')}>
                            {t('accueil.cta_learn_more')}
                        </button>
                    </div>
                </div>
                <dotlottie-wc
                    src="https://lottie.host/6d58d41b-22d9-4a65-a89f-4c81367ff1dc/fB8nEUMCYL.lottie"
                    style={{ width: "500px", height: "500px" }}
                    speed="1"
                    autoplay
                    loop
                ></dotlottie-wc>
            </section>

            {/* Features Section */}
            <section id="features-section" className="features-section">
                <h2 className="section-title">{t('accueil.why_title')}</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FaCalculator size={40} />
                        </div>
                        <h3 className="feature-title">{t('accueil.feature1_title')}</h3>
                        <p className="feature-description">{t('accueil.feature1_desc')}</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <FaShapes size={40} />
                        </div>
                        <h3 className="feature-title">{t('accueil.feature2_title')}</h3>
                        <p className="feature-description">{t('accueil.feature2_desc')}</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FaChartBar size={40} />
                        </div>
                        <h3 className="feature-title">{t('accueil.feature3_title')}</h3>
                        <p className="feature-description">{t('accueil.feature3_desc')}</p>

                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="how-it-works">
                <h2 className="section-title">{t('accueil.how_title')}</h2>
                <div className="steps-container">
                    <div className="step">
                        <div className="step-number">1</div>

                        <h3 className="step-title">{t('accueil.step1_title')}</h3>
                        <p className="step-description">{t('accueil.step1_desc')}</p>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>

                        <h3 className="step-title">{t('accueil.step2_title')}</h3>
                        <p className="step-description">{t('accueil.step2_desc')}</p>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3 className="step-title">{t('accueil.step3_title')}</h3>
                        <p className="step-description">{t('accueil.step3_desc')}</p>

                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section id="final-cta" className="final-cta">

                <h2 className="final-cta-title">{t('accueil.ready_title')}</h2>
                <p className="final-cta-subtitle">{t('accueil.ready_subtitle')}</p>
                <button className="cta-button cta-white-button" onClick={() => handleNavigate('/AnalyseNum')}>
                    {t('accueil.cta_explore')}
                </button>

            </section>
            {/* Footer */}
            <section className="final-cta" style={{ background: "#222", padding: "30px 20px" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
                    

                    {/* Liens utiles */}
                    <div style={{ marginBottom: "15px" }}>
                        <a href="/about" style={{ color: "#BBB", margin: "0 15px", textDecoration: "none" }}>
                            {t('navbar.about')}
                        </a>
                        <a href="/contact" style={{ color: "#BBB", margin: "0 15px", textDecoration: "none" }}>
                            {t('about.coordonnees.titre')}
                        </a>
                        <a href="/" style={{ color: "#BBB", margin: "0 15px", textDecoration: "none" }}>
                            {t('navbar.home')}
                        </a>
                    </div>

                    {/* Coordonnées */}
                    <p style={{ fontSize: "14px", color: "#AAA", margin: 0 }}>
                        {t('about.coordonnees.adresse')} <br />
                        {t('about.coordonnees.bp')} | {t('about.coordonnees.telephone')} | {t('about.coordonnees.email')}
                    </p>
                    {/* Texte principal */}
                    <p className="final-cta-subtitle" style={{ fontSize: "15px", color: "#EEE", marginBottom: "10px" }}>
                        {t('accueil.footer_text')}
                    </p>
                </div>
            </section>

            {/* Bouton flottant pour remonter en haut */}
            {showScrollToTop && (
                <button
                    className={`scroll-to-top ${showScrollToTop ? 'show' : ''}`}
                    onClick={scrollToTop}
                >
                    <FaChevronUp size={20} />
                </button>
            )}
        </div>
    );
}



export default Accueil;