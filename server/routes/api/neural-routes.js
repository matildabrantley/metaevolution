const router = require('express').Router();
const { saveMind } = require('../../controllers/neural-controller');

//routes for the neural nets
router.route('/saveMind').post(saveMind);
// router.route('/getNet').get(getAllNets);

module.exports = router;
