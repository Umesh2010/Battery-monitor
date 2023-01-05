const cron = require("node-cron");
const Battery = require('../models/battery_model');

cron.schedule("*/10 * * * *", function () {
    updateBatteryPersantage();
});

async function updateBatteryPersantage() {
    var iscollectionEmpty = await Battery.find().count();
    if (iscollectionEmpty > 0) {
        Battery.updateMany({ $inc: { 'percentage': -10 } }).exec().then(result => {
            Battery.find({ percentage: { $lte: 30 } }, { batteryID: 1, lat: 1, log: 1 }).exec().then(result => {
                if (result.length > 0) {
                    console.log(result);
                }
            });
        }).catch(err => {
            console.log(err);
        });
    } else {
        console.log("Recored not Found");
    }
}