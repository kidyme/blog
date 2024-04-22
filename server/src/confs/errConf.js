const errCode = {
  mongoose: {
    11000: "名称重复",
  },
  common: {},
};

export default (field, code) => errCode[field][code];
