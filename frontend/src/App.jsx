import Navbar from "../components/Navbar"
import HomePage from "../pages/HomePage"
import ProductPage from "../pages/ProductPage"
import toast from "react-hot-toast";

import {Routes, Route} from "react-router-dom"


function App() {

  const [theme, setTheme]=useState("forest");

  return(
  <div className="min-h-screen bg-base-200 transition-colors duration-300 data-theme=forest ">
      <Navbar />
       
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App
