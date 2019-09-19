import express from "express";
import adapter from "../../node-helpers/alexa";

const router = express.Router();

// @route  POST alexa
// @desc   Post a Intent Handler
// @access Private
router.post("/", adapter.getRequestHandlers());

export default router;
