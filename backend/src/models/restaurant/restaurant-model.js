'use strict';

const restaurantModel = (sequelize, DataTypes) =>
  sequelize.define(
    'restaurant',
    {
      name: { type: DataTypes.STRING },
      phone_num: { type: DataTypes.STRING },
      street: { type: DataTypes.TEXT },
      open_hours: { type: DataTypes.STRING },
      nearby_landmarks: {
        type: DataTypes.STRING,
        get() {
          return this.getDataValue('nearby_landmarks').split(',');
        },
        set(val) {
          this.setDataValue('nearby_landmarks', val.join(','));
        },
      },
      long: { type: DataTypes.FLOAT },
      lat: { type: DataTypes.FLOAT },
      user_id: { type: DataTypes.INTEGER },
    },
    { timestamps: true }
  );

module.exports = restaurantModel;
