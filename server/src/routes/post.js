import {
  add,
  find,
  findAll,
  update,
  remove,
  like,
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

  router.post("/like", (req, res) => {
    like(req.body.id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  });

  app.use("/post", router);
};
