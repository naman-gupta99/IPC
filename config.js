const nodeEnv = process.env.NODE_ENV;

const config = {
  dev: {
    app: {
      port: 8000,
      SESSION_SECRET: "secret"
    },
    mongodb: {
      mongoURI: 'mongodb+srv://root:root@interplatformchat-hymqw.mongodb.net/test?retryWrites=true'
    },
    nodes: {
      gitter: {
        authorization: 'Bearer 6b1067646a491596930bb3f127a7f592a55736ac',
        userId: '5c9de21fd73408ce4fbc3234'
      },
      slack : {
        token: 'xoxb-571774632978-573218903062-qZsM6GEeHvQs6H5zgIyyGPwM',
        name: 'chatbot'
      }
    }
  },
  prod: {
    app: {
      port: process.env.PORT,
      SESSION_SECRET: "secret"
    },
    mongodb: {
      mongoURI: 'mongodb+srv://root:root@interplatformchat-hymqw.mongodb.net/test?retryWrites=true'
    },
    nodes: {
      gitter: {
        authorization: 'Bearer 6b1067646a491596930bb3f127a7f592a55736ac',
        userId: '5c9de21fd73408ce4fbc3234'
      },
      slack : {
        token: 'xoxb-571774632978-573218903062-qZsM6GEeHvQs6H5zgIyyGPwM',
        name: 'chatbot'
      }
    }
  }
};

export default config[nodeEnv]
