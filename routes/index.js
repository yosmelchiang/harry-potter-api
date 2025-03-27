const router = require('express').Router();

// Root route (non-versioned)
router.get('/', (req, res) => {
  res.status(200).jsend.success({
    message: 'Welcome to the API!',
    links: {
      documentation: {
        href: '/api/v1/docs',
        method: 'GET',
        description: 'Swagger API documentation'
      },
      wizards: {
        href: '/api/v1/wizards',
        method: 'GET, POST, PUT, DELETE',
        description: 'Supports CRUD operations against MYSQL through Sequelize'
      }
    }
  });
});

module.exports = router;
