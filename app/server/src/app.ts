'use strict';

import express, { Express, NextFunction, Request, Response } from 'express';
import dbClient from './services/dbClient';
import errorHandler from './middlewares/errorHandler';
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const routers = require('./routers');

require('dotenv').config();

export const port = process.env.NODE_PORT || 8888;

// enable cors
app.use(cors({
    origin: '*'
}));

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mount the router on the app
app.use(`/`, routers)

// error 404 not found
app.get('*', function(req: Request, res: Response){
  res.status(404).send('404 Error');
});

// Error handler
app.use(errorHandler)

// Connect DB and listen
console.log("Connecting....")
try {
  dbClient.connect().then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
  });
} catch (err) {
  console.log("DB connection failed, terminating server")
  throw err;
}
