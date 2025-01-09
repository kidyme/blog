const env = process.env.NODE_ENV || "development";

const configs = {
  development: {
    port: 3000,
    log: false,
    db: "mongodb://root:1030@127.0.0.1:27017/blog?authSource=admin",
  },
  production: {
    port: 3000,
    log: true,
    db: "mongodb://127.0.0.1:27017/blog",
  },
};

export default configs[env];
