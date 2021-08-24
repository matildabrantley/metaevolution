const db = require('../config/connection');
const { Net } = require('../models');
const netSeeds = require('./netSeeds.json');

db.once('open', async () => {
  try {
    await Net.deleteMany({});
    await Net.create(netSeeds);

    console.log('Seeds are seeded');
    process.exit(0);
  } catch (error) {
    throw error;
  }
});
