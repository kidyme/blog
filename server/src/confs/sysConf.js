const env = process.env.NODE_ENV || "development";
const configs = {
  development: {
    port: 3000,
    log: false,
  },
  production: {
    port: 3000,
    log: true,
  },
};

export default configs[env];
