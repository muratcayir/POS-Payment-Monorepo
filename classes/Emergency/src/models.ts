import { z } from 'zod'

export const userInfoRegex = /^[ A-Za-zÇÖÜçöüĞğİıŞş]+$/

export const upsertEmergencyContactInput = z.object({
  name: z.string().regex(userInfoRegex),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be 10 digits long')
    .regex(/^[1-9]\d{9}$/, 'Phone number must be 10 digits long and should not start with 0'),
})

export type UpsertEmergencyContactInput = z.infer<typeof upsertEmergencyContactInput>
