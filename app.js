require('dotenv').config();

const express = require('express');
const app = express();

const swaggerUI = require('swagger-ui-express');
const openapi = require('yamljs').load('./docs/openapi.yaml');

const apiVersion = process.env.API_VERSION || 'v1';
const apiPrefix = `/api/${apiVersion}`;

const indexRouter = require('./routes'); //Root rote '/' serves as a basic index with general info
const apiRouter = require(`./routes/${apiVersion}`); //API router '/api/v1' serves as a main entry point to our api

const wizardRouter = require(`./routes/${apiVersion}/wizards`);

app.use(express.json()); //Middleware to parse request bodies to JSON format
app.use(apiPrefix + '/docs', swaggerUI.serve, swaggerUI.setup(openapi)); //Serve API documentation

app.use('/', indexRouter);
app.use(apiPrefix + '/', apiRouter);
app.use(apiPrefix + '/wizards', wizardRouter);

module.exports = app;
