/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { postRegistrationAuth } from '../../../Middleware/verify-token'
import { deleteEmergencyContact, getEmergencyContact, sendEmergencySMS, upsertEmergencyContact } from '../controller/emergency'

const router = Router()

router.get('/Emergency/getEmergencyContact', postRegistrationAuth, getEmergencyContact)
router.put('/Emergency/upsertEmergencyContact', postRegistrationAuth, upsertEmergencyContact)
router.post('/Emergency/sendEmergencySMS', postRegistrationAuth, sendEmergencySMS)
router.delete('/Emergency/deleteEmergencyContact/:contactId', postRegistrationAuth, deleteEmergencyContact)

export { router as emergencyRouter }
