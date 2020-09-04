module.exports = {
    getIsInfoChanged: async function (riderId) {
        let [result,ignored] = await sql.query("SELECT info_changed FROM rider WHERE id = ?", [riderId]);
        return (!!(result[0].info_changed));
    }




}