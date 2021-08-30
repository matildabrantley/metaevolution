const router = require('express').Router();
const routes = require('./api');
const path = require('path');

router.use('/api', routes);

// React content over in client
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;
