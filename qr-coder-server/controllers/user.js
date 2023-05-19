import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from 'uuid';
import generator from 'generate-password';

import User from "../models/user.js";
import Restore from "../models/restore.js";

const dictionary = {
    "ru": {
        "subject": "Активация учетной записи QR coder",
        "title": "Активация аккаунта",
        "activate": "Активировать",
        "text": "ваш аккаунт",
        "subjectPass": "QR coder сброс аккаунта",
        "titlePass" : "сброс аккаунта",
        "resetPass": "Cбросить",
        "textPass": "пароль учетной записи"

    },
    "kz": {
        "subject": "QR coder есептік жазбасын іске қосу",
        "title": "Есептік жазбаны іске қосу",
        "activate": "іске қосыныз",
        "text": "Есептік жазбаңызды",
        "subjectPass": "QR coder есептік жазбасын қалпына келтіріңіз",
        "titlePass" : "Есептік жазбаны қалпына келтіру",
        "resetPass": "қайта орнатыныз",
        "textPass": "Есептік жазбаңыздың құпия сөзің"
    },
    "en": {
        "subject": "QR coder account activation",
        "title": "Account activation",
        "activate": "Activate",
        "text": "your account",
        "subjectPass": "QR Coder reset account",
        "titlePass" : "Reset account",
        "resetPass": "Reset",
        "textPass": "your account password"
    },
}

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth:{
        user: "qashqyn291@gmail.com",
        pass: "ytgxtoqhfhumfmbp"
    },
    secure: true,
});

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong"});
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if(!existingUser)
            return res.status(401).json({error: "Invalid credentials."});
        const isPasswordCorrect = await bcryptjs.compare(password, existingUser.password);
        if(!isPasswordCorrect)
            return res.status(401).json({error: "Invalid credentials."});
        let expireTime = "6h";
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.TOKEN_KEY, {expiresIn: expireTime});

        return res.json({user: existingUser, token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong"});
    }
}

export const restore = async (req, res) => {
    const {email, lang} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser)
            return res.status(404).json({error: "User does not exist"});

        const existingRestore = await Restore.findOne({email});
        if(existingRestore)
            await Restore.findByIdAndDelete(existingRestore._id);

        const restoreAccount = await Restore.create({email});

        console.log(restoreAccount._id);

        const mailOptions = {
            from: process.env.EMAIL_ACCOUNT_DEV,
            to: email,
            subject: dictionary[lang].subjectPass,
            html: `
                <h1>${dictionary[lang].titlePass}</h1>
                <p>
                    ${
                        lang === "kz" ? `
                            ${dictionary[lang].textPass} <a href="${process.env.CLIENT_URL_DEV}/reset/${restoreAccount._id}">${dictionary[lang].resetPass}</a> 
                        `:`
                            <a href="${process.env.CLIENT_URL_DEV}/reset/${restoreAccount._id}">${dictionary[lang].resetPass}</a> ${dictionary[lang].textPass} 
                        `
                    }
                </p>
            `
        };
        transporter.sendMail(mailOptions, (err, info)=>{
            if(err)
                console.log(err);
        })

        return res.json();
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong"});
    }
}
export const resetPass = async (req, res) => {
    const {password, id} = req.body;
    try {
        const existingRestore = await Restore.findById(id);
        if(!existingRestore)
            return res.status(400).json();
        const existingUser = await User.findOne({email: existingRestore.email});
        if(!existingUser)
            return res.status(404).json({error: "User does not exist."});
        
        const hashedPassword = await bcryptjs.hash(password, 12);
        
        const user = await User.findByIdAndUpdate(existingUser._id, {password: hashedPassword}, {new: true});

        let expireTime = "60d";
        const token = jwt.sign({email: user.email, id: user._id}, process.env.TOKEN_KEY, {expiresIn: expireTime});

        await Restore.findByIdAndDelete(id);

        return res.json({user: user, token});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});       
    }
}

export const register = async (req, res) => {
    const {email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser)
            return res.status(401).json({error: "User already exist"});
        
        const hashedPassword = await bcryptjs.hash(password, 12);
        const activationToken = uuidv4();
        const user = await User.create({email, password: hashedPassword, activationToken});

        const mailOptions = {
            from: process.env.EMAIL_ACCOUNT_DEV,
            to: user.email,
            subject: dictionary[lang].subject,
            html: `
                <h1>${dictionary[lang].title}</h1>
                <p>
                    ${
                        lang === "kz" ? `
                            ${dictionary[lang].text} <a href="${process.env.CLIENT_URL_DEV}/activate/${activationToken}">${dictionary[lang].activate}</a> 
                        `:`
                            <a href="${process.env.CLIENT_URL_DEV}/activate/${activationToken}">${dictionary[lang].activate}</a> ${dictionary[lang].text} 
                        `
                    }
                </p>
            `
        };
        transporter.sendMail(mailOptions, (err, info)=>{
            if(err)
                console.log(err);
        })
        return res.json();

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong"});
    }
}

export const sendActivationLink = async (req, res) => {
    const {email, lang} = req.body;

    

    try {
        const existingUser = await User.findOne({email});
        if(!existingUser)
            return res.status(401).json({error: "User does not exist"});
        const activationToken = uuidv4();
        const user = await User.findByIdAndUpdate(existingUser._id, {activationToken}, {new: true});
        const mailOptions = {
            from: process.env.EMAIL_ACCOUNT_DEV,
            to: user.email,
            subject: dictionary[lang].subject,
            html: `
                <h1>${dictionary[lang].title}</h1>
                <p>
                    ${
                        lang === "kz" ? `
                            ${dictionary[lang].text} <a href="${process.env.CLIENT_URL_DEV}/activate/${activationToken}">${dictionary[lang].activate}</a> 
                        `:`
                            <a href="${process.env.CLIENT_URL_DEV}/activate/${activationToken}">${dictionary[lang].activate}</a> ${dictionary[lang].text} 
                        `
                    }
                </p>
            `
        };
        transporter.sendMail(mailOptions, (err, info)=>{
            if(err)
                console.log(err);
        })
        return res.json();
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});       
    }
}

export const activateAccount = async (req, res) => {
    const {activationToken} = req.body;
    try {
        const user = await User.findOne({activationToken});
        if(!user) return res.status(404).json({error: "User does not exist."});

        const expiresIn = 1000 * 60 * 60 * 60 * 24;

        if(!user.confirmed && (Date.now() - user.createdAt) > expiresIn){
            await User.findByIdAndDelete(user._id);
            return res.status(201).json({error: "Token expired"});
        }
        const newUser = await User.findByIdAndUpdate(user._id, {confirmed: true, activationToken: null}, {new: true});

        let expireTime = "6h";
        const token = jwt.sign({email: newUser.email, id: newUser._id}, process.env.TOKEN_KEY, {expiresIn: expireTime});

        return res.json({user: newUser, token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong"});
    }
}

export const deleteUser = async (req, res)=>{
    const {id} = req.params;
    try {
        const existingUser = await User.findById(id);
        if(!existingUser) 
            return res.status(404).json({error: "User does not exist."});
        await User.findByIdAndRemove(id);
        return res.status(200).json();
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});       
    }
}


export const changeEmail = async (req, res) => {
    const id = req.userId;
    const {new_email: newEmail} = req.body;
    try {
        const existingUser = await User.findById(id);
        if(!existingUser)
            return res.status(404).json({error: "User does not exist."});

        const user = await User.findByIdAndUpdate(id, {email: newEmail}, {new: true});

        let expireTime = "60d";
        const token = jwt.sign({email: user.email, id: user._id}, process.env.TOKEN_KEY, {expiresIn: expireTime});

        return res.json({user: user, token});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});       
    }
}

export const changePassword = async (req, res) => {
    const id = req.userId;
    const {old_password: password, new_password: newPassword} = req.body;
    try {
        const existingUser = await User.findById(id);
        if(!existingUser)
        return res.status(404).json({error: "User does not exist."});

        const isPasswordCorrect = await bcryptjs.compare(password, existingUser.password);
        if(!isPasswordCorrect)
            return res.status(401).json({error: "Invalid credentials."});
        
        const hashedPassword = await bcryptjs.hash(newPassword, 12);
        
        const user = await User.findByIdAndUpdate(id, {password: hashedPassword}, {new: true});

        let expireTime = "60d";
        const token = jwt.sign({email: user.email, id: user._id}, process.env.TOKEN_KEY, {expiresIn: expireTime});

        return res.json({user: user, token});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});       
    }
}