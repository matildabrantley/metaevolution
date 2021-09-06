const { Mind, User } = require('../models');


//store entire mind object in database
async function saveMind({ user, body }, res) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $addToSet: { savedMinds: body } },
      { new: true, runValidators: true }
    );
    return res.json(updatedUser);
  } catch (err) {
    return res.status(400).json(err);
  }
}

// async function getAllNets({ }, res) {
//   const retrievedNes = await Net.find();

//   if (!retrievedNets) {
//     return res.status(400).json({ message: 'No networks saved' });
//   }

//   res.json(retrievedNets);
// }

module.exports = { saveMind }