'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('../../models/db.js');
const basicAuth = require('../middleware/basic.js');

authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    res.status(201).json(userRecord.token);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  try {
    res.status(200).json(req.user.token);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = authRouter;
