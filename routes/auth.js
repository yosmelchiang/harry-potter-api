const router = require('express').Router();
const userService = require('../services/userService.js');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const { username = null, password = null } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).jsend.fail('Username and password are required');
    }
    const user = await userService.get(username);
    const parsedUser = JSON.parse(JSON.stringify(user));

    if (!user || parsedUser.password !== password) {
      return res.status(401).jsend.fail('Invalid credentials ');
    }

    const payload = {
        id: user.id,
        name: user.name,
        role: user.role
      },
      token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).jsend.success({
      auth: {
        type: 'Bearer',
        access_token: token
      }
    });
  } catch (err) {
    return res.status(500).jsend.error(err.message);
  }
});

module.exports = router;
