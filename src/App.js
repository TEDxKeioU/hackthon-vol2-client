import logo from './logo.svg';
import './App.css';
<<<<<<< Updated upstream
import React, { useEffect, useState } from 'react';
=======
import Recipe from './pages/recipe';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
>>>>>>> Stashed changes

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
      async function fetchData() {
          try {
              const response = await fetch("http://localhost:8000/");
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              const result = await response.json();
              setData(result);
          } catch (error) {
              console.error("Failed to fetch:", error);
          }
      }
      fetchData();
  }, []);

  console.log("Data fetched:", data);

  return (
<<<<<<< Updated upstream
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React here {data ? `: ${data.message}` : ''}
        </a>
      </header>
    </div>
  );
=======
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe" element={<Recipe />} />
      </Routes>
    </Router>
  )
>>>>>>> Stashed changes
}

export default App;