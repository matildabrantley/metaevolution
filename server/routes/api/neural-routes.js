const router = require('express').Router();
const { authenticateRoute } = require('../../authentication');
const { saveMind } = require('../../controllers/neural-controller');


//routes for the neural nets
router.route('/saveMind').put(authenticateRoute, saveMind);
// router.route('/getNet').get(getAllNets);

module.exports = router;
