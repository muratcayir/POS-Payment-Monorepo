/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { getCarList } from '../controller/car'
import { postRegistrationAuth } from '../../../Middleware/verify-token'
import { getProfile, updateProfile } from '../controller/profile'

const router = Router()

router.get('/User/getCarList', postRegistrationAuth, getCarList)
router.get('/User/getProfile', postRegistrationAuth, getProfile)
router.post('/User/updateProfile', postRegistrationAuth, updateProfile)

export { router as userRouter }
