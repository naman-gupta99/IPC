import request from "request";
import config from "../../config";
import messageHandler from "../message-handler";
import User from "../models/User";

const gitterRead = roomId => {
  request
    .get({
      headers: {
        Accept: "application/json",
        Authorization: config.nodes.gitter.authorization
      },
      url: "https://stream.gitter.im/v1/rooms/" + roomId + "/chatMessages"
    })
    .on("response", response => {
      response.on("data", chunk => {
        let msg = chunk.toString();
        if (msg !== " \n") {
          const data = JSON.parse(msg);
          if (data.fromUser.username != "InterPlatformChat") {
            const message = data.text;
            const userId = "gitter" + roomId;
            User.findOne({ userId: userId }).then(user => {
              const recieverUsername = user.connection;
              messageHandler(recieverUsername, message);
            });
          }
        }
      });
    });
};

export default gitterRead;
