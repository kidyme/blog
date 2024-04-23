import { add, find, update, remove } from "../controllers/post.js";
import { Router } from "express";
import { baseHttp } from "../utils/base.js";

export default (app) => {
  const router = baseHttp(Router(), {
    add,
    find,
    update,
    remove,
  });

  app.use("/post", router);
};
