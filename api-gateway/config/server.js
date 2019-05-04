const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    "origin": "*",
    "methods": "OPTIONS, GET, PUT, POST, DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = app;
