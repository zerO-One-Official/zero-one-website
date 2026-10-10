import mongoose from "mongoose";

const JourneyStepSchema = new mongoose.Schema(
  {
    month: { type: Number, required: true, min: 1, max: 12, default: 1 },
    year: { type: Number, required: true, min: 1950, max: 2100 },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    institute: { type: mongoose.Schema.Types.ObjectId, ref: "Institute" },
    roleOrProgram: { type: String, trim: true, maxlength: 120, default: "" },
    gateScore: { type: Number, min: 0, max: 1000 },
    details: { type: String, trim: true, maxlength: 6000, default: "" },
  },
  { _id: true }
);

JourneyStepSchema.pre("validate", function (next) {
  if (Boolean(this.company) === Boolean(this.institute)) {
    this.invalidate("company", "Choose exactly one company or institute.");
  }
  next();
});

const AlumniJourneySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    timeline: {
      type: [JourneyStepSchema],
      default: [],
      validate: {
        validator: (steps) => steps.length <= 30,
        message: "A journey can contain at most 30 timeline entries.",
      },
    },
    journey: { type: String, trim: true, maxlength: 20000, default: "" },
    insights: { type: String, trim: true, maxlength: 12000, default: "" },
    advice: { type: String, trim: true, maxlength: 12000, default: "" },
    inviteTokenHash: { type: String, select: false },
    inviteTokenExpiresAt: { type: Date, select: false },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

AlumniJourneySchema.index({ user: 1 }, { unique: true });

export default mongoose.models.AlumniJourney ||
  mongoose.model("AlumniJourney", AlumniJourneySchema);
