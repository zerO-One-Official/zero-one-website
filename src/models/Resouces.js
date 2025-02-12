import mongoose from "mongoose";

// ✅ Subtopic Schema (Embedded Inside Topics)
const SubtopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Subtopic title is required"],
  },
  description: String,
  image: String,
  resourceUrl: String,
});

// ✅ Topic Schema (Embedded Inside Domains)
const TopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Topic title is required"],
  },
  description: String,
  image: String,
  resourceUrl: String,
  subtopics: [SubtopicSchema], // ✅ Embedding Subtopics
});

// ✅ Domain Schema (Embedded Inside Resource)
const DomainSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Domain title is required."],
  },
  description: String,
  image: {
    type: String,
    required: [true, "Domain Image is required"],
  },
  totalResources: {
    type: Number,
    default: 0,
  },
  topics: [TopicSchema], // ✅ Embedding Topics
});

// ✅ Resource Schema (Top-Level Entity)
const ResourceSchema = new mongoose.Schema(
    [
    {
        
        domains: {
            
          type: [DomainSchema], // ✅ Ensures `domains` is an array
          default: [], // ✅ Default to an empty array
        },
    
      }, 
    ],
  

  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// Explicitly define the model before checking mongoose.models
const Resource =
  mongoose.models.Resourcedata || mongoose.model("Resourcedata", ResourceSchema);
export default Resource;
