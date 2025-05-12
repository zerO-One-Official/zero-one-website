import mongoose from "mongoose";
import { generateSlug } from "@/utils/helper";

const ContestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Contest name is mandatory."],
    },
    description: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Contest description is mandatory."],
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Contest slug is mandatory."],
      index: true,
    },
    prizes: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Contest start date is mandatory."],
      index: true,
    },
    lastRegistrationDate: {
      type: Date,
      required: [true, "Contest registration end date is mandatory."],
    },
    venue: {
      type: String,
      required: [true, "Contest venue is mandatory."],
    },
    durationMinutes: {
      type: Number,
      required: [true, "Contest duration in minutes is mandatory."],
      min: [1, "Contest duration must be at least 1 minute."],
    },
    status: {
      type: String,
      enum: ["DRAFT", "LIVE", "COMPLETED", "CANCELED"],
      default: "DRAFT",
      index: true,
    },
    sections: [
      {
        _id: false,
        name: {
          type: String,
          required: [true, "Section name is mandatory."],
        },
        description: {
          type: String,
        },
        timeLimitMinutes: {
          type: Number,
          default: null,
          min: [0, "Section time in 'min' must be positive."],
        },
        questions: [
          {
            _id: false,
            question: {
              type: mongoose.Schema.Types.ObjectId,
              refPath: "sections.questions.questionDomain",
              required: true,
            },
            questionDomain: {
              type: String,
              enum: ["QuizQuestion", "CodingQuestion"],
              required: true,
            },
            timeLimitSeconds: {
              type: Number,
              default: null,
              min: [0, "Question time in 'sec' must be positive."],
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
          ref: "User",
        },
        teamName: {
          type: String,
        },
        registeredAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// Middleware: Validate dates
ContestSchema.pre("save", function (next) {
  if (this.lastRegistrationDate >= this.startDate) {
    return next(
      new Error("Registration end date must be before the contest start date.")
    );
  }
  next();
});

// Middleware: Auto-generate slug
ContestSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = generateSlug(update.name);
  }
  next();
});

const Contest =
  mongoose.models.Contest || mongoose.model("Contest", ContestSchema);
export default Contest;
