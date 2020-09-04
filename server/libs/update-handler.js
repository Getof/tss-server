const { mongo } = require("mongoose");

module.exports = {
    // driver: async function(io,driverId){
    //     await mysql.driver.updateInfoChangedStatus(driverId, true);
    //     if (drivers[driverId]) {
    //         let profile = await mysql.driver.getProfile(driverId);
    //         io.to(drivers[driverId]).emit('driverInfoChanged', profile);
    //         mysql.driver.updateInfoChangedStatus(driverId, false);
    //     }
    // },
    rider:async function(io,riderId){
        await mongo.updateInfoChangedStatus(riderId, true);
        if (riders[riderId]) {
            let profile = await mongo.getProfile(riderId);
            io.to(riders[riderId]).emit('riderInfoChanged', profile);
            mongo.updateInfoChangedStatus(riderId, false);
        }
    },
    // operatorStats:async function() {
    //     if (baseData.length === 0) {

    //     }
    //     /** @namespace baseData.unpaid_count */
    //     /** @namespace baseData.waiting_complaints */
    //     operatorsNamespace.emit("alertsCountChanged", baseData.waiting_complaints, baseData.unpaid_count);
    // },
    // init:async function(){
    //     this.operatorStats();
    //     serviceTree = await mysql.service.getServicesTree();
    // }
};