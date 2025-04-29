import { FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';
import { TbMathFunction } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom'; // Assurez-vous d'avoir installé react-router-dom
import '../styles/FormNumber.css'; // N'oublie pas de créer ce fichier CSS
import { enqueueSnackbar } from 'notistack';

function FormNumber() {
    const [showLoading, setShowLoading] = useState(false);
    const navigate = useNavigate();
    const [nombre,setNombre] = useState(0);
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowLoading(true);
        // Simulation d'un appel à l'API avec setTimeout
        setTimeout(() => {
            // Ici vous pouvez appeler une vraie API, par exemple : fetch('/api/endpoint')
            const success = nombre > 15; // Simulation de réussite ou d'échec aléatoire
            
            if (success) {

                navigate('/caracteristiques'); // Rediriger en cas de succès

            } else {
                setShowLoading(false);
                enqueueSnackbar("Ensure this value is less than or equal to 1000000.", {
                    variant: "error",
                    anchorOrigin: { vertical: "top", horizontal: "center" },
                  });
            }
        }, 2000); // Simuler une attente de 2 secondes
    };

    return (
        <>
            {!showLoading ? (
                <div className="container-parent">
                    <div className="formContainer">
                        {/* Titre + Intro */}
                        <div className="presntation">
                            <h1>Explorez les secrets des nombres !</h1>
                            <p>
                                Entrez un nombre et découvrez ses propriétés mathématiques fascinantes :
                                est-il premier, pair, puissant, magique ? C'est parti pour l'exploration !
                            </p>
                        </div>

                        {/* Formulaire */}
                        <div className="myForm">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="number"
                                    placeholder="Ex : 42"
                                    required
                                    min="1"
                                    onChange={(e) =>setNombre(e.target.value)}
                                />
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
            ) : (
                <div className="myLoader-overlay">
                    <div className="myLoader-box">
                        <TbMathFunction className="loader-icon rotate pulse" />
                        <h1 className="analyzing-text">
                            Analyse en cours<span className="dot-animation">...</span>
                        </h1>
                        <p className="info-progress">Extraction des propriétés mathématiques</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default FormNumber;
