import fs from "fs";
import path from "path";
import multer from "multer";
import config from "../confs/sysConf.js";
import { log, multiLog } from "../utils/logger.js";
import { generateUUID } from "../utils/uuid.js";
import { buildRes } from "../utils/base.js";
import Post from "../models/post.js";
import { md2html } from "../plugins/md2html.js";

async function add(data) {
  const model = new Post(data);

  try {
    const doc = await model.save();
    multiLog([...[["msg", `Post被添加`]], ...Object.entries(data)]);
    return buildRes("成功", { ...doc.toObject() });
  } catch (err) {
    log(`Post添加时${errCode("mongoose", err.code)}`, "db", "err");
    return buildRes("失败", err.message, 201);
  }
}

async function find(data) {
  const { id } = data;
  try {
    const doc = await Post.findById(id);

    if (doc) {
      multiLog([...[["msg", `Post找到`]], ...Object.entries(doc.toObject())]);
      const path = doc.path;

      try {
        const content = fs.readFileSync(path, "utf8");
        let post = JSON.parse(JSON.stringify(doc));
        post.content = content;
        return buildRes("suc", post);
      } catch (readErr) {
        log(`读取${path}内容时发生错误: ${readErr}`, "fs", "err");
        return buildRes("suc", doc);
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

async function findAll(params) {
  try {
    const filter =
      params && params.category ? { category: params.category } : {};
    const docs = await Post.find(filter).populate("category");

    multiLog([
      ...[["msg", `所有Post找到`]],
      ...docs.map((doc) => Object.entries(doc.toObject())),
    ]);

    const posts = await Promise.all(
      docs.map((doc) => {
        const path = doc.path;
        try {
          let content = fs.readFileSync(path, "utf8");
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

async function like(id) {
  try {
    const doc = await Post.findById(id);
    if (doc) {
      doc.like += 1;
      await doc.save();
      log(`点赞Post ID ${id}`, "db");
      return buildRes("suc");
    } else {
      log(`Post未找到`, "db");
      return buildRes("fail");
    }
  } catch (err) {
    log(`点赞Post时发生错误: ${err}`, "db", "err");
    return buildRes("错误", err.message, 201);
  }
}

function storage() {
  return multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        const dir = path.join(config.filePath, "md/");
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
      },
      filename: function (req, file, cb) {
        const title = generateUUID();
        const ext = path.extname(file.originalname);
        const filename = `${title}${ext}`;
        cb(null, filename);
      },
    }),
  });
}

async function upload(req) {
  const file = req.file;
  multiLog([
    ["msg", "Post被添加"],
    ["filename", file.filename],
  ]);

  file.htmlPath =
    config.filePath + "html/" + file.filename.replace(/\.md$/, ".html");
  md2html(file.path, file.htmlPath);

  return buildRes("文件上传成功", file);
}

export { add, find, findAll, like, storage, upload };
