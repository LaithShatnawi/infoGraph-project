'use strict';

const menu_itemsModel = (sequelize, DataTypes) =>
  sequelize.define(
    'menu_items',
    {
      name: { type: DataTypes.STRING },
    },
    { timestamps: true }
  );

module.exports = menu_itemsModel;
