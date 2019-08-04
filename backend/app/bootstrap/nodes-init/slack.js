import config from '../../../config';
import slackRead from "../../read-streams/slack";
import Slackbot from 'slackbots'; 


const slackInit = () => {
	console.log("Slack Initializing");
	
	const bot = new Slackbot({
	token : config.nodes.slack.token,
	name  : config.nodes.slack.name 
    });
    
    bot.on('start',()=>{
   
       const params={
   	                  icon_emoji:':smiley:'
                    }
      });

    bot.on ('message',(data)=>{
                  if(data.type!=='message') {
                        return ;
                      }
    
    if( data.bot_id!="BGT622C2V")  
    { 
                   
        slackRead(data);
      }
    
    });

}

export default slackInit;