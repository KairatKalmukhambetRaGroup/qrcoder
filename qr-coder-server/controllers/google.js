import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const googleAuth = async (req, res) => {
    const userData = req.body;

    try {
        let user = await User.findOne({googleId: userData.uid});

        if(!user) {
            user = await User.findOne({email: userData.email});
            
            if(user){
                user = await User.findByIdAndUpdate(user.id, {googleId: userData.uid, displayName: userData.displayName, photoURL: userData.photoURL}, {new: true});

            }else{
                user = await User.create({
                    email: userData.email,
                    googleId: userData.uid,
                    displayName: userData.displayName,
                    photoURL: userData.photoURL, 
                    confirmed: true,
                    activationToken: null
                });
                
            }
        }
        const expireTime = "60d";
        const token = jwt.sign({email: user.email, id: user._id}, process.env.TOKEN_KEY, {expiresIn: expireTime});
        return res.json({user, token});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong"});
    }
}