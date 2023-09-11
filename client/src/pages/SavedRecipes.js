import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import {useGetUserID} from '../hooks/useGetUserID'


function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
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
// add edit recipe functionality 
  const toggleEdit = (recipe) => {
    // Toggle the isEditing property for the given recipe
    recipe.isEditing = !recipe.isEditing;
    setSavedRecipes([...savedRecipes]); // Trigger re-render
  };
// save recipe edits 
  const saveChanges = async (recipe) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/recipes/${recipe._id}`,
        recipe
      );
      // Assuming your server returns the updated recipe, you can update it in the state
      const updatedRecipe = response.data;
      const index = savedRecipes.findIndex((r) => r._id === updatedRecipe._id);
      if (index !== -1) {
        savedRecipes[index] = updatedRecipe;
        setSavedRecipes([...savedRecipes]);
        toggleEdit(updatedRecipe); // Exit edit mode
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1> Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
            {recipe.isEditing ? (
  // Edit mode: render editable fields
  <>
    <input
      type="text"
      value={recipe.name}
      onChange={(e) => (recipe.name = e.target.value)}
    />
    <textarea
      value={recipe.instructions}
      onChange={(e) => (recipe.instructions = e.target.value)}
    />
    <input
      type="text"
      value={recipe.imageUrl}
      onChange={(e) => (recipe.imageUrl = e.target.value)}
    />
    <input
      type="number"
      value={recipe.cookingTime}
      onChange={(e) => (recipe.cookingTime = e.target.value)}
    />
    {/* Input fields for ingredients */}
    {recipe.ingredients.map((ingredient, idx) => (
      <input
        key={idx}
        type="text"
        value={ingredient}
        onChange={(e) =>
          (recipe.ingredients[idx] = e.target.value)
        }
      />
    ))}
    <button onClick={() => saveChanges(recipe)}>Save</button>
  </>
) : (
  // Display mode: recipe details
  <>
    <h2>{recipe.name}</h2>
    <p>{recipe.instructions}</p>
    <img src={recipe.imageUrl} alt={recipe.name} />
    <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
    {/* Display ingredients */}
    <ul>
      {recipe.ingredients.map((ingredient, idx) => (
        <li key={idx}>{ingredient}</li>
      ))}
    </ul>
    <button onClick={() => toggleEdit(recipe)}>Edit</button>
  </>
)}

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}











// function SavedRecipes() {
//   const [savedRecipes, setSavedRecipes] = useState([]);
//   const userID = useGetUserID();

//   useEffect(() => {
//     const fetchSavedRecipe = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3001/recipes/savedRecipes/${userID}`
//         );
//         setSavedRecipes(response.data.savedRecipes);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchSavedRecipe();
//   }, [userID]); // Make sure to include userID in the dependency array

//   return (
//     <div>
//       <h1> Saved Recipes</h1>
//       <ul>
//         {savedRecipes && savedRecipes.map((recipe) => (
//           <li key={recipe._id}>
//             <div>
//               <h2>{recipe.name}</h2>
//             </div>
//             <div className="instructions">
//               <p> {recipe.instructions}</p>
//             </div>
//             <img src={recipe.imageUrl} alt={recipe.name} />
//             <p> Cooking Time: {recipe.cookingTime} (minutes)</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }











// function SavedRecipes() {
//   const [savedRecipes, setSavedRecipes] = useState([]);
//   const userID = useGetUserID();

//   useEffect(() => {



//     const fetchSavedRecipe = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3001/recipes/savedRecipes/${userID}`
//           );
//           setSavedRecipes(response.data.savedRecipes);
//       } catch (err) {
//         console.error(err);
//       }
//     };

  
//     fetchSavedRecipe();
//   }, []);


//   return (
//   <div>
//       <h1> Saved Recipes</h1>
//       <ul>
//         {savedRecipes.map((recipe) => (
//           <li key={recipe._id}>
//             <div>
//               <h2>{recipe.name}</h2>
//             </div>
//             <div className="instructions">
//               <p> {recipe.instructions}</p>
//             </div>
//             <img src={recipe.imageUrl} alt={recipe.name} />
//             <p> Cooking Time: {recipe.cookingTime} (minutes)</p>
//           </li>
//         ))}
//       </ul>
//   </div>
//   );
// };

export default SavedRecipes;
