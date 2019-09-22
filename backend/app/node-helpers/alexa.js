const Alexa = require("ask-sdk");
const { ExpressAdapter } = require("ask-sdk-express-adapter");

const skillBuilder = Alexa.SkillBuilders.custom();

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    console.log(handlerInput);
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    const speechText = "Welcome to InterPlatformChat";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("Hello World", speechText)
      .getResponse();
  }
};

const skill = skillBuilder.addRequestHandlers(LaunchRequestHandler).create();
const adapter = new ExpressAdapter(skill, true, true);

export default adapter;
