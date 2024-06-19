import {
  add,
  find,
  findAll,
  update,
  remove,
  getPost,
} from "../controllers/post.js";
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

  router.post("/getContent", (req, res) => {
    getPost(req.body)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  });

  app.use("/post", router);
};
