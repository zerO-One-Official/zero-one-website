import mongoose from "mongoose";
import { generateSlug } from "@/utils/helper";

const QuizQuestionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Quiz problem name is mandatory."],
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "Quiz slug is mandatory."],
      index: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Problem description is mandatory."],
    },
    questionSnippet: {
      type: String,
      trim: true,
    },
    correctCodeSnippet: {
      type: String,
      trim: true,
    },
    codeLanguage: {
      type: String,
      enum: ["html", "css", "javascript", "c", "cpp", "java", "python", "sql"],
    },
    questionType: {
      type: String,
      enum: ["OBJECTIVE", "DEBUGGING"],
      required: [true, "Question type is mandatory."],
    },
    answerType: {
      type: String,
      enum: ["MCQ", "MSQ", "CODE"],
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
    options: [
      {
        value: {
          type: String,
        },
        isCorrect: {
          type: Boolean,
          default: false,
        },
        _id: false,
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// Unified pre-validation: slug, point, options check
QuizQuestionSchema.pre("validate", function (next) {
  // Auto-generate slug
  if (!this.slug && this.name) {
    this.slug = generateSlug(this.name);
  }

  // Auto-correct points based on difficulty
  const mapping = {
    basic: 5,
    easy: 10,
    medium: 15,
    hard: 20,
    expert: 25,
  };
  if (this.difficulty && mapping[this.difficulty] !== undefined) {
    this.point = mapping[this.difficulty];
  } else {
    return next(
      new mongoose.Error.ValidationError(
        new Error("Invalid difficulty, cannot assign points.")
      )
    );
  }

  // Mandatory correctCodeSnippet for CODE answerType
  if (this.answerType === "CODE" && !this.correctCodeSnippet) {
    return next(
      new mongoose.Error.ValidationError(
        new Error("Correct code snippet is required for CODE type questions.")
      )
    );
  }

  // Mandatory options for MCQ/MSQ
  if (
    ["MCQ", "MSQ"].includes(this.answerType) &&
    (!this.options || this.options.length === 0)
  ) {
    return next(
      new mongoose.Error.ValidationError(
        new Error("Options are mandatory for MCQ/MSQ type questions.")
      )
    );
  }

  next();
});

// Method: Get correct options
QuizQuestionSchema.methods.getCorrectAnswers = function () {
  return this.options.filter((option) => option.isCorrect);
};

// Compound indexes
QuizQuestionSchema.index({ slug: 1, difficulty: 1 });

const QuizQuestion =
  mongoose.models.QuizQuestion ||
  mongoose.model("QuizQuestion", QuizQuestionSchema);

export default QuizQuestion;
