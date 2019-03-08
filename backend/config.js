const nodeEnv = process.env.NODE_ENV;

const config = {
  app : {
    port : 8000,
    jwt_expiry_time : "12h",
    SESSION_SECRET : "secret",
    WEB_TOKEN_SECRET : "secret",
    nitkkr_domain_email : false
  },
    mongodb : {
      mongoURI : "mongodb://root:furious7@ds231374.mlab.com:31374/replybetter"
    }
};

export default config;
