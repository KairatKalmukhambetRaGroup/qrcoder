import { v4 as uuidv4 } from 'uuid';

import QRcode from "../models/qrcode.js";
import vcard from "../models/vcard.js";
import User from "../models/user.js";

export const getQRcodes = async (req, res) => {
    const id = req.userId;
    const {page} = req.query;
    const limit = 5;
    const pg = (page && page > 0) ? page-1 : 0;
    const skip = pg * limit;
    try {
        const count = await QRcode.count({user: id});
        const qrcodes = await QRcode.find({user: id}).populate('object').skip(skip).limit(limit).sort('-createdAt');
        return res.json({qrs: qrcodes, page: pg, totalPages: Math.ceil(count / limit), count});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong"});
    }
}
export const getQRcode = async (req, res) => {
    const {link} = req.params;
    try {
        const qr = await QRcode.findOne({link}).populate('object');
        if(!qr)
            return res.status(404).json({error: "QR not found"});
        return res.json(qr);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong"});
    }
}

export const getNewQrLink = async (req, res) => {
    const {type} = req.body;
    try {
        let link = '';
        let cnt = 0;
        do {
            link = uuidv4().substring(0, 8);
            cnt = await QRcode.countDocuments({link});
        } while (cnt !== 0);
        const object = new vcard();
        object.save();

        const qr = await QRcode.create({link, type, object: object._id});
        const newQr= await QRcode.findById(qr._id).populate('object');
        return res.json(newQr);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong"});
    }
}

export const createQRCode = async (req, res) => {
    const {id} = req.params;
    const {type, formData} = req.body;
    try {
        await vcard.findByIdAndUpdate(formData._id, formData);
        if(req.userId){
            const qr = await QRcode.findByIdAndUpdate(id, {name: formData.name, user: req.userId}, {new: true}).populate('object');
            return res.json(qr);
        }else{
            const qr = await QRcode.findById(id).populate('object');
            return res.json(qr);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong"});
    }
}

export const appendToUser = async (req, res) => {
    const {id} = req.body;
    try {
        const user = await User.findById(req.userId);
        if(!user)
            return res.status(404).json({error: "User does not exist"});
        await QRcode.findByIdAndUpdate(id, {user: user._id});
        return res.json();
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong"});
    }
}

export const deleteQR = async (req, res) => {
    const id = req.userId;
    const {link} = req.params;
    try {
        const qr = await QRcode.findOne({link, user: id});
        if(!qr)
            return res.status(404).json({error: "QR does not exist."});
        await QRcode.findByIdAndDelete(qr._id);
        const qrcodes = await QRcode.find({user: id});
        return res.json(qrcodes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong"});
    }
}