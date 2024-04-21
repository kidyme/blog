import config from "./confs/sysConf.js";
import express from "express";
import cors from "cors";
import { log } from "./utils/logger.js";
import db from "./plugins/mongoose.js";

const app = express();
app.use(cors());
db();

app.listen(config.port, () => {
  log(`The server is already running on port ${config.port}`, "sys", "sys");
});
