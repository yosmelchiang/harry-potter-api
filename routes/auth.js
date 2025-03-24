const router = require('express').Router();
const userService = require('../services/userService.js')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
  const { username = null, password = null } = req.body

  try {
    if(!username || !password) {
      return res.status(400).json( {message: 'Username and password are required'})
    }
    const user = await userService.get(username)
    const parsedUser = JSON.parse(JSON.stringify(user))
    
    if(!user || parsedUser.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials '})
    }

    const payload = {
      id: user.id,
      name: user.name,
      role: user.role
    }, 
      token = jwt.sign(payload, process.env.JWT_SECRET)

    return res.status(200).json( { message: 'Login successful', auth: {
      type: 'Bearer',
      access_token: token
    } } )
  } catch(err) {
    return res.status(500).json({ message: err.message })
  }
});

module.exports = router;
