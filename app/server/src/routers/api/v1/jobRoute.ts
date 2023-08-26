import express from 'express';
const router = express.Router()
import jobController from "#src/controllers/jobController" 
import jobValidation from '#src/middlewares/validations/jobValidation';
import { verifyAccessToken } from '#src/middlewares/auth';
import userValidation from '#src/middlewares/validations/userValidation';

router.get('/', jobController.getJobs)

// slug validation
router.use('/:slug', jobValidation.validateSlug)

router.get('/:slug', jobController.getJobDetail)
router.post('/:slug/apply', verifyAccessToken,
                            userValidation.userOnly,
                            jobController.applyJob)

export = router;