const mongoose = require('mongoose');
const Battery = require('../models/battery_model');

module.exports.get_all = (request, response) => {
    Battery.find({}, {
        batteryID: 1,
        lat: 1,
        log: 1,
        percentage: 1
    }).then(result => {
        response.status(200).json({
            message: "Battery List",
            isError: false,
            count: result.length,
            data: result
        });
    }).catch(err => {
        response.status(500).json({
            message: err.message,
            isError: true
        });
    });
}

module.exports.get_single = (request, response) => {
    Battery.findOne({ batteryID: request.params.battery_id }).exec().then(result => {
        response.status(201).json({
            message: "Single battery info",
            isError: false,
            data: result
        });
    }).catch(err => {
        response.status(500).json({
            message: err.message,
            isError: true
        });
    });
}

module.exports.add = (request, response) => {
    var message = "";
    if (request.body.batteryID === undefined || request.body.batteryID === "") {
        message = message + " batteryID"
    }
    if (request.body.lat === undefined || request.body.lat === "") {
        message = message + " lat"
    }
    if (request.body.log === undefined || request.body.log === "") {
        message = message + " log"
    }
    if (request.body.percentage === undefined || request.body.percentage <= 0) {
        message = message + " percentage"
    }
    if (message !== "") {
        response.status(400).json({
            message: "Fields" + message + " is required",
            isError: true,
        });
    } else {
        const battery = new Battery({
            _id: mongoose.Types.ObjectId(),
            batteryID: request.body.batteryID,
            lat: request.body.lat,
            log: request.body.log,
            percentage: request.body.percentage,
        });
        battery.save().then(result => {
            response.status(200).json({
                message: "Battery create successfull",
                isError: false,
                data: result
            });
        }).catch(err => {
            response.status(500).json({
                message: err.message,
                isError: true
            });
        });
    }
}

module.exports.update = (request, response) => {
    var message = "";    
    if (request.body.lat === "") {
        message = message + " lat"
    }
    if (request.body.log === "") {
        message = message + " log"
    }
    if (request.body.percentage <= 0) {
        message = message + " percentage"
    }
    if (message !== "") {
        response.status(400).json({
            message: "Fields" + message + " is required",
            isError: true,
        });
    } else {
        const data = {
            lat: request.body.lat,
            log: request.body.log,
            percentage: request.body.percentagee
        }

        Battery.updateOne({ batteryID: request.params.battery_id }, { $set: data }).exec().then(result => {
            response.status(200).json({
                message: "Battery update successful",
                isError: false
            });
        }).catch(err => {
            response.status(500).json({
                message: err.message,
                isError: true
            });
        });
    }
}

module.exports.delete = (request, response) => {
    Battery.deleteMany({ batteryID: request.params.battery_id }).exec().then(result => {
        response.status(200).json({
            message: "Battery delete successful",
            isError: false
        });
    }).catch(err => {
        response.status(500).json({
            message: err.message,
            isError: true
        });
    });
}
