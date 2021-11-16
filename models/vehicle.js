'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vehicle.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
      });
      Vehicle.hasOne(models.ParkingSlots, {
        as: 'parkingSlot',
        foreignKey: 'vehicleId',
      });
    }
  }
  Vehicle.init(
    {
      car_no: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      car_model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      car_company: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'vehicles',
      modelName: 'Vehicle',
    }
  );
  return Vehicle;
};
