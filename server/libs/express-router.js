
// const uploader = require('../models/uploader');
global.Rider = require('../models/rider');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = new express.Router();
global.mongo = require('../models/mongo-handler');
router.get('/', (req, res) => {
    res.status(200).send("Server App is running OK!").end();
});

router.post('/rider_login', async (req, res) => {
    // if (process.env.RIDER_MIN_VERSION && req.body.version && parseInt(req.body.version) < process.env.RIDER_MIN_VERSION) {
    //     res.json({status: 410, error: "Upgrade to new version"});
    //     return;
    // }
    // let profile = await mongo.rider.getProfile(parseInt(req.body.user_name));
    // switch (profile.status) {
    //     case('blocked'):
    //         res.json({status: 666, error: "Your access has been denied. Please contact app provider."});
    //         return;
    // }
    // let keys = {
    //     id: profile.id,
    //     prefix: riderPrefix
    // };
    // let token = jwt.sign(keys, process.env.JWT_SECRET, {});
    // res.json({status: 200, token: token, user: profile});
    let profile = await mongo.getProfilePhone(req.body.user_name);
        let keys = {
            id: profile._id,
            prefix: riderPrefix
        };
        let token = jwt.sign(keys, process.env.JWT_SECRET, {});
        res.json({status: 200, token: token, user: profile});
    });


module.exports = router;