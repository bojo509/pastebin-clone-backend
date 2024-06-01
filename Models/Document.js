import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    searchId: {
        type: String,
        required: true
    }
}, {timestamps: true})

export default mongoose.model('Document', DocumentSchema);