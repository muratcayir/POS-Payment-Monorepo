import { FriendlyMessage } from './commonSchemas'

export interface ErrorResponseBody {
  [key: string]: unknown
  classId: string
  code: number
  message?: string
  _friendlyMessage?: FriendlyMessage
}

export interface ErrorResponse {
  statusCode: number
  body: ErrorResponseBody
}

export interface BaseError {
  code: number
  message: string
}

export interface TErrorMessages {
  System: BaseError[]
  OtpAuthenticator: BaseError[]
  User: BaseError[]
  Car: BaseError[]
  Payment: BaseError[]
  EmergencyContact: BaseError[]
}

export type ClassKey = keyof TErrorMessages

export type Locales = 'tr_TR' | 'en_US'

export interface ErrorType<Code = any> {
  classId: ClassKey
  code: number | Code
  statusCode: number
  message: { [key in Locales]?: string }
  title?: { [key in Locales]?: string }
  alert?: boolean
}

export interface CustomErrorArguments<T> {
  error: ErrorType
  localization?: string
  addons?: T | undefined
  params?: { [key in string]: string }
}
