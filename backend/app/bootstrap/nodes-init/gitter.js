import request from 'request';
import config from '../../../config'

const gitterInit = () => {

    console.log("Initializing gitter")

    const url = "https://api.gitter.im/v1/user/" + config.gitter.userId + "/rooms";
    const header = { "content-type": "application/x-www-form-urlencoded", "Authorization": config.gitter.authorization }
    let firstResponse = true;

    const checkRoom = () => {
        request
            .get({
                "headers": header,
                "url": url
            }, (error, response, body) => {
                if (error) {
                    console.log(error);
                    setTimeout(checkRoom, 5);
                }
                else {
                    console.log(body);
                    if (firstResponse) {
                        // Function to initiate all read streams without sending message to register
                    } else {
                        // Function to post a message to register and to initiate read stream
                    }
                    setTimeout(checkRoom, 1);
                }
            });
    }
    checkRoom();
}

export default gitterInit;