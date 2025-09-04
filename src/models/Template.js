import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: [true, "Please give this template a name."],
    },
    url: {
      type: String,
      required: [true, "Please upload template of certificate."],
    },
    certificateNumber: {
      value: {
        type: String,
        required: [true, "Enter the structure of certificate number."],
      },
      size: {
        type: Number,
        required: [true, "Font Size required"],
      },
      x: {
        type: Number,
        required: [true, "Position from X direction is required"],
      },
      y: {
        type: Number,
        required: [true, "Position from Y direction is required"],
      },
      color: {
        type: String,
        required: [true, "Color is required."],
      },
    },
    fields: [
      {
        value: {
          type: String,
          required: [true, "Feild Name can't be empty."],
        },
        size: {
          type: Number,
          required: [true, "Font Size required"],
        },
        x: {
          type: Number,
          required: [true, "Position from X direction is required"],
        },
        y: {
          type: Number,
          required: [true, "Position from Y direction is required"],
        },
        color: {
          type: String,
          required: [true, "Color is required."],
        },
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Template =
  mongoose.models?.Template || mongoose.model("Template", TemplateSchema);
export default Template;
