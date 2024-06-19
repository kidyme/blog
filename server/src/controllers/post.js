import Post from "../models/post.js";
import { baseCRUD } from "../utils/base.js";
import { getPost } from "../services/post.js";

export const { add, find, findAll, update, remove } = baseCRUD(Post, "Post");

export { getPost };
