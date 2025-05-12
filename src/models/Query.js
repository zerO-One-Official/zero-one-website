import mongoose from "mongoose";

const QuerytSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is Required."],
    },
    roll: {
      type: Number,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is Required."],
    },
    message: {
      type: String,
      trim: true,
      required: [true, "Message is Required."],
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Query = mongoose.models?.Query || mongoose.model("Query", QuerytSchema);
export default Query;
