import express from 'express';
const router = express.Router()
import adminController from "#src/controllers/adminController" 
import { verifyAccessToken } from "#src/middlewares/auth"
import adminValidation from '#src/middlewares/validations/adminValidation';
import multerUtil from '#src/utils/multerUtil';

// multer image middleware
var imageUpload = multerUtil.uploadJobImage();

router.post('/login', adminController.login)

// requires admin access below here
router.use('/', verifyAccessToken, adminValidation.adminOnly)

router.get('/jobs', adminController.getJobs)
router.post('/jobs', imageUpload.single('file'),
                     adminValidation.createJob, 
                     adminController.createJob)

router.delete('/jobs/:id', adminValidation.deleteJob, adminController.deleteJob)

// router.get('/admin/profile', verifyAccessToken, adminController.profile)



export = router;