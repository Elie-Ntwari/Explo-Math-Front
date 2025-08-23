import "../styles/FormNumber.css";
import { useI18n } from "../contexts/I18nContext";

function CustomKeyboard({ onInput, onClose, onDelete, onClear }) {

    const { t } = useI18n();

    const handleButtonClick = (value) => {
        onInput(value);
    };

    return (
        <div className="custom-keyboard" style={{ marginLeft: "-13px", marginTop: "20px" }}>
            <div className="keyboard-row">
                <button onClick={() => handleButtonClick("sin()")}>sin</button>
                <button onClick={() => handleButtonClick("cos()")}>cos</button>
                <button onClick={() => handleButtonClick("tan()")}>tan</button>
                <button onClick={() => handleButtonClick("√()")}>√</button>
            </div>
            <div className="keyboard-row">
                <button onClick={() => handleButtonClick("log()")}>log</button>
                <button onClick={() => handleButtonClick("ln()")}>ln</button>
                <button onClick={() => handleButtonClick("logb(base;x)")}>
                    log<sub>b</sub>(base;x)
                </button>
                <button onClick={() => handleButtonClick("π")}>π</button>
            </div>
            <div className="keyboard-row">
                <button onClick={() => handleButtonClick("(")}>(</button>
                <button onClick={() => handleButtonClick(")")}>)</button>
                <button onClick={() => handleButtonClick("e")}>e</button>
                <button onClick={() => handleButtonClick("^")}>^</button>
            </div>
            <div className="keyboard-row">
                <button onClick={() => handleButtonClick("7")}> 7</button>
                <button onClick={() => handleButtonClick("8")}>8</button>
                <button onClick={() => handleButtonClick("9")}>9</button>
                <button onClick={() => handleButtonClick("/")}>/</button>
            </div>
            <div className="keyboard-row">
                <button onClick={() => handleButtonClick("4")}>4</button>
                <button onClick={() => handleButtonClick("5")}>5</button>
                <button onClick={() => handleButtonClick("6")}>6</button>
                <button onClick={() => handleButtonClick("*")}>*</button>
            </div>
            <div className="keyboard-row">
                <button onClick={() => handleButtonClick("1")}>1</button>
                <button onClick={() => handleButtonClick("2")}>2</button>
                <button onClick={() => handleButtonClick("3")}>3</button>
                <button onClick={() => handleButtonClick("-")}>-</button>
            </div>
            <div className="keyboard-row">
                <button onClick={() => handleButtonClick("0")}>0</button>
                <button onClick={() => handleButtonClick(".")}>.</button>
                <button onClick={() => handleButtonClick("a/b")}>a/b</button>
                <button onClick={() => handleButtonClick("+")}>+</button>
            </div>
            <div className="keyboard-row">
                <button onClick={onDelete} className="delete-button">{t("keyboard.effacer")}</button>
                <button onClick={onClear} className="clear-button">{t("keyboard.tout_effacer")}</button>
                <button onClick={onClose} className="close-keyboard">{t("keyboard.fermer")}</button>
            </div>

        </div>
    );
}

export default CustomKeyboard;
