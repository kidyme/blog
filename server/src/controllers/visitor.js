import Visitor from "../models/visitor.js";
import { baseCRUD } from "../utils/base.js";
import { find } from "../services/visitor.js";

export const { add, findAll, update, remove } = baseCRUD(Visitor, "Visitor");

export { find };
