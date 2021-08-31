const router = require('express').Router();
const { storeNet, getAllNets, register, login, getUser } = require('../../controller');
const { authenticateRoute } = require('../../authentication');

//routes for the user
router.route('/').post(register).put(authenticateRoute);
router.route('/login').post(login);
router.route('/thisUser').get(authenticateRoute, getUser);

//routes for the neural nets
router.route('/postNet').post(storeNet);
router.route('/getNet').get(getAllNets);

module.exports = router;
