import { add, get, getAll, update, remove } from '@/api/category.js';
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
        console.error('Error fetching all categories:', err);
      });
  },

  get: async (params) => {
    await get(params)
      .then((res) => {
        state.one = res.data;
      })
      .catch((err) => {
        console.error('Error fetching category:', err);
      });
  },

  add: async (data) => {
    await add(data)
      .then(() => {
        return actions.getAll();
      })
      .catch((err) => {
        console.error('Error adding category:', err);
      });
  },

  update: async (data) => {
    await update(data)
      .then(() => {
        return actions.getAll();
      })
      .catch((err) => {
        console.error('Error updating category:', err);
      });
  },

  remove: async (data) => {
    await remove(data)
      .then(() => {
        return actions.getAll();
      })
      .catch((err) => {
        console.error('Error removing category:', err);
      });
  },
};

export default {
  state,
  fetch,
  fetchOne,
  actions,
};
