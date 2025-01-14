import { z } from 'zod'

export const paymentType = z.enum(['CONTACTLESS', 'CARD', 'CASH', 'CUZDAN', 'IBAN', 'QR', 'SMS', 'LINK'])

export type PaymentType = z.infer<typeof paymentType>

export const paymentSchema = z.object({
  paymentType,
  deviceId: z.string().min(1, 'Cihaz kimliği gereklidir.'),
  amount: z.number().positive('Ödeme miktarı pozitif bir sayı olmalıdır.'),
})

export type PaymentSchema = z.infer<typeof paymentSchema>

export const partialPaymentSchema = z.object({
  rideId: z.string().min(1, 'Yolculuk kimliği gereklidir.'),
  partialAmount: z.number().positive('Ödeme miktarı pozitif bir sayı olmalıdır.'),
})

export type PartialPaymentSchema = z.infer<typeof partialPaymentSchema>
