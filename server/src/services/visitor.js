import { log, multiLog } from "../utils/logger.js";
import { buildRes } from "../utils/base.js";
import Visitor from "../models/visitor.js";

async function find(data) {
  const { id, ip } = data;

  try {
    let doc;

    if (ip) {
      doc = await Visitor.findOne({ ip });
    } else if (id) {
      doc = await Visitor.findById(id);
    } else {
      log(`查询缺少参数`, "db", "err");
      return buildRes("fail", "缺少参数", 201);
    }

    if (doc) {
      multiLog([
        ...[["msg", `Visitor找到`]],
        ...Object.entries(doc.toObject()),
      ]);
      return buildRes("suc", doc);
    } else {
      log(`Visitor未找到`, "db");
      return buildRes("fail", `Visitor未找到`, 201);
    }
  } catch (err) {
    log(`在查找Visitor时发生错误: ${err}`, "db", "err");
    return buildRes("err", err.message, 201);
  }
}

export { find };
