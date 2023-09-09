import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users.js';



const router = express.Router()
 // REGISTER 
router.post("/register", async(req, res) => {
    const {username, password} = req.body;

    const user = await UserModel.findOne({username})

    if (user) {
        return res.json({message: "User already exists!"});
    }
// hash our password and add some salt to it 
     const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new UserModel({username, password: hashedPassword})
    await newUser.save()

    res.json({message: "User Registered Successfully!"});
});
// LOGIN
router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username})
// if user types in the same user and password
    if (!user) {
        return res.json({message: "User Doesn't Exist!"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
// if password doesnt match
    if (!isPasswordValid) {
        return res.json({message: "Username or Password Is Incorrect!"});
    }
// TOKEN
    const token = jwt.sign({id: user._id}, "secret");
    res.json({token, userID: user._id})
});


export {router as userRouter };