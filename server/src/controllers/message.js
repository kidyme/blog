import Message from "../models/message.js";
import { baseCRUD } from "../utils/base.js";
import { add, find, findAll, like } from "../services/message.js";

export const { update, remove } = baseCRUD(Message, "Message");

export { add, find, findAll, like };
