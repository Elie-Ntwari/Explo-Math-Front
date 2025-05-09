import { FaArrowRight, FaKeyboard } from 'react-icons/fa';
import { useState, useRef } from 'react';
import { TbMathFunction } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import '../styles/FormNumber.css';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
import CustomKeyboard from './CustomKeyboard'; // Import du clavier personnalisé
import { create, all } from 'mathjs'; // Import mathjs

// ⚙️ Configuration mathjs
const config = { number: 'number', angleUnit: 'deg' };
const math = create(all, config);

function FormNumber() {
    const [showLoading, setShowLoading] = useState(false);
    const [showKeyboard, setShowKeyboard] = useState(false); // État pour afficher/masquer le clavier
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const inputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowLoading(true);
        const myNombre = evaluateExpression(nombre);
        try {
            const response = await axios.get(`https://explorateur-mathematique.onrender.com/api/analyse-nombre/?nombre=${myNombre}`);

            if (response.data) {
                // Stockez les données dans un état global ou passez-les via la navigation
                navigate('/caracteristiques', { state: { proprietes: response.data.analyse, nombre } });
            } else {
                enqueueSnackbar("Le nombre doit être valide (1 à 1 000 000)", {
                    variant: "error",
                    anchorOrigin: { vertical: "top", horizontal: "center" },
                });
            }
        } catch (error) {
            console.error("Erreur API:", error);
            enqueueSnackbar(error.response?.data?.message || "Erreur lors de la requête API", {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "center" },
            });
        } finally {
            setShowLoading(false);
        }
    };

    const handleKeyboardInput = (value) => {
        if (inputRef.current) {
            const input = inputRef.current;
            const start = input.selectionStart; // Position de début du curseur
            const end = input.selectionEnd; // Position de fin du curseur

            // Insère la valeur à la position du curseur
            const newValue =
                nombre.substring(0, start) + value + nombre.substring(end);

            // Remplace les virgules par des points
            const sanitizedValue = newValue.replace(/,/g, ".");

            setNombre(sanitizedValue);

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
                .replace(/π/g, `pi`) // Remplace π par pi
                .replace(/e/g, `e`) // Remplace e par e
                .replace(/sin\(/g, "sin(") // Remplace sin par sin
                .replace(/cos\(/g, "cos(") // Remplace cos par cos
                .replace(/tan\(/g, "tan(") // Remplace tan par tan
                .replace(/ln\(/g, "log(") // Remplace ln par log naturel
                .replace(/log_b\(([^,]+);\s*([^)]+)\)/g, "log($2, $1)") // Remplace log_b(a; b) par log(b, a)
                .replace(/√\(/g, "sqrt(") // Remplace √ par sqrt
                .replace(/([a-zA-Zπ]+|\d+)\s*\^\s*([a-zA-Zπ]+|\d+)/g, "pow($1, $2)"); // Remplace a^b par pow(a, b)

            console.log("Expression formatée :", formattedExpression);

            // Utilisation de mathjs pour évaluer l'expression formatée
            return math.evaluate(formattedExpression);
        } catch (error) {
            console.error("Erreur lors de l'évaluation de l'expression :", error);
            return "Erreur";
        }
    };

    return (
        <>
            {!showLoading ? (
                <div className="container-parent" style={{ marginTop: showKeyboard ? "190px" : "0px" }}>
                    <div className="formContainer" >
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
                                    onChange={(e) => setNombre(e.target.value.replace(/,/g, "."))}
                                />
                                <button type="submit">
                                    Lancer l'exploration <FaArrowRight style={{ marginLeft: '8px' }} />
                                </button>
                            </form>
                        </div>

                        {/* Bouton flottant pour afficher le clavier */}
                        {!showKeyboard && (
                            <button
                                className="floating-keyboard-button"
                                onClick={() => setShowKeyboard(!showKeyboard)}
                            >
                                <FaKeyboard size={20} />
                            </button>
                        )}

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
                            {[...Array(15)].map((_, i) => {
                                const symbols = ["π", "e", "cos", "sin", "tan", "√", "^", "log"];
                                const randomItem =
                                    Math.random() > 0.5
                                        ? Math.floor(Math.random() * 100)
                                        : symbols[Math.floor(Math.random() * symbols.length)];

                                return (
                                    <span
                                        key={i}
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            animationDuration: `${3 + Math.random() * 5}s`,
                                            animationDelay: `${Math.random() * 2}s`,
                                        }}
                                    >
                                        {randomItem}
                                    </span>
                                );
                            })}
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
