import Post from "../models/post.js";
import { baseCRUD } from "../utils/base.js";

export const { add, find, update, remove } = baseCRUD(Post, "Post");
