/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { sendOtp, verifyOtp } from '../controller/otp'
import { verifyUserIdentity } from '../controller/verify-user-identity'
import { addAddress, addEmail } from '../controller/signup'
import { preRegistrationAuth, postRegistrationAuth } from '../../../Middleware/verify-token'

const router = express.Router()

router.post('/OtpAuthenticator/sendOtp', sendOtp)
router.post('/OtpAuthenticator/verifyOtp', verifyOtp)
router.post('/OtpAuthenticator/verifyUserIdentity', preRegistrationAuth, verifyUserIdentity)
router.post('/OtpAuthenticator/addEmail', preRegistrationAuth, addEmail)
router.post('/OtpAuthenticator/addAddress', postRegistrationAuth, addAddress)

export { router as otpRouter }
