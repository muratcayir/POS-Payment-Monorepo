import { Car } from 'utils/models'
import { Request, Response } from 'express'
import { handleTransactionError } from 'utils/common'

export const getCarList = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.user

    const carList = await Car.findAll({
      where: { userId },
    })

    res.status(200).send({ carList })
  } catch (error) {
    await handleTransactionError(error, res)
  }
}
