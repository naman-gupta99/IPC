import express from "express";
import ResponseTemplate from "../../global/templates/response";
import User from "../../models/User";
import {
  getIO
} from "../../socket";

const router = express.Router();

// @route  GET user/userId/:userId
// @desc   Get a user by userId
// @access Private
router.get("/userId/:id", (req, res) => {
  User.findOne({
      userId: req.params.id
    })
    .then(user =>
      res.status(200).json(ResponseTemplate.success("User Found", user))
    )
    .catch(err =>
      res.status(404).json(ResponseTemplate.error(404, "User Not Found", err))
    );
});

// @route  GET user/username/:username
// @desc   Get a user by username
// @access Private
router.get("/username/:username", (req, res) => {
  User.findOne({
      username: req.params.username
    })
    .then(user =>
      res.status(200).json(ResponseTemplate.success("User Found", user))
    )
    .catch(err =>
      res.status(404).json(ResponseTemplate.error(404, "User Not Found", err))
    );
});

// @route  GET user/usernames
// @desc   Get all usernames
// @access Private
router.get("/usernames", (req, res) => {
  User.find({}, {
      _id: 0,
      username: 1
    })
    .then(usernames =>
      res
      .status(200)
      .json(ResponseTemplate.success("Usernames found", usernames))
    )
    .catch(err =>
      res
      .status(404)
      .json(ResponseTemplate.error(404, "Usernames couldn't be found", err))
    );
});

// @route  POST user
// @desc   Post a new user
// @access Private
router.post("/", (req, res) => {
  const newUser = new User({
    userId: req.body.userId,
    platform: req.body.platform,
    username: req.body.username,
    params: req.body.params,
    connection: "NONE",
    inRequests: [],
    outRequests: [],
    profilePicture: req.body.profilePicture
  });
  newUser
    .save()
    .then(user =>
      res.status(200).json(ResponseTemplate.success("User Registered", user))
    )
    .catch(err =>
      res
      .status(400)
      .json(ResponseTemplate.error(400, "User could not be Registered", err))
    );
});

// @route  POST user/request
// @desc   Post a new user connection request
// @access Private
router.post("/request", (req, res) => {
  User.updateOne({
      username: req.body.outUsername
    }, {
      $addToSet: {
        outRequests: req.body.inUsername
      }
    })
    .then(() => {
      User.updateOne({
          username: req.body.inUsername
        }, {
          $addToSet: {
            inRequests: req.body.outUsername
          }
        })
        .then(() => {
          res.status(200).json(
            ResponseTemplate.success("Request sent", {
              outUsername: req.body.outUsername,
              inUsername: req.body.inUsername
            })
          );
          getIO().to(req.body.inUsername).emit("requested", req.body.outUsername);
        })
        .catch(err => {
          console.log(err);
          res
            .status(400)
            .json(
              ResponseTemplate.error(400, "Request could not be sent", err)
            );
        });
    })
    .catch(err =>
      res
      .status(400)
      .json(ResponseTemplate.error(400, "Request could not be sent", err))
    );
});

// @route  POST user/connect
// @desc   Post a new user connection
// @access Private
router.post("/connect", (req, res) => {
  const outUsername = req.body.outUsername;
  const inUsername = req.body.inUsername;

  User.findOne({
        username: outUsername
      },
      (err, user) => {
        if (err) throw err;
        user.connection = inUsername;
        user.outRequests.forEach(username => {
          User.updateOne({
            username: username
          }, {
            $pull: {
              inRequests: outUsername
            }
          }).then();
        });
        user.outRequests = [];
        User.updateOne({
            username: outUsername
          },
          user
        ).then();
      }
    )
    .then(() => {
      User.findOne({
            username: inUsername
          },
          (err, user) => {
            if (err) throw err;
            user.connection = outUsername;
            user.outRequests.forEach(username => {
              User.updateOne({
                username: username
              }, {
                $pull: {
                  inRequests: inUsername
                }
              }).then();
            });
            user.outRequests = [];
            User.updateOne({
                username: inUsername
              },
              user
            ).then();
          }
        )
        .then(() => {
          res.status(200).json(
            ResponseTemplate.success("Connection Established", {
              outUsername: outUsername,
              inUsername: inUsername
            })
          );
          getIO()
            .to(outUsername)
            .emit("connected", inUsername);
        })
        .catch(err =>
          res
          .status(400)
          .json(
            ResponseTemplate.error(
              400,
              "Connection could not be established",
              err
            )
          )
        );
    })
    .catch(err =>
      res
      .status(400)
      .json(
        ResponseTemplate.error(
          400,
          "Connection could not be established",
          err
        )
      )
    );
});

// @route  POST user/disconnect
// @desc   Post a new user disconnection
// @access Private
router.post("/disconnect", (req, res) => {
  User.updateOne({
      username: req.body.username1
    }, {
      connection: "NONE"
    })
    .then(() => {
      User.updateOne({
          username: req.body.username2
        }, {
          connection: "NONE"
        })
        .then(() => {
          res.status(200).json(
            ResponseTemplate.success("Disconnected", {
              username1: req.body.username1,
              username2: req.body.username2
            })
          );
          getIO()
            .to(req.body.username2)
            .emit("disconnected", req.body.username1);
        })
        .catch(err => {
          console.log(err);
          res
            .status(400)
            .json(ResponseTemplate.error(400, "Disconnection Failed", err));
        });
    })
    .catch(err =>
      res
      .status(400)
      .json(ResponseTemplate.error(400, "Disconnection Failed", err))
    );
});

export default router;
