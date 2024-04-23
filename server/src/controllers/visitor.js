import Visitor from "../models/visitor.js";
import { baseCRUD } from "../utils/base.js";

export const { add, find, update, remove } = baseCRUD(Visitor, "Visitor");
