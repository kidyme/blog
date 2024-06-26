import { get, getAll, add } from '@/api/message.js';
import model from '@/utils/model.js';

export default model('message', { get, getAll, add });
