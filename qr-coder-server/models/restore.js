import mongoose from "mongoose";

const restoreSchema = mongoose.Schema({
    email: {type: String, unique: true, required: true}
}, {
    timestamp: true
});

export default mongoose.model('Restore', restoreSchema);