const router = require("express").Router();
const controller = require("../controllers/vehicle.controller");

router.get("/", controller.getAllVehicle);
router.post("/", controller.addVehicle);
router.get("/:id", controller.getVehicleByUserId);
router.get("/latest/:id", controller.getLatestVechileById);
module.exports = router;
