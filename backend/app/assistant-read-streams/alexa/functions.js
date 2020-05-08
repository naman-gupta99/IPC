import User from "../../models/User";
import AlexaMessageQueue from "../../models/AlexaMessageQueue";
import config from "../../../config";
import messageHandler from "../../message-handler";

const unregisteredUserResponse =
  "Welcome to InterPlatformChat. You haven't registered with InterPlatformChat. Open Alexa app to register.";

export const LaunchResponseGetter = userId => {
  return new Promise((resolve, reject) => {
    User.findOne({ userId: userId })
      .then(user => {
        if (user != null) {
          const text = "Welcome to InterPlatformChat.";
          resolve({
            speechText: text,
            cardContent: text
          });
        } else {
          resolve({
            speechText: unregisteredUserResponse,
            cardContent: unregisteredUserResponse
          });
        }
      })
      .catch(err => {
        console.log("Alexa function error : " + err);
      });
  });
};

export const ConnectionGetter = userId => {
  return new Promise((resolve, reject) => {
    User.findOne({ userId: userId })
      .then(user => {
        if (user != null && user.connection != "NONE") {
          const text =
            "You are connected to " +
            user.connection +
            " . You can say send message to send them a message";
          resolve({
            speechText: text,
            cardContent: text
          });
        } else if (user != null) {
          const text =
            "You are not connected to anyone. Say Connect to connect with someone.";
          resolve({
            speechText: text,
            cardContent: text
          });
        } else {
          resolve({
            speechText: unregisteredUserResponse,
            cardContent: unregisteredUserResponse
          });
        }
      })
      .catch(err => {
        console.log("Alexa function error : " + err);
      });
  });
};

export const ConnectionPutter = userId => {
  return new Promise((resolve, reject) => {
    User.findOne({ userId: userId }).then(user => {
      if (user != null) {
        if (user.connection != "NONE") {
          const text =
            "You are connected to " +
            user.connection +
            " Disconnect before connecting to someone else ";
          resolve({
            speechText: text,
            cardContent: text
          });
        } else {
          resolve({
            speechText:
              "Open Alexa and navigate to Activity Section and find link to your dashboard",
            cardContent:
              "Head to this link to connect to someone : " +
              config.app.frontendURL +
              "/alexa/connect"
          });
        }
      } else {
        resolve({
          speechText: unregisteredUserResponse,
          cardContent: unregisteredUserResponse
        });
      }
    });
  });
};

export const MessagePutter = (userId, message) => {
  return new Promise((resolve, reject) => {
    User.findOne({ userId: userId })
      .then(user => {
        if (user != null) {
          if (user.connection != "NONE") {
            messageHandler(user.connection, message.toLowerCase());
            resolve({
              speechText: "Your message has been sent.",
              cardContent: "Your message has been sent."
            });
          } else {
            resolve({
              speechText:
                "Open Alexa and navigate to Activity Section and find link to your dashboard",
              cardContent:
                "Head to this link to connect to someone : " +
                config.app.frontendURL +
                "/alexa/connect"
            });
          }
        } else {
          resolve({
            speechText: unregisteredUserResponse,
            cardContent: unregisteredUserResponse
          });
        }
      })
      .catch(err => {
        console.log("Alexa function error : " + err);
      });
  });
};

export const MessageGetter = userId => {
  return new Promise((resolve, reject) => {
    AlexaMessageQueue.findOneAndUpdate({ userId: userId }, { messageQueue: [] })
      .then(user => {
        let text = "<s>You recieved the following messages : </s>";
        user.messageQueue.forEach(message => {
          text += "<s> " + message + "</s>";
        });
        resolve({
          speechText: text,
          cardContent: text
        });
      })
      .catch(err => {
        console.log("Alexa functions error : " + err);
      });
  });
};

export const DisconnectionPutter = userId => {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ userId: userId }, { connection: "NONE" })
      .then(user => {
        User.updateOne({ username: user.connection }, { connection: "NONE" })
          .then(() =>
            resolve({
              speechText: "You are now disconnected.",
              cardContent: "You are now disconnected"
            })
          )
          .catch(err => {
            console.log("Alexa function error : " + err);
          });
      })
      .catch(err => {
        console.log("Alexa function error : " + err);
      });
  });
};

export default {
  LaunchResponseGetter,
  ConnectionGetter,
  ConnectionPutter,
  MessagePutter,
  MessageGetter,
  DisconnectionPutter
};
