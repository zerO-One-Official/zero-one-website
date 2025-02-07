import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Company Name."],
    },
    image: {
      type: String,
      required: [true, "Please Upload Company Logo."],
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Company =
  mongoose.models?.company || mongoose.model("company", CompanySchema);
export default Company;
