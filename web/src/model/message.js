import * as operators from '@/api/message.js';
import buildModel from '@/utils/model.js';

const model = buildModel('message', operators);
model.actions.like = async (id, baseMsgId) => {
  await operators
    .like(id)

    .then(() => {
      model.actions.get({ id: baseMsgId });
    })
    .catch((err) => {
      console.error(`Error liking Message:`, err);
    });
};
export default model;
