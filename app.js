require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const { v4: uuid } = require('uuid');
const path = require('path');
const { links } = require('./models');

//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//log requests
app.use(morgan('dev'));

//routes
app.use('/', require('./routes/router'));

app.listen(PORT, () => console.log(`running at: http://localhost:${PORT}`));