import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

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
          Learn React here
        </a>
      </header>
    </div>
  );
}

export default App;