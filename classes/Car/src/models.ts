import { z } from 'zod'

export const vehicleInfoSchema = z.object({
  brand: z.string().min(1, 'Brand is required.').max(50, 'Brand cannot exceed 50 characters.'),
  model: z.string().min(1, 'Model is required.').max(50, 'Model cannot exceed 50 characters.'),
  year: z.number().min(1886, 'Year must be 1886 or later.').max(new Date().getFullYear(), `Year cannot exceed ${new Date().getFullYear()}.`),
  licensePlate: z.string().min(1, 'License plate is required.').max(20, 'License plate cannot exceed 20 characters.'),
})

export type VehicleInfoSchema = z.infer<typeof vehicleInfoSchema>
