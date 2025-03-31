import logo from './logo.svg';
import './App.css';
import Recipe from './pages/recipe';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe" element={<Recipe />} />
      </Routes>
    </Router>
  )
}

export default App;