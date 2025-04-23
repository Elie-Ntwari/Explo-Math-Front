import '../styles/MyNavBar.css';
import logo from '../assets/logo.png';

function MyNavBar() {
  return (
    <div className="mynavbarContainer">
      <div className="myLogo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="myButton">
        <button>J'ai déjà un compte</button>
      </div>
    </div>
  );
}

export default MyNavBar;
