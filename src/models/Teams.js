import mongoose from "mongoose";
import validator from 'validator'

const TeamSchema = new mongoose.Schema({
    roll: {
        type: Number,
        required: [true, "Rollno is required"],
        min: [20100, "Enter a roll no. after 2019 batch."],
        max: [(new Date().getFullYear() % 100) * 1000 + 700, `Enter a roll no. before ${new Date().getFullYear()} batch.`],
        trim: true,
        unique: true,
    },
    profilePic: {
        type: String,
        trim: true
    }
    ,
    firstName: {
        type: String,
        required: [true, "First name can't be empty"],
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        trim: true,
        lowercase: true
    },
    position: {
        type: String,
        required: [true, "Position is required"],
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Please enter a valid email');
            }
        },
    },
    gitHub: {
        type: String,
        trim: true,
        unique: true,
    },
    linkedIn: {
        type: String,
        trim: true,
        unique: true,
    },
    otherLinks: [
        {
            platform: {
                type: String,
                trim: true,
            },
            link: {
                type: String,
                trim: true,
            }
        }
    ]

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


const Team = mongoose.models.team || mongoose.model('team', TeamSchema);
export default Team;