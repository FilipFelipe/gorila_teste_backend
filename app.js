require('dotenv').config();
const app = require('express')();
const consign = require('consign');

consign()
    .then('./src/config/middlewares')
    .then('./src/config/multer')
    .then('./src/utils')
    .then('./src/controllers')
    .then('./src/models')
    .then('./src/routes')
    .into(app);

module.exports = app