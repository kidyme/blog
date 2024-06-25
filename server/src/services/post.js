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
        doc.content = content;
        return buildRes("suc", doc);
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

// async function find(data) {
//   const { id } = data;
//
//   try {
//     const doc = await Model.findById(id);
//
//     if (doc) {
//       multiLog([
//         ...[["msg", `${modelName}找到`]],
//         ...Object.entries(doc.toObject()),
//       ]);
//       return buildRes("suc", doc);
//     } else {
//       log(`${modelName}未找到`, "db");
//       return buildRes("fail");
//     }
//   } catch (err) {
//     log(`在查找${modelName}时发生错误: ${err}`, "db", "err");
//     throw buildRes("err", err.message, 201);
//   }
// }

export { find };
