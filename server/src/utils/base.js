const baseSchema = {
  createTime: {
    type: Date,
    default: Date.now,
  },
  updateTime: {
    type: Date,
    default: Date.now,
  },
};

const buildRes = (msg, data = null, code = 200) => {
  return { msg, data, code };
};

export { baseSchema, buildRes };
