import mongoose from "mongoose";

// Function to generate a slug from a title
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with "-"
    .replace(/^-+|-+$/g, ""); // Trim "-" from start and end
};

// Subtopic Schema
const SubtopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Subtopic title is required"],
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true,
    sparse: true, // Ensures uniqueness is only applied if slug exists
  },
  description: { type: String },
  resourceUrl: { type: String },
});

// Auto-generate slug before saving Subtopics
SubtopicSchema.pre("save", function (next) {
  if (!this.slug && this.title) {
    this.slug = generateSlug(this.title);
  }
  next();
});

// Topic Schema
const TopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Topic title is required"],
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true,
    sparse: true, // Prevents duplicate `null` slugs
  },
  description: { type: String },
  image: {
    type: String,
    required: [true, "Topic image is required."],
  },
  subtopics: {
    type: [SubtopicSchema], // Embedding Subtopics Correctly
    default: [],
  },
});

// Auto-generate slug before saving Topics
TopicSchema.pre("save", function (next) {
  if (!this.slug && this.title) {
    this.slug = generateSlug(this.title);
  }
  next();
});

// Resource Schema
const ResourceSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      unique: true,
      required: [true, "Domain title is required."],
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
      sparse: true, // Avoid duplicate `null` slugs
    },
    description: { type: String },
    image: {
      type: String,
      required: [true, "Domain image is required."],
    },
    topics: {
      type: [TopicSchema], // Embedding Topics Properly
      default: [],
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// Auto-generate slug before saving Resources
ResourceSchema.pre("save", function (next) {
  if (!this.slug && this.domain) {
    this.slug = generateSlug(this.domain);
  }
  next();
});

// Auto-generate slug before updating Resources
ResourceSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.domain) {
    update.slug = generateSlug(update.domain);
  }
  next();
});

// Auto-generate slug before updating Topics
TopicSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.title) {
    update.slug = generateSlug(update.title);
  }
  next();
});

// Auto-generate slug before updating Subtopics
SubtopicSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.title) {
    update.slug = generateSlug(update.title);
  }
  next();
});

const Resources =
  mongoose.models?.Resource || mongoose.model("Resource", ResourceSchema);

export default Resources;
