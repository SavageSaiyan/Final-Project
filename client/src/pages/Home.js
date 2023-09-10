import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import {useGetUserID} from '../hooks/useGetUserID'

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();
  useEffect(() => {

    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/recipes");
          setRecipes(response.data)
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
          );
          setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipe();
    fetchSavedRecipe();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes", {
          recipeID, 
          userID,
        });
        console.log(response);
    } catch (err) {
      console.error(err);
    }
  }


  return (
  <div>
      <h1> Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            {savedRecipes.includes(recipe._id) && <h1>ALREADY SAVED</h1>}
            <div>
              <h2>{recipe.name}</h2>
              {/* button to save recipe */}
              <button onClick={() => saveRecipe(recipe._id)}>Save</button>
            </div>
            <div className="instructions">
              <p> {recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p> Cooking Time: {recipe.cookingTime} (minutes)</p>
          </li>
        ))}
      </ul>
  </div>
  );
};

export default Home;
