import gitterWrite from "./write-streams/gitter";
import slackWrite from "./write-streams/slack";

const writeStreamFunctions = {
    gitter: gitterWrite,
     slack : slackWrite
}

export default writeStreamFunctions;