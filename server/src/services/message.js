import { log, multiLog } from "../utils/logger.js";
import { buildRes } from "../utils/base.js";
import Message from "../models/message.js";
import Visitor from "../models/visitor.js";

async function find(data) {
  const { id } = data;
  log(id);

  try {
    const doc = await Message.findById(id).populate("visitor");

    if (doc) {
      multiLog([
        ...[["msg", `Message找到`]],
        ...Object.entries(doc.toObject()),
      ]);
      return buildRes("suc", doc);
    } else {
      log(`Message未找到`, "db");
      return buildRes("fail");
    }
  } catch (err) {
    log(`在查找Message时发生错误: ${err}`, "db", "err");
    throw buildRes("err", err.message, 201);
  }
}

async function findAll() {
  try {
    const docs = await Message.find({}).populate("visitor");
    multiLog([
      ...[["msg", `所有Message找到`]],
      ...docs.map((doc) => Object.entries(doc.toObject())),
    ]);
    return buildRes("suc", docs);
  } catch (err) {
    log(`在查找所有Message时发生错误: ${err}`, "db", "err");
    return buildRes("错误", err.message, 201);
  }
}

export { find, findAll };
