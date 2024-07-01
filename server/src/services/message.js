import { log, multiLog } from "../utils/logger.js";
import { buildRes } from "../utils/base.js";
import Message from "../models/message.js";
import { add as addVisitor } from "../controllers/visitor.js";

async function add(data) {
  const visitorData = data.visitor;
  data = data.message;

  try {
    const visitorResponse = await addVisitor(visitorData);
    if (visitorResponse.code === 200) {
      data.visitor = visitorResponse.data._id;

      const model = new Message(data);
      const doc = await model.save();

      multiLog([...[["msg", `Message被添加`]], ...Object.entries(data)]);
      return buildRes("成功", { ...doc.toObject() });
    } else {
      return buildRes("失败", "Visitor添加时失败", 201);
    }
  } catch (err) {
    log(`Message添加时${errCode("mongoose", err.code)}`, "db", "err");
    return buildRes("失败", err.message, 201);
  }
}

async function find(data) {
  const { id } = data;

  try {
    const doc = await Message.findById(id).populate("visitor");

    if (doc) {
      const replies = await Message.aggregate([
        { $match: { reply: doc._id } },
        {
          $lookup: {
            from: "messages",
            localField: "_id",
            foreignField: "reply",
            as: "replies",
          },
        },
      ]);
      const result = JSON.parse(JSON.stringify(doc));
      result.replies = replies;

      multiLog([
        ...[["msg", `Message找到`]],
        ...Object.entries(doc.toObject()),
      ]);
      return buildRes("suc", result);
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

    const results = [];

    for (let doc of docs) {
      const docObj = doc.toObject();
      if (docObj.reply === null) {
        const replies = await Message.aggregate([
          { $match: { reply: doc._id } },
          {
            $lookup: {
              from: "messages",
              localField: "_id",
              foreignField: "reply",
              as: "replies",
            },
          },
        ]);

        const result = JSON.parse(JSON.stringify(doc));
        result.replies = replies;

        results.push(result);
      }
    }

    multiLog([
      ...[["msg", `所有Message找到`]],
      ...docs.map((doc) => Object.entries(doc.toObject())),
    ]);
    return buildRes("suc", results);
  } catch (err) {
    log(`在查找所有Message时发生错误: ${err}`, "db", "err");
    return buildRes("错误", err.message, 201);
  }
}

async function like(id) {
  try {
    const doc = await Message.findById(id);
    if (doc) {
      doc.like += 1;
      await doc.save();
      log(`点赞Message ID ${id}`, "db");
      return buildRes("suc");
    } else {
      log(`Message未找到`, "db");
      return buildRes("fail");
    }
  } catch (err) {
    log(`点赞Post时发生错误: ${err}`, "db", "err");
    return buildRes("错误", err.message, 201);
  }
}

export { add, find, findAll, like };
