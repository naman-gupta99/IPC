import writeStreamFunctions from "./write-stream-func";
import User from "./models/User";

const messageHandler = (recieverUsername, message) => {
  User.findOne({ username: recieverUsername })
    .then(user => {
      const recieverPlatform = user.platform;
      const recieverParams = user.params;
      writeStreamFunctions[recieverPlatform](message, recieverParams);
    })
    .catch(err => {
      console.log("Message Handler error : " + err);
    });
};

export default messageHandler;
