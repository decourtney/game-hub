import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import { unique } from "next/dist/build/utils";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    provider: {
      type: String,
      required: true, // e.g., "google", "github"
    },
    providerId: {
      type: String,
      required: true, // Unique ID returned by OAuth provider
    },
    image: {
      type: String, // URL to profile picture (if provided by OAuth)
    },
    newsletter: {
      type: Boolean,
      default: false,
    },
    button1: {
      type: Boolean,
      default: false,
    },
    button2: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    collection: "user", // Specify collection name
  }
);

// Pre-save hook to hash password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
     if (error instanceof Error) {
       next(error); // Pass error to Mongoose
     } else {
       next(new Error("Unknown error during password hashing"));
     }
  }
})

// Prevent re-compilation of the model
const User = models.User || model("User", UserSchema);

export default User;
