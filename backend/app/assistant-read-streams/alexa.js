import * as Alexa from "ask-sdk";
import { ExpressAdapter } from "ask-sdk-express-adapter";
import {
  LaunchResponseGetter,
  ConnectionGetter,
  ConnectionPutter,
  MessagePutter,
  MessageGetter,
  DisconnectionPutter
} from "./alexa/functions";

const skillBuilder = Alexa.SkillBuilders.custom();

console.log("Initializing Alexa");

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  async handle(handlerInput) {
    const accessToken =
      handlerInput.requestEnvelope.context.System.user.accessToken;

    const responseObject = await LaunchResponseGetter(accessToken);

    const speechText = responseObject.speechText;
    const cardContent = responseObject.cardContent;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("InterPlatformChat", cardContent)
      .getResponse();
  }
};

const ConnectionIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "ConnectionIntent"
    );
  },
  async handle(handlerInput) {
    const accessToken =
      handlerInput.requestEnvelope.context.System.user.accessToken;

    const responseObject = await ConnectionGetter(accessToken);

    const speechText = responseObject.speechText;
    const cardContent = responseObject.cardContent;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("InterPlatformChat", cardContent)
      .getResponse();
  }
};

const ConnectIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "ConnectIntent"
    );
  },
  async handle(handlerInput) {
    const accessToken =
      handlerInput.requestEnvelope.context.System.user.accessToken;

    const responseObject = await ConnectionPutter(accessToken);

    const speechText = responseObject.speechText;
    const cardContent = responseObject.cardContent;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("InterPlatformChat", cardContent)
      .getResponse();
  }
};

const MessageIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "MessageIntent"
    );
  },
  async handle(handlerInput) {
    const accessToken =
      handlerInput.requestEnvelope.context.System.user.accessToken;
    const message =
      handlerInput.requestEnvelope.request.intent.slots.message.value;

    const responseObject = await MessagePutter(accessToken, message);

    const speechText = responseObject.speechText;
    const cardContent = responseObject.cardContent;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("InterPlatformChat", cardContent)
      .getResponse();
  }
};

const ReceiveMessageIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "ReceiveMessageIntent"
    );
  },
  async handle(handlerInput) {
    const accessToken =
      handlerInput.requestEnvelope.context.System.user.accessToken;

    const responseObject = await MessageGetter(accessToken);

    const speechText = responseObject.speechText;
    const cardContent = responseObject.cardContent;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("InterPlatformChat", cardContent)
      .getResponse();
  }
};

const DisconnectIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "DisconnectIntent"
    );
  },
  async handle(handlerInput) {
    const accessToken =
      handlerInput.requestEnvelope.context.System.user.accessToken;

    const responseObject = await DisconnectionPutter(accessToken);

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
    ConnectionIntentHandler,
    ConnectIntentHandler,
    MessageIntentHandler,
    ReceiveMessageIntentHandler,
    DisconnectIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .create();
const adapter = new ExpressAdapter(skill, true, true);

export default adapter;
