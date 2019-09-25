const Alexa = require("ask-sdk");
const { ExpressAdapter } = require("ask-sdk-express-adapter");
const { LaunchResponseGetter } = require("./alexa/functions");

const skillBuilder = Alexa.SkillBuilders.custom();

console.log("Initializing Alexa");

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  async handle(handlerInput) {
    const responseObject = await LaunchResponseGetter(
      "alexaamzn1.ask.account.AHC7THEBSU64GZ3C2FRFEV7OW7QB3KY524BXGMZSIANXDDZGJMW323UH2IKOVLR42YVJBM7RET7GAPG5KRQMVQZWEOQJV6B7Q2NNYHSKLZU7AT656VU3KTVZ6GE2TSNCFKONTRCA7ZKE3YHMX42ZYZ7VCU6JX545UVQDII5USIZJVFE6FMEUNJZ5MYOBILKNSYMBVLDAKGCSBNI"
    );

    const speechText = responseObject.speechText;
    const cardContent = responseObject.cardContent;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("InterPlatformChat", cardContent)
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    const speechText =
      "You can say Check Connection, Connect to Someone or Disconnect.";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("InterPlatformChat", speechText)
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      (handlerInput.requestEnvelope.request.intent.name ===
        "AMAZON.CancelIntent" ||
        handlerInput.requestEnvelope.request.intent.name ===
          "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    const speechText =
      "Thank you for using InterPlatformChat. Hope to see you soon. Goodbye!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("InterPlatformChat", speechText)
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput) {
    //any cleanup logic goes here
    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak("Sorry, I can't understand the command. Please say again.")
      .reprompt("Sorry, I can't understand the command. Please say again.")
      .getResponse();
  }
};

const skill = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .create();
const adapter = new ExpressAdapter(skill, true, true);

export default adapter;
