const router = require('express').Router();
const routes = require('./routes');

router.use('/users', routes);

module.exports = router;
