import QRcode from "../models/qrcode.js";

export const getAllQRCodes = async (req, res) => {
    const {page} = req.query;
    const limit = 10;
    const pg = (page && page > 0) ? page-1 : 0;
    const skip = pg * limit;
    try {
        const count = await QRcode.count();
        const qrcodes = await QRcode.find().populate('object').skip(skip).limit(limit).sort('-createdAt');
        return res.json({qrs: qrcodes, page: pg, totalPages: Math.ceil(count / limit), count});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong"});
    }
}