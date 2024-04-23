import Category from "../models/category.js";
import { baseCRUD } from "../utils/base.js";

export const { add, find, update, remove } = baseCRUD(Category, "Category");
