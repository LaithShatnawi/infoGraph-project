'use strict';

const restaurant = require('../restaurant/restaurant-model');
const menu_items = require('../menu_items/menu_items-model');

const rest_menu_itemsModel = (sequelize, DataTypes) =>
  sequelize.define(
    'rest_menu_items',
    {
      menuItemId: {
        type: DataTypes.INTEGER,
        references: {
          model: menu_items,
          key: 'id',
        },
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        references: {
          model: restaurant,
          key: 'id',
        },
      },
      serving_time: { type: DataTypes.STRING },
    },
    { timestamps: true }
  );

module.exports = rest_menu_itemsModel;
