import mongoose from "mongoose";

const INSTITUTE_TYPES = ["IIT", "NIT", "IIM", "IIIT", "IISc", "IISER", "UNIVERSITY", "OTHER"];

const InstituteSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 150 },
  type: { type: String, required: true, enum: INSTITUTE_TYPES },
  logo: { type: String, trim: true },
  image: { type: String, trim: true },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

InstituteSchema.index({ name: 1 }, { unique: true, collation: { locale: "en", strength: 2 } });

export default mongoose.models.Institute || mongoose.model("Institute", InstituteSchema);
