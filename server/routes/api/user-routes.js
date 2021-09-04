const router = require('express').Router();
const { register, login, getUser } = require('../../controllers/user-controller');
const { authenticateRoute } = require('../../authentication');

//routes for the user
router.route('/').post(register).put(authenticateRoute);
router.route('/login').post(login);
router.route('/thisUser').get(authenticateRoute, getUser);

module.exports = router;
