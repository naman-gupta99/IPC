const request = require('request');
const config = require('../../config');

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
                    data = JSON.parse(msg);
                    const message = data.text;
                    request.post({
                        "headers": { "content-type": "application/x-www-form-urlencoded", "Authorization": "Bearer 6b1067646a491596930bb3f127a7f592a55736ac" },
                        "url": "https://api.gitter.im/v1/rooms/5c9de354d73408ce4fbc325f/chatMessages",
                        "body": querystring.stringify({
                            text: message
                        })
                    }, (error, response, body) => {
                        if (error) {
                            console.log(error);
                        }
                    })
                }
            })
        });
}