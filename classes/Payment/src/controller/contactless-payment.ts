import { Request, Response } from 'express'
import Errors, { CustomError } from 'utils/custom-error'
import { ContactlessPayment } from '../services/methods/contactless'
import { PaymentProcessor } from '../services/payment-processor'
import { contactlessPaymentSchema } from '../models'

export const createContactlessPayment = async (req: Request, res: Response): Promise<void> => {
  const validateSchema = contactlessPaymentSchema.parse(req.body)

  if (!validateSchema) {
    throw new CustomError({ error: Errors.Payment['5001'] })
  }

  const { deviceId, amount, partialAmount } = validateSchema

  try {
    const contactlessPayment = new ContactlessPayment(deviceId)
    const paymentProcessor = new PaymentProcessor(contactlessPayment)
    await paymentProcessor.processPayment(amount, partialAmount)

    res.status(200).json({ message: 'Temassız ödeme başarılı.' })
  } catch {
    throw new CustomError({ error: Errors.Payment['5002'] })
  }
}

export const initiateContactlessPayment = async (req: Request, res: Response) => {
  const { deviceId, amount } = req.body
  try {
    const contactlessPayment = new ContactlessPayment(deviceId)
    await contactlessPayment.checkNFC()

    res.status(200).json({ message: 'NFC kontrolü başarılı. Ödeme başlatılabilir.', amount })
  } catch {
    throw new CustomError({ error: Errors.Payment['5003'] })
  }
}
