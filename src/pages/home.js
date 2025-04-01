import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [submitText, setSubmitText] = useState("");
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();

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

  return (
    <div>
      <h1>ホーム</h1>
      <p>ここはホームです</p>
      <p>今日のおすすめは<code>肉料理です</code></p>
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
           <button onClick={() => navigate('/recipe')}>Generate Recipe</button>
       </div>
    </div>
  )
}