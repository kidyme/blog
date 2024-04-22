import { Schema, model } from "mongoose";
import { baseSchema } from "../utils/base.js";

export default model(
  "Category",
  new Schema({
    ...baseSchema,
    title: {
      type: String,
      unique: true,
    },
  }),
);
