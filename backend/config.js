const nodeEnv = process.env.NODE_ENV;

const config = {
  dev: {
    app: {
      port: 8000,
    }
  },
  prod: {
    app: {
      port: process.env.PORT,
    }
  }
};

export default config[nodeEnv];
