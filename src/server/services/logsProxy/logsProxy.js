function createLogsProxy(app) {

    const logsProxy = require('http-proxy').createProxyServer({
        host: 'http://gi1.univ-lr.fr',
        port: process.env.SERVER_PORT || 7777
    });

    app.use('/logs', (req, res, next) => {
        logsProxy.web(req, res, {
            target: 'http://gi1.univ-lr.fr:9200'
        }, next);
    });

}

module.exports = createLogsProxy;