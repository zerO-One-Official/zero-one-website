import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'Problem Name is Required.']
        },
        desc: {
            type: String,
            trim: true,
            required: [true, 'Problem Statement is Required.']
        },
        inputFormat: {
            type: String,
            trim: true,
            required: [true, 'Input Format is Required.']
        },
        outputFormat: {
            type: String,
            trim: true,
            required: [true, 'Output Format is Required.']
        },
        constraints: {
            type: String,
            trim: true,
            required: [true, 'Constraints is Required.']
        },
        point: {
            type: Number,
            default: 0,
            required: [true, "Max points for this Problem is required"]
        },
        difficulty: {
            type: String,
            lowercase: true,
            trim: true,
            required: [true, "Difficulty level is required"]

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
                    required: [true, 'Output is Required for the given testcase.']
                },
                isPublic: {
                    type: Boolean,
                    default: false
                }
            }
        ]

    }, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


const Question = mongoose.models.question || mongoose.model('question', QuestionSchema);
export default Question;