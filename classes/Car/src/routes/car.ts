/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { getBrands, getModelsByBrand, registerVehicle } from '../controller/car'
import { uploadFile, upload } from '../controller/file'
import { postRegistrationAuth } from '../../../Middleware/verify-token'

const router = Router()

router.get('/Car/getBrands', postRegistrationAuth, getBrands)
router.get('/Car/getModelsByBrand/:brand', postRegistrationAuth, getModelsByBrand)
router.post('/Car/registerVehicle', postRegistrationAuth, registerVehicle)
router.post('/Car/uploadFile', postRegistrationAuth, upload.single('file'), uploadFile)

export { router as carRouter }
