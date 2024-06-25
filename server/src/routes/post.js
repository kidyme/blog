import { add, find, findAll, update, remove } from "../controllers/post.js";
import { Router } from "express";
import { baseHttp } from "../utils/base.js";

export default (app) => {
  const router = baseHttp(Router(), {
    add,
    find,
    findAll,
    update,
    remove,
  });

  app.use("/post", router);
};
