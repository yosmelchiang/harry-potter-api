// This test file violated the following practices
  // Not using 3A pattern in every tests, which makes it hard to read and understand what is going on at first glance
  // Its also not using 3 parts structure:
    // unit description (CRUD operations on /wizards)  ✅ Its fine
    // scenario description ❌ - Not existat, describe what is happening? - A POST/GET/PUT/DELETE request is made
    // expectation - ❌ - When a GET request is made, the server responds with an array including objects of wizard records
  // relying on pre-existing data
    // we are assuming some records exists with a given id, which is not good, the database can change states and thus the tests will fail

// We are disabling those tests and making a few fixes to this in a new file to keep a record of anti-patterns

require('dotenv').config();

const app = require('./app.js');
const request = require('supertest');
const apiPrefix = '/api/v1'
const db = require('./models/index.js')

const jwt = {
  userToken: '', //Just a normal user authentication  token
  adminToken: '' //An admin token used for RBA (Role Based Access)
}

// beforeAll(async () => {
//   //Get a regular user token
//   const user = {
//     username: 'user',
//     password: 'user1234'
//   }
//   const path = apiPrefix + '/login'

//   const { body: { data: { auth: { access_token: user_token}} } } = await request(app).post(path).send(user)
  
//   jwt.userToken = user_token

//   //Get an admin token
//   const admin = {
//     username: 'admin',
//     password: 'admin1234',
//   }

//   const { body: { data: { auth: { access_token: admin_token }}}} = await request(app).post(path).send(admin)
//   jwt.adminToken = admin_token
// })


describe.skip('CRUD Operations on /wizards', () => {

  //GET
  test('GET: Retrieve a list of wizards', async () => {
    // AAA
    //arrange
    const path = `/api/v1/wizards`;
    const expectedStatus = 200;
    //act
    const { body, status } = await request(app).get(path);

    //assert
    expect(status).toBe(expectedStatus);
    expect(body).toHaveProperty('data')
  });

  //POST
  //Wizards
  test('POST: Create a new wizard', async () => {
    const path = `/api/v1/wizards`;
    const expectedStatus = 201;
    const newData = { 
      name: 'Hermione Grander',
      gender: 'Female',
      ancestry: 'Muggle-born',
      patronus: 'Otter',
      isDarkWizard: false,
      HouseId: 1
    };

    const { body, status } = await request(app).post(path).set('Authorization', `Bearer ${jwt.userToken}`).send(newData);

    expect(status).toBe(expectedStatus);
    expect(body).toHaveProperty('data')
    expect(Object.keys(body.data).length > 0).toBe(true)
  });

  //PUT
  test('PUT: Update a wizard', async () => {
    const id = 1; //We are assuming this record exists
    const path = `/api/v1/wizards/${id}`;
    const expectedStatus = 200;
    const newData = { name: 'Luna Lovegood' };

    const { body, status } = await request(app).put(path).set('Authorization', `Bearer ${jwt.adminToken}`).send(newData);
    status 
    expect(status).toBe(expectedStatus);
    expect(body).toHaveProperty('data') // We want to make sure that our data property exists
    expect(Object.keys(body.data).length > 0).toBe(true) // We want to make sure our data property is not empty
  });

  //DELETE
  test('DELETE: Deletes a wizard', async () => {
    const id = 1; //We are assuming this record exists
    const path = `/api/v1/wizards/${id}`;
    const expectedStatus = 204;

    const { body, statusCode } = await request(app).delete(path).set('Authorization', `Bearer ${jwt.adminToken}`);

    expect(statusCode).toBe(expectedStatus); //204
    expect(body.data).toHaveProperty('data')
    expect(Object.keys(body).length).toBe(0); //Ensures the body is empty
  });
});

// afterAll(async () => {
//   await db.close()
// })'