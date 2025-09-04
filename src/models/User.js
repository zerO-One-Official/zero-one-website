import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

// Define sub-schema for otherLinks to enforce unique platform entries
const OtherLinkSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isURL, "Invalid URL format"],
    },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      lowercase: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
    },
    profilePic: {
      type: String,
      trim: true,
      validate: [validator.isURL, "Invalid profile picture URL"],
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 280,
    },
    firstName: {
      type: String,
      required: [true, "First name can't be empty"],
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      trim: true,
      lowercase: true,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Invalid email address"],
    },
    passedOut: {
      type: Boolean,
      default: false,
    },
    roll: {
      type: String,
      unique: true,
      sparse: true,
    },
    registrationNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    phone: {
      type: Number,
      required: [true, "Please provide your Mobile number"],
      unique: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v.toString());
        },
        message: "Mobile Number must be a valid 10-digit number",
      },
    },
    branch: {
      type: String,
      required: true,
      enum: [
        "Computer Science & Engineering",
        "Electrical & Electronics Engineering",
        "Mechanical Engineering",
        "Civil Engineering",
        "Artificial Intelligence",
        "Civil with Computer Applications",
      ],
    },
    password: {
      type: String,
      select: false,
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "STUDENT",
    },
    designation: {
      type: String,
      enum: [
        "STUDENT",
        "ALUMNI",
        "FACULTY",
        "STAFF",
        "CLUB LEAD",
        "CLUB MEMBER",
        "CLUB COORDINATOR",
        "HOD",
        "FACULTY COORDINATOR",
      ],
      default: "STUDENT",
    },
    solvedQuestions: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "solvedQuestions.questionDomain",
          required: true,
        },
        questionDomain: {
          type: String,
          enum: ["QuizQuestion", "CodingQuestion"],
          required: true,
        },
        submittedAt: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ["CORRECT", "WRONG", "PENDING"],
        },
        score: Number,
      },
    ],
    gitHub: {
      type: String,
      trim: true,
      validate: {
        validator: (val) => !val || validator.isURL(val),
        message: "Invalid GitHub URL",
      },
    },
    linkedIn: {
      type: String,
      trim: true,
      validate: {
        validator: (val) => !val || validator.isURL(val),
        message: "Invalid LinkedIn URL",
      },
    },
    otherLinks: {
      type: [OtherLinkSchema],
      validate: {
        validator: function (links) {
          const seen = new Set();
          for (const link of links) {
            if (seen.has(link.platform)) return false;
            seen.add(link.platform);
          }
          return true;
        },
        message: "You cannot have duplicate platforms in Links",
      },
    },
    contests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contest",
      },
    ],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;

  // Only hash password if it's modified
  if (user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(user.password, salt);
    } catch (err) {
      return next(err);
    }
  }

  next();
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
