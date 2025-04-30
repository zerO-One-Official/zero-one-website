import mongoose from "mongoose";

const QuizQuestionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Coding Problem Name is Required."],
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "Slug is required"],
    },
    desc: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
    },
    code: {
      type: String,
      trim: true,
    },
    correctCode: {
      type: String,
      trim: true,
    },
    codeLanguage: {
      type: String,
      enum: ["html", "css", "javascript", "c", "cpp", "java", "python", "sql"],
    },
    questionType: {
      type: String,
      enum: ["OBJECTIVE", "DEBUGING"],
      retquired: [true, "Question Type is required"],
    },
    answerType: {
      type: String,
      enum: ["MCQ", "MSQ", "CODE"],
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      lowercase: true,
      trim: true,
      required: [true, "Difficulty level is required"],
    },

    options: {
      type: [
        {
          value: String,
          isCorrect: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
    point: {
      type: Number,
      default: 0,
      min: [0, "Points cannot be negative"],
      required: [true, "Max points for this Problem is required"],
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

QuizQuestionSchema.methods.getCorrectAnswers = function () {
  return this.options.filter((option) => option.isCorrect);
};

// QuizQuestionSchema.index({ slug: 1 }, { unique: true });

const QuizQuestion =
  mongoose.models.QuizQuestion ||
  mongoose.model("QuizQuestion", QuizQuestionSchema);
export default QuizQuestion;
