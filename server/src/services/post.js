import { log, multiLog } from "../utils/logger.js";
import { buildRes } from "../utils/base.js";
import fs from "fs/promises";
import Post from "../models/post.js";

async function getPost(data) {
  const { id } = data;
  log(id);

  try {
    const doc = await Post.findById(id);
    log(doc);

    if (doc) {
      multiLog([...[["msg", `Post找到`]], ...Object.entries(doc.toObject())]);
      const path = doc.path;

      try {
        const content = await fs.readFile(path, "utf8");
        return buildRes("suc", { content });
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
export { getPost };
