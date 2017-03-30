const express = require('express');
const path = require('path');
const app = express();
require('../rest/core/restListener.js');

app.use(express.static('./build'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

app.listen(80);