import mongoose from "mongoose";

const qrcodeSchema = mongoose.Schema({
    name: String,
    link: {type: String, unique: true, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    object: {type: mongoose.Schema.Types.ObjectId, refPath: 'type'},
    type: {type: String, enum: ['vcard'], required: true},
}, {
    timestamps: true
});

export default mongoose.model('QRcode', qrcodeSchema);