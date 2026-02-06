import { BrowserRouter, Route, Routes } from "react-router-dom";

// Componentes globales
import {Header} from './components/Header';
import {Footer} from './components/Footer';

// Páginas (Asegúrate de que estas rutas de archivo sean correctas)
import Home from './pages/Home';
import Burgers from './pages/Burgers'; 
import BurgerDetail from './pages/BurgerDetail'; 
import FoodTruckDetail from './pages/FoodTruckDetail'; 

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Header />
        
        <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/burgers" element={<Burgers />} />
          <Route path="burgers/:id" element={<BurgerDetail />} />
          <Route path="/foodtrucks/:id" element={<FoodTruckDetail />} />
        </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;