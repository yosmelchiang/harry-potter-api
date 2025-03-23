require('dotenv').config()

const app = require(process.cwd() + '/app.js')
const { describe } = require('node:test')
const request = require('supertest')
const apiVersion = process.env.API_VERSION || 'v1'

const describeOrSkip = apiVersion === 'v1' ? describe : describe.skip

describeOrSkip('CRUD Operations on /wizards', () => {

  //GET
  test('GET: Retrieve a list of wizards', async () => {
    // AAA

    //arrange
    const path = '/api/v1/wizards'
    const expectedStatusCode = 200
    //act
    const { body, statusCode } = await request(app).get(path)
    console.log('body:', body)

    //assert
    expect(statusCode).toBe(expectedStatusCode)
    expect(body).toMatchObject({
      data: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String)
        })
      ])
    })

  })

  //POST
  test('POST: Create a new wizard', async () => {
    const path = '/api/v1/wizards'
    const expectedStatusCode = 201

    const { body, statusCode } = await request(app).post(path)

    expect(statusCode).toBe(expectedStatusCode)
    expect(body).toMatchObject({})
  })
})