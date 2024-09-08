const { verifyToken } = require('../services/auth.service');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Access Denied');
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).send('Invalid Token');
  }

  req.user = decoded;
  next();
};

module.exports = authMiddleware;
