import request from 'request';
import config from '../../../config'
import gitterRead from "../../read-streams/gitter";

const gitterInit = () => {

    console.log("Initializing gitter")

    const url = "https://api.gitter.im/v1/user/" + config.nodes.gitter.userId + "/rooms";
    const header = { "content-type": "application/x-www-form-urlencoded", "Authorization": config.nodes.gitter.authorization }
    let firstResponse = true;
    let roomIds = [];

    const checkRoom = () => {
        request
            .get({
                "headers": header,
                "url": url
            }, (error, response, body) => {
                if (error) {
                    console.log("Gitter Room Check Failure, bootstrap/gitter.js : " + error);
                    setTimeout(checkRoom, 10);
                }
                else {
                    try {
                        JSON.parse(body);
                    } catch (e) {
                        setTimeout(checkRoom, 10);
                    }
                    body = JSON.parse(body);
                    if (firstResponse) {
                        for (let x of body) {
                            roomIds.push(x.id);
                            gitterRead(x.id);
                        }
                        firstResponse = false;
                    } else {
                        for (let x of body) {
                            if (!roomIds.includes(x.id)) {
                                roomIds.push(x.id);
                                gitterRead(x.id);
                            }
                        }
                    }
                    setTimeout(checkRoom, 5);
                }
            });
    }
    checkRoom();
}

export default gitterInit;