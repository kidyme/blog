import Post from "../models/post.js";
import { baseCRUD } from "../utils/base.js";
import { add, find, findAll, like, storage, upload } from "../services/post.js";

export const { update, remove } = baseCRUD(Post, "Post");

export { add, find, findAll, like, storage, upload };
