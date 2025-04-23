import { BrowserRouter, Route, Routes } from "react-router-dom"
import Accueil from "./Pages/Accueil";
import AnalyseNum from "./Pages/AnalyseNum";
import Login from "./Pages/Login"; // Assurez-vous que le chemin est correct
import Signup from "./Pages/Signup";
import About from "./Pages/About";


function App() {

  return (
      <BrowserRouter>
         {/* Etablissement des diffèrents path (Pages)*/}
         
         <Routes>
             
          {/* Page d'accueil*/}
           <Route
              
              path="/"
              element={
                <Accueil/>
              }
           />

          {/* Page d'AnalyseNum*/}
          <Route
             path="/AnalyseNum"
             element={
              <AnalyseNum/>
             }
          />

         <Route 
            path="/login" 
            element={
               <Login />
            } 
         />

         <Route 
            path="/signup" 
            element={
               <Signup />
            } 
         />

          {/* Page À propos*/}
          <Route
             path="/about"
             element={
              <About/>
             }
          />

         </Routes>

      </BrowserRouter>
  )
}

export default App
