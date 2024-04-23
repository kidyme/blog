import { Schema, model } from "mongoose";
import { baseSchema } from "../utils/base.js";

export default model(
  "Post",
  new Schema({
    ...baseSchema,
    title: {
      type: String,
      unique: true,
    },
    path: {
      type: String,
      unique: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      unique: true,
    },
  }),
);
