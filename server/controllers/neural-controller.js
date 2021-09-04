const { Mind } = require('../models');


async function saveMind({ body }, res) {
  const newMind = await Mind.create(body);
  res.json({ newMind });
}

// async function getAllNets({ }, res) {
//   const retrievedNes = await Net.find();

//   if (!retrievedNets) {
//     return res.status(400).json({ message: 'No networks saved' });
//   }

//   res.json(retrievedNets);
// }

module.exports = { saveMind }