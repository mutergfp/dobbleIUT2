const router = require('express').Router();

const userController = require('@server/services/user/userController');

router.use(userController.decodeJWT);

// user service
router.post('/account/register', userController.validateFields, userController.register);
router.post('/account/login', userController.login);
router.get('/account/isloggedin', userController.isLoggedIn);


module.exports = router;