import request from 'request';
import config from '../../config';
import messageHandler from "../message-handler";

const gitterRead = (roomId) => {
    request
        .get({
            "headers": { "Accept": "application/json", "Authorization": config.gitter.authorization },
            "url": "https://stream.gitter.im/v1/rooms/" + roomId + "/chatMessages"
        })
        .on("response", (response) => {
            response.on("data", (chunk) => {
                let msg = chunk.toString();
                if (msg !== " \n") {
                    const data = JSON.parse(msg);
                    const message = data.text;
                    console.log(message);
                    messageHandler('gitter', message, { "roomId": roomId });
                }
            })
        });
}

export default gitterRead;