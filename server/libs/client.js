// const redis = require('../models/redis');
// const geo = require('../models/geo');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const socketioJwt = require('socketio-jwt');
 const update = require("../libs/update-handler");

module.exports = function (io) {

    io.use(socketioJwt.authorize({
        secret: process.env.JWT_SECRET,
        handshake: true
    }));

    io.sockets.on('connection', function (socket) {
        socket.decoded_token.prefix === driverPrefix ? drivers[socket.decoded_token.id] = 
                            socket.id : riders[socket.decoded_token.id] = socket.id;
        // if (socket.decoded_token.prefix === driverPrefix) {
        //     //TODO:Well we need to know the size!
        //     //operatorsNamespace.emit("ChangeDriversOnline", drivers.size);
        //     mysql.driver.getIsInfoChanged(socket.decoded_token.id).then(function (isChanged) {
        //         if (isChanged)
        //             update.rider(io, socket.decoded_token.id);
        //     });
        // }
        if (socket.decoded_token.prefix === riderPrefix)
        console.log('ID rider'+socket.decoded_token.id);
        Rider.findOne({mobile_number: socket.decoded_token.id}).exec()
        .then(data => {
            let isChanged = !!(data.info_changed);            
            if (isChanged) (
                Rider.findOneAndUpdate({mobile_number: socket.decoded_token.id}, {info_changed: true}).exec()
                .then(() => {
                    if (riders[socket.decoded_token.id]){
                        Rider.findOne({mobile_number: socket.decoded_token.id}).exec()
                        .then(profile => {
                            io.to(riders[socket.decoded_token.id]).emit('riderInfoChanged', profile);
                            Rider.findOneAndUpdate({mobile_number: socket.decoded_token.id}, {info_changed: false}).exec()
                            return;
                        })
                        return;
                    }
                })
            );
            return;
        });       
           
        // socket.on('disconnect', function () {
        //     if (socket.decoded_token.prefix === driverPrefix) {
        //         redis.deleteLocation(socket.decoded_token.id);
        //         delete drivers[socket.decoded_token.id];
        //         mysql.driver.setState(socket.decoded_token.id, DRIVER_STATE_OFFLINE);
        //         operatorsNamespace.emit("ChangeDriversOnline", drivers.size);
        //     } else {
        //         delete riders[socket.decoded_token.id];
        //     }
        // });


    });








    return io;
}