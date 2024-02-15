const express = require('express');
const menu_itemsRouter = express.Router();
const { menu_items } = require('../models/db');
const bearerAuth = require('../auth/middleware/bearer');

menu_itemsRouter.get('/restaurant/menu-items', bearerAuth, getMenuItems);
menu_itemsRouter.post('/restaurant/menu-items', bearerAuth, addMenuItems);

async function getMenuItems(req, res) {
  let record = await menu_items.get();
  res.status(200).json(record);
}

async function addMenuItems(req, res) {
  let data = req.body;
  let arr = [];
  data.map(async (item) => {
    record = await menu_items.create(item);
    arr.push(record);
  });
  res.status(201).json(arr);
}

module.exports = menu_itemsRouter;
