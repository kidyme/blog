import errCode from "../confs/errConf.js";
import { log, multiLog } from "../utils/logger.js";

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

const baseHttp = (router, operators) => {
  router.get("/", (req, res) => {
    // if (req.query.id) {
    //   operators
    //     .find({ id: req.query.id })
    //     .then((result) => {
    //       res.send(result);
    //     })
    //     .catch((err) => {
    //       res.send(err);
    //     });
    // } else {
    operators
      .findAll(req.query)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
    // }
  });
  router.get("/one", (req, res) => {
    operators
      .find(req.query)
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
      operators
        .update(req.body)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .post((req, res) => {
      operators
        .add(req.body)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .delete((req, res) => {
      operators
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
    const model = new Model(data);

    try {
      const doc = await model.save();
      multiLog([...[["msg", `${modelName}被添加`]], ...Object.entries(data)]);
      return buildRes("成功", { ...doc.toObject() });
    } catch (err) {
      log(`${modelName}添加时${errCode("mongoose", err.code)}`, "db", "err");
      return buildRes("失败", err.message, 201);
    }
  }

  async function find(data) {
    const { id } = data;

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

  async function findAll(params = {}) {
    try {
      const docs = await Model.find(params);
      multiLog([
        ...[["msg", `所有${modelName}找到`]],
        ...docs.map((doc) => Object.entries(doc.toObject())),
      ]);
      return buildRes("suc", docs);
    } catch (err) {
      log(`在查找所有${modelName}时发生错误: ${err}`, "db", "err");
      return buildRes("错误", err.message, 201);
    }
  }

  async function update(data) {
    const { id } = data;
    delete data.id;

    try {
      const updatedDoc = await Model.findByIdAndUpdate(
        id,
        { $set: { ...data, updateTime: new Date() } },
        { new: true }
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

  return { add, find, findAll, update, remove };
};

export { baseSchema, buildRes, baseHttp, baseCRUD };
