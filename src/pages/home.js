import { useState } from "react";
import "./home.css";  

export default function Home() {
  const [selectedMode, setSelectedMode] = useState(null);
  const [wantIngredients, setWantIngredients] = useState('');
  const [avoidedIngredients, setAvoidedIngredients] = useState('');
  const [wantList, setWantList] = useState([]);
  const [avoidedList, setAvoidedList] = useState([]);
  const modes = ["お手軽", "ひと工夫", "じっくり"];

  const addIngredient = (type) => {
    if (type === 'want' && wantIngredients) {
      setWantList([...wantList, wantIngredients]);
      setWantIngredients('');
    } else if (type === 'avoid' && avoidedIngredients) {
      setAvoidedList([...avoidedList, avoidedIngredients]);
      setAvoidedIngredients('');
    }
  };

  const handleKeyPress = (e, type) => {
    if (e.key === 'Enter') addIngredient(type);
  };

  return (
    <div className="container">
      <div className="weather-box">
        <span className="weather-icon">🌤️</span>
        <span className="weather-text">晴れのち曇  27° 暑い</span>
      </div>

      <div className="mode-box">
        <p className="mode-title">mode</p>
        <div className="mode-buttons">
          {modes.map((mode, index) => (
            <button
              key={index}
              className={`mode-button ${selectedMode === mode ? "active" : ""}`}
              onClick={() => setSelectedMode(mode === selectedMode ? null : mode)}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <button className="recipe-button">ポチッとレシピ！</button>

      <div className="ingredients-box">
        <IngredientInput 
          title="避けたい食材" 
          value={avoidedIngredients} 
          setValue={setAvoidedIngredients} 
          onSubmit={() => addIngredient('avoid')} 
          onKeyPress={(e) => handleKeyPress(e, 'avoid')} 
          list={avoidedList} 
        />
        
        <IngredientInput 
          title="使いたい食材" 
          value={wantIngredients} 
          setValue={setWantIngredients} 
          onSubmit={() => addIngredient('want')} 
          onKeyPress={(e) => handleKeyPress(e, 'want')} 
          list={wantList} 
        />
      </div>
    </div>
  );
}

function IngredientInput({ title, value, setValue, onSubmit, onKeyPress, list }) {
  return (
    <div className="ingredient-section">
      <p className="ingredient-title">{title}</p>
      <input 
        type="text" 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder="ここに入力してください"
        className="ingredient-input"
      />
      <button onClick={onSubmit} className="add-button">追加</button>
      <ul className="ingredient-list">
        {list.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
}
