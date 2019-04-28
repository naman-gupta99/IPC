import request from "request";
import querystring from "querystring";
import config from '../../config';

const gitterWrite = (message, params) => {
    request.post({
        "headers": { "content-type": "application/x-www-form-urlencoded", "Authorization": config.gitter.authorization },
        "url": "https://api.gitter.im/v1/rooms/" + params.roomId + "/chatMessages",
        "body": querystring.stringify({
            text: message
        })
    }, (error, response, body) => {
        if (error) {
            console.log(error);
            return error;
        }
        return body;
    })
}

export default gitterWrite;