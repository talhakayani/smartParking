const { Vehicle, User } = require('../models');

exports.getAllVehicle = async (req, res, _next) => {
  try {
    const vehicles = await Vehicle.findAll({
      //attributes: ['id', 'car_no', 'car_model', 'car_company'],
      include: {
        model: User,
        as: 'user',
        foreignKey: 'username',
      },
    });
    let message = 'Vehicle found!';
    if (!vehicles.length) message = 'No vehicle found!';
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
      throw new Error('Please attach the body');
    const addedVehicle = await Vehicle.create(req.body);
    if (!addedVehicle) throw new Error('Unable to create vehicle');
    return res.status(200).json({
      status: 200,
      message: 'Vehicle Added',
      addedVehicle,
    });
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};
