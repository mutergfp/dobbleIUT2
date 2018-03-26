const router = require('express').Router();

const userController = require('@server/services/user/userController');
const gameController = require('@server/services/game/gameController');

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