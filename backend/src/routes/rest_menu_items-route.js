const express = require('express');
const restMenuItemsRouter = express.Router();
const { rest_menu_items, rest_menu_itemsCollection } = require('../models/db');
const bearerAuth = require('../auth/middleware/bearer');

restMenuItemsRouter.get(
  '/restaurant-menu-items/:id',
  bearerAuth,
  getRestMenuItems
);
restMenuItemsRouter.post(
  '/restaurant-menu-items',
  bearerAuth,
  addRestMenuItems
);

async function getRestMenuItems(req, res) {
  let id = parseInt(req.params.id);
  let record = await rest_menu_items.findAll({ where: { restaurantId: id } });
  res.status(200).json(record);
}

async function addRestMenuItems(req, res) {
  let itemsArray = req.body;
  let order = itemsArray.map(async (item) => {
    let record = await rest_menu_itemsCollection.create(item);
    return record;
  });
  res.status(201).json('created');
}

module.exports = restMenuItemsRouter;
