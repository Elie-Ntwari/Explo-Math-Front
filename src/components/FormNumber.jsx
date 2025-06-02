import { FaArrowRight, FaKeyboard } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { TbMathFunction } from 'react-icons/tb';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
import CustomKeyboard from './CustomKeyboard';
import { create, all } from 'mathjs';
import Proprietes from './Proprietes';
import { useTranslation } from 'react-i18next';

const config = { number: 'number', angleUnit: 'deg' };
const math = create(all, config);

function FormNumber() {
    const { t } = useTranslation();
    const [showLoading, setShowLoading] = useState(false);
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [nombre, setNombre] = useState("");
    const [proprietes, setProprietes] = useState([]);
    const inputRef = useRef(null);
    const [resp, setResp] = useState(false);
    const [randomNumbers, setRandomNumbers] = useState([]);

    useEffect(() => {
        const generateUniqueNumbers = () => {
            const numbers = new Set();
            while (numbers.size < 4) {
                numbers.add(Math.floor(Math.random() * 100) + 1);
            }
            return Array.from(numbers);
        };
        setRandomNumbers(generateUniqueNumbers());
    }, []);

    useEffect(() => {
        if (resp) {
            setShowKeyboard(false);
        }
    }, [resp]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowLoading(true);
        setResp(false);
        const myNombre = evaluateExpression(nombre);
        try {
            const response = await axios.get(`https://explorateur-mathematique.onrender.com/api/analyse-nombre/?nombre=${myNombre}`);
            if (response.data) {
                setProprietes(response.data.analyse);
                setResp(true);
            } else {
                enqueueSnackbar(t("analysnum.invalide"), {
                    variant: "error",
                    anchorOrigin: { vertical: "top", horizontal: "center" },
                });
            }
        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || t("analysnum.erreur_api"), {
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
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const newValue = nombre.substring(0, start) + value + nombre.substring(end);
            const sanitizedValue = newValue.replace(/,/g, ".");
            setNombre(sanitizedValue);
            setTimeout(() => {
                input.selectionStart = input.selectionEnd = start + value.length;
            }, 0);
        }
    };

    const handleDelete = () => {
        setNombre((prev) => prev.slice(0, -1));
    };

    const handleClear = () => {
        setNombre("");
    };

    const evaluateExpression = (expression) => {
        try {
            const formattedExpression = expression
                .replace(/π/g, `pi`)
                .replace(/e/g, `e`)
                .replace(/sin\(/g, "sin(")
                .replace(/cos\(/g, "cos(")
                .replace(/tan\(/g, "tan(")
                .replace(/log\(/g, "log(")
                .replace(/ln\(/g, "ln(")
                .replace(/√\(/g, "sqrt(");
            return math.evaluate(formattedExpression);
        } catch (error) {
            return "Erreur";
        }
    };

    return (
        <>
            <div className="container-parent" style={{ marginTop: showKeyboard ? "190px" : "0px" }}>
                <div className="formContainer">
                    <div className="presntation">
                        <h1>{t("analysnum.titre")}</h1>
                        <p>{t("analysnum.sous_titre")}</p>
                    </div>

                    <div className="myForm">
                        <form onSubmit={handleSubmit}>
                            <div className="quick-numbers">
                                {randomNumbers.map((num, index) => (
                                    <span key={index} className="quick-number" onClick={() => setNombre(num.toString())}>
                                        {num}
                                    </span>
                                ))}
                            </div>

                            <input
                                ref={inputRef}
                                type="text"
                                placeholder={t("analysnum.placeholder")}
                                required
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value.replace(/,/g, "."))}
                            />
                            <button type="submit">
                                {t("analysnum.bouton")} <FaArrowRight style={{ marginLeft: '8px' }} />
                            </button>
                        </form>
                    </div>

                    {!showKeyboard && (
                        <button className="floating-keyboard-button" onClick={() => setShowKeyboard(true)}>
                            <FaKeyboard size={20} />
                        </button>
                    )}

                    {showKeyboard && (
                        <CustomKeyboard
                            onInput={handleKeyboardInput}
                            onDelete={handleDelete}
                            onClear={handleClear}
                            onClose={() => setShowKeyboard(false)}
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

            {showLoading && (
                <div className="myLoader-overlay">
                    <div className="myLoader-box">
                        <TbMathFunction className="loader-icon rotate pulse" />
                        <h1 className="analyzing-text">
                            {t("analysnum.analyse_en_cours")}<span className="dot-animation">...</span>
                        </h1>
                        <p className="info-progress">{t("analysnum.extraction")}</p>
                    </div>
                </div>
            )}

            {resp && <Proprietes proprietes={proprietes} />}
        </>
    );
}

export default FormNumber;
