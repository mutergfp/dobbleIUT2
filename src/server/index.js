const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const Match = require('./services/game/match');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle an bad connections
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connect(process.env.DATABASE);
mongoose.connection.on('error', err => {
  console.error(`!!!!!!!ERROR!!!!!!! -> ${err.message}`);
});

// Invoke Models
require('./services/user/userModel');

// Invoke PubSub to dispatch events around the app
global.events = require('./utils/pubsub');

// Create a Match globally
global.match = Match();

const app = require('./app');
app.set('port', process.env.SERVER_PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running -> PORT ${app.get('port')}`);
});


var socket = require('./services/game/socket')(server);
