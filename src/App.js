// import logo from './logo.svg';
import './App.css';
import Recipe from './pages/recipe';
import Home from './pages/home';
import Cld from './pages/calender';
import Login from './pages/login';
import Signup from './pages/signup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe" element={<Recipe />} />
          {/* <Route path="/weather" element={<WeatherInfo />} /> */}
          <Route path='/calender' element={<Cld />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
    
  )
}

export default App;