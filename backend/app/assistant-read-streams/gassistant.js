import { dialogflow, BasicCard, Button } from "actions-on-google";
import User from "../models/User";
import config from "../../config";
import GAssistantMessageQueue from "../models/GAssistantMessageQueue";
import messageHandler from "../message-handler";

const app = dialogflow();

console.log("Initializing Google Assistant");

app.intent("Default Welcome Intent", conv => {
  return User.findOne({ userId: conv.user.access.token })
    .then(user => {
      conv.ask("Hello " + user.username);
      conv.ask("Welcome to InterPlatformChat");
    })
    .catch(err => {
      console.log("Google Assistant function error : " + err);
    });
});

app.intent("Connection Intent", conv => {
  return User.findOne({ userId: conv.user.access.token })
    .then(user => {
      if (user.connection != "NONE")
        conv.ask("You are connected to " +
          user.connection +
          " . You can say send message to send them a message");
      else
        conv.ask("You are not connected to anyone. Say Connect to connect with someone");
    })
    .catch(err => {
      console.log("Google Assistant function error : " + err);
    });
});

app.intent("Connect Intent", conv => {
  return User.findOne({ userId: conv.user.access.token })
    .then(user => {
      if (user.connection != "NONE")
        conv.ask(
          "You are connected to " +
          user.connection +
          " Disconnect before connecting to someone else ");
      else {
        conv.ask("You are not connected to anyone.")
        conv.ask(new BasicCard({
          text: "Click on the following button to connect with someone",
          buttons: new Button({
            title: "Connect",
            url: config.app.frontendURL + "/dashboard/" + user.userId
          })
        }));
      }
    })
    .catch(err => {
      console.log("Google Assistant function error : " + err);
    });
});

app.intent("Message Intent", (conv, { message }) => {
  return User.findOne({ userId: conv.user.access.token })
    .then(user => {
      if (user.connection != "NONE") {
        messageHandler(user.connection, message.toLowerCase());
        conv.ask("Your message has been sent");
      } else {
        conv.ask("You are not connected to anyone.")
        conv.ask(new BasicCard({
          text: "Click on the following button to connect with someone",
          buttons: new Button({
            title: "Connect",
            url: config.app.frontendURL + "/dashboard/" + user.userId
          })
        }));
      }
    })
    .catch(err => {
      console.log("Google Assistant function error : " + err);
    });
});

app.intent("Receive Message Intent", conv => {
  return GAssistantMessageQueue.findOneAndUpdate({ userId: conv.user.access.token },
    { messageQueue: [] })
    .then(user => {
      let text = "You recieved the following messages :  \n ";
      user.messageQueue.forEach(message => {
        text += message + "  \n ";
      });
      conv.ask(text);
    })
    .catch(err => {
      console.log("Google Assistant functions error : " + err);
    });
});

app.intent("Disconnect Intent", conv => {
  User.findOneAndUpdate({ userId: userId }, { connection: "NONE" })
    .then(user => {
      User.updateOne({ username: user.connection }, { connection: "NONE" })
        .then(() =>
          conv.ask("You are now disconnected."))
        .catch(err => {
          console.log("Google Assistant function error : " + err);
        });
    })
    .catch(err => {
      console.log("Google Assistant function error : " + err);
    });
});

app.intent("Default Fallback Intent", conv => {
  conv.ask("You can say Check Connection, Connect to Someone or Disconnect.");
});

app.intent("Close Intent", conv => {
  conv.close("Thank you for using InterPlatformChat. Hope to see you soon. Goodbye!");
})

export default app;