/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { postRegistrationAuth } from '../../../Middleware/verify-token'
import { createContactlessPayment, initiateContactlessPayment } from '../controller/contactless-payment'
import { createPartialPayment } from '../controller/partial-payment'

const router = express.Router()

router.post('/contactless/initiateContactlessPayment', postRegistrationAuth, initiateContactlessPayment)
router.post('/contactless/pay', postRegistrationAuth, createContactlessPayment)
router.post('/partial-payment', createPartialPayment)

export { router as paymentRouter }
