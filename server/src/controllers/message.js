import Message from "../models/message.js";
import { baseCRUD } from "../utils/base.js";
import { find, findAll } from "../services/message.js";

export const { add, update, remove } = baseCRUD(Message, "Message");

export { find, findAll };
