const router = require('express').Router();
const controller = require('../controllers/parkingSlot.controller');

router.get('/', controller.getAllParkingSlots);
router.post('/', controller.addParkingSlot);
router.put('/parked', controller.carParked);
router.put('/unParked', controller.unParked);
router.get('/getParkedVehicles', controller.getParkedVehicles);
router.get('/getAvailableParkingSlots', controller.getAvailableParkingSlots);

module.exports = router;
