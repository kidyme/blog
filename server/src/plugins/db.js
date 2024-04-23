import mongoose from "mongoose";
import config from "../confs/sysConf.js";
import { log } from "../utils/logger.js";

export default () => {
  mongoose
    .connect(config.db, {})
    .then(() => {
      log("MongoDB connected successfully.", "db");
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ServerSelectionError) {
        log(`MongoDB connection error: ${err.message}`, "db");
      } else {
        log(`MongoDB connection error: ${err}`, "db");
      }
    });

  mongoose.connection.on("disconnected", () => {
    log("MongoDB disconnected.", "db");
  });
};
