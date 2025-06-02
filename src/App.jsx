import { BrowserRouter, Route, Routes } from "react-router-dom"
import Accueil from "./Pages/Accueil";
import AnalyseNum from "./Pages/AnalyseNum";
import Caracteristiques from "./Pages/Caracteristiques";
import Login from "./Pages/Login"; // Assurez-vous que le chemin est correct
import Signup from "./Pages/Signup";
import About from "./Pages/About";
import { SnackbarProvider } from "notistack";
import { useTranslation } from "react-i18next";
import { I18nProvider } from "./contexts/I18nContext";


function App() {

   const {t,i18n} = useTranslation();

   const changeMyLanguage = (lng) =>{
        i18n.changeLanguage(lng);
   }



   return (

      <I18nProvider>
      <BrowserRouter>
         {/* Etablissement des diffèrents path (Pages)*/}

         <Routes>

            {/* Page d'accueil*/}
            <Route

               path="/"
               element={
                  <Accueil />
               }
            />

            {/* Page d'AnalyseNum*/}
            <Route
               path="/AnalyseNum"
               element={
                  <SnackbarProvider maxSnack={3}>
                     <AnalyseNum />
                  </SnackbarProvider>
               }
            />

            <Route
               path="/caracteristiques"
               element={

                  <Caracteristiques />

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
                  <About />
               }
            />

         </Routes>

      </BrowserRouter>
      </I18nProvider>
   )
}

export default App
