import gitterWrite from "./write-streams/gitter";
import slackWrite from "./write-streams/slack";
import alexaWrite from "./assistant-write-streams/alexa";
import gassistantWrite from "./assistant-write-streams/gassistant";

const writeStreamFunctions = {
  gitter: gitterWrite,
  slack: slackWrite,
  alexa: alexaWrite,
  gassistant: gassistantWrite
};

export default writeStreamFunctions;
