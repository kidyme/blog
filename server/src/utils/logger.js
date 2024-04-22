import config from "../confs/sysConf.js";
import { formatDate } from "./time.js";
import fs from "fs";

export function log(val, level = "info", type = "msg") {
  const msg = `${just("|" + level + "|", 6, false)} ${formatDate(
    "hh:mm:ss",
  )} ${just(type, 6, true)}: ${val}`;
  const file = "./logs/" + formatDate("YYYY-MM-DD") + ".txt";
  console.log(msg);
  fWrite(file, msg);
}

// data: [ [type: val], [type: val], [type: val] ]
export function multiLog(data, level = "info") {
  const pre = `${just("|" + level + "|", 6, false)} ${formatDate("hh:mm:ss")}`;
  const file = "./logs/" + formatDate("YYYY-MM-DD") + ".txt";
  process.stdout.write(pre);
  fWrite(file, pre, false);
  data.forEach((item, idx) => {
    const msg =
      (idx ? just("", pre.length, false) : "") +
      ` ${just(item[0] ? item[0] : "msg", 6, true)}: ${item[1]}`;

    console.log(msg);
    fWrite(file, msg);
  });
}

// 同步写入
function fWrite(file, data, hasEnter = true) {
  if (config.log) {
    try {
      fs.appendFileSync(file, data + (hasEnter ? "\n" : ""));
    } catch (err) {
      log("日志写入失败");
    }
  }
}

function just(input, width, isLeft, padding = " ") {
  if (padding.length !== 1) {
    throw new Error("Padding character must be exactly one character long.");
  }

  if (input.length >= width) {
    return input;
  }

  const fillLength = width - input.length;

  const fill = padding.repeat(fillLength);
  if (isLeft) return fill + input;
  return input + fill;
}
