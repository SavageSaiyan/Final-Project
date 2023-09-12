import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import {useGetUserID} from '../hooks/useGetUserID'



// VERSION 5 (has both delete and edit buttons working just not as intended. WORKING)

function SavedRecipes() {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [editingRecipe, setEditingRecipe] = useState(null);
    const [editedRecipe, setEditedRecipe] = useState({}); // State to store edited recipe details
    const userID = useGetUserID();
  
    useEffect(() => {
      const fetchSavedRecipe = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/recipes/savedRecipes/${userID}`
          );
          setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchSavedRecipe();
    }, [userID]);
  
    const handleDelete = async (recipeID) => {
      try {
        await axios.delete(`http://localhost:3001/recipes/savedRecipes/${userID}/${recipeID}`, {
          data: { userID }, // Send the userID in the request body
        });
        // After successful deletion, update the savedRecipes state by filtering out the deleted recipe
        setSavedRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe._id !== recipeID)
        );
      } catch (err) {
        console.error(err);
      }
    };
  
    const handleEdit = (recipe) => {
      setEditingRecipe(recipe);
      setEditedRecipe({ ...recipe }); // Initialize the edited recipe details with the current recipe
    };
  
    const handleSaveEdit = async () => {
      try {
        // Send a PUT request to update the recipe details
        await axios.put(`http://localhost:3001/recipes/${editingRecipe._id}`, editedRecipe);
  
        // Update the savedRecipes state to reflect the changes
        setSavedRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe._id === editingRecipe._id ? editedRecipe : recipe
          )
        );
  
        // Reset the editing state
        setEditingRecipe(null);
        setEditedRecipe({});
      } catch (err) {
        console.error(err);
      }
    };
  
    return (
      <div>
        <h1>Saved Recipes</h1>
        <ul>
          {savedRecipes &&
            savedRecipes.map((recipe) => (
              <li key={recipe._id}>
                <div>
                  {editingRecipe === recipe ? (
                    <>
                      <input
                        type="text"
                        value={editedRecipe.name}
                        onChange={(e) =>
                          setEditedRecipe({ ...editedRecipe, name: e.target.value })
                        }
                        placeholder="Recipe Name"
                      />
                      <input
                        type="text"
                        value={editedRecipe.instructions}
                        onChange={(e) =>
                          setEditedRecipe({ ...editedRecipe, instructions: e.target.value })
                        }
                        placeholder="Instructions"
                      />
                      <input
                        type="text"
                        value={editedRecipe.imageUrl}
                        onChange={(e) =>
                          setEditedRecipe({ ...editedRecipe, imageUrl: e.target.value })
                        }
                        placeholder="Image URL"
                      />
                      <input
                        type="number"
                        value={editedRecipe.cookingTime}
                        onChange={(e) =>
                          setEditedRecipe({ ...editedRecipe, cookingTime: e.target.value })
                        }
                        placeholder="Cooking Time (minutes)"
                      />
                      {/* Add more input fields for other recipe properties as needed */}
                      <button onClick={handleSaveEdit}>Save</button>
                    </>
                  ) : (
                    <>
                      <h2>{recipe.name}</h2>
                      <button onClick={() => handleEdit(recipe)}>Edit</button>
                      <button onClick={() => handleDelete(recipe._id)}>Delete</button>
                    </>
                  )}
                </div>
                <div className="instructions">
                  <p>{recipe.instructions}</p>
                </div>
                <img src={recipe.imageUrl} alt={recipe.name} />
                <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
              </li>
            ))}
        </ul>
      </div>
    );
  }










export default SavedRecipes;
