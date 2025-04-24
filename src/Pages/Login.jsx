import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            {/* Boutons en haut à droite */}
            <div className="top-buttons">
                <button className="signup-button" onClick={() => navigate("/signup")} style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}>
                    S'inscrire
                </button>
                <button className="home-button" onClick={() => navigate("/")}  style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }} >
                    Accueil
                </button>
            </div>

            <div className="login-card">
                <h1 className="login-title">Connexion </h1>
                <p className="login-subtitle">Bienvenue à nouveau sur Explo-Math les maths n'attendent que vous !</p>
                <form className="login-form">
                    <div className="input-group">
                        <i className="fas fa-envelope input-icon"></i>
                        <input
                            type="email"
                            placeholder="Adresse e-mail"
                            className="login-input"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <i className="fas fa-lock input-icon"></i>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Mot de passe"
                            className="login-input"
                            required
                        />
                        <i
                            className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
                            onClick={togglePasswordVisibility}
                        ></i>
                    </div>
                    <button type="submit" className="login-button">
                        Connexion
                    </button>
                </form>
                <div className="login-footer">
                    <p>
                        Pas encore inscrit ?{" "}
                        <a onClick={()=> navigate("/signup")} className="login-link">
                            Créez un compte
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;