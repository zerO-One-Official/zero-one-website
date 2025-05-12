import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      trim: true,
      required: [true, "Event name is Required."],
    },
    url: {
      type: String,
      trim: true,
      required: [true, "Image URL is Required."],
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Gallery =
  mongoose.models?.Gallery || mongoose.model("Gallery", GallerySchema);
export default Gallery;
