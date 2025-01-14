/* eslint-disable @typescript-eslint/no-unsafe-return */
import crypto from 'node:crypto'
import { Response } from 'express'
import Errors, { CustomError } from './custom-error'
import { ErrorResponse } from './types'

export function generateHash(payload: object | string): string {
  return crypto.createHash('md5').update(JSON.stringify(payload)).digest('hex')
}

export const defaultErrorResponse = async (error?: Error, locale?: string): Promise<ErrorResponse> => {
  if (error instanceof CustomError) {
    return error.friendlyResponse
  }

  console.log('error', error)

  return new CustomError({ error: Errors.System[1000], addons: { detail: error?.message, stack: error?.stack }, localization: locale }).friendlyResponse
}

export const handleTransactionError = async (error: any, res: Response) => {
  const errorResponse = await defaultErrorResponse(error)
  res.status(500).send(errorResponse || 'An error occurred while processing the request. Please try again.')
}

export const acceptableCultures = new Set(['tr_TR', 'en_US'])

export const defaultLanguage = 'tr_TR'

export const DEFAULT_TZ = 'Europe/Istanbul'

export function getCulture(culture: string | undefined): string {
  culture = culture === 'tr-TR' ? 'tr_TR' : culture
  if (culture && acceptableCultures.has(culture)) {
    return culture
  }
  return defaultLanguage
}
