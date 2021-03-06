
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
    await Rider.findOne({mobile_number: req.body.user_name}, {_id: 0, status: 0, info_changed: 0})
        .then(data => {
            if (!data) {
                let rider = new Rider({
                    mobile_number: req.body.user_name
                });            
                
             rider.save()
                     .then(data => {
                         console.log(data);
                        let keys = {
                            id: req.body.user_name,
                            prefix: riderPrefix
                            };
                        let token = jwt.sign(keys, process.env.JWT_SECRET, {});
                        res.json({status: 200, token: token, user: data});
                        return;
                      })
                     .catch(err => {
                        res.json({status: 666, error: err});
                        return;
                      });
            }
            console.log(data);
            let keys = {
                id: req.body.user_name,
                prefix: riderPrefix
            };
            let token = jwt.sign(keys, process.env.JWT_SECRET, {});
            res.json({status: 200, token: token, user: data});
            return;
        });       
    });


router.post('/address', async (req, res) => {
    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
var token = "289cb36ec9fe6a88e2dc1d46cee06d9cca18b4f1";
var query = { lat: req.body.lat, lon: req.body.lon };

console.log('Response:'+req.body.lat);

var options = {
    method: "POST",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + token
    },
    body: JSON.stringify(query)
}
res.json({status: req.body.lat});

// fetch(url, options)
// .then(response => response.text())
// .then(result => console.log(result))
// .catch(error => console.log("error", error));

    });


module.exports = router;