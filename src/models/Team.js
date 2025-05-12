import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      unique: true,
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
      lowercase: true,
    },
    group: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Team = mongoose.models?.Team || mongoose.model("Team", TeamSchema);
export default Team;
