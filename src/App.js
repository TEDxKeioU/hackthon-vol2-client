// import logo from './logo.svg';
import './App.css';
import Recipe from './pages/recipe';
import Home from './pages/home';
import WeatherInfo from './pages/weather';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/weather" element={<WeatherInfo />} />
      </Routes>
    </Router>
  )
}

export default App;