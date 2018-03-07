const mongoose = require('mongoose');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle an bad connections
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connect(process.env.DATABASE);
mongoose.connection.on('error', err => {
  console.error(`!!!!!!!ERROR!!!!!!! -> ${err.message}`);
});
 

// Start our app!
const app = require('./app');
app.set('port', process.env.SERVER_PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running -> PORT ${server.address().port}`);
});
