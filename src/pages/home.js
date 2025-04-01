import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [submitText, setSubmitText] = useState("");
  const [inputText, setInputText] = useState("");
  const [avoidIngredient, setAvoidIngredient] = useState("");
  const [avoidIngredientList, setAvoidIngredientList] = useState([]);
  const [wantIngredient, setWantIngredient] = useState("");
  const [wantIngredientList, setWantIngredientList] = useState([]);
  const [temp, setTemp] = useState(21);
  const [cookingTime, setCookingTime] = useState("10分以内");
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
          body: submitText,
        })
        console.log("success posts. submitText: ", submitText);
      }
      catch (error) {
        console.error("Failed to post:", error);
      }
    }
    postData();
  }, [submitText]);

  // // 避けたい食材をリストで更新
  // useEffect(() => {
  //   function accumulateAvoidIngredient() {
  //     setAvoidIngredientList(prev => [...prev, avoidIngredient]);
  //   }
  //   accumulateAvoidIngredient();
  // }, [avoidIngredient])

  // // 使いたい食材をリストで更新
  // useEffect(() => {
  //   function accumulateWantIngredient() {
  //     setWantIngredientList(prev => [...prev, wantIngredient]);
  //   }
  //   accumulateWantIngredient(); 
  // })

  // 送信用のテキストを更新
  useEffect(() => {
    function combineText() {
      const conbinedObj = {
        ingredients: {
          avoid: avoidIngredientList,
          want: wantIngredientList,
        },
        temp: temp,
        cookingTime: cookingTime,
      };
      const conbinedText = JSON.stringify(conbinedObj);
      console.log("combinedText: ", conbinedText);
      setInputText(conbinedText);
    }
    combineText();
  }, [wantIngredientList, avoidIngredientList, temp, cookingTime]);

  return (
    <div>
      <h1>ホーム</h1>
      <p>ここはホームです</p>
      <p>今日のおすすめは<code>肉料理です</code></p>
      <div className="App">
        <div className="weather">
          <h1>天気</h1>
          <p>気温: {temp}℃</p>
        </div>
        <div className="cooking-time">
          <h1>調理時間</h1>
          <div>
            <button onClick={() => setCookingTime("10分以内")}>お手軽</button>
            <button onClick={() => setCookingTime("10分から25分以内")}>ひと工夫</button>
            <button onClick={() => setCookingTime("25分以上")}>じっくり</button>
          </div>
        </div>
        <div className="ingredients">
          <h1>材料</h1>
          <div className="avoid-ingredient">
            <p>避けたい食材</p>
            <input
              type="text"
              placeholder="避けたい食材を入れてね"
              value={avoidIngredient}
              onChange={(e) => setAvoidIngredient(e.target.value)}
            />
            <button onClick={() => {
              if (avoidIngredient.trim() !== "") {
                setAvoidIngredientList(prev => [...prev, avoidIngredient]);
                setAvoidIngredient("");
              }
            }}>
              追加
            </button>
            <br />
            {avoidIngredientList.map((avoidItem, key) => {
              return (
                <div key={key}>
                  {avoidItem}
                  <button onClick={() => {
                    setAvoidIngredientList(prev => prev.filter(item => item !== avoidItem));
                  }}>削除</button>
                </div>
              )
            })}
          </div>
          <br />
          <div className="want-ingredient">
            <p>使いたい食材</p>
            <input
              type="text"
              placeholder="使いたい食材を入れてね"
              value={wantIngredient}
              onChange={(e) => setWantIngredient(e.target.value)}
            />
            <button onClick={() => {
              if (wantIngredient.trim() !== "") {
                setWantIngredientList(prev => [...prev, wantIngredient]);
                setWantIngredient("");
              }
            }}>
              追加
            </button>
            <br />
            {wantIngredientList.map((wantItem, key) => {
              return (
                <div key={key}>
                  {wantItem}
                  <button onClick={() => {
                    setWantIngredientList(prev => prev.filter(item => item !== wantItem));
                  }}>削除</button>
                </div>
              )
            })}
          </div>
          <br />
        </div>
        <br />
        現在の選択肢: {inputText}
        <br />
        <button onClick={() => {
          setSubmitText(inputText);
          setInputText(""); setAvoidIngredient(""); setWantIngredient(""); setTemp(21); setCookingTime("10分以内");
          navigate('/recipe');
        }}>Generate Recipe</button>
      </div>
    </div>
  )
}