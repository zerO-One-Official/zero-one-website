import bcrypt from 'bcrypt'
import mongoose from "mongoose";
import validator from 'validator'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        lowercase: true,
        unique: true,
    },
    profilePic: {
        type: String,
        trim: true
    },
    bio: {
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
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: [true, "Please select your gender"],
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
    roll: {
        type: Number,
        required: [true, "Rollno is required"],
        min: [20100, "Enter a roll no. after 2019 batch."],
        max: [(new Date().getFullYear() % 100) * 1000 + 700, `Enter a roll no. before ${new Date().getFullYear()} batch.`],
        trim: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: [true, "Mobile number is required"],
        trim: true,
        unique: true,
    },
    branch: {
        type: String,
        required: [true, "Please select your branch"],
        enum: ['Computer Science & Engineering', 'Electrical & Electronics Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Artificial Intelligence', 'Civil with Computer Applications'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please set a Password"],
        select: false
    },
    role: {
        type: String,
        enum: ['student', 'teacher', 'admin'],
        default: 'student',
    },
    active: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
        trim: true
    },
    activeSessions: {
        type: Number,
        default: 0
    },
    gitHub: {
        type: String,
        trim: true
    },
    linkedIn: {
        type: String,
        trim: true
    },
    otherLinks: [
        {
            platform: {
                type: String
            },
            link: {
                type: String
            }
        }
    ]

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });



UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();

    // Hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
});

const User = mongoose.models.user || mongoose.model('user', UserSchema);
export default User;