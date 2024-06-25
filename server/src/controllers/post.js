import Post from "../models/post.js";
import { baseCRUD } from "../utils/base.js";
import { find } from "../services/post.js";

export const { add, findAll, update, remove } = baseCRUD(Post, "Post");

export { find };
