import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        unique: true
    },
    position: {
        type: String,
        required: [true, "Position is required"],
        trim: true,
        lowercase: true
    },
    group: {
        type: String,
        trim: true,
        lowercase: true
    }

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


const Team = mongoose.models.team || mongoose.model('team', TeamSchema);
export default Team;