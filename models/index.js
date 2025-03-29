const fs = require('fs')
const path = require('path')
const db = require('../config/db.js')
const { DataTypes} = require('sequelize')
const models = {};

//Dynamically import models from this directory and attach them to temporary models objection to initiate associations
fs.readdirSync(__dirname)
  .filter((files) => files.endsWith('.js') && files !== 'index.js')
  .forEach((file) => {
    const filePath = path.join(__dirname, file)
    const model = require(filePath)(db, DataTypes)
    models[model.name] = model
  })

//Initiate association
Object.values(models).forEach((model) => {
  if(model.associate) {
    model.associate(models)
  }
})

module.exports = db