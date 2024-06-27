import { reactive } from 'vue';

export default (modelName, operator) => {
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
    getAll: operator.getAll
      ? async (params = {}) => {
          await operator
            .getAll(params)
            .then((res) => {
              state.data = res.data;
            })
            .catch((err) => {
              console.error(`Error fetching all ${modelName}:`, err);
            });
        }
      : undefined,

    get: operator.get
      ? async (id) => {
          await operator
            .get({ id })
            .then((res) => {
              state.one = res.data;
            })
            .catch((err) => {
              console.error(`Error fetching ${modelName}:`, err);
            });
        }
      : undefined,

    add: operator.add
      ? async (data) => {
          await operator
            .add(data)
            .then((res) => {
              if (operator.getAll) actions.getAll();
            })
            .catch((err) => {
              console.error(`Error adding ${modelName}:`, err);
            });
        }
      : undefined,

    update: operator.update
      ? async (data) => {
          await operator
            .update(data)
            .then(() => {
              if (operator.getAll) actions.getAll();
            })
            .catch((err) => {
              console.error(`Error updating ${modelName}:`, err);
            });
        }
      : undefined,

    remove: operator.remove
      ? async (data) => {
          await operator
            .remove(data)
            .then(() => {
              if (operator.getAll) actions.getAll();
            })
            .catch((err) => {
              console.error(`Error removing ${modelName}:`, err);
            });
        }
      : undefined,
  };

  return {
    fetch,
    fetchOne,
    actions,
  };
};
