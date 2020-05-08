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
    refresh_token: req.body.code
  });
});

// dummy code TO BE REMOVED
router.get("/", (req, res) => {
  res.redirect(200, req.query.redirect_uri + "?code=gassistant12345&state=" + req.query.state);
});

export default router;
