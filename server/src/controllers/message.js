import Message from "../models/message.js";
import { baseCRUD } from "../utils/base.js";
import { find, findAll, like } from "../services/message.js";

export const { add, update, remove } = baseCRUD(Message, "Message");

export { find, findAll, like };
