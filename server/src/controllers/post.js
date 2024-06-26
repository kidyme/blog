import Post from "../models/post.js";
import { baseCRUD } from "../utils/base.js";
import { find, findAll, like } from "../services/post.js";

export const { add, update, remove } = baseCRUD(Post, "Post");

export { find, findAll, like };
