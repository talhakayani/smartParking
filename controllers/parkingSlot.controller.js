const { ParkingSlots, Vehicle } = require("../models");

exports.getAllParkingSlots = async (req, res, _next) => {
  try {
    const parkingSlots = await ParkingSlots.findAll({
      include: {
        model: Vehicle,
        as: "parkedCar",
      },
    });
    let message = "Parking slots found";
    if (!parkingSlots.length) message = "No parking slot added to database";
    return res.status(200).json({
      status: 200,
      message,
      parkingSlots,
    });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

exports.addParkingSlot = async (req, res, _next) => {
  try {
    const { cordinates, status } = req.body;
    if (!cordinates || !status) throw new Error("Please attach the body");
    const parkingSlot = await ParkingSlots.create(req.body);
    let message = "Parking Slot Created";
    if (!parkingSlot) message = "unable to create parking slot";
    return res.status(200).json({
      status: 200,
      message,
      parkingSlot,
    });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

exports.carParked = async (req, res, _next) => {
  try {
    const { id, status, vehicleId } = req.body;
    if (!id || !status || !vehicleId) throw new Error("Please attach the body");
    const carParked = await ParkingSlots.update(
      {
        vehicleId: vehicleId,
        status: status,
      },
      {
        where: {
          id: id,
        },
      }
    );
    let message = "Car Parked";
    if (!carParked) message = "unable to parked";
    return res.status(200).json({
      status: 200,
      message,
      carParked,
    });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

exports.unParked = async (req, res, _next) => {
  try {
    const { id, status, vehicleId } = req.body;
    if (!status || !id || !vehicleId) throw new Error("Please attach the body");
    const unParked = await ParkingSlots.update(
      {
        status: "available",
        vehicleId: null,
      },
      {
        where: {
          id: id,
        },
      }
    );
    let message = "Car Unparked";
    if (!unParked) message = "unable to unparked";
    return res.status(200).json({
      status: 200,
      message,
      unParked,
    });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

exports.getParkedVehicles = async (req, res, _next) => {
  try {
    const parkedCars = await ParkingSlots.findAll(
      {
        include: {
          model: Vehicle,
          as: "parkedCar",
        },
      },
      {
        where: {
          status: "busy",
        },
      }
    );
    let message = "Parked cars found!";
    if (!parkedCars.length) message = "parked are not available";
    return res.status(200).json({
      status: 200,
      message,
      parkedCars,
    });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

exports.getAvailableParkingSlots = async (req, res, _next) => {
  try {
    const availableParkingSlots = await ParkingSlots.findAll({
      where: {
        status: "available",
      },
    });
    let message = "found available parking slots";
    if (!availableParkingSlots.length)
      message = "no parking slots are available";
    return res.status(200).json({
      status: 200,
      message,
      availableParkingSlots,
    });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};
