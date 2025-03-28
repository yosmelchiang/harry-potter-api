// 3A pattern in every tests: arrange, act, assert
// 3 parts structure: describe what we are testing, describe the scenario, test the expectations
// Avoidd relying on pre-existing data, use mocks

require('dotenv').config();

const app = require('../app.js');
const request = require('supertest');
const apiPrefix = '/api/v1';

const wizardService = require('../services/wizardService.js');

describe('CRUD Operations on /wizards', () => {
  // GET
  describe('GET: Retrieve a list of wizards', () => {
    // Mock database behaviour - We dont want to rely on database connection being functional
    const mockResponse = [
      {
        name: 'Harry Potter',
        gender: 'Male',
        ancestry: 'Half-blood',
        patronus: 'Stag',
        isDarkWizard: false,
        HouseId: 1
      },
      {
        name: 'Hermione Granger',
        gender: 'Female',
        ancestry: 'Muggle-born',
        patronus: 'Otter',
        isDarkWizard: false,
        HouseId: 1
      },
      {
        name: 'Draco Malfoy',
        gender: 'Male',
        ancestry: 'Pure-blood',
        patronus: 'None',
        isDarkWizard: false,
        HouseId: 4
      }
    ];
    test('StatusCode 200 and a JSON resource containing { status: success, data: an array of objects }', async () => {
      // Arrange - A scenario where our service returns records from the database
      wizardService.getAll = jest.fn(async () => {
        return await mockResponse;
      });
      const path = '/api/v1/wizards';

      // Act
      const { body, statusCode } = await request(app).get(path);

      // Assert - Happy days scenarios
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('status');
      expect(body.status).toBe('success');
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual(mockResponse);
    });
    test('StatusCode 500 when the service throws an error', async () => {
      // Arrange - A scenario where our service throws an error
      wizardService.getAll = jest.fn(async () => {
        throw new Error('Could not connect to database');
      });
      const path = '/api/v1/wizards';

      // Act
      const { body, statusCode } = await request(app).get(path);

      // Assert
      expect(statusCode).toBe(500);
      expect(body).toHaveProperty('status');
      expect(body.status).toBe('error');
    });
  });

  // POST - JWT AUTH
  describe('POST: Create a wizard', () => {
    let authToken;
    
    beforeEach(async() => {
      const {body, statusCode} = await request(app).post(apiPrefix  + '/login').send({
        username: 'user',
        password: 'user1234'
      })
      
      authToken = body.data.auth.access_token
    })

    test('StatusCode 201 when successfully creatinga wizard', async () => {
      // Arrange - A scenario where our service creates a new record in the database
      const payload = {
        name: 'New Wizard',
        gender: 'Male',
        ancestry: 'Pure-blood',
        patronus: 'Stag',
        isDarkWizard: false,
        HouseId: 1
      };
      wizardService.create = jest.fn(async (name, gender, ancestry, patronus, isDarkWizard, HouseId) => {
        return { id: 1, ...payload };
      });
      const path = `/api/v1/wizards`;

      // Act - Get database result
      const dbResult = await wizardService.create(
        'New Wizard',
        'Male',
        'Pure-blood',
        'Stag',
        false,
        1
      );

      // Act - Create the new wizard request
      const { body, statusCode } = await request(app)
        .post(path)
        .set('Authorization', `Bearer ${authToken}`)
        .send(payload);

      // Assert - Assert the server response
      expect(statusCode).toBe(201);
      expect(body).toHaveProperty('data');
      expect(body.data).toEqual(dbResult);
    });

    test('StatusCode 400 when there is a missing field', async () => {
      const incompletePayload = {
        gender: 'Male',
        ancestry: 'Pure-blood',
        patronus: 'Stag',
        isDarkWizard: false,
        HouseId: 1
      };
        
      wizardService.create = jest.fn(async (name, gender, ancestry, patronus, isDarkWizard, HouseId) => {
        if(!name) throw Error('name cannot be missing')
        if(!gender) throw Error('gender cannot be missing')
        if(!ancestry) throw Error('ancestry cannot be missing')
        if(!patronus) throw Error('patronus cannot be missing')
        if(!isDarkWizard) throw Error('isDarkWizard cannot be missing')
        if(!HouseId) throw Error('HouseId cannot be missing')
        return { id: 1, ...payload };
      });
    
      // Act
      const { body, statusCode } = await request(app)
        .post('/api/v1/wizards')
        .set('Authorization', `Bearer ${authToken}`)
        .send(incompletePayload);

      // Assert
      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('status');
      expect(body.status).toBe('error');
      expect(body).toHaveProperty('message');
      // expect(body.message).toBe('name cannot be missing');
    });
  });

  // PUT - JWT RBA
  describe('PUT: Update a wizard', () => {
    let adminToken;

    beforeEach(async() => {
      const { body } = await request(app).post(apiPrefix + '/login').send({
        username: 'admin',
        password: 'admin1234'
      })
      adminToken = body.data.auth.access_token
    })

    test('StatusCode 200 when successfully updating a wizard', async() => {
      const mockUpdatedWizard = {
        id: 1,
        name: 'Updated Wizard',
        gender: 'Male',
        ancestry: 'Half-blood',
        patronus: 'Phoenix',
        isDarkWizard: false,
        HouseId: 1
      };

      wizardService.update = jest.fn(async (id, name, houseId) => {
        if(id === mockUpdatedWizard.id) {
          return mockUpdatedWizard;
        }
        throw new Error('Wizard not found')
      })

      // Arrange
      const path = apiPrefix + '/wizards/' + mockUpdatedWizard.id
      const payload = {
        name: 'Updated Wizard',
        HouseId: 1
      }
      // Act
      const { body, statusCode } = await request(app).put(path).set('Authorization', `Bearer ${adminToken}`).send(payload)
      
      expect(statusCode).toBe(200)
      expect(body).toHaveProperty('status', 'success')
      expect(body).toHaveProperty('data')
      expect(body.data).toEqual(mockUpdatedWizard)
      
      // Assert
    })
    test('StatusCode 404 when said wizard cannot be found', async () => {
      const mockUpdatedWizard = {
        id: 1,
        name: 'Updated Wizard',
        gender: 'Male',
        ancestry: 'Half-blood',
        patronus: 'Phoenix',
        isDarkWizard: false,
        HouseId: 1
      };

      wizardService.update = jest.fn(async (id, name, houseId) => {
        if(id === mockUpdatedWizard.id){
          return mockUpdatedWizard
        }
        throw Error('Wizard not found')
      })

      // Arrange
      const path = apiPrefix + '/wizards/' + 2
      const payload = {
        name: 'Updated Wizard',
        HouseId: 1
      }

      // Act
      const { body, statusCode } = await request(app).put(path).set('Authorization', `Bearer ${adminToken}`).send(payload)

      expect(statusCode).toBe(404)
      expect(body).toHaveProperty('status', 'error')
      expect(body).toHaveProperty('message', 'Wizard not found')

    })
  })

  // DELETE - JWT RBA
  describe('DELETE: Delete a wizard', () => {
    test.todo('StatusCode 204 when a wizard is deleted')
    test.todo('StatusCode 400 when said a wizard cannot be found')
  });
});
