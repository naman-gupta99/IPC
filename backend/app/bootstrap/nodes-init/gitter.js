import request from "request";
import config from "../../../config";
import gitterRead from "../../read-streams/gitter";
import User from "../../models/User";
import NewUser from "../../models/NewUser";
import gitterWrite from "../../write-streams/gitter";

let roomIds = [];
let newUserIds = [];

const newUserHandler = x => {
  NewUser.find({ userId: "gitter" + x.id }).then(newUser => {
    if (newUser.length > 0) {
      const message =
        "You have not registered on InterPlatFormChat. Head to the link to register : " +
        config.app.frontendURL +
        "/signup/gitter" +
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
        .then(
          user => console.log(user) // and send user link
        )
        .catch(err => console.log(err));
    }
  });
};

const newRoomHandler = x => {
  User.find({ userId: "gitter" + x.id })
    .then(user => {
      if (user.length > 0) {
        if (newUserIds.includes(x.id)) {
          newUserIds.splice(newUserIds.indexOf(x.id), 1);
        }
        roomIds.push(x.id);
        gitterRead(x.id);
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
            JSON.parse(body);
          } catch (e) {
            setTimeout(checkRoom, 10);
          }
          body = JSON.parse(body);
          if (firstResponse) {
            for (let x of body) {
              newRoomHandler(x);
            }
            firstResponse = false;
          } else {
            for (let x of body) {
              if (!roomIds.includes(x.id)) {
                newRoomHandler(x);
              }
            }
          }
          setTimeout(checkRoom, 5);
        }
      }
    );
  };
  checkRoom();
};

export default gitterInit;
