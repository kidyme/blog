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

const baseCRUD = (router, route, https) => {
  router
    .route(route)
    .all((req, res, next) => {
      next();
    })
    .get((req, res) => {
      https
        .find(req.params)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .put((req, res) => {
      https
        .update(req.params)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.send(err);
        });
    })

    .post((req, res) => {
      https
        .add(req.params)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .delete((req, res) => {
      https
        .remove(req.params)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.send(err);
        });
    });

  return router;
};

export { baseSchema, buildRes, baseCRUD };
