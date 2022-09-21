const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chalk = require('chalk');

const app = express();

//Middle ware
app.use(bodyParser.json());
app.use(cors());

const markers = require('./routes/api/setMarker');

app.use('/api/space', markers);

const port = process.env.PORT || 5001;

app.listen(port, () =>
  console.log(chalk.white.bgMagentaBright.bold(`Server stated on port ${port}`)));