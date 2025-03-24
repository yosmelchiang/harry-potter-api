require('dotenv').config()
const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
  const authHeader = req.get('Authorization');
  
  if(!authHeader) {
    return res.status(403).json({ message: 'Authorization token required'})
  }

  const token = authHeader.split(' ')[1]
  
  try {
    jwt.verify(token, process.env.JWT_SECRET)
  } catch(err) {
    return res.status(401).json({message: 'Invalid authorization token'})
  }

  next();
};

module.exports = { validateToken };
