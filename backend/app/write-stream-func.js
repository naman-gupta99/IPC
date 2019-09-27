import gitterWrite from "./write-streams/gitter";
import slackWrite from "./write-streams/slack";
import alexaWrite from "./assistant-write-streams/alexa";

const writeStreamFunctions = {
  gitter: gitterWrite,
  slack: slackWrite,
  alexa: alexaWrite
};

export default writeStreamFunctions;
