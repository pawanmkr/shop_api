const Express = require('express');
const router = Express.Router();
const userController = require('../controllers/user');

router.post('/signup', userController.user_signup);
router.post('/login', userController.user_login);

module.exports = router;