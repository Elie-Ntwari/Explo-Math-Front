import { useNavigate } from "react-router-dom";

function Accueil() {

    const navigate = useNavigate();
 
    const handleNavigate = (path) =>{
         navigate(path);
    }

    return (
        <>
            <h1>ACCueil</h1>

            <button onClick={() => handleNavigate('/AnalyseNum')} >C'est Parti</button>
        </>

    );
}

export default Accueil;