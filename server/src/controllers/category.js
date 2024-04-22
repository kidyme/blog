import errCode from "../confs/errConf.js";
import Category from "../models/category.js";
import { log, multiLog } from "../utils/logger.js";
import { buildRes } from "../utils/base.js";

async function add(data) {
  const { title } = data;
  const category = new Category({ title });
  try {
    await category.save();
    multiLog([...[["msg", "Category被添加"]], ...Object.entries(data)]);
    return buildRes("成功", { title });
  } catch (err) {
    log(`Category添加时${errCode("mongoose", err.code)}`, "db", "err");
    return buildRes("失败", err.message, 201);
  }
}

async function find(data) {
  const { id } = data;

  try {
    const doc = await Category.findById(id);

    if (doc) {
      multiLog([
        ...[["msg", "Category找到"]],
        ...Object.entries(doc.toObject()),
      ]);
      return buildRes("suc", doc);
    } else {
      log("Category未找到", "db");
      return buildRes("fail");
    }
  } catch (err) {
    log(`在查找Category时发生错误: ${err}`, "db", "err");
    throw buildRes("err", err.message, 201);
  }
}

async function update(data) {
  const { id, title } = data;
  try {
    const updatedDoc = await Category.findByIdAndUpdate(
      id,
      { $set: { title, updateTime: new Date() } },
      { new: true },
    );

    if (updatedDoc) {
      multiLog([
        ...[["msg", "Category被修改"]],
        ...Object.entries(updatedDoc.toObject()),
      ]);
      return buildRes("suc", updatedDoc);
    } else {
      log("未找到要修改的Category", "db");
      return buildRes("fail");
    }
  } catch (err) {
    log(`Category修改时失败: ${err}`, "db", "err");
    return buildRes("错误", err.message, 201);
  }
}

async function remove(data) {
  const { id } = data;
  try {
    const deletedDoc = await Category.findByIdAndDelete(id);
    if (deletedDoc) {
      multiLog([
        ...[["msg", "Category被删除"]],
        ...Object.entries(deletedDoc.toObject()),
      ]);
      return buildRes("成功", deletedDoc);
    } else {
      log("未找到要删除的Category", "db");
      return buildRes("fail");
    }
  } catch (err) {
    log(`在删除Category时发生错误: ${err}`, "db", "err");
    return buildRes("错误", err.message, 201);
  }
}

export { add, find, update, remove };
