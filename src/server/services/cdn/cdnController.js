const path = require('path');

exports.download = (req, res, next) => {
    res.download(path.resolve(process.cwd(), `dist/${req.params.filename}`), err => {
        if (err) return next(err);
        console.log(`${req.params.filename} was sent`);
    });
}

exports.downloadIndex = (req, res, next) => {
    res.download(path.resolve(process.cwd(), 'index.html'), err => {
        if (err) return next(err);
        console.log(`index.html was sent`);
    });
}