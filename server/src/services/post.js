import { log, multiLog } from "../utils/logger.js";
import { buildRes } from "../utils/base.js";
import fs from "fs/promises";
import Post from "../models/post.js";

async function find(data) {
  const { id } = data;
  try {
    const doc = await Post.findById(id);

    if (doc) {
      multiLog([...[["msg", `Post找到`]], ...Object.entries(doc.toObject())]);
      const path = doc.path;

      try {
        const content = await fs.readFile(path, "utf8");
        let post = JSON.parse(JSON.stringify(doc));
        post.content = content;
        return buildRes("suc", post);
      } catch (readErr) {
        log(`读取${path}内容时发生错误: ${readErr}`, "fs", "err");
        return buildRes("err", readErr.message, 201);
      }
    } else {
      log(`Post未找到`, "db");
      return buildRes("fail");
    }
  } catch (err) {
    log(`在查找Post时发生错误: ${err}`, "db", "err");
    throw buildRes("err", err.message, 201);
  }
}

async function findAll() {
  try {
    const docs = await Post.find({});

    multiLog([
      ...[["msg", `所有Post找到`]],
      ...docs.map((doc) => Object.entries(doc.toObject())),
    ]);

    const posts = await Promise.all(
      docs.map(async (doc) => {
        const path = doc.path;
        try {
          const content = await fs.readFile(path, "utf8");
          let post = JSON.parse(JSON.stringify(doc));
          post.content = content;
          return post;
        } catch (readErr) {
          log(`读取${path}内容时发生错误: ${readErr}`, "fs", "err");
          let post = JSON.parse(JSON.stringify(doc));
          post.content = null;
          return post;
        }
      }),
    );

    return buildRes("suc", posts);
  } catch (err) {
    log(`在查找所有${modelName}时发生错误: ${err}`, "db", "err");
    return buildRes("错误", err.message, 201);
  }
}

export { find, findAll };
