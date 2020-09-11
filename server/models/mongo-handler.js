module.exports = {
    getProfilePhone: async (req) => {
        console.log(req);
        await Rider.findOne({mobile_number: req}, {_id: 0, status: 0, info_changed: 0})
        .then(data => {
            if (!data) {
                let rider = new Rider({
                    mobile_number: req
                });            
                
                rider.save()
                     .then(data => {
                        return data;
                      })
                     .catch(err => {
                         return data;
                      });
            }
            return data;
        });

        // let result = await Rider.findOne({mobile_number: phone}, {_id: 0, status: 0, info_changed: 0});
        // if (result == null){
        //     let rider = new Rider({
        //         mobile_number: phone
        //     });            
            
        //     rider.save()
        //          .then(data => {
        //             return data;
        //           })
        //          .catch(err => {
        //               res.json({status: 666, error: err});
        //           });
        // }
        //  else {
        //     return result;
        // } 
    },
    getProfile: async function (riderId){
        Rider.findOne({mobile_number: riderId}, {_id: 0})
        .then(data => {
            return data;
        })
        .catch(err => {
            return null;
        });  
    },
    getIsInfoChanged: async function (riderId) {
        Rider.findOne({mobile_number: riderId})
        .then(data => {
            //console.log(data.info_changed);
            return data;
        })
        .catch(err => {
            return null;
        });         
    },
    updateInfoChangedStatus: async function (riderId, status) {        
        return await Rider.findOneAndUpdate({mobile_number: riderId}, {info_changed: status});
        //sql.query("UPDATE rider SET info_changed = ? WHERE id = ?", [status, riderId]);
    }
}