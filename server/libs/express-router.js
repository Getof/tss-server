const mongo = require('../models/mongo');
// const uploader = require('../models/uploader');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = new express.Router();
router.get('/', (req, res) => {
    res.status(200).send("Server App is running OK!").end();
});

outer.post('/rider_login', async function (req, res) {
    // if (process.env.RIDER_MIN_VERSION && req.body.version && parseInt(req.body.version) < process.env.RIDER_MIN_VERSION) {
    //     res.json({status: 410, error: "Upgrade to new version"});
    //     return;
    // }
    let profile = await mysql.rider.getProfile(parseInt(req.body.user_name));
    switch (profile.status) {
        case('blocked'):
            res.json({status: 666, error: "Your access has been denied. Please contact app provider."});
            return;
    }
    let keys = {
        id: profile.id,
        prefix: riderPrefix
    };
    let token = jwt.sign(keys, process.env.JWT_SECRET, {});
    res.json({status: 200, token: token, user: profile});
});


module.exports = router;