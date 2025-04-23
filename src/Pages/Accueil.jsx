import { useNavigate } from "react-router-dom";
import "../styles/Accueil.css";
import { useEffect } from "react";
import MyNavBar from "../components/MyNavBar"; // Import de la navbar

function Accueil() {
    const navigate = useNavigate();
 
    const handleNavigate = (path) => {
        navigate(path);
    };

    useEffect(() => {
        document.title = "Explo-Math | Explorez les propriétés des nombres";
    }, []);

    return (
        <div className="accueil-container">
            {/* Navbar */}
            <MyNavBar />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-text">
                    <h1 className="hero-title">
                        Explorez les <span>propriétés des nombres</span> de manière interactive
                    </h1>
                    <p className="hero-subtitle">
                        Entrez un nombre et découvrez ses propriétés mathématiques fascinantes : divisibilité, 
                        représentations géométriques, applications et bien plus encore.
                    </p>
                    <div className="cta-buttons">
                        <button 
                            className="cta-button primary-button" 
                            onClick={() => handleNavigate('/AnalyseNum')}
                        >
                            Commencer l'exploration
                        </button>
                        <button 
                            className="cta-button secondary-button"
                            onClick={() => handleNavigate('/about')}
                        >
                            En savoir plus
                        </button>
                    </div>
                </div>
                <img 
                    src="https://img.freepik.com/free-vector/math-concept-illustration_114360-2131.jpg" 
                    alt="Illustration mathématique" 
                    className="hero-image"
                />
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2 className="section-title">Pourquoi explorer les nombres avec Explo-Math ?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🔢</div>
                        <h3 className="feature-title">Propriétés des nombres</h3>
                        <p className="feature-description">
                            Découvrez les propriétés uniques des nombres : divisibilité, primalité, et bien plus.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📐</div>
                        <h3 className="feature-title">Représentations géométriques</h3>
                        <p className="feature-description">
                            Visualisez les nombres sous forme de figures géométriques et comprenez leurs applications.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3 className="feature-title">Applications pratiques</h3>
                        <p className="feature-description">
                            Explorez comment les nombres sont utilisés dans divers domaines comme la cryptographie et la physique.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works">
                <h2 className="section-title">Comment ça marche ?</h2>
                <div className="steps-container">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3 className="step-title">Entrez un nombre</h3>
                        <p className="step-description">
                            Saisissez un nombre entier ou décimal pour commencer votre exploration.
                        </p>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3 className="step-title">Découvrez ses propriétés</h3>
                        <p className="step-description">
                            Apprenez-en davantage sur ses propriétés mathématiques, ses applications et ses représentations.
                        </p>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3 className="step-title">Explorez en profondeur</h3>
                        <p className="step-description">
                            Plongez dans des domaines spécifiques comme la théorie des nombres, la géométrie ou l'algèbre.
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="testimonial-section">
                <h2 className="section-title">Ce que disent nos utilisateurs</h2>
                <div className="testimonials">
                    <div className="testimonial-card">
                        <p className="testimonial-text">
                            "Explo-Math m'a permis de mieux comprendre les propriétés des nombres. Une expérience fascinante !"
                        </p>
                        <p className="testimonial-author">Alice M., étudiante en mathématiques</p>
                    </div>
                    <div className="testimonial-card">
                        <p className="testimonial-text">
                            "Grâce à Explo-Math, j'ai découvert des applications pratiques des nombres que je n'aurais jamais imaginées."
                        </p>
                        <p className="testimonial-author">Jean P., ingénieur</p>
                    </div>
                    <div className="testimonial-card">
                        <p className="testimonial-text">
                            "Une plateforme incontournable pour tous ceux qui veulent explorer les mathématiques de manière ludique."
                        </p>
                        <p className="testimonial-author">Prof. Martin, Université de Lyon</p>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="final-cta">
                <h2 className="final-cta-title">Prêt à explorer les nombres ?</h2>
                <p className="final-cta-subtitle">
                    Rejoignez des milliers d'utilisateurs qui découvrent les mathématiques autrement avec Explo-Math.
                </p>
                <button 
                    className="cta-button cta-white-button" 
                    onClick={() => handleNavigate('/AnalyseNum')}
                >
                    Commencer maintenant
                </button>
            </section>
        </div>
    );
}

export default Accueil;