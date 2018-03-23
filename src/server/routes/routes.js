const router = require('express').Router();

const userController = require('@server/services/user/userController');
const gameController = require('@server/services/game/gameController');

router.use(userController.decodeJWT);

// user service
router.post('/account/register', userController.validateFields, userController.register);
router.post('/account/login', userController.login);
router.get('/account/isloggedin', userController.isLoggedIn);

// game service
router.get('/game/genmiddlecard', gameController.testGenMiddleCard);
router.get('/game/genstarterpack', gameController.testGenStarterPack);

module.exports = router;