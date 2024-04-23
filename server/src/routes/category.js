import { add, find, update, remove } from "../controllers/category.js";
import { Router } from "express";
import { baseCRUD } from "../utils/base.js";

export default (app) => {
  const router = baseCRUD(Router(), "/category/:id", {
    add,
    find,
    update,
    remove,
  });

  app.use("/", router);
};
