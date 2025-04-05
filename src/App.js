// import logo from './logo.svg';
import './App.css';
import Recipe from './pages/recipe';
import Home from './pages/home';
// import WeatherInfo from './pages/weather';
import Cld from './pages/calender';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe" element={<Recipe />} />
        {/* <Route path="/weather" element={<WeatherInfo />} /> */}
        <Route path='/calender' element={<Cld />} />
      </Routes>
    </Router>
  )
}

export default App;