import * as actions from '@/api/message.js';
import buildModel from '@/utils/model.js';

const model = buildModel('message', actions);
model.actions.like = async (id) => {
  await actions
    .like(id)
    .then(() => {
      model.actions.get(id);
    })
    .catch((err) => {
      console.error(`Error liking Message:`, err);
    });
};
export default model;
