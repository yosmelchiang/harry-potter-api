// require('dotenv').config();

const jwt = require('jsonwebtoken');

const getToken = (req, res) => {
  const authHeader = req.get('Authorization')

  if (!authHeader) {
    res.status(403).json({ message: 'Authorization token required' });
    return null
  }

  return authHeader.split(' ')[1];
};

const validateToken = (req, res, next) => {
  const token = getToken(req, res);
  if(!token) return

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid authorization token' });
  }

  next();
};

const validateRole = (req, res, next) => {
  const token = getToken(req, res);
  if(!token) return
  
  try {
    jwt.verify(token, process.env.JWT_SECRET); //If this token is not valid, this will throw an error and jump into the catch scope
    const decodedToken = jwt.decode(token);
    if(decodedToken.role === process.env.ADMIN_ROLE)
      next();
    else
      return res.status(403).json({message: 'Not permitted'})
  } catch (err) {
    return res.status(401).json({ message: 'Invalid authorization token' });
  }

};

module.exports = { validateToken, validateRole };
