const path = require('path');

exports.download = (req, res, next) => {
    res.download(path.resolve(process.cwd(), `dist/${req.params.filename}`), err => {
        if (err) return next(err);
        console.log(`${req.params.filename} sent`);
    });
}