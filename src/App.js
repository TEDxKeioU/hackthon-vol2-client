// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [submitText, setSubmitText] = useState("");
  const [inputText, setInputText] = useState("");

  useEffect(() => {
      async function fetchData() {
          try {
              const response = await fetch("http://localhost:8000/todo", {method: "GET"});
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

  useEffect(() => {
    async function postData() {
      if (submitText === "" && !submitText) {
        console.log("submitText is empty && undefined");
        return;
      }
      try {
        fetch("http://localhost:8000/todo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: submitText,
            completed: false,
          }),
        })
        console.log("success posts. submitText: ", submitText);
      }
      catch (error) {
        console.error("Failed to post:", error);
      }
    }
    postData();
  }, [submitText]);

  console.log("Data fetched:", data);

  return (
    <div className="App">
        <input
          type="text"
          placeholder="Enter your name"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <br />
        Learn React here {data ? `: ${data[data.length - 1].title}` : ''}
        <button onClick={() => setSubmitText(inputText)}>submit</button>
    </div>
  );
}

export default App;