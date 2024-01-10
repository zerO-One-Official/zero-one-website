import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is Required.']
    },
    roll: {
        type: Number,
        trim: true,
        required: [true, 'Roll is Required.']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is Required.']
    },
    message: {
        type: String,
        trim: true,
        required: [true, 'Message is Required.']
    },
    resolved: {
        type: Boolean,
        default: false
    }

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


const Contact = mongoose.models.contact || mongoose.model('contact', ContactSchema);
export default Contact;