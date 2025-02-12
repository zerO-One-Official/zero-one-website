import mongoose from "mongoose";

const SubtopicSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Subtopic title is required"],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: [true, "Subtopic image is required."],
  },
  resourceUrl: {
    type: String,
  },
});

const TopicSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Topic title is required"],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: [true, "Topic image is required."],
  },
  subtopics: {
    type: [SubtopicSchema], // ✅ Embedding Subtopics Correctly
    default: [],
  },
});

const ResourceSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Resource title is required."],
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: [true, "Resource image is required."],
    },
    topics: {
      type: [TopicSchema], // ✅ Embedding Topics Properly
      default: [],
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Resource =
  mongoose.models.resource || mongoose.model("resource", ResourceSchema);

export default Resource;
