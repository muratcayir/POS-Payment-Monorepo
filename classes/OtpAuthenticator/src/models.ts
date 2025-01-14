import { z } from 'zod'

export const sendOtpSchemaInput = z.object({
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits long')
    .regex(/^[1-9]\d{9}$/, 'Phone number must be 10 digits long and should not start with 0'),
})

export type SendOtpSchema = z.infer<typeof sendOtpSchemaInput>

export const verifyOtpSchemaInput = z.object({
  otp: z.string().regex(/^\d+$/, 'OTP must contain only digits'),
})

export type VerifyOtpSchema = z.infer<typeof verifyOtpSchemaInput>

export const tcNoServicesSchemaInput = z.object({
  tcno: z.string().min(11, 'T.C. Kimlik Numarası 11 haneli olmalıdır').regex(/^\d+$/, 'T.C. Kimlik Numarası yalnızca rakamlardan oluşmalıdır'),
  birthday: z.string(),
})

export type TcNoServicesSchemaInput = z.infer<typeof tcNoServicesSchemaInput>

export const tcNoServicesSchemaOutput = z.object({
  statusCode: z.number(),
  body: z.object({
    message: z.string(),
    errorCode: z.number(),
    isDone: z.boolean(),
    content: z.object({
      tcPerson: z.object({
        personInfo: z.object({
          name: z.string(),
          surname: z.string(),
          gender: z.string(),
        }),
      }),
    }),
  }),
})

export type TcNoServicesSchemaOutput = z.infer<typeof tcNoServicesSchemaOutput>

export const addEmailSchema = z.object({
  email: z.string().email('Enter a valid email address.').min(1, 'Email address required.').max(100, 'Email address cannot be more than 100 characters.'),
})

export type AddEmailSchema = z.infer<typeof addEmailSchema>

export const addAddressSchema = z.object({
  city: z.string().min(1, 'City selection required.').max(50, 'City cannot be more than 50 characters.'),
  district: z.string().min(1, 'District selection required.').max(50, 'District cannot have more than 50 characters.'),
  address: z.string().min(1, 'Address information required.').max(100, 'Address cannot be more than 100 characters.'),
})

export type AddAddressSchema = z.infer<typeof addAddressSchema>

export const authStatus = z.enum(['SIGNUP_REQUIRED', 'SUCCESS', 'AUTH_FAILED_INVALID_OTP', 'TOO_MANY_ATTEMPTS'])
