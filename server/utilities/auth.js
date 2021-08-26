const JWT = require('jsonwebtoken');
const expiration = '4h'; //four hour expiration of token
const secret = 'neuralnetsarecool';

// authenticated routes
function authenticateRoute (req, res, next) {
  let token = req.query.token || req.headers.authorization;

  if (req.headers.authorization)
    token = token.split(' ').pop().trim();

  if (!token)
    return res.status(400).json({ message: 'Missing token' });

  try {
    const { data } = JWT.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log('Invalid token');
    return res.status(400).json({ message: 'Invalid token' });
  }
  next();
}

function signToken ({ username, email, _id }) {
  const payload = { username, email, _id };

  return JWT.sign({ data: payload }, secret, { expiresIn: expiration });
}

module.exports = { authenticateRoute, signToken }
