import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyNavBar from '../components/MyNavBar';
import '../styles/About.css';

function About() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="about-container">
            {/* Navbar */}
            <MyNavBar />

            <div className="about-content">

                <button 
                    className="back-button" 
                    onClick={() => handleNavigate('/')}
                >
                    Retour à l'accueil
                </button>
                <h1 className="about-title">À propos d'Explo-Math</h1>
                
                <div className="about-section">
                    <p>
                        Explo-Math est une application qui appartient au <strong>Centre Interuniversitaire de Recherche en Économie Mathématique (CIREM)</strong> de l'UPC.
                    </p>
                    
                    <p>
                        Le CIREM traite l'économie avec la rigueur des mathématiques, affirmant ainsi son engagement en faveur d'une approche scientifique structurée.
                    </p>
                    
                    <p>
                        Loin de se limiter à une analyse immédiate ou descriptive des phénomènes économiques, le CIREM entend privilégier une approche froide, essentielle à la formalisation, à la caractérisation et à la compréhension des mécanismes sous-jacents aux dynamiques économiques.
                    </p>
                    
                    <p>
                        Les publications de la collection CIREM WPS ont pour vocation de diffuser des recherches innovantes en mathématiques fondamentales et appliquées, couvrant un large spectre allant de la microéconomie et la macroéconomie à l'économétrie, la statistique, la théorie des jeux et les modèles d'équilibre général.
                    </p>

                    <div className="contact-info">
                        <h2>Coordonnées</h2>
                        <p>Croisement des avenues de Libération et Boulevard Triomphal, Kinshasa, RDC</p>
                        <p>Département des sciences économiques</p>
                        <p>Bureau : CIREM</p>
                        <p>B.P. 4745 Kinshasa II</p>
                        <p>Email : <a href="mailto:cirem@upc.ac.cd">cirem@upc.ac.cd</a></p>
                        <p>Site web : <a href="https://upc.ac.cd" target="_blank" rel="noopener noreferrer">https://upc.ac.cd</a></p>
                        <p>Téléphone : +243 81 94 93 358</p>
                        <p>X : <a href="https://twitter.com/CIREMath" target="_blank" rel="noopener noreferrer">@CIREMath</a></p>
                    </div>

                    <div className="director-info">
                        <p>La série est publiée trimestriellement sous la direction du Professeur Jean-Paul Tsasa.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
