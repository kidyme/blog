import {
  add,
  find,
  findAll,
  update,
  remove,
  like,
  storage,
  upload,
} from "../controllers/post.js";
import path from "path";
import { Router } from "express";
import { baseHttp } from "../utils/base.js";
import config from "../confs/sysConf.js";

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

  router.post("/upload", storage().single("file"), (req, res) => {
    upload(req)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  });

  app.use("/post", router);
};
