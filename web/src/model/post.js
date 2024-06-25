import { get, getAll, add } from '@/api/post.js';
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
        console.error('Error fetching all posts:', err);
      });
  },

  get: async (id) => {
    await get({ id })
      .then((res) => {
        state.one = res.data;
      })
      .catch((err) => {
        console.error('Error fetching post:', err);
      });
  },

  add: async (data) => {
    await add(data)
      .then((res) => {
        actions.getAll();
      })
      .catch((err) => {
        console.error('Error fetching post:', err);
      });
  },
};

export default {
  fetch,
  fetchOne,
  actions,
};
