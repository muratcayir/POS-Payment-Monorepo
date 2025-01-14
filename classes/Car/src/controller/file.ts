import Errors, { CustomError } from 'utils/custom-error'
import express, { Express, Request, Response } from 'express'
import { File as ModelFile, Car } from 'utils/models'
import multer from 'multer'
import fs from 'node:fs'
import path from 'node:path'
import { handleTransactionError } from 'utils/common'

const router = express.Router()
const uploadDirection = path.join(__dirname, 'uploads')

if (!fs.existsSync(uploadDirection)) {
  fs.mkdirSync(uploadDirection)
}
const allowedFileTypes = new Set(['image/jpeg', 'image/png', 'application/pdf'])

const storage = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) {
    const uploadPath = path.join(__dirname, 'uploads')
    callback(null, uploadPath)
  },
  filename(req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
    callback(null, `${Date.now()}-${file.originalname}`)
  },
})

const fileFilter = (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
  if (allowedFileTypes.has(file.mimetype)) {
    callback(null, true)
  } else {
    callback(new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.'))
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB dosya boyutu sınırı
  },
})

export const uploadFile = async (req: Request, res: Response): Promise<void> => {
  const { carId } = req.body

  try {
    if (!carId) {
      throw new CustomError({ error: Errors.Car[3004] })
    }

    const car = await Car.findByPk(carId)
    if (!car) {
      throw new CustomError({ error: Errors.Car[3005] })
    }

    if (!req.file) {
      throw new CustomError({ error: Errors.Car[3006] })
    }

    const file = await ModelFile.create({
      fileName: req.file.filename,
      fileType: req.file.mimetype,
      filePath: req.file.path,
      carId: car.id,
    })

    res.status(200).send({ message: 'File uploaded successfully', file })
  } catch (error) {
    console.error('Error during file upload:', error)
    await handleTransactionError(error, res)
  }
}

export { router as fileRouter }
