'use strict';

require('dotenv').config();
const server = require('./src/server.js');
const { db } = require('./src/models/db');

db.sequelize.sync().then(() => {
  server.start(process.env.PORT || 3005);
});
