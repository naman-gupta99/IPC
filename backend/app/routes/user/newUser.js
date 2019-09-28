import express from "express";
import ResponseTemplate from "../../global/templates/response";
import NewUser from "../../models/NewUser";

const router = express.Router();

// @route  GET newUser/:userId
// @desc   Get a newUser by userId
// @access Private
router.get("/:id", (req, res) => {
  NewUser.findOne({
    userId: req.params.id
  })
    .then(newUser =>
      res.status(200).json(ResponseTemplate.success("New User Found", newUser))
    )
    .catch(err =>
      res
      .status(404)
      .json(ResponseTemplate.error(404, "New User Not Found", err))
    );
});

// @route  POST newUser
// @desc   Post a new newUser
// @access Private
router.post("/", (req, res) => {
  const id = req.body.platform + req.body.uniqueParam;
  const newUser = new NewUser({
    userId: id,
    platform: req.body.platform,
    params: req.body.params
  });
  newUser
    .save()
    .then(user =>
      res.status(200).json(ResponseTemplate.success("New User Recorded", user))
    )
    .catch(err =>
      res
      .status(400)
      .json(
        ResponseTemplate.error(400, "New User could not be Recorded", err)
      )
    );
});

// @route  DELETE newUser/:userId
// @desc   Delete a newUser by userId
// @access Private
router.delete("/:id", (req, res) => {
  NewUser.deleteOne({
      userId: req.params.id
    })
    .then(user =>
      res.status(200).json(ResponseTemplate.success("New User Deleted", user))
    )
    .catch(err =>
      res
      .status(400)
      .json(ResponseTemplate.error(400, "New User could not be Deleted", err))
    );
});

export default router;
