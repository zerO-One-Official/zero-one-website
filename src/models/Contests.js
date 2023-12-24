import mongoose from "mongoose";

const ContestSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Name of Contest is Required.']
    },
    date: {
        type: Date,
        trim: true,
        unique: true,
        required: [true, 'Date of Contest is Required.']
    },
    venue: {
        type: String,
        required: [true, 'venue is required']
    },
    duration: {
        type: Number,
        required: [true, 'Contest Duration is required']
    },
    link: {
        type: String,
        trim: true,
        required: [true, 'Link of Contest is Required.']
    },
    questions: [{
        name: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'Question Name is Required.']
        },
        desc: {
            type: String,
            trim: true,
            required: [true, 'Question Description is Required.']
        },
        inputFormat: {
            type: String,
            trim: true,
        },
        outputFormat: {
            type: String,
            trim: true,
        },
        constraints: {
            type: String,
            trim: true,
        },
        point: {
            type: Number,
            default: 0,
            required: [true, "max point for this question is required"]
        },
        difficulty: {
            type: String,
            required: [true, "difficulty level is required"]

        },
        testCases: [
            {
                input: {
                    type: String,
                    trim: true,
                },
                output: {
                    type: String,
                    trim: true,
                    required: [true, 'Output is Required.']
                },
                isPublic: {
                    type: Boolean,
                    default: false
                }
            }
        ]
    }],
    solution: {
        type: String,
        trim: true
    },
    gallery: [
        { type: String }
    ],

    participants: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        rank: {
            type: Number,
            required: [true, 'Rank is Required.']
        }
    }]

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


const Contest = mongoose.models.contest || mongoose.model('contest', ContestSchema);
export default Contest;