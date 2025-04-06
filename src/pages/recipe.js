import React, { useState, useEffect } from "react";
import styles from "../styles/recipe.module.css";
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';

export default function Recipe() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialDelayPassed, setInitialDelayPassed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecipeData() {
      if (!initialDelayPassed) {
        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 3 seconds
        setInitialDelayPassed(true);
      }
      if (recipe) {
        console.log("data is not null, no need to fetch again")
        setLoading(false);
        return;
      }
      setLoading(true);
      setRecipe(null); // Reset data before fetching
      console.log("data before fetch", recipe)
      try {
        const response = await fetch("http://localhost:8000/recipe", { method: "GET" });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setRecipe(result.recipe);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch:", error);
        setLoading(false);
      }
    }
    fetchRecipeData();
    const interval = setInterval(fetchRecipeData, 1000);
    return () => clearInterval(interval);
  }, [initialDelayPassed, recipe]);

  console.log("Data fetched:", recipe);
  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.recipeTitle}>今日のレシピ</h1>
      </header>
      
      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loader}></div>
          <p className={styles.loadingText}>レシピを読み込み中...</p>
        </div>
      ) : (
        <div className={styles.recipeContent}>
          {recipe && parse(recipe)}
        </div>
      )}
      
      <div className={styles.buttonContainer}>
        <button
          onClick={() => navigate("/")}
          className={styles.backButton}
        >
          ホームに戻る
        </button>
      </div>
    </div>
  );
}
