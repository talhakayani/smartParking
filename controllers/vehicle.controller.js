const { Vehicle, User } = require("../models");

exports.getAllVehicle = async (req, res, _next) => {
  try {
    const vehicles = await Vehicle.findAll({
      //attributes: ['id', 'car_no', 'car_model', 'car_company'],
      include: {
        model: User,
        as: "user",
        foreignKey: "username",
      },
    });
    let message = "Vehicle found!";
    if (!vehicles.length) message = "No vehicle found!";
    return res.status(200).json({
      status: 200,
      message,
      vehicles,
    });
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

exports.addVehicle = async (req, res, _next) => {
  try {
    const { car_no, car_model, car_company, userId } = req.body;
    if (!car_no || !car_model || !car_company || !userId)
      throw new Error("Please attach the body");
    const addedVehicle = await Vehicle.create(req.body);
    if (!addedVehicle) throw new Error("Unable to create vehicle");
    return res.status(200).json({
      status: 200,
      message: "Vehicle Added",
      addedVehicle,
    });
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

exports.getVehicleByUserId = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const vehicles = await Vehicle.findAll(
      {
        where: {
          userId: id,
        },
      },
      {
        include: {
          model: User,
          as: "user",
          foreignKey: "username",
        },
      }
    );
    if (!vehicles.length) {
      return res.status(300).json({
        status: 300,
        message: "No vehicle found for this user",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Vehicles found",
      vehicles,
    });
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

exports.getLatestVechileById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const vehicles = await Vehicle.findAll(
      {
        where: {
          userId: id,
        },
      },
      {
        include: {
          model: User,
          as: "user",
          foreignKey: "username",
        },
      }
    );
    if (!vehicles.length) {
      return res.status(300).json({
        status: 300,
        message: "No vehicle found for this user",
      });
    }
    console.log(vehicles);
    return res.status(200).json({
      status: 200,
      message: "Vehicles found",
      latest_vehile: vehicles[vehicles.length - 1],
    });
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};
