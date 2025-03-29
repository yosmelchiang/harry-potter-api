const env = process.env.NODE_ENV || 'dev'
require('dotenv').config( {path: `.env.${env.trim()}`} )

const app = require('./app.js');
const PORT = process.env.PORT || 3000;
const db = require('./models'),
  { House, Wizard, User, Spell, wizard_spell } = db.models;

db.sync({ force: true })
  .then(() => {
    House.bulkCreate(require('./data/houses.json'));
    Wizard.bulkCreate(require('./data/wizards.json'));
    Spell.bulkCreate(require('./data/spells.json'))
    wizard_spell.bulkCreate(require('./data/wizard_spell.json'))
    User.bulkCreate(require('./data/users.json'))
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`HTTP server is listening at http://localhost:${PORT}`);
    });
  })
  .catch(console.error());
