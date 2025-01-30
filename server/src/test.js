import { md2html } from "./plugins/md2html.js";
import config from "./confs/sysConf.js";

const filename = "blackmythwukong";
md2html(
  config.filePath + filename + ".md",
  config.filePath + filename + ".html",
);
