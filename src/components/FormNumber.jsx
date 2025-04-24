import { FaArrowRight } from 'react-icons/fa';
import '../styles/FormNumber.css'; // N'oublie pas de créer ce fichier CSS

function FormNumber() {
    return (
        <div className="container-parent">
            <div className="formContainer">
                {/* Titre + Intro */}
                <div className="presntation">
                    <h1>Explorez les secrets des nombres !</h1>
                    <p>
                        Entrez un nombre et découvrez ses propriétés mathématiques fascinantes :
                        est-il premier, pair, puissant, magique ? C’est parti pour l’exploration !
                    </p>
                </div>

                {/* Formulaire */}
                <div className="myForm">
                    <form>
                        <input type="number" placeholder="Ex : 42" />
                        <button type="submit">
                            Lancer l'exploration <FaArrowRight style={{ marginLeft: '8px' }} />
                        </button>
                    </form>
                </div>

                {/* Effet visuel : pluie de nombres */}
                <div className="falling-numbers">
                    {[...Array(15)].map((_, i) => (
                        <span
                            key={i}
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDuration: `${3 + Math.random() * 5}s`,
                                animationDelay: `${Math.random() * 2}s`,
                            }}
                        >
                            {Math.floor(Math.random() * 100)}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FormNumber;
