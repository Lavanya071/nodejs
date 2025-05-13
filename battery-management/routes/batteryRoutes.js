const express = require('express');
const router = express.Router();
const batteryController = require('../controllers/batteryController');

// POST /api/battery/data — Insert battery data
router.post('/data', batteryController.insertBatteryData);

// GET /api/battery/:id — Get all data for a specific battery
router.get('/:id', batteryController.getBatteryData);

// GET /api/battery/:id/:field — Get specific field data for a battery
router.get('/:id/:field', batteryController.getBatteryFieldData);

// GET /api/battery/:id/:field?start=:start&end=:end — Get specific field data within a time range
router.get('/:id/:field', batteryController.getBatteryFieldDataWithRange);

// Export routes
module.exports = router;
