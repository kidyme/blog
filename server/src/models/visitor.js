import { Schema, model } from "mongoose";
import { baseSchema } from "../utils/base.js";

export default model(
  "Visitor",
  new Schema({
    ...baseSchema,
    name: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    ip: {
      type: String,
      unique: true,
    },
  }),
);
