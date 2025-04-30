import { generateSlug } from "@/utils/helper";
import mongoose from "mongoose";

const QuizContestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Name of Contest is Required."],
    },
    desc: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Description of Contest is Required."],
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Slug is required"],
    },
    prizes: {
      type: String,
      trim: true,
    },
    contestDate: {
      type: Date,
      trim: true,
      required: [true, "Start date of the contest is required."],
    },
    lastRegistrationDate: {
      type: Date,
      trim: true,
      required: [true, "Registration end date is required."],
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
    },
    duration: {
      type: Number,
      required: [true, "Contest duration in minutes is required"],
      min: [1, "Minimum time should be 1 minute"],
    },
    status: {
      type: String,
      enum: ["DRAFT", "LIVE"],
      default: "DRAFT",
    },
    quizSections: [
      {
        _id: false,

        name: {
          type: String,
          required: [true, "Section name is required"],
        },
        time: {
          type: Number,
          default: null,
          min: [0, "Time should be Positive"],
        },
        questions: [
          {
            _id: false,
            question: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "quiz",
            },
            type: {
              type: String,
              enum: ["QUIZ", "CODING"],
              default: "QUIZ",
            },
            time: {
              type: Number,
              default: null,
              min: [0, "Time should be Positive"],
            },
          },
        ],
      },
    ],
    participants: [
      {
        _id: false,
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        team: {
          type: String,
        },
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

QuizContestSchema.pre("save", function (next) {
  if (this.lastRegistrationDate >= this.contestDate) {
    throw new Error("Registration must end before the contest.");
  }
  next();
});

// Generate slug on name update
QuizContestSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = generateSlug(update.name);
  }
  next();
});

const QuizContest =
  mongoose.models?.QuizContest ||
  mongoose.model("QuizContest", QuizContestSchema);
export default QuizContest;
