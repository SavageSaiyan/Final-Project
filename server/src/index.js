import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import {userRouter} from './routes/users.js'
import {recipesRouter} from './routes/recipes.js'

const app = express();


// Converts data sent to the frontend into JSON
app.use(express.json());
// For API calls
app.use(cors());

app.use('/auth', userRouter)
app.use('/recipes', recipesRouter)

mongoose.connect("mongodb+srv://sterlingduncan9:Sesshomaru9@recipes.0slpbmc.mongodb.net/recipes?retryWrites=true&w=majority")

app.listen(3001, () => console.log("Server running"));
