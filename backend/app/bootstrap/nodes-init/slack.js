import config from '../../../config';
import slackRead from "../../read-streams/slack";
import Slackbot from 'slackbots'; 
import User from "../../models/User";
import NewUser from "../../models/NewUser";
import slackWrite from "../../write-streams/slack";


// New user registration
const NewUserHandler = x => {
  NewUser.find({userId : "slack" +x.channel })
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
              user => console.log(user)
            )
            .catch(err => console.log(err));

        }

    })
      .catch(err =>console.log(err));
}

// User handler
const UserHandler = x => {
  User.find({userId : "slack" + x.channel })
    .then(user => {
        if(user)
           return ;
        else 
          newUserHandler(x);
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
         slackRead(data);

          //bot.postMessage(data.channel,"Message from server");
      }
    
    });

}

export default slackInit;