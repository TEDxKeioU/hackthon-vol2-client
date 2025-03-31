// import logo from './logo.svg';
import './App.css';
import Recipt from './pages/recipt';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipt" element={<Recipt />} />
      </Routes>
    </Router>
  )
}

export default App;