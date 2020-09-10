module.exports = {
    getProfilePhone: async function (phone) {
        let result = await Rider.findOne({mobile_number: phone}, {_id: 0, status: 0, info_changed: 0});
        if (!result){
            let rider = new Rider({
                mobile_number: phone
            });            
            
            rider.save()
                 .then(data => {
                    return data;
                  })
                 .catch(err => {
                      res.json({status: 666, error: err});
                  });
        }
         else {
            return result;
        } 
    },
    getProfile: async function (riderId){
        return await Rider.findOne({mobile_number: riderId}, {_id: 0});

    },
    getIsInfoChanged: async function (riderId) {
        let result = await Rider.findOne({mobile_number: riderId});      
        return (!!(result.info_changed));
    },
    updateInfoChangedStatus: async function (riderId, status) {        
        return await Rider.findOneAndUpdate({mobile_number: riderId}, {info_changed: status});
        //sql.query("UPDATE rider SET info_changed = ? WHERE id = ?", [status, riderId]);
    }
}