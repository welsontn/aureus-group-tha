import express from 'express';
const router = express.Router();
import swaggerUi from 'swagger-ui-express';
import fs from "fs";
import YAML from 'yaml';

import * as config from '#src/project.config';

const file = fs.readFileSync(config.OPENAPI_YAML, 'utf8')
const swaggerDocument = YAML.parse(file)

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


export = router;