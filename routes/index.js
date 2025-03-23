const router = require('express').Router();

// Root route (non-versioned)
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the API!',
    links: {
      api_v1: {
        href: '/api/v1',
        method: 'GET',
        description: 'Access the version 1 of the API which includes core routing functionality without database integration'
      },
      api_v2: {
        href: '/api/v2',
        method: 'GET',
        description: 'Access the version 2 of the API which includes database integration through sequelize'
      }
    }
  });
});

module.exports = router;
