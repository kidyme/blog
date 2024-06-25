import { get, getAll } from '@/api/message.js';
import { reactive } from 'vue';

const state = reactive({
  data: [],
  one: undefined,
});

const fetch = () => {
  return state.data;
};

const fetchOne = () => {
  return state.one;
};

const actions = {
  getAll: async () => {
    await getAll()
      .then((res) => {
        state.data = res.data;
      })
      .catch((err) => {
        console.error('Error fetching all messages:', err);
      });
  },

  get: async (params) => {
    await get(params)
      .then((res) => {
        state.one = res.data;
      })
      .catch((err) => {
        console.error('Error fetching message:', err);
      });
  },
};

export default {
  fetch,
  fetchOne,
  actions,
};
