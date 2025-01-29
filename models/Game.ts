import { Types, Schema, Document, model, models } from "mongoose";

export interface IGame extends Document {
  userId: Types.ObjectId; // References NextAuth user
  title: string;
  description?: string;
  engine: "Unity" | "Godot";
  url: string;
  thumbnail?: string;
}

const GameSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    engine: {
      type: String,
      enum: ["Unity", "Godot"],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    }, // URL to a thumbnail image
  },
  {
    timestamps: true,
  }
);

export default models.Game || model<IGame>("Game", GameSchema);
