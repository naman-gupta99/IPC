import config from '../../config';
import Slackbot from 'slackbots';

const slackWrite = (message, params) => {

	const bot = new Slackbot({
	token : config.nodes.slack.token,
	name  : config.nodes.slack.name 
    });
    const params1={
    icon_emoji:':smiley:'
   }
    
    bot.postMessage(params.channelId,message,params1);

}

export default slackWrite;