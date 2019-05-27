import express from 'express';
import ResponseTemplate from "../../global/templates/response";
import Users from '../../models/User';

const router = express.Router();

// @route  GET user/userId/:userId
// @desc   Get a user by userId
// @access Private
router.get('/userId/:id', (req, res) => {
    Users.find({ "userId": req.params.id })
        .then(user => res.status(200).json(ResponseTemplate.success('User Found', user)))
        .catch(err => res.status(404).json(ResponseTemplate.error(404, "User Not Found", err)));
});

// @route  GET user/username/:username
// @desc   Get a user by userId
// @access Private
router.get('/username/:username', (req, res) => {
    Users.find({ "username": req.params.username })
        .then(user => res.status(200).json(ResponseTemplate.success('User Found', user)))
        .catch(err => res.status(404).json(ResponseTemplate.error(404, "User Not Found", err)));
});

// @route  POST user
// @desc   Post a new user
// @access Private
router.post('/', (req, res) => {
    const id = req.body.platform + req.body.uniqueParam;
    const newUser = new Users({
        userId: id,
        platform: req.body.platform,
        username: req.body.username,
        params: req.body.params,
        connection: "NONE"
    });
    newUser.save()
        .then(user => res.status(200).json(ResponseTemplate.success('User Registered', user)))
        .catch(err => res.status(400).json(ResponseTemplate.error(400, "User could not be Registered", err)));
});

// @route  POST user/connect
// @desc   Post a new user connection
// @access Private
router.post('/connect', (req, res) => {
    Users.update({ "username": req.body.username1 }, { "connection": req.body.username2 })
        .then(() => {
            Users.update({ "username": req.body.username2 }, { "connection": req.body.username1 })
                .then(() => res.status(200).json(ResponseTemplate.success('Connection Established', { "username1": req.body.username1, "username2": req.body.username2 })))
                .catch(err => res.status(400).json(ResponseTemplate.error(400, "Connection could not be established", err)));
        })
        .catch(err => res.status(400).json(ResponseTemplate.error(400, "Connection could not be established", err)));
});

export default router;