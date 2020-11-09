require('./db/config/index');
const express = require('express'),
  app = express();
  openRoutes = require('./routes/open/index');

// Parse incoming JSON into objects
app.use(express.json());

app.use('/api/users', openRoutes);

module.exports = app;