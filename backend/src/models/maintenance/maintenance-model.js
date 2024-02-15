'use strict';

const maintenanceModel = (sequelize, DataTypes) =>
  sequelize.define(
    'maintenance_histories',
    {
      date: { type: DataTypes.STRING },
      //   I made it type ENUM in this spesific case of only having to choose between these 3 choices but otherwise if we need it to be
      //   flexable I would use Type String/Text
      impact: {
        type: DataTypes.ENUM(
          'Complete shutdown',
          'Partial shutdown',
          'Normal operations'
        ),
      },
      price: { type: DataTypes.INTEGER },
      comments: { type: DataTypes.TEXT },
      restaurant_id: { type: DataTypes.INTEGER },
    },
    { timestamps: true }
  );

module.exports = maintenanceModel;
