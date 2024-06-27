import * as actions from '@/api/post.js';
import buildModel from '@/utils/model.js';

const model = buildModel('post', actions);
model.actions.like = async (id) => {
  await actions
    .like(id)
    .then(() => {
      model.actions.get(id);
    })
    .catch((err) => {
      console.error(`Error liking Post:`, err);
    });
};
export default model;
