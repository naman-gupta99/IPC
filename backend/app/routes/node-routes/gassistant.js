import express from "express";
import app from "../../assistant-read-streams/gassistant";

const router = express.Router();

// @route  POST gassistant
// @desc   Post a Intent Handler
// @access Private
router.post("/handler", app);

// @route  GET gassistant/access
// @desc   Get an access token
// @access Private
router.post("/access", (req, res) => {
  res.send({
    access_token: req.body.code,
    refresh_token: res.body.code
  });
});

export default router;
