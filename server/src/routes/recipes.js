import express from 'express'
import mongoose from 'mongoose';
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from '../models/Users.js';
//import { verify } from 'jsonwebtoken';
import { verifyToken } from './users.js';





// VERSION 1 (no edit or delete button,  working)

const router = express.Router();



//Get request 
router.get("/", async(req, res) => {
    try {
        const response = await RecipeModel.find({});
        res.json(response)
    } catch (err) {
        res.json(err);
    }
})
//Post request to add recipes
router.post("/", verifyToken, async(req, res) => {
    const recipe = new RecipeModel(req.body)
    try {
        const response = await recipe.save();
        res.json(response)
    } catch (err) {
        res.json(err);
    }
})
//Put request for the recipe
router.put("/", verifyToken, async(req, res) => {
    
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID)
        const user = await UserModel.findById(req.body.userID)
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({savedRecipes: user.savedRecipes})
    } catch (err) {
        res.json(err);
    }
})

router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        res.json({savedRecipes: user?.savedRecipes})
    } catch (err) {
        res.json(err)
    }
})
// route saved recipes
router.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        const savedRecipes = await RecipeModel.find({
            _id:  user.savedRecipes 
        })
        res.json({savedRecipes})
    } catch (err) {
        res.json(err)
    }
})


// Update a recipe by ID
router.put('/:recipeID', async (req, res) => {
  try {
    const { recipeID } = req.params;
    const updatedRecipeData = req.body; // This should contain the updated recipe data

    // Check if the recipe exists
    const existingRecipe = await RecipeModel.findById(recipeID);

    if (!existingRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Update the recipe fields based on the updated data
    existingRecipe.name = updatedRecipeData.name;
    existingRecipe.instructions = updatedRecipeData.instructions;
    existingRecipe.imageUrl = updatedRecipeData.imageUrl;
    existingRecipe.cookingTime = updatedRecipeData.cookingTime;

    // Save the updated recipe
    await existingRecipe.save();

    res.json({ message: 'Recipe updated successfully', updatedRecipe: existingRecipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//delete request
// DELETE request to delete a recipe by ID
router.delete('/savedRecipes/:userID/:recipeID', async (req, res) => {
  try {
    const { recipeID } = req.params;

    // Check if the recipe exists
    console.log(`Attempting to delete recipe with ID: ${recipeID}`);
    const foundRecipe = await RecipeModel.findById(recipeID);
    console.log(foundRecipe)


    

    if (!foundRecipe) {
      console.log(`Recipe with ID ${recipeID} not found`);
      return res.status(404).json({ message: 'Recipe not found' });
    }
    //const deletedRecipe = await RecipeModel.findByIdAndDelete(recipeID);

    // Remove the deleted recipe from the user's saved recipes
    //const userID = deletedRecipe.userOwner;

    const {userID} = req.params;
    const user = await UserModel.findById(userID);

    if (user) {
      console.log(`Removing recipe with ID ${recipeID} from user's saved recipes`);
      user.savedRecipes.pull(recipeID);
      await user.save();
      console.log(`Recipe removed from user's saved recipes`);
    }

    console.log(`Recipe with ID ${recipeID} deleted successfully`);
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    console.error(`Error deleting recipe with ID ${recipeID}:`, err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export {router as recipesRouter};



// 1. get user from saveRecipes   ( saveRecipes, userID)
// 2. specify what you're trying to delete : savedRecipes/userID/recipeID
//3.  after you specify , then try to delete (google mongoose method for delete)