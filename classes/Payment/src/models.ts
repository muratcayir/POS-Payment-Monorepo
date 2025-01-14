import { z } from 'zod'
import { paymentSchema } from 'utils/commonSchemas'

export const contactlessPaymentSchema = paymentSchema.extend({
  partialAmount: z.number().positive().optional(),
})

export type ContactlessPaymentSchema = z.infer<typeof contactlessPaymentSchema>
