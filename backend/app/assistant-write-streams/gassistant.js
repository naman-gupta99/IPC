import GAssistantMessageQueue from "../models/GAssistantMessageQueue";

const gassistantWrite = (message, params) => {
  GAssistantMessageQueue.findOne({ userId: params.userId })
    .then(user => {
      if (user != null) {
        GAssistantMessageQueue.updateOne(
          { userId: params.userId },
          { $push: { messageQueue: message } }
        ).catch(err => {
          console.log("Google Assistant Write Stream error : " + err);
        });
      } else {
        const gassistantMessageQueue = new GAssistantMessageQueue({
          userId: params.userId,
          maessageQueue: [message]
        });
        gassistantMessageQueue.save().catch(err => {
          console.log("Google Assistant Write Stream error : " + err);
        });
      }
    })
    .catch(err => {
      console.log("Google Assistant Write Stream error : " + err);
    });
};

export default gassistantWrite;
