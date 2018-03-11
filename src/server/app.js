const express = require('express');
const bodyParser = require('body-parser'); 
const routes = require('./routes/routes');
const sourceMapSupport = require('source-map-support');

if (process.env.BUILD_DEV) {
    sourceMapSupport.install();
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);


module.exports = app;