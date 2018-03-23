module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mongoose = __webpack_require__(0);
var jsonwebtoken = __webpack_require__(1);

// import environmental variables from our variables.env file
__webpack_require__(5).config({ path: 'variables.env' });

// Connect to our Database and handle an bad connections
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connect(process.env.DATABASE);
mongoose.connection.on('error', function (err) {
  console.error('!!!!!!!ERROR!!!!!!! -> ' + err.message);
});

// Invoke Models
__webpack_require__(6);

var app = __webpack_require__(7);
app.set('port', process.env.SERVER_PORT || 7777);
var server = app.listen(app.get('port'), function () {
  console.log('Express running -> PORT ' + app.get('port'));
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mongoose = __webpack_require__(0);
var bcrypt = __webpack_require__(2);

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    hash_password: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.hash_password);
};

mongoose.model('User', UserSchema);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(3);
var bodyParser = __webpack_require__(8);
var routes = __webpack_require__(9);
var sourceMapSupport = __webpack_require__(11);
var path = __webpack_require__(12);

if (process.env.BUILD_DEV) {
    sourceMapSupport.install();
}

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Cross origin
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// cdn middleware
app.use('/download/', express.static(path.join(process.cwd(), 'dist')));
app.use('/download/assets', express.static(path.join(process.cwd(), 'assets')));

app.use('/', routes);

module.exports = app;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var router = __webpack_require__(3).Router();

var userController = __webpack_require__(10);
var gameController = __webpack_require__(13);

router.use(userController.decodeJWT);

// user service
router.post('/account/register', userController.validateFields, userController.register);
router.post('/account/login', userController.login);
router.get('/account/isloggedin', userController.isLoggedIn);

// game service
router.get('/game/genmiddlecard', gameController.testGenMiddleCard);
router.get('/game/genstarterpack', gameController.testGenStarterPack);

module.exports = router;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mongoose = __webpack_require__(0);
var jwt = __webpack_require__(1);
var bcrypt = __webpack_require__(2);
var User = mongoose.model('User');

exports.register = function (req, res) {
    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save().then(function (user) {
        user.hash_password = undefined;
        res.json(user);
    }).catch(function (err) {
        return res.status(400).json({
            message: err
        });
    });
};

exports.validateFields = function (req, res, next) {
    var _req$body = req.body,
        confirmPassword = _req$body.confirmPassword,
        password = _req$body.password;

    if (confirmPassword && password && confirmPassword === password) {
        console.log('coucou');
        return next();
    }
    res.status(400).json({
        message: 'Invalid confirm password'
    });
};

exports.login = function (req, res) {
    User.findOne({
        username: req.body.username
    }).then(function (user) {
        if (!user || !user.comparePassword(req.body.password)) {
            return res.status(401).json({
                message: 'Authentication failed. Invalid user or password.'
            });
        }
        return res.json({
            token: jwt.sign({
                username: user.username,
                _id: user._id
            }, 'secret_key')
        });
    }).catch(console.error);
};

// not used
exports.loginRequired = function (req, res, next) {
    if (!req.user) {
        return res.status(401).json({
            message: 'You are not logged in !'
        });
    }
    next();
};

exports.decodeJWT = function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], 'secret_key', function (err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
};

exports.isLoggedIn = function (req, res) {
    if (!req.user) {
        return res.status(401).json({
            isLoggedIn: false
        });
    }
    res.json({
        isLoggedIn: true
    });
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("source-map-support");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.testGenStarterPack = exports.testGenMiddleCard = undefined;

var _cardGeneration = __webpack_require__(14);

var testGenMiddleCard = exports.testGenMiddleCard = function testGenMiddleCard(req, res) {
    (0, _cardGeneration.genMiddleCard)([[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 9]]).then(function (response) {
        return response.data;
    }).then(function (data) {
        return res.json(data);
    }).catch(function (err) {
        return res.json({
            message: err.message
        });
    });
};

var testGenStarterPack = exports.testGenStarterPack = function testGenStarterPack(req, res) {
    (0, _cardGeneration.genStarterPack)(2).then(function (response) {
        return response.data;
    }).then(function (data) {
        return res.json(data);
    }).catch(function (err) {
        return res.json({
            message: err.message
        });
    });
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genStarterPack = exports.genMiddleCard = undefined;

var _fetching = __webpack_require__(15);

var BASE_URL = 'http://dobbleCartes:82';

var genMiddleCard = exports.genMiddleCard = function genMiddleCard(cards) {
  return (0, _fetching.fetchingJSON)(BASE_URL + '/carte', cards, 'POST');
};

var genStarterPack = exports.genStarterPack = function genStarterPack(nbPlayers) {
  return (0, _fetching.fetchingJSON)(BASE_URL + '/cartes/' + nbPlayers);
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchingJSON = undefined;

var _axios = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"axios\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _axios2 = _interopRequireDefault(_axios);

var _error = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchingJSON = exports.fetchingJSON = function fetchingJSON() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _error.isRequired)('url');
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
  return _axios2.default[method.toLowerCase()](url, params);
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var isRequired = exports.isRequired = function isRequired(fieldName) {
    throw new Error(fieldName + " param is required");
};

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map