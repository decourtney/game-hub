import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
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

// Prevent re-compilation of the model
const User = models.User || model("User", UserSchema);

export default User;
