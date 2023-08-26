import express, { Router } from 'express';
import apiV1Route from "./api/v1"

const app = express()
const router = express.Router()
const swaggerDocRouter = require("./swaggerDoc");


// api v1
router.use('/api/v1', apiV1Route)

// swagger doc
router.use('/', swaggerDocRouter)

export = router;