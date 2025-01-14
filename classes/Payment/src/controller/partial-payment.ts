import { Request, Response } from 'express'
import { partialPaymentSchema } from 'utils/commonSchemas'
import Errors, { CustomError } from 'utils/custom-error'
import { handleTransactionError } from 'utils/common'

async function getTotalAmountFromDatabase(rideId: string): Promise<any> {
  return rideId
}
async function updateRemainingAmountInDatabase(rideId: string, remainingAmount: number): Promise<number> {
  return remainingAmount
}

export const createPartialPayment = async (req: Request, res: Response) => {
  const validation = partialPaymentSchema.safeParse(req.body)

  if (!validation.success) {
    throw new CustomError({ error: Errors.Payment['5001'] })
  }

  const { rideId, partialAmount } = validation.data

  try {
    const totalAmount = await getTotalAmountFromDatabase(rideId)
    const remainingAmount = totalAmount - partialAmount

    if (remainingAmount < 0) {
      throw new CustomError({ error: Errors.Payment['5001'] }) // Kısmi ödeme tutarı toplam tutardan büyük olamaz.
    }

    await updateRemainingAmountInDatabase(rideId, remainingAmount)

    res.status(200).json({
      message: 'Kısmi ödeme başarılı.',
      remainingAmount,
    })
  } catch (error) {
    await handleTransactionError(error, res)
  }
}
