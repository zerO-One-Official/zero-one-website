import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User is Required."],
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question",
      required: [true, "Question is Required."],
    },
    code: {
      type: String,
      required: [true, "Code is Required."],
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Submission =
  mongoose.models.submission || mongoose.model("submission", SubmissionSchema);
export default Submission;
