import express from 'express'
import mongoose from 'mongoose';
import { RecipeModel } from "../models/Recipes.js";

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
router.post("/", async(req, res) => {
    const recipe = new RecipeModel(req.body)
    try {
        const response = await recipe.save();
        res.json(response)
    } catch (err) {
        res.json(err);
    }
})

router.put("/", async(req, res) => {
    {userId, recipeId}
   
    try {
        const response = await recipe.save();
        res.json(response)
    } catch (err) {
        res.json(err);
    }
})

export {router as recipesRouter};
