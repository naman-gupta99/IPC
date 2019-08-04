import config from '../../config';
import messageHandler from "../message-handler";
import User from '../models/User'

const slackRead = (data) => {
   
   const message = data.text;
   const userId = "slack" + data.channel;
   
    User.find({ "userId": userId }, { "connection": 1 })
                            .then(userConnection => {
                                const recieverUsername = userConnection[0].get('connection');
                                messageHandler(recieverUsername, message);
                            });

}

export default slackRead;