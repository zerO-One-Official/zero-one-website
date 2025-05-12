import mongoose from "mongoose";
import { generateSlug } from "@/utils/helper";

const CodingQuestionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Coding problem name is mandatory."],
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "Slug is mandatory."],
      index: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Problem statement is mandatory."],
    },
    inputFormat: {
      type: String,
      trim: true,
      required: [true, "Input format is mandatory."],
    },
    outputFormat: {
      type: String,
      trim: true,
      required: [true, "Output format is mandatory."],
    },
    constraints: {
      type: String,
      trim: true,
      required: [true, "Constraints are mandatory."],
    },
    difficulty: {
      type: String,
      enum: ["basic", "easy", "medium", "hard", "expert"],
      lowercase: true,
      trim: true,
      required: [true, "Difficulty level is mandatory."],
    },
    point: {
      type: Number,
      required: true,
      min: [0, "Points cannot be negative."],
    },
    testCases: [
      {
        input: {
          type: String,
          trim: true,
          required: [true, "Input for the test case is mandatory."],
        },
        output: {
          type: String,
          trim: true,
          required: [true, "Expected output for the test case is mandatory."],
        },
        isPublic: {
          type: Boolean,
          default: false,
        },
        _id: false,
      },
    ],
    allowedLanguages: {
      type: [String],
      enum: ["c", "cpp", "java", "python", "javascript", "html", "css", "sql"],
      default: ["c", "cpp", "java", "python"],
    },
    timeLimit: {
      type: Number,
      default: 1, // seconds
      min: 0.1,
    },
    memoryLimit: {
      type: Number,
      default: 256, // MB
      min: 16,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// Pre-validate hook to auto-generate slug and correct points
CodingQuestionSchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = generateSlug(this.name);
  }

  const pointsMapping = {
    basic: 5,
    easy: 10,
    medium: 15,
    hard: 20,
    expert: 25,
  };
  if (this.difficulty && pointsMapping[this.difficulty] !== undefined) {
    this.point = pointsMapping[this.difficulty];
  } else {
    return next(new Error("Invalid difficulty level. Cannot assign points."));
  }

  next();
});

// Compound index for better search
CodingQuestionSchema.index({ slug: 1, difficulty: 1 });

const CodingQuestion =
  mongoose.models.CodingQuestion ||
  mongoose.model("CodingQuestion", CodingQuestionSchema);

export default CodingQuestion;
