var config = require('../../../config')

gitterInit = () => {
    checkRoom = () => {
        //Update helper/httpFunc.js and remove this request.get with that function
        request.get({
            "headers": { "content-type": "application/x-www-form-urlencoded", "Authorization": config.gitter.authorization },
            "url": "https://api.gitter.im/v1/user/" + config.gitter.userId + "/rooms"
        }, (error, response, body) => {
            if (error) {
                console.log(error);
                setTimeout(checkRoom, 5);
            }
            else {
                console.log(body);
                //Create function to create stream for messsages in any new room 
                setTimeout(checkRoom, 1);
            }
        })
    }

    checkRoom()
}

export default gitterInit;