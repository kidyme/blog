import { Schema, model } from "mongoose";
import { baseSchema } from "../utils/base.js";

export default model(
  "Message",
  new Schema({
    ...baseSchema,
    content: {
      type: String,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      unique: true,
    },
    visitor: {
      type: Schema.Types.ObjectId,
      ref: "Visitor",
      unique: true,
    },
  }),
);
