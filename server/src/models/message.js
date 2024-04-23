import { Schema, model } from "mongoose";
import { baseSchema } from "../utils/base.js";

export default model(
  "Message",
  new Schema({
    ...baseSchema,
    content: {
      type: String,
    },
    visitor: {
      type: Schema.Types.ObjectId,
      ref: "Visitor",
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  }),
);
