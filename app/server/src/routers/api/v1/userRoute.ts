import express from 'express';
const router = express.Router()
import userController from "#src/controllers/userController" 
import { verifyAccessToken } from "#src/middlewares/auth"
import userValidation from '#src/middlewares/validations/userValidation';

router.post('/register', userValidation.register, userController.register)
router.post('/login', userValidation.login, userController.login)

// below requires access token
router.use('/', verifyAccessToken, userValidation.userOnly)
router.get('/profile', userController.profile)
router.get('/applied_jobs', userController.appliedJobs)



export = router;