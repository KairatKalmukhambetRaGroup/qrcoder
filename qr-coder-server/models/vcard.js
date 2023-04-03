import mongoose from "mongoose";

const vcardSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    website: String,
    personalPhone: String,
    workPhone: String,
    fax: String,
    company: String,
    jobTitle: String,
    country: String,
    city: String,
    postIndex: String
}, {
    timestamps: true
});

export default mongoose.model('vcard', vcardSchema);