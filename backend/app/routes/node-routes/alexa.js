import express from "express";
import adapter from "../../assistant-read-streams/alexa";

const router = express.Router();

// @route  POST alexa
// @desc   Post a Intent Handler
// @access Private
router.post("/handler", adapter.getRequestHandlers());

// @route  GET alexa/access
// @desc   Get an access token
// @access Private
router.post("/access", (req, res) => {
  res.send({
    access_token: req.body.code
  });
});

export default router;
