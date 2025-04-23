import { useNavigate } from 'react-router-dom'; // Import du hook useNavigate
import '../styles/MyNavBar.css';
import logo from '../assets/logo.png';

function MyNavBar() {
  const navigate = useNavigate(); // Initialisation du hook

  return (
    <div className="mynavbarContainer">
      <div className="myLogo">
        <img src={logo} alt="Logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
      </div>

      <div className="myButton">
        <button onClick={() => navigate('/login')}>J'ai déjà un compte</button>
      </div>
    </div>
  );
}

export default MyNavBar;
