require('dotenv').config()

const app = require('./app.js');
const PORT = process.env.PORT || 3000;
const db = require('./models');

db.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`HTTP server is listening at http://localhost:${PORT}`);
  });
});
