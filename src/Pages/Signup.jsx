import React, { useState } from "react";
import "../styles/Signup.css";
import { useNavigate } from "react-router-dom";


function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="signup-container">
            {/* Boutons en haut à droite */}
            <div className="top-buttons">
                <button className="login-button" onClick={() => navigate("/login")}>
                    Connexion
                </button>
                <button className="home-button" onClick={() => navigate("/")}>
                    Accueil
                </button>
            </div>

            <div className="signup-card">
              
                <h1 className="signup-title">Créer un compte</h1>
                <p className="signup-subtitle">Rejoignez Explo-Math et explorez les mathématiques</p>
                <form className="signup-form">
                    <div className="input-group">
                        <i className="fas fa-user input-icon"></i>
                        <input
                            type="text"
                            placeholder="Nom complet"
                            className="signup-input"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <i className="fas fa-envelope input-icon"></i>
                        <input
                            type="email"
                            placeholder="Adresse e-mail"
                            className="signup-input"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <i className="fas fa-lock input-icon"></i>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Mot de passe"
                            className="signup-input"
                            required
                        />
                        <i
                            className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
                            onClick={togglePasswordVisibility}
                        ></i>
                    </div>
                    
                    <button type="submit" className="signup-button">
                        S'inscrire
                    </button>
                </form>
                <div className="signup-footer">
                    <p>
                        Déjà inscrit ?{" "}
                        <a onClick={()=>navigate("/login" )}className="signup-link">
                            Connectez-vous
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;