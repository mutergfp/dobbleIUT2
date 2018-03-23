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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genStarterPack = exports.genMiddleCard = undefined;

var _fetching = __webpack_require__(8);

var BASE_URL = 'http://dobbleCartes:82';

var genMiddleCard = exports.genMiddleCard = function genMiddleCard(cards) {
  return (0, _fetching.fetchingJSON)(BASE_URL + '/carte', cards, 'POST');
};

var genStarterPack = exports.genStarterPack = function genStarterPack(nbPlayers) {
  return (0, _fetching.fetchingJSON)(BASE_URL + '/cartes/' + nbPlayers);
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mongoose = __webpack_require__(0);
var jsonwebtoken = __webpack_require__(2);
var Match = __webpack_require__(6);

// import environmental variables from our variables.env file
__webpack_require__(11).config({ path: 'variables.env' });

// Connect to our Database and handle an bad connections
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connect(process.env.DATABASE);
mongoose.connection.on('error', function (err) {
  console.error('!!!!!!!ERROR!!!!!!! -> ' + err.message);
});

// Invoke Models
__webpack_require__(12);

// Invoke PubSub to dispatch events around the app
global.events = __webpack_require__(13);

// Create a Match globally
global.match = Match();

var app = __webpack_require__(14);
app.set('port', process.env.SERVER_PORT || 7777);
var server = app.listen(app.get('port'), function () {
  console.log('Express running -> PORT ' + app.get('port'));
});

var socket = __webpack_require__(21)(server);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _props = __webpack_require__(7);

var props = _interopRequireWildcard(_props);

var _cardGeneration = __webpack_require__(3);

var cardGenAPI = _interopRequireWildcard(_cardGeneration);

var _bcrypt = __webpack_require__(1);

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function Match() {
    var id = 0;
    var players = [];
    var middleCard = [];
    var status = 0;
    var endTime = 0;
    var matchTime = 0;

    function init() {
        var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 60000;
        var startDelay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60000;

        if (canInit()) {
            matchTime = time;
            id = _bcrypt2.default.hashSync(Date.now().toString(), 10);
            status++;
            setTimeout(start, startDelay);
        }
    }

    function start() {
        if (canStart()) {
            resetPlayerScores();
            giveCards().then(function (data) {
                status++;
                endTime = Date.now() + matchTime;
                main();
            }).catch(function (err) {
                return console.error(err);
            });
        }
    }

    function main() {
        console.log(getMatchInfos());
        setTimeout(finishMatch, matchTime);
    }

    function playerTurn(_ref, symbol) {
        var username = _ref.username;

        if (playerExist({ username: username })) {
            var player = findPlayer({ username: username });
            return player.card.includes(symbol) && middleCard.includes(symbol);
        }
        return false;
    }

    function nextPick(_ref2) {
        var username = _ref2.username;

        var player = findPlayer({ username: username });
        player.score++;
        player.card = middleCard;
        return giveMiddleCard();
    }

    function giveCards() {
        return cardGenAPI.genStarterPack(players.length).then(function (response) {
            return response.data;
        }).then(function (data) {
            players = players.map(function (player, i) {
                player.card = data.playersCards[i];
                return player;
            });

            middleCard = data.middleCard;
            return data;
        });
    }

    function giveMiddleCard() {
        return cardGenAPI.genMiddleCard(getAllPlayerCards()).then(function (response) {
            return response.data;
        }).then(function (middleCardData) {
            return middleCard = middleCardData;
        });
    }

    function resetPlayerScores() {
        players = players.map(function (player) {
            player.score = 0;
            return player;
        });
    }

    function canStart() {
        return players.length >= 2 && status === 1;
    }

    function canInit() {
        return players.length >= 2 && status === 0;
    }

    function playerExist(_ref3) {
        var username = _ref3.username;

        return players.findIndex(function (p) {
            return p.username === username;
        }) !== -1;
    }

    function findPlayer(_ref4) {
        var username = _ref4.username;

        return players.find(function (player) {
            return player.username === username;
        });
    }

    function finishMatch() {
        status++;
        console.log(getMatchInfos());
        // emit event for socket
        resetMatch();
    }

    function resetMatch() {
        id = 0;
        players = [];
        middleCard = [];
        status = 0;
        endTime = 0;
        matchTime = 0;
    }

    function isStarted() {
        return status === 2;
    }

    function isFinished() {
        return Date.now() >= endTime;
    }

    function getAllPlayerCards() {
        return players.map(function (player) {
            return player.card;
        });
    }

    function addPlayer(_ref5) {
        var username = _ref5.username;

        var player = {
            username: username,
            score: 0,
            card: []
        };
        if (players.length < 8 && !playerExist(player)) {
            players.push(player);
        }
        return playerExist(player);
    }

    function removePlayer(username) {
        players = players.filter(function (player) {
            return player.username !== username;
        });
    }

    function getRanking() {
        return players.sort(function (pa, pb) {
            return pb.score - pa.score;
        }).map(function (player, i, self) {
            return {
                username: player.username,
                rank: self.findIndex(function (p) {
                    return p.score === player.score;
                }) + 1
            };
        });
    }

    function getStatus() {
        return status;
    }

    function getStatusMessage() {
        return props.status[status];
    }

    function getMatchInfos() {
        return {
            id: id,
            middleCard: middleCard,
            players: players,
            status: status,
            statusMessage: getStatusMessage(),
            endTime: endTime,
            ranking: getRanking()
        };
    }

    function getPlayerInfos(_ref6) {
        var username = _ref6.username;

        return findPlayer({ username: username });;
    }

    return {
        getStatus: getStatus,
        init: init,
        start: start,
        addPlayer: addPlayer,
        findPlayer: findPlayer,
        getStatusMessage: getStatusMessage,
        playerExist: playerExist,
        getMatchInfos: getMatchInfos,
        playerTurn: playerTurn,
        nextPick: nextPick,
        isStarted: isStarted,
        getPlayerInfos: getPlayerInfos
    };
}

module.exports = Match;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var status = exports.status = ['INIT', 'PENDING', 'IN_PROGRESS', 'FINISHED'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchingJSON = undefined;

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _error = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchingJSON = exports.fetchingJSON = function fetchingJSON() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _error.isRequired)('url');
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
  return _axios2.default[method.toLowerCase()](url, params);
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var isRequired = exports.isRequired = function isRequired(fieldName) {
    throw new Error(fieldName + " param is required");
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mongoose = __webpack_require__(0);
var bcrypt = __webpack_require__(1);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var events = function () {
    var events = {};

    function on(eventName, fn) {
        events[eventName] = events[eventName] || [];
        events[eventName].push(fn);
    }

    function off(eventName, fn) {
        if (events[eventName]) events[eventName] = events[eventName].filter(function (impl) {
            return impl !== fn;
        });
    }

    function emit(eventName, data) {
        if (events[eventName]) events[eventName].forEach(function (impl) {
            return impl(data);
        });
    }

    return { on: on, off: off, emit: emit };
}();

module.exports = events;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(4);
var bodyParser = __webpack_require__(15);
var routes = __webpack_require__(16);
var sourceMapSupport = __webpack_require__(19);
var path = __webpack_require__(20);

if (process.env.BUILD_DEV) {
    sourceMapSupport.install();
}

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Cross origin
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// cdn middleware
app.use('/download/', express.static(path.join(process.cwd(), 'dist')));
app.use('/download/assets', express.static(path.join(process.cwd(), 'assets')));

app.use('/', routes);

module.exports = app;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var router = __webpack_require__(4).Router();

var userController = __webpack_require__(17);
var gameController = __webpack_require__(18);

router.use(userController.decodeJWT);

// user service
router.post('/account/register', userController.validateFields, userController.register);
router.post('/account/login', userController.login);
router.get('/account/isloggedin', userController.isLoggedIn);
router.get('/account/users', userController.users);

// game service
router.get('/game/genmiddlecard', gameController.testGenMiddleCard);
router.get('/game/genstarterpack', gameController.testGenStarterPack);
router.get('/game/test', gameController.testRoute);

router.post('/game/join', userController.loginRequired, gameController.join);
router.post('/game/jouer', userController.loginRequired, gameController.jouer);

router.get('/game/infospartie', gameController.infospartie);
router.get('/game/joueur/:username', gameController.infosjoueur);

module.exports = router;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mongoose = __webpack_require__(0);
var jwt = __webpack_require__(2);
var bcrypt = __webpack_require__(1);
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

exports.users = function (req, res) {
    User.find({}, {
        username: true,
        created: true
    }).then(function (users) {
        return res.json(users);
    }).catch(function (err) {
        return res.status(400).json({
            message: err.message
        });
    });
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.infosjoueur = exports.infospartie = exports.jouer = exports.join = exports.testRoute = exports.testGenStarterPack = exports.testGenMiddleCard = undefined;

var _cardGeneration = __webpack_require__(3);

var testGenMiddleCard = exports.testGenMiddleCard = function testGenMiddleCard(req, res) {
    (0, _cardGeneration.genMiddleCard)([[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 9]]).then(function (response) {
        return response.data;
    }).then(function (data) {
        return res.json(data);
    }).catch(function (err) {
        return res.status(400).json({
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
        return res.status(400).json({
            message: err.message
        });
    });
};

var testRoute = exports.testRoute = function testRoute(req, res) {
    res.send('it works');
};

var join = exports.join = function join(req, res) {
    var player = req.user;
    if (match.isStarted()) return res.status(410).json({
        message: 'La partie à déjà commencée',
        hasJoined: false
    });
    if (match.playerExist(player)) return res.status(400).json({
        message: 'Vous avez déjà rejoint la partie',
        hasJoined: true,
        player: match.findPlayer(player),
        status: match.getStatus(),
        statusMessage: match.getStatusMessage()
    });
    if (!match.addPlayer(player)) {
        return res.status(410).json({
            message: 'Vous ne pouvez pas rejoindre la partie, la partie est pleine',
            hasJoined: false
        });
    }
    match.init(120000, 10000);
    res.json({
        message: 'Vous avez rejoint la partie',
        hasJoined: true,
        player: match.findPlayer(player),
        status: match.getStatus(),
        statusMessage: match.getStatusMessage()
    });
};

var jouer = exports.jouer = function jouer(req, res) {
    var player = req.user;
    if (!match.isStarted()) return res.status(410).json({
        message: "La partie n'a pas commencée",
        status: match.getStatus(),
        statusMessage: match.getStatusMessage()
    });
    if (!req.body.symbol) return res.status(400).json({
        message: 'Vous devez fournir un symbole pour jouer'
    });
    if (!match.playerTurn(player, req.body.symbol)) return res.status(404).json({
        message: 'Joueur non trouvé ou mauvais symbole'
    });
    match.nextPick(player).then(function (middleCard) {
        res.json({
            middleCard: middleCard
        });
    }).catch(function (err) {
        return res.status(400).json({
            message: err.message
        });
    });
};

var infospartie = exports.infospartie = function infospartie(req, res) {
    res.json(match.getMatchInfos());
};

var infosjoueur = exports.infosjoueur = function infosjoueur(req, res) {
    var player = { username: req.params.username };
    if (!match.playerExist(player)) return res.status(404).json({
        message: 'Joueur non trouvé'
    });
    res.json(match.getPlayerInfos(player));
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("source-map-support");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var io = __webpack_require__(22);

function socket(server) {
    io = io(server);

    io.on('connection', function (socket) {
        console.log('New player connected');
    });
}

module.exports = socket;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map