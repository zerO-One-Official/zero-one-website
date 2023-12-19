import mongoose from "mongoose";

const FaqSchema = new mongoose.Schema({
    question: {
        type: String,
        trim: true,
        required: [true, 'Question is Required.']
    },
    answer: {
        type: String,
        trim: true,
        required: [true, 'Answer is Required.']
    }

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


const Faq = mongoose.models.faq || mongoose.model('faq', FaqSchema);
export default Faq;