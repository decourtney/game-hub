import { Schema, Document, model, models } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    emailVerified: { type: Date, default: null },
    image: { type: String },
  },
  { timestamps: true }
);

// Export the User model (reuse existing model if already compiled)
export default models.User || model<IUser>("User", UserSchema);
