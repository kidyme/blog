import * as operators from '@/api/post.js';
import buildModel from '@/utils/model.js';

const model = buildModel('post', operators);
model.actions.like = async (id) => {
  await operators
    .like(id)
    .then(() => {
      model.actions.get({ id });
    })
    .catch((err) => {
      console.error(`Error liking Post:`, err);
    });
};
export default model;
