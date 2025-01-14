import Errors, { CustomError } from 'utils/custom-error'
import { Car } from 'utils/models'
import { Request, Response } from 'express'
import { handleTransactionError } from 'utils/common'
import { sequelize } from 'config/database'
import { vehicleInfoSchema, VehicleInfoSchema } from '../models'
import { fetchVehicle } from '../services/car'

export const getBrands = async (req: Request, res: Response): Promise<void> => {
  try {
    const brandsList = await fetchVehicle()
    const brands = brandsList.map((vehicle: any) => vehicle.marka)

    res.status(200).json(brands)
  } catch (error) {
    await handleTransactionError(error, res)
  }
}

export const getModelsByBrand = async (req: Request, res: Response): Promise<void> => {
  try {
    const brand = req.params.brand || req.query.brand

    if (!brand) {
      res.status(400).json({ message: 'Brand is required' })
    }

    const vehicleList = await fetchVehicle()

    const vehicle = vehicleList.find((v: any) => v.marka === brand)

    if (vehicle) {
      res.status(200).json(vehicle.modeller)
    } else {
      res.status(404).json({ message: 'Brand not found' })
    }
  } catch (error) {
    await handleTransactionError(error, res)
  }
}

export const registerVehicle = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction()
  try {
    const input: VehicleInfoSchema = vehicleInfoSchema.parse(req.body)

    const { userId } = req.user

    if (!userId) {
      throw new CustomError({ error: Errors.Car[3001] })
    }

    if (!input.year || !input.licensePlate) {
      throw new CustomError({ error: Errors.Car[3002] })
    }

    const vehicles = await fetchVehicle()
    const vehicle = vehicles.find((v: any) => v.marka === input.brand)

    if (!vehicle || !vehicle.modeller.includes(input.model)) {
      throw new CustomError({ error: Errors.Car[3003] })
    }

    await Car.create({
      userId,
      make: input.brand,
      model: input.model,
      year: input.year,
      plateNumber: input.licensePlate,
    })

    await transaction.commit()

    res.status(201).json({ message: 'Vehicle registered successfully' })
  } catch (error) {
    await transaction.rollback()
    await handleTransactionError(error, res)
  }
}
