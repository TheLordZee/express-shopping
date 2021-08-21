const express = require('express');
const morgan = require('morgan')
const itemRoutes = require('./itemRoutes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'))

app.use('/items', itemRoutes)

module.exports = app