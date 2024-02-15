const express = require('express');
const restaurantRouter = express.Router();
const { restaurant } = require('../models/db');
const bearerAuth = require('../auth/middleware/bearer');

restaurantRouter.get('/restaurants', bearerAuth, getRestaurant);
restaurantRouter.post('/restaurant', bearerAuth, addRestaurant);

async function getRestaurant(req, res) {
  let record = await restaurant.get();
  res.status(200).json(record);
}

async function addRestaurant(req, res) {
  let data = req.body;
  let record = await restaurant.create(data);
  res.status(201).json(record);
}

module.exports = restaurantRouter;
