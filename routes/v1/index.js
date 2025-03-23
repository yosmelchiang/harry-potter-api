const router = require('express').Router();

// API v1 route (versioned)
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to API version 1',
    links: {
      documentation: {
        href: '/api/v1/docs',
        method: 'GET',
        description: 'Swagger API documentation'
      },
      wizards: {
        href: '/api/v1/wizards',
        method: 'GET, POST, PUT, DELETE',
        description: 'Supports CRUD operations through simple request/response functionality'
      }
    }
  });
});

module.exports = router;
