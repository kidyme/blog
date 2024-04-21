import config from "./confs/sysConf.js";
import express from "express";
import cors from "cors";
import { log } from "./utils/logger.js";

const app = express();
app.use(cors());

app.listen(config.port, () => {
  log("The server is already running on port 3000", "sys", "sys");
  log("The server is already running on port 3000", "sys", "sys");
});
