const express = require('express');
const router = express.Router();

const batteryController = require('../controller/battery_controller');

router.get('/battery', batteryController.get_all);

router.get('/battery/:battery_id', batteryController.get_single);

router.post('/battery', batteryController.add);

router.put('/battery/:battery_id', batteryController.update);

router.delete('/battery/:battery_id', batteryController.delete);

module.exports = router;
