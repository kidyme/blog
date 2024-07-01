import { reactive } from 'vue';

export default (modelName, operators) => {
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
    getAll: operators.getAll
      ? async (params = {}) => {
          await operators
            .getAll(params)
            .then((res) => {
              state.data = res.data;
            })
            .catch((err) => {
              console.error(`Error fetching all ${modelName}:`, err);
            });
        }
      : undefined,

    get: operators.get
      ? async (params) => {
          await operators
            .get(params)
            .then((res) => {
              state.one = res.data;

              if (state.data.length > 0) {
                const index = state.data.findIndex((item) => item._id === state.one._id);
                if (index !== -1) {
                  state.data[index] = res.data;
                }
              }
            })
            .catch((err) => {
              console.error(`Error fetching ${modelName}:`, err);
            });
        }
      : undefined,

    add: operators.add
      ? async (data) => {
          await operators
            .add(data)
            .then((res) => {
              if (operators.getAll) actions.getAll();
            })
            .catch((err) => {
              console.error(`Error adding ${modelName}:`, err);
            });
        }
      : undefined,

    update: operators.update
      ? async (data) => {
          await operators
            .update(data)
            .then(() => {
              if (operators.getAll) actions.getAll();
            })
            .catch((err) => {
              console.error(`Error updating ${modelName}:`, err);
            });
        }
      : undefined,

    remove: operators.remove
      ? async (data) => {
          await operators
            .remove(data)
            .then(() => {
              if (operators.getAll) actions.getAll();
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
