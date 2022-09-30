const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chalk = require('chalk');

const { default: mongoose } = require('mongoose');


const app = express();

//Middle ware
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://e759ksh:tkgl5012qq21@cluster0.bgjpc.mongodb.net/?retryWrites=true&w=majority ')

const markers = require('./routes/api/setMarker');
const userRoutes = require('./routes/api/user');

app.use('/api/space', markers);
app.use('/user', userRoutes);

const port = process.env.PORT || 5001;

app.listen(port, () =>
  console.log(chalk.white.bgMagentaBright.bold(`Server stated on port ${port}`)));