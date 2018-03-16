const express = require('express');
const bodyParser = require('body-parser'); 
const routes = require('./routes/routes');
const sourceMapSupport = require('source-map-support');
const path = require('path');


if (process.env.BUILD_DEV) {
    sourceMapSupport.install();
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cdn middleware
app.use('/download/', express.static(path.join(process.cwd(), 'dist')));
app.use('/download/assets', express.static(path.join(process.cwd(), 'assets')));

app.use('/', routes);


module.exports = app;