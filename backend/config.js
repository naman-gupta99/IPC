const nodeEnv = process.env.NODE_ENV;

const config = {
  dev: {
    app: {
      port: 8000,
    },
    gitter: {
      authorization: 'Bearer 6b1067646a491596930bb3f127a7f592a55736ac',
      userId: '5c9de21fd73408ce4fbc3234'
    }
  },
  prod: {
    app: {
      port: process.env.PORT,
    },
    gitter: {
      authorization: 'Bearer 6b1067646a491596930bb3f127a7f592a55736ac',
      userId: '5c9de21fd73408ce4fbc3234'
    }
  }
};

export default config[nodeEnv]
