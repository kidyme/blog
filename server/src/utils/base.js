import errCode from "../confs/errConf.js";
import { log, multiLog } from "../utils/logger.js";
// import { buildRes } from "../utils/base.js";

const baseSchema = {
  createTime: {
    type: Date,
    default: Date.now,
  },
  updateTime: {
    type: Date,
    default: Date.now,
  },
};

const buildRes = (msg, data = null, code = 200) => {
  return { msg, data, code };
};

const baseHttp = (router, https) => {
  router.get("/:id", (req, res) => {
    https
      .find(req.params)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  });

  router
    .route("")
    .all((req, res, next) => {
      next();
    })
    .put((req, res) => {
      https
        .update(req.body)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .post((req, res) => {
      https
        .add(req.body)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .delete((req, res) => {
      https
        .remove(req.body)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.send(err);
        });
    });

  return router;
};

const baseCRUD = (Model, modelName) => {
  async function add(data) {
    const category = new Model(data);

    try {
      const doc = await category.save();
      multiLog([...[["msg", `${modelName}被添加`]], ...Object.entries(data)]);
      return buildRes("成功", { ...doc.toObject() });
    } catch (err) {
      log(`${modelName}添加时${errCode("mongoose", err.code)}`, "db", "err");
      return buildRes("失败", err.message, 201);
    }
  }

  async function find(data) {
    const { id } = data;
    log(id);

    try {
      const doc = await Model.findById(id);

      if (doc) {
        multiLog([
          ...[["msg", `${modelName}找到`]],
          ...Object.entries(doc.toObject()),
        ]);
        return buildRes("suc", doc);
      } else {
        log(`${modelName}未找到`, "db");
        return buildRes("fail");
      }
    } catch (err) {
      log(`在查找${modelName}时发生错误: ${err}`, "db", "err");
      throw buildRes("err", err.message, 201);
    }
  }

  async function update(data) {
    const { id } = data;
    delete data.id;

    try {
      const updatedDoc = await Model.findByIdAndUpdate(
        id,
        { $set: { ...data, updateTime: new Date() } },
        { new: true },
      );

      if (updatedDoc) {
        multiLog([
          ...[["msg", `${modelName}被修改`]],
          ...Object.entries(updatedDoc.toObject()),
        ]);
        return buildRes("suc", updatedDoc);
      } else {
        log(`未找到要修改的${modelName}`, "db");
        return buildRes("fail");
      }
    } catch (err) {
      log(`${modelName}修改时失败: ${err}`, "db", "err");
      return buildRes("错误", err.message, 201);
    }
  }

  async function remove(data) {
    const { id } = data;
    try {
      const deletedDoc = await Model.findByIdAndDelete(id);
      if (deletedDoc) {
        multiLog([
          ...[["msg", `${modelName}被删除`]],
          ...Object.entries(deletedDoc.toObject()),
        ]);
        return buildRes("成功", deletedDoc);
      } else {
        log(`未找到要删除的${modelName}`, "db");
        return buildRes("fail");
      }
    } catch (err) {
      log(`在删除${modelName}时发生错误: ${err}`, "db", "err");
      return buildRes("错误", err.message, 201);
    }
  }

  return { add, find, update, remove };
};

export { baseSchema, buildRes, baseHttp, baseCRUD };
