import { Response } from 'express'

export const paymentSuccess = (res: Response, paymentId: string) => {
  res.status(200).json({ message: `Ödeme başarıyla tamamlandı. Ödeme ID: ${paymentId}` })
}

export const paymentFailure = (res: Response, reason: string) => {
  res.status(400).json({ message: `Ödeme başarısız oldu: ${reason}` })
}
