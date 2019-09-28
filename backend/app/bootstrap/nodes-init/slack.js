import config from '../../../config';
import slackRead from "../../read-streams/slack";
import Slackbot from 'slackbots'; 
import User from "../../models/User";
import NewUser from "../../models/NewUser";
import slackWrite from "../../write-streams/slack";



// New user registration
const newUserHandler = x => {
    const bot = new Slackbot({
  token : config.nodes.slack.token,
  name  : config.nodes.slack.name 
    });

   const params1={
    icon_emoji:':smiley:'
   }
    
    

  NewUser.findOne({userId : "slack" +x.channel })
    .then(user => {
        if(!user) {
          const newUser = new NewUser({
            userId   : "slack"+x.channel,
            platform : "slack",
            params   : {
              channelId : x.channel
            }
          });
          newUser.save()
            .then(
              user => {
                let message = config.app.frontendURL+"/home/signup/slack"+x.channel;
                  bot.postMessage(x.channel,message,params1);
                  bot.postMessage(x.channel,"Dont share it with someone else",params1);
              }
            )
            .catch(err => console.log(err));

        }
        else
        {
            let message = config.app.frontendURL+"/home/signup/slack"+x.channel;
                  bot.postMessage(x.channel,message,params1);
                  bot.postMessage(x.channel,"Dont share it with someone else",params1);

        }

    })
      .catch(err =>console.log(err));
}

// User handler
const UserHandler = x => {
  User.findOne({userId : "slack" + x.channel })
    .then(user => {
        if(!user)
        {
          //console.log("user doesnot exists");
          newUserHandler(x);
        }
        else 
          {
            console.log("User exits");
            slackRead(x);
          }
      })
      .catch(err =>{
         console.log(err);
      });
}



const slackInit = () => {
  console.log("Slack Initializing.");
  
  const bot = new Slackbot({
  token : config.nodes.slack.token,
  name  : config.nodes.slack.name 
    });

  bot.on('error',(err)=>{
  console.log(err);
});

  //bot gets started
  bot.on('start',()=>{
   const params={
     }
   });

  // on receiving message
  bot.on ('message',(data)=>{
      if(data.type!=='message') {
                        return ;
                      }
    
   // NewUser.find({}).then(user=> console.log(user)).catch(err =>console.log(err));
      if( data.bot_id!="BND131AG2" && data.text!="undefined")  
      {  
         //console.log(data);
         UserHandler(data);
         //slackRead(data);

          //bot.postMessage(data.channel,"Message from server");
      }
    
    });

}

export default slackInit;