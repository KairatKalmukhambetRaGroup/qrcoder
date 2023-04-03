import User from "../models/user.js";
import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(404).json({message: "Token not found"});
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        let decodedData = jwt.verify(token, process.env.TOKEN_KEY);
        req.userId = decodedData.id;
        // const user = await User.findById(req.userId).populate('role');
        // req.userRole = user.role.name;
        var allow = true;

        if(allow)   next();
        else
            return res.status(403).json({error: 'Access denied'});
    } catch (error) {
        switch(error.name){
            case 'JsonWebTokenError':
                return res.status(400).json({message: "Invalid token"});
            default:
                console.log(error);
                return res.status(500).json({message: "Something went wrong"});
        }
    }
}

export const ifUser = async (req, res, next) => {
    if(!req.headers.authorization){
        req.userId = null;
        next();
    }else{
        try {
            const token = req.headers.authorization.split(" ")[1];
            let decodedData = jwt.verify(token, process.env.TOKEN_KEY);
            req.userId = decodedData.id;
            next();
        } catch (error) {
            req.userId = null;
            next();
        }
    }
}