const router = require('express').Router();
const routesForUser = require('./user-routes');
const routesForAgent = require('./neural-routes');

router.use('/user', routesForUser);
router.use('/neural', routesForAgent);

module.exports = router;
