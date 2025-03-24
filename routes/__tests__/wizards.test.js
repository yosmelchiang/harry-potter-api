require('dotenv').config();

const app = require(process.cwd() + '/app.js');
const request = require('supertest');

describe('CRUD Operations on /wizards', () => {
  //GET
  test('GET: Retrieve a list of wizards', async () => {
    // AAA

    //arrange
    const path = `/api/v1/wizards`;
    const expectedStatusCode = 200;
    //act
    const { body, statusCode } = await request(app).get(path);

    //assert
    expect(statusCode).toBe(expectedStatusCode);
    expect(body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String)
        })
      ])
    );
  });

  //POST
  test('POST: Create a new wizard', async () => {
    const path = `/api/v1/wizards`;
    const expectedStatusCode = 201;
    const newData = { name: 'Hermione Grander' };

    const { body, statusCode } = await request(app).post(path).send(newData);

    expect(statusCode).toBe(expectedStatusCode);
    expect(body.data).toEqual(
      expect.objectContaining({
        name: expect.any(String)
      })
    );
  });

  //PUT
  test('PUT: Update a wizard', async () => {
    const id = 1;
    const path = `/api/v1/wizards/${id}`;
    const expectedStatusCode = 200;
    const newData = { name: 'Luna Lovegood' };

    const { body, statusCode } = await request(app).put(path).send(newData);
    expect(statusCode).toBe(expectedStatusCode);
    expect(body.data).toEqual({ id: 1, name: 'Luna Lovegood' }); //In the backend, id needs to be returned as a number for this to pass
  });

  //DELETE
  test('DELETE: Deletes a wizard', async () => {
    const id = 1;
    const path = `/api/v1/wizards/${id}`;
    const expectedStatusCode = 204;

    const { body, statusCode } = await request(app).delete(path);

    expect(statusCode).toBe(expectedStatusCode); //204
    expect(Object.keys(body).length).toBe(0); //Ensures the body is empty
  });
});
