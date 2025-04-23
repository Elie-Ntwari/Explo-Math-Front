import { BrowserRouter, Route, Routes } from "react-router-dom"
import Accueil from "./Pages/Accueil";
import AnalyseNum from "./Pages/AnalyseNum";


function App() {

  return (
      <BrowserRouter>
         {/* Et&blissement des diffèrents path (Pages)*/}
         
         <Routes>
             
          {/* Pqge d'accueil*/}
           <Route
              
              path="/"
              element={
                <Accueil/>
              }
           />

          {/* Pqge d'AnalyseNum*/}
          <Route
             path="/AnalyseNum"
             element={
              <AnalyseNum/>
             }
          />

         </Routes>

      </BrowserRouter>
  )
}

export default App
