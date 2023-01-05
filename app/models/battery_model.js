const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    batteryID: { type: String, require: true },
    lat: { type: String, require: true },
    log: { type: String, require: true },
    percentage: { type: Number, require: true },
}, { timestamps: true });

module.exports = mongoose.model('battery', schema);