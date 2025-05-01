import { FaArrowRight, FaKeyboard } from 'react-icons/fa';
import { useState, useRef } from 'react';
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
    const inputRef = useRef(null);

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
        if (inputRef.current) {
            const input = inputRef.current;
            const start = input.selectionStart; // Position de début du curseur
            const end = input.selectionEnd; // Position de fin du curseur

            // Insère la valeur à la position du curseur
            const newValue =
                nombre.substring(0, start) + value + nombre.substring(end);

            setNombre(newValue);

            // Met à jour la position du curseur après l'insertion
            setTimeout(() => {
                input.selectionStart = input.selectionEnd = start + value.length;
            }, 0);
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
            // Remplace d'abord les constantes π et e par leurs valeurs numériques avec des parenthèses
            const formattedExpression = expression
                .replace(/π/g, `(${Math.PI})`) // Remplace π par (Math.PI)
                .replace(/e/g, `(${Math.E})`) // Remplace e par (Math.E)
                // Ensuite, remplace les fonctions et opérations
                .replace(/sin\(/g, "Math.sin(") // Remplace sin par Math.sin
                .replace(/cos\(/g, "Math.cos(") // Remplace cos par Math.cos
                .replace(/tan\(/g, "Math.tan(") // Remplace tan par Math.tan
                .replace(/ln\(/g, "calculateLn(") // Utilise calculateLn pour ln
                .replace(/log_b\(([^,]+),\s*([^)]+)\)/g, "calculateLogBase($1, $2)") // Utilise calculateLogBase pour log_b
                .replace(/log\(/g, "Math.log10(") // Remplace log par Math.log10
                .replace(/√\(/g, "Math.sqrt(") // Remplace √ par Math.sqrt
                .replace(/([a-zA-Zπ]+|\d+)\s*\^\s*([a-zA-Zπ]+|\d+)/g, "Math.pow($1, $2)"); // Remplace a^b par Math.pow(a, b)

            console.log("Expression formatée :", formattedExpression);

            // Évalue l'expression
            return eval(formattedExpression);
        } catch (error) {
            console.error("Erreur lors de l'évaluation de l'expression :", error);
            return "Erreur";
        }
    };

    const calculateLogBase = (base, value) => {
        if (base <= 0 || value <= 0) {
            throw new Error("La base et la valeur doivent être positives.");
        }
        return Math.log(value) / Math.log(base);
    };

    const calculateLn = (value) => {
        if (value <= 0) {
            throw new Error("La valeur doit être positive pour calculer le logarithme naturel.");
        }
        return Math.log(value); // Utilise Math.log pour le logarithme naturel
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
                                    ref={inputRef}
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
                                onInput={handleKeyboardInput} // Fonction pour gérer l'entrée
                                onDelete={handleDelete} // Fonction pour effacer le dernier caractère
                                onClear={handleClear} // Fonction pour tout effacer
                                onClose={() => setShowKeyboard(false)} // Fonction pour fermer le clavier
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
