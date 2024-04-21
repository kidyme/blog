import mongoose from "mongoose";
import config from "../confs/sysConf.js";

export default () => {
  mongoose.connect(config.db, {});
  // const db = mongoose.connection;
};
