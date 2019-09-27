import request from "request";
import config from "../../../config";
import gitterRead from "../../read-streams/gitter";
import User from "../../models/User";
import NewUser from "../../models/NewUser";
import gitterWrite from "../../write-streams/gitter";

let roomIds = [];
let newUserIds = [];

const newUserHandler = x => {
  NewUser.findOne({ userId: "gitter" + x.id }).then(newUser => {
    if (newUser != null) {
      const message =
        "You have not registered on InterPlatFormChat. Head to the link to register : " +
        config.app.frontendURL +
        "/home/signup/gitter" +
        x.id +
        " \nPlease do not share the url with anybody else.";
      const params = {
        roomId: x.id
      };
      gitterWrite(message, params);
    } else {
      const newUser = new NewUser({
        userId: "gitter" + x.id,
        platform: "gitter",
        params: {
          roomId: x.id
        }
      });
      newUser
        .save()
        .then(user => {
          const message =
            "You have not registered on InterPlatFormChat. Head to the link to register : " +
            config.app.frontendURL +
            "/home/signup/gitter" +
            user.userId +
            " \nPlease do not share the url with anybody else.";
          const params = {
            roomId: x.id
          };
          gitterWrite(message, params);
        })
        .catch(err => console.log(err));
    }
  });
};

const newRoomHandler = x => {
  User.findOne({ userId: "gitter" + x.id })
    .then(user => {
      if (user != null) {
        if (newUserIds.includes(x.id)) {
          newUserIds.splice(newUserIds.indexOf(x.id), 1);
        }
        if (!roomIds.includes(x.id)) {
          roomIds.push(x.id);
          gitterRead(x.id);
        }
      } else if (!newUserIds.includes(x.id)) {
        newUserIds.push(x.id);
        newUserHandler(x);
      }
    })
    .catch(err => console.log(err));
};

const gitterInit = () => {
  console.log("Initializing gitter");

  const url =
    "https://api.gitter.im/v1/user/" + config.nodes.gitter.userId + "/rooms";
  const header = {
    "content-type": "application/x-www-form-urlencoded",
    Authorization: config.nodes.gitter.authorization
  };
  let firstResponse = true;

  const checkRoom = () => {
    request.get(
      {
        headers: header,
        url: url
      },
      (error, response, body) => {
        if (error) {
          console.log(
            "Gitter Room Check Failure, bootstrap/gitter.js : " + error
          );
          setTimeout(checkRoom, 10);
        } else {
          try {
            body = JSON.parse(body);
            if (firstResponse) {
              body.forEach(x => {
                newRoomHandler(x);
              });
              firstResponse = false;
            } else {
              body.forEach(x => {
                if (!roomIds.includes(x.id)) {
                  newRoomHandler(x);
                }
              });
            }
            setTimeout(checkRoom, 5);
          } catch (e) {
            setTimeout(checkRoom, 10);
          }
        }
      }
    );
  };
  checkRoom();
};

export default gitterInit;
