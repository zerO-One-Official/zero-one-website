import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema({
    domain: {
        type: String,
        enum: ['Web Development', 'App Development', 'AI/ML', 'Competetive Programming', 'Programming', 'Animation'],
        unique: true,
        trim: true,
        required: [true, 'Please enter resource Domain name']
    },
    image: {
        type: String, // Assuming the image path or URL will be stored as a string
        required: [true, 'Domain Image is required'],
    },
    totalResources: {
        type: Number,
        default: 0,
    },
    resources: [
        {
            heading: {
                type: String,
                required: [true, 'Resource heading is required'],
            },
            content: {
                type: String,
                required: [true, 'Resource content is required'],
            },
        }
    ]

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


const Resource = mongoose.models.resource || mongoose.model('resource', ResourceSchema);
export default Resource;