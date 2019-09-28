import AlexaMessageQueue from "../models/AlexaMessageQueue";

const alexaWrite = (message, params) => {
  AlexaMessageQueue.findOne({ userId: params.userId })
    .then(user => {
      if (user != null) {
        AlexaMessageQueue.updateOne(
          { userId: params.userId },
          { $push: { messageQueue: message } }
        ).catch(err => {
          console.log("Alexa Write Stream error : " + err);
        });
      } else {
        const alexaMessageQueue = new AlexaMessageQueue({
          userId: params.userId,
          maessageQueue: [message]
        });
        alexaMessageQueue.save().catch(err => {
          console.log("Alexa Write Stream error : " + err);
        });
      }
    })
    .catch(err => {
      console.log("Alexa Write Stream error : " + err);
    });
};

export default alexaWrite;
