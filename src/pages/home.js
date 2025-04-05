import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/home.module.css";
import { WeatherInfo } from "./weather";

export default function Home() {
  const [submitText, setSubmitText] = useState("");
  const [inputText, setInputText] = useState("");
  const [avoidIngredient, setAvoidIngredient] = useState("");
  const [avoidIngredientList, setAvoidIngredientList] = useState([]);
  const [wantIngredient, setWantIngredient] = useState("");
  const [wantIngredientList, setWantIngredientList] = useState([]);
  const [temp, setTemp] = useState(21);
  const [selectedMode, setSelectedMode] = useState(null);
  const modes = ["お手軽", "ひと工夫", "じっくり"];
  const cookingTimelist = ["10分以内", "10分から25分", "25分以上"];

  const [cookingTime, setCookingTime] = useState("10分以内");
  const navigate = useNavigate();


  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = "5357ea3fecf3393c86c63b1fbe28fac0";

  // cookへのPOSTリクエスト
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

  // 送信用のテキストを更新
  useEffect(() => {
    function combineText() {
      const modeKey = selectedMode ? modes.indexOf(selectedMode) : 0;
      setCookingTime(cookingTimelist[modeKey]);
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
  }, [wantIngredientList, avoidIngredientList, temp, cookingTime, selectedMode]);

  

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchWeather(latitude, longitude);
        },
        (error) => {
          console.error("位置情報の取得に失敗しました:", error);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocationはこのブラウザでサポートされていません");
      setLoading(false);
    }
  }, []);

  const fetchWeather = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
      setTemp(data.main.temp);
    } catch (error) {
      console.error("天気情報の取得に失敗しました:", error);
    }
    setLoading(false);
  };

  const getTemperatureFeeling = (temp) => {
    if (temp <= 5) return "🥶 めっちゃ寒い！";
    if (temp <= 15) return "🧥 肌寒い";
    if (temp <= 25) return "😌 ちょうどいい";
    if (temp <= 30) return "🌞 ちょっと暑い";
    return "🥵 めっちゃ暑い！";
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.calender_wrapper}>
          <button 
            onClick={() => navigate('/calender')}
            className={styles.calender_button}
          >カレンダー</button>
        </div>
        <div className={styles.login_wrapper}>
          <button 
            onClick={() => navigate('/login')}
            className={styles.login_button}
          >ログイン</button>
        </div>
      </div>
      <div className={styles.weather_box}>
        <div className={styles.weather_label}>今日の天気</div>
        {loading ? (
          <p>取得中だよ！</p>
        ) : weather ?(
          <div className={styles.weather_content}>
            <div className={styles.weather_left}>
              <span className={styles.weather_icon}>
                {weather && weather.weather && (
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="天気アイコン"
                    width="50" height="50"
                  />
                )}
              </span>
              <span className={styles.weather_text}>{weather.weather[0].description}</span>
            </div>
            <div className={styles.weather_right}>
              <span className={styles.weather_text}>{temp}° {getTemperatureFeeling(temp)}</span>
            </div>
          </div>
        ) : (
          <p>天気情報を取得できませんでした。</p>
        )}
      </div>
      <div className={styles.mode_box}>
        <p className={styles.mode_title}>mode</p>
        <div className={styles.mode_buttons}>
          {modes.map((mode, index) => (
            <button
              key={index}
              className={`${styles.mode_button} ${selectedMode === mode ? styles.mode_button.active : ""}`}
              onClick={() => setSelectedMode(mode === selectedMode ? null : mode)}
            >
              {mode}
            </button>
          ))}
        </div>
        <div className={styles.mode_selected}>
          mode now: {selectedMode}
        </div>
      </div>

      <button onClick={() => {
          setSubmitText(inputText);
          setInputText(""); setAvoidIngredient(""); setWantIngredient(""); setTemp(21); setCookingTime("10分以内");
          navigate('/recipe');
        }}
        className={styles.recipe_button}
      >ポチッとレシピ！</button>

      <div className={styles.ingredients_box}>
        <div className={styles.ingredient_section}>
          <p className={styles.ingredient_title}>使いたい食材</p>
          <input
            type="text"
            placeholder="使いたい食材を入れてね"
            value={wantIngredient}
            onChange={(e) => setWantIngredient(e.target.value)}
            className={styles.ingredient_input}
          />
          <button onClick={() => {
              if (wantIngredient.trim() !== "") {
                setWantIngredientList(prev => [...prev, wantIngredient]);
                setWantIngredient("");
              }
            }}
            className={styles.add_button}
          >
            追加
          </button>
          <br />
          {wantIngredientList.map((wantItem, key) => {
            return (
              <div key={key} className={styles.ingredient_list}>
                ・{wantItem}
                <button onClick={() => {
                    setWantIngredientList(prev => prev.filter(item => item !== wantItem));
                  }}
                  className={styles.delete_button}
                >×</button>
              </div>
            )
          })}
        </div>
        <div className={styles.ingredient_section}>
          <p className={styles.ingredient_title}>避けたい食材</p>
          <input
            type="text"
            placeholder="避けたい食材を入れてね"
            value={avoidIngredient}
            onChange={(e) => setAvoidIngredient(e.target.value)}
            className={styles.ingredient_input}
          />
          <button onClick={() => {
              if (avoidIngredient.trim() !== "") {
                setAvoidIngredientList(prev => [...prev, avoidIngredient]);
                setAvoidIngredient("");
              }
            }}
            className={styles.add_button}
          >
            追加
          </button>
          <br />
          {avoidIngredientList.map((avoidItem, key) => {
            return (
              <div key={key} className={styles.ingredient_list}>
                ・{avoidItem}
                <button onClick={() => {
                    setAvoidIngredientList(prev => prev.filter(item => item !== avoidItem));
                  }}
                  className={styles.delete_button}
                >×</button>
              </div>
            )
          })}
        </div>
      </div>
      
      <br />
      現在の選択肢: {inputText}
      <br />
      送信するテキスト: {submitText}
    </div>
  )
}