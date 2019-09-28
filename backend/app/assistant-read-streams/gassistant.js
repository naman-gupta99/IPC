import { dialogflow } from "actions-on-google";

const app = dialogflow({ debug: true });

console.log("Initializing Google Assistant");

app.intent("Default Welcome Intent", conv => {
  console.log("Reached Dialogflow");
  conv.ask("Welcome to InterPlatformChat");
});

app.intent("Default Fallback Intent", conv => {
  console.log("Fallback");
  conv.ask("Fallback");
});

export default app;