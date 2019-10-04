import config from '../../config';
import messageHandler from "../message-handler";
import User from '../models/User'

const slackRead = (data) => {
   
   const message = data.text;
   const userId = "slack" + data.channel;
   
    User.findOne({ "userId": userId }, { "connection": 1 })
                            .then(user => {
                            	if(user) {
                            		const recieverUsername = userConnection[0].connection;
                                   messageHandler(recieverUsername, message);
                               }
                            }).catch(err => console.log(err));

}

export default slackRead;