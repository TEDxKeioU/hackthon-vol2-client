import React, { useState, useEffect } from "react";
import "../App.css";

export default function Recipt() {
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
        console.log("submitText is empty && null");
        return;
      }
      try {
        fetch("http://localhost:8000/cook", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ingredients: submitText,
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
    <body>
      <h1>レシピ</h1>
      <div className="App">
           <h1>材料</h1>
           <input
             type="text"
             placeholder="使いたい食材を入れてね"
             value={inputText}
             onChange={(e) => setInputText(e.target.value)}
           />
           <br />
           <button onClick={() => {
             setSubmitText(inputText)
              setInputText("");
             }}>submit</button>
           <br />
       </div>
    </body>
  );
}