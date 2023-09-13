import mongoose from 'mongoose'

// VERSION 2 ( with delete button )

// const RecipesSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     ingredients: [{ type: String, required: true }],
//     instructions: { type: String, required: true },
//     imageUrl: { type: String, required: true },
//     cookingTime: { type: Number, required: true },
//     userOwner: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'users',
//         required: true,
//     },
//     isDeleted: {
//         type: Boolean,
//         default: false,
//     }, // New field for soft deletion
// });




// VERSION 1 working
// make the Schema for Recipes
const RecipesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ingredients: [{type: String, required: true}],
    instructions: {type: String, required: true},
    imageUrl: {type: String, required: true},
    cookingTime: {type: Number, required: true},
    userOwner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users", 
        required: true
    },
});

export const RecipeModel = mongoose.model("recipes", RecipesSchema)
