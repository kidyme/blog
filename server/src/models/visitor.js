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
      unique: false,
      sparse: true, // 允许多条空
    },
    ip: {
      type: String,
      unique: false,
      sparse: true,
    },
  }),
);
