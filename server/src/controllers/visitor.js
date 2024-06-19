import Visitor from "../models/visitor.js";
import { baseCRUD } from "../utils/base.js";

export const { add, find, findAll, update, remove } = baseCRUD(
  Visitor,
  "Visitor",
);
