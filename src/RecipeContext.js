import React, { useState, useEffect, createContext } from "react";

export const RecipeContext = createContext();

export const RecipeProvider = (props) => {
  const [recipe, setRecipe] = useState([]);

  const getRecipe = async () => {
    const response = await fetch("http://starlord.hackerearth.com/recipe");
    const data = await response.json();
    setRecipe(data);
  };

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <RecipeContext.Provider value={[recipe, setRecipe]}>
      {props.children}
    </RecipeContext.Provider>
  );
};
