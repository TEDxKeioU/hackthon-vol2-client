import React, { useState } from "react";
import "./MealTracker.css";

const MealTracker = () => {
  const [meals, setMeals] = useState({
    breakfast: "納豆ご飯",
    lunch: "チンジャオロース",
    dinner: "カレー",
  });
  const [newMeal, setNewMeal] = useState("");

  const handleAddMeal = () => {
    if (newMeal.trim()) {
      alert(`新しい食事 "${newMeal}" を記録しました！`);
      setNewMeal("");
    }
  };

  return (
    <div className="container">
      <h1 className="title">三日間の食事カレンダー</h1>
      <div className="calendar">
        {['3/29', '3/30', '3/31'].map((date) => (
          <div key={date} className="sticky-note">
            <p className="date">{date}</p>
            <p>パン</p>
            <p>炒飯</p>
            <p>シチュー</p>
          </div>
        ))}
      </div>

      <div className="meal-box">
        <h2>Mon Mar 31 2025の食事</h2>
        <div className="meal">🌞 朝: {meals.breakfast}</div>
        <div className="meal">🌻 昼: {meals.lunch}</div>
        <div className="meal">🌙 夜: {meals.dinner}</div>
      </div>

      <div className="record-box">
        <h2>食事の記録</h2>
        <input
          type="text"
          value={newMeal}
          onChange={(e) => setNewMeal(e.target.value)}
          placeholder="料理名を入力"
          className="input"
        />
        <button onClick={handleAddMeal} className="button">
          記録する
        </button>
      </div>
    </div>
  );
};

export default MealTracker;
