const router = require('express').Router();
const userRoute = require('./user.routes');
const vehicleRoute = require('./vehicle.routes');
const parkingSlots = require('./parkingSlots.routes');

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});
router.use('/user', userRoute);
router.use('/vehicle', vehicleRoute);
router.use('/parkingSlots', parkingSlots);
module.exports = router;
