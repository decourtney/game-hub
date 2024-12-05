import { Schema, model, models } from "mongoose";

const GameSchema = new Schema(
  {
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
  { timestamps: true, collection: "game" }
);

export default models.Game || model("Game", GameSchema);
