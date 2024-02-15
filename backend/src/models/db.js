'use strict';

const dbConfig = require('../../db.config');
const { Sequelize, DataTypes } = require('sequelize');
const usersModel = require('../auth/model/user');
const Collection = require('./collection');
const reastModel = require('./restaurant/restaurant-model');
const maintenanceModel = require('./maintenance/maintenance-model');
const menu_itemsModel = require('./menu_items/menu_items-model');
const rest_menu_itemsModel = require('./rest_menu_items/rest_menu_items-model');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operationsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const users = usersModel(sequelize, DataTypes);
const restaurants = reastModel(sequelize, DataTypes);
const maintenance = maintenanceModel(sequelize, DataTypes);
const menu_items = menu_itemsModel(sequelize, DataTypes);
const rest_menu_items = rest_menu_itemsModel(sequelize, DataTypes);

const restCollection = new Collection(restaurants);
const maintenanceCollection = new Collection(maintenance);
const menu_itemsCollection = new Collection(menu_items);
const rest_menu_itemsCollection = new Collection(rest_menu_items);

//----------------------Relations-----------------------------

users.hasMany(restaurants, {
  foreignKey: 'user_id',
  sourceKey: 'id',
});
restaurants.belongsTo(users, {
  foreignKey: 'user_id',
  targetKey: 'id',
});

restaurants.hasMany(maintenance, {
  foreignKey: 'restaurant_id',
  sourceKey: 'id',
});
maintenance.belongsTo(restaurants, {
  foreignKey: 'restaurant_id',
  targetKey: 'id',
});

restaurants.belongsToMany(menu_items, { through: rest_menu_items });
menu_items.belongsToMany(restaurants, { through: rest_menu_items });

module.exports = {
  db,
  users,
  restaurant: restCollection,
  maintenance: maintenanceCollection,
  menu_items: menu_itemsCollection,
  rest_menu_itemsCollection: rest_menu_itemsCollection,
  rest_menu_items,
};
