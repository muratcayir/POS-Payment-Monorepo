import { ErrorResponse, ClassKey, ErrorResponseBody, CustomErrorArguments } from './types'

import messages from './error-messages'

import * as Errors from './custom-error/index'

export default Errors

export class CustomError<T = unknown> extends Error {
  public readonly classId!: ClassKey

  public readonly code!: number

  public readonly statusCode!: number

  public issues?: T = undefined

  public readonly message!: string

  public title?: string = 'Error Message'

  constructor(classId: ClassKey, code: number, statusCode?: number, issues?: T)
  constructor(errorArguments: CustomErrorArguments<T>)
  constructor(...arguments_: any[]) {
    super('')

    if (typeof arguments_[0] === 'string') {
      const classId = arguments_[0] as ClassKey
      const code = arguments_[1] as number
      const statusCode = arguments_[2] as number
      const issues = arguments_[3] as T

      const errorMessage = (messages[classId] || []).find((message: { code: number }) => message.code === code)
      this.message = errorMessage ? errorMessage.message : `${classId}.${code}`

      this.code = code
      this.statusCode = statusCode || 400
      this.issues = CustomError.getAddons(issues)
      this.classId = classId

      Object.setPrototypeOf(this, CustomError.prototype)
    } else if (typeof arguments_[0] === 'object') {
      let { error } = arguments_[0] as CustomErrorArguments<T>
      const { addons, localization, params } = arguments_[0] as CustomErrorArguments<T> & { localization: 'tr_TR' | 'en_US' }
      if (!error) {
        error = {
          classId: 'System',
          code: 1000,
          statusCode: 500,
          title: { en_US: 'Something went wrong', tr_TR: 'Something went wrong' },
          message: { en_US: 'Service error', tr_TR: 'servis Hatası' },
        }
      }

      const { classId, statusCode, code, message, title } = error
      this.message = localization && message[localization] ? (message[localization] as string) : (message.tr_TR ?? 'no message provided')
      if (title) {
        this.title = localization && title && title[localization] ? (title[localization] as string) : (title.tr_TR ?? 'Error Message')
      }

      if (params && typeof params === 'object') {
        // eslint-disable-next-line guard-for-in
        for (const key in params) {
          this.message = this.message.replace(`{{${key}}}`, params[key])
        }
      }

      this.code = code
      this.statusCode = statusCode
      this.issues = CustomError.getAddons(addons)
      this.classId = classId

      Object.setPrototypeOf(this, CustomError.prototype)
    }
  }

  get response(): ErrorResponse {
    return {
      statusCode: this.statusCode,
      body: {
        code: this.code,
        classId: this.classId,
        title: this.title,
        message: this.message,
        ...this.issues,
      },
    }
  }

  get friendlyResponse(): ErrorResponse {
    return {
      statusCode: this.statusCode,
      body: {
        code: this.code,
        classId: this.classId,
        title: this.title,
        message: this.message,
        _friendlyMessage: {
          title: this.title || '',
          message: this.message || '',
        },
        ...this.issues,
      },
    }
  }

  get responseBody(): ErrorResponseBody {
    return this.response.body
  }

  private static getAddons(addons: any) {
    if (typeof addons === 'string') {
      return { detail: addons }
    }
    return addons
  }
}
