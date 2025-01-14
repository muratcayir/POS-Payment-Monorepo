import { z } from 'zod'

export const friendlyMessage = z.object({
  message: z.string(),
  title: z.string(),
})
export type FriendlyMessage = z.infer<typeof friendlyMessage>

type ResultSuccessType<T> = {
  success: true
  data: T
}

type ResultErrorType<U> = {
  success: false
  error: U
}

export type ResultType<T, U> = ResultSuccessType<T> | ResultErrorType<U>

export const successResult = <T>(data: T): ResultSuccessType<T> => ({ success: true, data })

export const errorResult = <U>(error: U): ResultErrorType<U> => ({ success: false, error })
