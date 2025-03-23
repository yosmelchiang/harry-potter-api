const router = require('express').Router();

// Root route (non-versioned)
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the API!',
    links: {
      api_v1: {
        href: '/api/v1',
        method: 'GET',
        description: 'Access the version 1 of the API'
      }
    }
  });
});

module.exports = router;
