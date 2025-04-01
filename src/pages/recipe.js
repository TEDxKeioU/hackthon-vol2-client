import React, { useState, useEffect } from "react";
import "../App.css";
import Markdown from "react-markdown";

export default function Recipe() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
      async function fetchRecipeData() {
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
          } catch (error) {
              console.error("Failed to fetch:", error);
          }
      }
      fetchRecipeData();
      const interval = setInterval(fetchRecipeData, 1000);
      return () => clearInterval(interval);
  }, [recipe]);

  console.log("Data fetched:", recipe);
  return (
    <div>
      <h1>レシピ</h1>
      {loading ? (
        <p>loading...</p>
      ) : (
        <Markdown>{recipe}</Markdown>
      )}
    </div>
  );
}