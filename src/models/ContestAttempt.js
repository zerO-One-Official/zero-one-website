import mongoose from "mongoose";

const QuestionSnapshotSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    questionDomain: {
      type: String,
      enum: ["QuizQuestion", "CodingQuestion"],
      required: true,
    },
    sectionIndex: { type: Number, required: true },
    questionIndex: { type: Number, required: true },
    sectionName: { type: String, required: true },
    sectionDescription: { type: String, default: "" },
    sectionTimeLimitMinutes: { type: Number, default: null },
    timeLimitSeconds: { type: Number, default: null },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    questionType: { type: String, default: "" },
    answerType: { type: String, default: "" },
    difficulty: { type: String, default: "" },
    point: { type: Number, required: true, min: 0 },
    questionSnippet: { type: String, default: "" },
    codeLanguage: { type: String, default: "" },
    options: { type: [String], default: [] },
    inputFormat: { type: String, default: "" },
    outputFormat: { type: String, default: "" },
    constraints: { type: String, default: "" },
    allowedLanguages: { type: [String], default: [] },
    gradingData: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      select: false,
    },
  },
  { _id: false }
);

const AttemptAnswerSchema = new mongoose.Schema(
  {
    questionKey: { type: String, required: true },
    selectedOptions: { type: [String], default: [] },
    submittedCode: { type: String, default: "" },
    language: { type: String, default: "" },
    pointsAwarded: { type: Number, required: true, min: 0 },
    pointsPossible: { type: Number, required: true, min: 0 },
    gradingStatus: {
      type: String,
      enum: ["VALIDATED", "PENDING"],
      default: "VALIDATED",
    },
  },
  { _id: false }
);

const IntegrityEventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["TAB_SWITCH", "WINDOW_BLUR", "COPY", "PASTE", "CUT", "FULLSCREEN_EXIT"],
      required: true,
    },
    occurredAtMs: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const SectionSnapshotSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    timeLimitMinutes: { type: Number, default: null },
  },
  { _id: false }
);

const QuestionTimerSchema = new mongoose.Schema(
  {
    questionKey: { type: String, required: true },
    startedAt: { type: Date, required: true },
    endsAt: { type: Date, required: true },
  },
  { _id: false }
);

const ContestAttemptSchema = new mongoose.Schema(
  {
    contest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["IN_PROGRESS", "SUBMITTED"],
      default: "IN_PROGRESS",
      index: true,
    },
    startedAt: { type: Date, required: true },
    dueAt: { type: Date, required: true },
    submittedAt: { type: Date, default: null },
    questionSnapshot: { type: [QuestionSnapshotSchema], default: [] },
    sectionSnapshot: { type: [SectionSnapshotSchema], default: [] },
    activeSectionIndex: { type: Number, default: -1 },
    sectionStartedAt: { type: Date, default: null },
    sectionEndsAt: { type: Date, default: null },
    completedSectionIndexes: { type: [Number], default: [] },
    questionTimers: { type: [QuestionTimerSchema], default: [] },
    answers: { type: [AttemptAnswerSchema], default: [] },
    integrityEvents: { type: [IntegrityEventSchema], default: [] },
    score: { type: Number, default: null, min: 0 },
    maxScore: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

ContestAttemptSchema.index({ contest: 1, user: 1 }, { unique: true });

if (
  mongoose.models.ContestAttempt &&
  (!mongoose.models.ContestAttempt.schema.path("sectionSnapshot") ||
    !mongoose.models.ContestAttempt.schema.path("questionTimers") ||
    !mongoose.models.ContestAttempt.schema
      .path("questionSnapshot")
      ?.schema.path("timeLimitSeconds"))
) {
  mongoose.deleteModel("ContestAttempt");
}

const ContestAttempt =
  mongoose.models.ContestAttempt ||
  mongoose.model("ContestAttempt", ContestAttemptSchema);

export default ContestAttempt;
