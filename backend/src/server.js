'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRouter = require('./auth/routes/auth-routes');
const restaurantRouter = require('./routes/restaurant-routes');
const maintenanceRouter = require('./routes/maintenance-routes');
const menu_itemsRouter = require('./routes/menu_items-route');
const restMenuItemsRouter = require('./routes/rest_menu_items-route');

app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(restaurantRouter);
app.use(maintenanceRouter);
app.use(menu_itemsRouter);
app.use(restMenuItemsRouter);

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

module.exports = {
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
