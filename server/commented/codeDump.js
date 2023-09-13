
// recipes.js ----------------------------------------------------

// VERSION 3.5 ( after schema update for delete)
// const router = express.Router();

// // GET request to fetch all recipes
// router.get('/', async (req, res) => {
//   try {
//     const recipes = await RecipeModel.find({});
//     res.json(recipes);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch recipes' });
//   }
// });

// // POST request to add a new recipe
// router.post('/', verifyToken, async (req, res) => {
//   try {
//     const newRecipe = new RecipeModel(req.body);
//     const response = await newRecipe.save();
//     res.status(201).json(response);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to add the recipe' });
//   }
// });

// // PUT request to add a recipe to a user's saved recipes
// router.put('/', verifyToken, async (req, res) => {
//   try {
//     const { recipeID, userID } = req.body;
//     const recipe = await RecipeModel.findById(recipeID);
//     const user = await UserModel.findById(userID);

//     if (!recipe || !user) {
//       return res.status(404).json({ message: 'Recipe or user not found' });
//     }

//     user.savedRecipes.push(recipe);
//     await user.save();
//     res.json({ savedRecipes: user.savedRecipes });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to add the recipe to saved recipes' });
//   }
// });

// // GET saved recipes' IDs for a user
// router.get('/savedRecipes/ids/:userID', async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.params.userID);
//     res.json({ savedRecipes: user?.savedRecipes });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch saved recipe IDs' });
//   }
// });

// // GET saved recipes for a user
// router.get('/savedRecipes/:userID', async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.params.userID);
//     const savedRecipes = await RecipeModel.find({
//       _id: { $in: user.savedRecipes },
//     });
//     res.json({ savedRecipes });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch saved recipes' });
//   }
// });

// // Delete request to mark a recipe as deleted (soft deletion)
// //router.delete('/:recipeID', verifyToken, async (req, res) => {
// router.delete('/savedRecipes/:delete', async (req, res) => {
//   console.log(' hit delete route')
//   res.json({message:"hello"})
// })





// // VERSION 3 (with adding delete button)

// const router = express.Router();

// // GET request to fetch all recipes
// router.get('/', async (req, res) => {
//   try {
//     const recipes = await RecipeModel.find({});
//     res.json(recipes);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch recipes' });
//   }
// });

// // POST request to add a new recipe
// router.post('/', verifyToken, async (req, res) => {
//   try {
//     const newRecipe = new RecipeModel(req.body);
//     const response = await newRecipe.save();
//     res.status(201).json(response);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to add the recipe' });
//   }
// });

// // PUT request to add a recipe to a user's saved recipes
// router.put('/', verifyToken, async (req, res) => {
//   try {
//     const { recipeID, userID } = req.body;
//     const recipe = await RecipeModel.findById(recipeID);
//     const user = await UserModel.findById(userID);

//     if (!recipe || !user) {
//       return res.status(404).json({ message: 'Recipe or user not found' });
//     }

//     user.savedRecipes.push(recipe);
//     await user.save();
//     res.json({ savedRecipes: user.savedRecipes });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to add the recipe to saved recipes' });
//   }
// });

// // GET saved recipes' IDs for a user
// router.get('/savedRecipes/ids/:userID', async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.params.userID);
//     res.json({ savedRecipes: user?.savedRecipes });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch saved recipe IDs' });
//   }
// });

// // GET saved recipes for a user
// router.get('/savedRecipes/:userID', async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.params.userID);
//     const savedRecipes = await RecipeModel.find({
//       _id: { $in: user.savedRecipes },
//     });
//     res.json({ savedRecipes });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch saved recipes' });
//   }
// });

// // DELETE a recipe by ID
// router.delete('/:recipeId', verifyToken, async (req, res) => {
//     try {
//       const { recipeId } = req.params;
//       const userId = req.user.id; // Assuming you store user ID in the token
  
//       // Check if the recipe exists
//       const recipe = await RecipeModel.findById(recipeId);
//       if (!recipe) {
//         return res.status(404).json({ message: 'Recipe not found' });
//       }
  
//       // Check if the user owns the recipe or has the necessary permissions
//       if (recipe.userOwner.toString() !== userId) {
//         return res.status(403).json({ message: 'Unauthorized to delete this recipe' });
//       }
  
//       // Delete the recipe
//       await recipe.remove();
  
//       res.json({ message: 'Recipe deleted successfully' });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });






// VERSION 2 (during trying to use Edit button, but struggling)

// const router = express.Router();

// // GET request to retrieve all recipes
// router.get('/', async (req, res) => {
//   try {
//     const recipes = await RecipeModel.find({});
//     res.json(recipes);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch recipes. Please try again later.' });
//   }
// });

// // POST request to add a new recipe
// router.post('/', verifyToken, async (req, res) => {
//   try {
//     const newRecipe = new RecipeModel(req.body);
//     const savedRecipe = await newRecipe.save();
//     res.json(savedRecipe);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to add a new recipe. Please try again later.' });
//   }
// });

// // PUT request to update a specific recipe by ID
// router.put('/:recipeId', verifyToken, async (req, res) => {
//   try {
//     const recipeId = req.params.recipeId;
//     const updatedRecipe = req.body; // Assuming you're sending the entire updated recipe in the request body

//     // Validate and update the recipe
//     if (!mongoose.Types.ObjectId.isValid(recipeId)) {
//       return res.status(400).json({ message: 'Invalid Recipe ID' });
//     }

//     const existingRecipe = await RecipeModel.findById(recipeId);
//     if (!existingRecipe) {
//       return res.status(404).json({ message: 'Recipe not found' });
//     }

//     // Update the recipe fields (example: only updating the name)
//     existingRecipe.name = updatedRecipe.name;

//     // Save the updated recipe
//     const savedRecipe = await existingRecipe.save();

//     res.json(savedRecipe);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to update the recipe. Please try again later.' });
//   }
// });







//------------------------------------------------------------------------------------------------------
















//SavedRecipes.js ---------------------------------------------------------------------
//VERSION 1

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

// VERSION 4 (with a delete button)

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
//   }, [userID]);

//   const deleteRecipe = async (recipeId) => {
//     try {
//       await axios.delete(`http://localhost:3001/delete/${recipeId}`);
//       // Filter out the deleted recipe from the state
//       setSavedRecipes(savedRecipes.filter((recipe) => recipe._id !== recipeId));
//     } catch (err) {
//       console.error(err);
//       alert('Failed to delete the recipe. Please try again later.');
//     }
//   };

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
//             <button onClick={() => deleteRecipe(recipe._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }





// VERSION 3  (tried to add edit button but struggling)


// function isValidImageUrl(url) { // decided not to use this function for now , its messing up images that work.
//   const imageUrlRegex = /\.(jpeg|jpg|gif|png|bmp)$/i;
//   return imageUrlRegex.test(url);
// }

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
//   }, [userID]);

//   const toggleEdit = (recipe) => {
//     recipe.isEditing = !recipe.isEditing;
//     setSavedRecipes([...savedRecipes]);
//   };

//   const saveChanges = async (recipe) => {
//     try {
//       if (recipe.name.trim() === "") {
//         alert("Recipe name is required.");
//         return;
//       }
//       if (isNaN(recipe.cookingTime)) {
//         alert("Cooking time must be a number.");
//         return;
//       }
  
//       const response = await axios.put(
//         `http://localhost:3001/recipes/${recipe._id}`,
//         recipe
//       );
  
//       const updatedRecipe = response.data;
//       const updatedRecipes = savedRecipes.map((r) =>
//         r._id === updatedRecipe._id ? updatedRecipe : r
//       );
  
//       setSavedRecipes(updatedRecipes);
//       toggleEdit(updatedRecipe);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update the recipe. Please try again later.");
//     }
//   };
  

//   const handleInputChange = (e, recipe, field) => {
//     const updatedRecipe = { ...recipe, [field]: e.target.value };
//     setSavedRecipes((prevRecipes) =>
//       prevRecipes.map((r) => (r._id === recipe._id ? updatedRecipe : r))
//     );
//   };

//   return (
//     <div>
//       <h1> Saved Recipes</h1>
//       <ul>
//         {savedRecipes.map((recipe) => (
//           <li key={recipe._id}>
//             <div>
//               {recipe.isEditing ? (
//                 <>
//                   <input
//                     type="text"
//                     value={recipe.name}
//                     onChange={(e) => handleInputChange(e, recipe, "name")}
//                   />
//                   <textarea
//                     value={recipe.instructions}
//                     onChange={(e) =>
//                       handleInputChange(e, recipe, "instructions")
//                     }
//                   />
//                   <input
//                     type="text"
//                     value={recipe.imageUrl}
//                     onChange={(e) =>
//                       handleInputChange(e, recipe, "imageUrl")
//                     }
//                   />
//                   <input
//                     type="number"
//                     value={recipe.cookingTime}
//                     onChange={(e) =>
//                       handleInputChange(e, recipe, "cookingTime")
//                     }
//                   />
//                   {recipe.ingredients.map((ingredient, idx) => (
//                     <input
//                       key={idx}
//                       type="text"
//                       value={ingredient}
//                       onChange={(e) =>
//                         handleInputChange(e, recipe, "ingredients")
//                       }
//                     />
//                   ))}
//                   <button onClick={() => saveChanges(recipe)}>Save</button>
//                 </>
//               ) : (
//                 <>
//                   <h2>{recipe.name}</h2>
//                   <p>{recipe.instructions}</p>
//                   <img src={recipe.imageUrl} alt={recipe.name} />
//                   <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
//                   <ul>
//                     {recipe.ingredients.map((ingredient, idx) => (
//                       <li key={idx}>{ingredient}</li>
//                     ))}
//                   </ul>
//                   <button onClick={() => toggleEdit(recipe)}>Edit</button>
//                 </>
//               )}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }




// VERSION 2 (No edit button , but has Delete button WORKING )

// function SavedRecipes() {
//     const [savedRecipes, setSavedRecipes] = useState([]);
//     const userID = useGetUserID();
  
//     useEffect(() => {
//       const fetchSavedRecipe = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:3001/recipes/savedRecipes/${userID}`
//           );
//           setSavedRecipes(response.data.savedRecipes);
//         } catch (err) {
//           console.error(err);
//         }
//       };
  
//       fetchSavedRecipe();
//     }, [userID]);
  
//     const handleDelete = async (recipeID) => {
//       try {
//         await axios.delete(`http://localhost:3001/recipes/savedRecipes/${userID}/${recipeID}`, {
//           data: { userID }, // Send the userID in the request body
//         });
//         // After successful deletion, update the savedRecipes state by filtering out the deleted recipe
//         setSavedRecipes((prevRecipes) =>
//           prevRecipes.filter((recipe) => recipe._id !== recipeID)
//         );
//       } catch (err) {
//         console.error(err);
//       }
//     };
  
//     return (
//       <div>
//         <h1>Saved Recipes</h1>
//         <ul>
//           {savedRecipes &&
//             savedRecipes.map((recipe) => (
//               <li key={recipe._id}>
//                 <div>
//                   <h2>{recipe.name}</h2>
//                   <button onClick={() => handleDelete(recipe._id)}>
//                     Delete
//                   </button>
//                 </div>
//                 <div className="instructions">
//                   <p>{recipe.instructions}</p>
//                 </div>
//                 <img src={recipe.imageUrl} alt={recipe.name} />
//                 <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
//               </li>
//             ))}
//         </ul>
//       </div>
//     );
//   }






























//-------------------------------------------------------------------------------

// CSS CODE : 

