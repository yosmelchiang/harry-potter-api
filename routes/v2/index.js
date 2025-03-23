const router = require('express').Router();

// API v1 route (versioned)
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to API version 1',
    links: {
      documentation: {
        href: '/api/v2/docs',
        method: 'GET',
        description: 'Swagger API documentation'
      },
      wizards: {
        href: '/api/v2/wizards',
        method: 'GET, POST, PUT, DELETE',
        description: 'CRUD operations on wizard resource'
      }
    }
  });
});

module.exports = router;
