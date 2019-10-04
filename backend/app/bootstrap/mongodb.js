import mongoose from "mongoose";
import config from "../../config";

mongoose.promise = global.promise;

const mongoConnect = () => {
  const option = {
    keepAlive: 300000,
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  };
  const dbConn = mongoose.connect(config.mongodb.mongoURI, option, error => {
    if (error) {
      console.log(`Mongo default connection error : ${error}`);
    } else {
      console.log("Mongo Connected ...");
    }
  });

  //When the connection is disconnected
  mongoose.connection.on("disconnected", () => {
    console.log("Mongo default connection disconnected");
  });

  //If the Node process ends, close the Mongoose connection
  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        "Mongo default connection disconnected through App Termination"
      );
      process.exit(0);
    });
  });

  return dbConn;
};

export default mongoConnect;
