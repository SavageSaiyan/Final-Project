import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import {useGetUserID} from '../hooks/useGetUserID'
import {useCookies} from 'react-cookie'
// Create homepage functionality 
function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"])

// get userID
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
// function for going to saved recipes page
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
        }, 
        {headers: {authorization: cookies.access_token}}); // set up authentication for saving recipes
      setSavedRecipes(response.data.savedRecipes)
    } catch (err) {
      console.error(err);
    }
  }

  const isRecipeSaved = (id) => savedRecipes && savedRecipes.includes(id);


  return (
    <>
    <h1 className="sharingRecipes"> Sharing Recipes Wiki</h1>
    
  <div className="container-top">
      
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              {/* button to save recipe */}
              <button 
              className="button-animation button-color"
              onClick={() => saveRecipe(recipe._id)} 
              disabled={isRecipeSaved(recipe._id)}
              >
                
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
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
  </>
  );
};

export default Home;
