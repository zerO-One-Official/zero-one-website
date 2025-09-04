import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema(
  {
    contest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "questionType", // Dynamic reference
    },
    questionType: {
      type: String,
      enum: ["CodingQuestion", "QuizQuestion"],
      required: true,
    },
    submittedCode: {
      type: String,
      trim: true,
    },
    selectedOptions: [
      {
        type: String, // Option value
      },
    ],
    language: {
      type: String, // Applicable for coding only
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: [
        "PENDING",
        "RUNNING",
        "CORRECT",
        "WRONG",
        "COMPILATION_ERROR",
        "RUNTIME_ERROR",
        "PARTIAL_CORRECT",
      ],
      default: "PENDING",
      required: true,
      index: true,
    },
    evaluatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// Composite index for faster lookups
SubmissionSchema.index({ contest: 1, user: 1, question: 1 });

const Submission =
  mongoose.models?.Submission || mongoose.model("Submission", SubmissionSchema);

export default Submission;
