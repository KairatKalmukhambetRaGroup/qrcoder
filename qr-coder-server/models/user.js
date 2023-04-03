import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: String,
    confirmed: {type: Boolean, default: false},
    activationToken: String,
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);