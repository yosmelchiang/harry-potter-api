require('dotenv').config();

const express = require('express');
const app = express();

const swaggerUI = require('swagger-ui-express');
const openapi = require('yamljs').load('./docs/openapi.yaml');

const jsend = require('jsend')

const apiPrefix = `/api/v1`;
const indexRouter = require('./routes'); //Root rote '/' serves as a basic index with general info
const wizardRouter = require(`./routes/wizards`);
const authRouter = require('./routes/auth.js')

app.use(express.json()); // Middleware to parse request bodies to JSON format
app.use('/api' + '/docs', swaggerUI.serve, swaggerUI.setup(openapi)); //Serve API documentation
app.use(jsend.middleware) // Prettify JSON responses

app.use('/', indexRouter);
app.use(apiPrefix + '/wizards', wizardRouter);
app.use(apiPrefix + '/login', authRouter)

app.use((req, res) => { //Responds with a 404 for non-endpoints
  res.status(404).jsend.fail('Resource not found')
})

module.exports = app;
