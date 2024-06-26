import { get, getAll, add } from '@/api/post.js';
import model from '@/utils/model.js';

export default model('post', { get, getAll, add });
