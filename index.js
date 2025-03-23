require('dotenv').config();

const app = require('./app.js');
const PORT = process.env.PORT || 3000;
const db = require('./models'),
  { House, Wizard } = db.models;

db.sync({ force: true })
  .then(() => {
    House.bulkCreate([
      { name: 'Gryffindor' },
      { name: 'Hufflepuff' },
      { name: 'Ravenclar' },
      { name: 'Slytherin' }
    ]);
    Wizard.bulkCreate([
      { name: 'Harry Potter', HouseId: 1 }, // Gryffindor
      { name: 'Hermione Granger', HouseId: 1 }, // Gryffindor
      { name: 'Ron Weasley', HouseId: 1 }, // Gryffindor
      { name: 'Luna Lovegood', HouseId: 3 }, // Ravenclaw
      { name: 'Draco Malfoy', HouseId: 4 }, // Slytherin
      { name: 'Cedric Diggory', HouseId: 2 }, // Hufflepuff
      { name: 'Neville Longbottom', HouseId: 1 }, // Gryffindor
      { name: 'Cho Chang', HouseId: 3 }, // Ravenclaw
      { name: 'Pansy Parkinson', HouseId: 4 }, // Slytherin
      { name: 'Nymphadora Tonks', HouseId: 2 } // Hufflepuff
    ]);
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`HTTP server is listening at http://localhost:${PORT}`);
    });
  })
  .catch(console.error());
