import express from 'express';
import userRoute from "./userRoute";
import jobRoute from "./jobRoute";
import adminRoute from "./adminRoute";

const app = express()
const router = express.Router()

router.use('/users', userRoute)
router.use('/jobs', jobRoute)
router.use('/admin', adminRoute)

export = router;