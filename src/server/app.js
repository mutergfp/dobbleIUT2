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

//Cross origin
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//logs proxy
require('./services/logsProxy/logsProxy')(app);

// cdn middleware
app.use('/download/', express.static(path.join(process.cwd(), 'dist')));
app.use('/download/assets', express.static(path.join(process.cwd(), 'assets')));

app.use('/', routes);

module.exports = app;