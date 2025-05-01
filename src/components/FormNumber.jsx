import { FaArrowRight, FaKeyboard } from 'react-icons/fa';
import { useState } from 'react';
import { TbMathFunction } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import '../styles/FormNumber.css';
import { enqueueSnackbar } from 'notistack';
import CustomKeyboard from './CustomKeyboard'; // Import du clavier personnalisé
import * as math from "mathjs"; // Assurez-vous d'installer mathjs : npm install mathjs

function FormNumber() {
    const [showLoading, setShowLoading] = useState(false);
    const [showKeyboard, setShowKeyboard] = useState(false); // État pour afficher/masquer le clavier
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const numericValue = evaluateExpression(nombre); // Convertit l'expression en valeur numérique
        console.log("Valeur numérique :", numericValue);

        if (isNaN(numericValue)) {
            enqueueSnackbar("Expression invalide. Veuillez vérifier votre saisie.", {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "center" },
            });
            return;
        }

        setShowLoading(true);
        setTimeout(() => {
            // Simule une condition pour la navigation
            if (numericValue > 15) {
                navigate('/caracteristiques');
            } else {
                setShowLoading(false);
                enqueueSnackbar("La valeur doit être supérieure à 15.", {
                    variant: "error",
                    anchorOrigin: { vertical: "top", horizontal: "center" },
                });
            }
        }, 2000);
    };

    const handleKeyboardInput = (value) => {
        if (value === "a/b") {
            // Insère une structure de fraction
            setNombre((prev) => prev + "(/)");
        } else {
            setNombre((prev) => prev + value);
        }
    };

    const handleDelete = () => {
        setNombre((prev) => prev.slice(0, -1)); // Supprime le dernier caractère
    };

    const handleClear = () => {
        setNombre(""); // Vide complètement le champ
    };

    const evaluateExpression = (expression) => {
        try {
            // Remplace les constantes et fonctions par leurs équivalents mathématiques
            const formattedExpression = expression
                .replace(/π/g, Math.PI) // Remplace π par sa valeur
                .replace(/e/g, Math.E) // Remplace e par sa valeur
                .replace(/sin\(/g, "Math.sin(") // Remplace sin par Math.sin
                .replace(/cos\(/g, "Math.cos(") // Remplace cos par Math.cos
                .replace(/tan\(/g, "Math.tan(") // Remplace tan par Math.tan
                .replace(/ln\(/g, "Math.log(") // Remplace ln par Math.log
                .replace(/log_b\(([^,]+),([^,]+)\)/g, "(Math.log($1) / Math.log($2))") // Remplace log_b(x, b)
                .replace(/log\(/g, "Math.log10("); // Remplace log par Math.log10

            // Évalue l'expression
            return eval(formattedExpression);
        } catch (error) {
            console.error("Erreur lors de l'évaluation de l'expression :", error);
            return "Erreur";
        }
    };

    return (
        <>
            {!showLoading ? (
                <div className="container-parent">
                    <div className="formContainer" style={{ position: "relative" }}>
                        <div className="presntation">
                            <h1>Explorez les secrets des nombres !</h1>
                            <p>
                                Entrez un nombre et découvrez ses propriétés mathématiques fascinantes :
                                est-il premier, pair, puissant, magique ? C'est parti pour l'exploration !
                            </p>
                        </div>

                        <div className="myForm">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Ex : 42"
                                    required
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                                <button type="submit">
                                    Lancer l'exploration <FaArrowRight style={{ marginLeft: '8px' }} />
                                </button>
                            </form>
                        </div>

                        {/* Bouton flottant pour afficher le clavier */}
                        <button
                            className="floating-keyboard-button"
                            onClick={() => {
                                setShowKeyboard(!showKeyboard); // Inverse l'état
                                console.log("showKeyboard:", !showKeyboard); // Log pour vérifier
                            }}
                        >
                            <FaKeyboard size={20} />
                        </button>

                        {/* Clavier personnalisé */}
                        {showKeyboard && (
                            <CustomKeyboard
                                onInput={handleKeyboardInput}
                                onClose={() => setShowKeyboard(false)} // Ferme le clavier
                            />
                        )}

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
            {console.log("showKeyboard:", showKeyboard)}
        </>
    );
}

export default FormNumber;
