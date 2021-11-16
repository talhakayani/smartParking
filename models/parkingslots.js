'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParkingSlots extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ParkingSlots.hasOne(models.Vehicle, {
        as: 'parkedCar',
        foreignKey: 'id',
      });
    }
  }
  ParkingSlots.init(
    {
      cordinates: {
        type: DataTypes.NUMBER,
        unique: true,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'parkingSlots',
      modelName: 'ParkingSlots',
    }
  );
  return ParkingSlots;
};
