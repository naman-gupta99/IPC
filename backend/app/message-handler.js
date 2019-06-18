import writeStreamFunctions from './write-stream-func';
import User from './models/User';

const messageHandler = (recieverUsername, message) => {

    User.find({ "username": recieverUsername })
        .then(user => {
            const recieverPlatform = user[0].get('platform');
            const recieverParams = user[0].get('params');
            writeStreamFunctions[recieverPlatform](message, recieverParams);
        });

}

export default messageHandler;