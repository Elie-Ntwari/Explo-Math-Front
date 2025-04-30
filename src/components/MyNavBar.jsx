import { useNavigate, useLocation } from 'react-router-dom'; // Import du hook useLocation
import '../styles/MyNavBar.css';
import logo from '../assets/logo.png';
import { FaChevronLeft } from 'react-icons/fa'; // Import du chevron depuis react-icons

function MyNavBar() {
  const navigate = useNavigate(); // Initialisation du hook
  const location = useLocation(); 

  return (
    <div className="mynavbarContainer">
      <div className="myLogo">

        {location.pathname !== '/' && (
          <FaChevronLeft
            size={20}
            style={{ cursor: 'pointer', marginRight: '10px',marginBottom:'30px',color:'#0c3998' }}
            onClick={() => navigate(location.pathname === '/caracteristiques' ? '/AnalyseNum' : '/')} // Retour à l'accueil
          />
          
        )}
        <img src={logo} alt="Logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' ,color:'#333'}} />
      </div>

      {location.pathname === '/' && (
        <div className="myButton">
          <button onClick={() => navigate('/AnalyseNum')}>Commencer</button>
        </div>
      )}
    </div>
  );
}

export default MyNavBar;
