import { z } from 'zod'

export const emailregex = /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/

export const baseUserInfo = z.object({
  name: z.string(),
  surname: z.string(),
  tcno: z.string(),
  birthdate: z.date(),
  phone: z.string(),
  email: z.string(),
  businessName: z.string().optional(),
  authorizedName: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  address: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type BaseUserInfo = z.infer<typeof baseUserInfo>

export const updateProfileInput = z.object({
  email: z.string().email().regex(emailregex),
  businessName: z.string(),
  authorizedName: z.string(),
  city: z.string().min(1, 'City selection required.').max(50, 'City cannot be more than 50 characters.'),
  district: z.string().min(1, 'District selection required.').max(50, 'District cannot have more than 50 characters.'),
  address: z.string().min(1, 'Address information required.').max(100, 'Address cannot be more than 100 characters.'),
})

export type UpdateProfileInput = z.infer<typeof updateProfileInput>
