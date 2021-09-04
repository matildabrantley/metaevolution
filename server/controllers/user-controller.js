const { signToken } = require('../authentication');
const { User } = require('../models');

//user registration route
async function register({ body }, res) {
  const newUser = await User.create(body);

  if (!newUser) {
    return res.status(400).json({ message: 'Invalid Registration.' });
  }
  const token = signToken(newUser);
  res.json({ token, newUser });
}

//user login route
async function login({ body }, res) {
  const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
  if (!user) {
    return res.status(400).json({ message: 'Cannot find user by this name or email' });
  }

  const validPassword = await user.checkPassword(body.password);

  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid password' });
  }
  const token = signToken(user);
  res.json({ token, user });
}

// get user by id || username route
async function getUser({ user = null, params }, res) {
    const retrievedUser = await User.findOne({ $or: [{ _id: user ? user._id : params.id }, { username: params.username }] });

    if (!retrievedUser) {
      return res.status(400).json({ message: 'No registered user with this ID' });
    }

    res.json(retrievedUser);
}

module.exports = { register, login, getUser }

