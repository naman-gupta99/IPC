const nodeEnv = process.env.NODE_ENV;

const config = {
  app: {
    port: 8000,
  },
  mongodb: {
    mongoURI: "mongodb://root:furious7@ds231374.mlab.com:31374/replybetter"
  }
};

export default config;
