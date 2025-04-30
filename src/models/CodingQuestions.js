import mongoose from "mongoose";

const CodingQuestionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Problem Name is Required."],
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Problem Slug is Required."],
    },
    desc: {
      type: String,
      trim: true,
      required: [true, "Problem Statement is Required."],
    },
    inputFormat: {
      type: String,
      trim: true,
      required: [true, "Input Format is Required."],
    },
    outputFormat: {
      type: String,
      trim: true,
      required: [true, "Output Format is Required."],
    },
    constraints: {
      type: String,
      trim: true,
      required: [true, "Constraints is Required."],
    },
    point: {
      type: Number,
      default: 0,
      required: [true, "Max points for this Problem is required"],
    },
    difficulty: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "Difficulty level is required"],
    },
    testCases: [
      {
        input: {
          type: String,
          trim: true,
        },
        output: {
          type: String,
          trim: true,
          required: [true, "Output is Required for the given testcase."],
        },
        isPublic: {
          type: Boolean,
          default: false,
        },
      },
    ],
    askedIn: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company",
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// Auto-generate slug before saving Subtopics
CodingQuestionSchema.pre("save", function (next) {
  if (!this.slug && this.title) {
    this.slug = generateSlug(this.title);
  }
  next();
});

// Auto-generate slug before updating Topics
CodingQuestionSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.title) {
    update.slug = generateSlug(update.title);
  }
  next();
});

const CodingQuestion =
  mongoose.models?.CodingQuestion ||
  mongoose.model("CodingQuestion", CodingQuestionSchema);
export default CodingQuestion;
