import Message from "../models/message.js";
import { buildRes, baseCRUD } from "../utils/base.js";

export const { add, find, findAll, update, remove } = baseCRUD(
  Message,
  "Message",
);

// const remove = async (_) => {
//   return buildRes("fail", 200, "删除接口未实现");
// };
//
// export { remove };
