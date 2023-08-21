import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";

export const register = async (req, res) => {
    try{
        const {
            name,
            email,
            role,
            password
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const universityId = uuidv4();
        const newUser = new User({
            name,
            universityId,
            email,
            role,
            password: passwordHash,
        });
        const savedUser = await newUser.save();
        res.status(201).json({savedUser})
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
};

export const login = async (req, res) => {
    try{
    const { universityId, password } = req.body;
    let user = await User.findOne({ universityId: universityId });
    if(!user){
        return res.status(400).json({ message: "User does not exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(400).json({ message: "Incorrect Password."});
    }
    const token = jwt.sign( {id: user._id, universityId: user.universityId}, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 4 });
    user.password = undefined;
    res.status(200).json({ token, user});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}