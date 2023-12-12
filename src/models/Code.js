import bcrypt from 'bcrypt'
import mongoose from "mongoose";
import validator from 'validator'

const CodeSchema = new mongoose.Schema({
    roll: {
        type: Number,
        required: [true, "rollno is required"],
        min: [20100, "Enter a roll no. after 2019 batch."],
        max: [(new Date().getFullYear() % 100) * 1000 + 700, `Enter a roll no. before ${new Date().getFullYear()} batch.`],
        trim: true,
        unique: true,
    },
    code: {
        type: String,
        required: [true, "Code is required"],
        trim: true,
    },

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


const Code = mongoose.models.code || mongoose.model('code', CodeSchema);
export default Code;