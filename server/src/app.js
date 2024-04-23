import config from "./confs/sysConf.js";
import express from "express";
import cors from "cors";
import { log } from "./utils/logger.js";
import db from "./plugins/db.js";
import setCategoryRoutes from "./routes/category.js";
import setVisitorRoutes from "./routes/visitor.js";
import setPostRoutes from "./routes/post.js";
import setMessageRoutes from "./routes/message.js";

const app = express();
app.use(express.json());
app.use(cors());
db();

setCategoryRoutes(app);
setVisitorRoutes(app);
setPostRoutes(app);
setMessageRoutes(app);

app.listen(config.port, () => {
  log(`The server is already running on port ${config.port}`, "app");
});
