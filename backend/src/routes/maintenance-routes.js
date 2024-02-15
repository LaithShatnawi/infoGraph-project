const express = require('express');
const maintenanceRouter = express.Router();
const { restaurant } = require('../models/db');
const { maintenance } = require('../models/db');
const bearerAuth = require('../auth/middleware/bearer');

maintenanceRouter.get(
  '/restaurant/maintenance/:id',
  bearerAuth,
  getMaintenanceHistory
);
maintenanceRouter.post(
  '/restaurant/maintenance',
  bearerAuth,
  addMaintenanceHistory
);

async function getMaintenanceHistory(req, res) {
  let id = parseInt(req.params.id);
  let record = await restaurant.readHasMany(id, maintenance.model);
  res.status(200).json(record.maintenance_histories);
}

async function addMaintenanceHistory(req, res) {
  let data = req.body;
  let record = await maintenance.create(data);
  res.status(201).json(record);
}

module.exports = maintenanceRouter;
