import { ErrorType } from '../types'

export const Payment: Record<number, ErrorType> = {
  5000: {
    classId: 'Payment',
    code: 5000,
    statusCode: 500,
    title: {
      en_US: 'Internal Server Error',
      tr_TR: 'Sunucu Hatası',
    },
    message: {
      en_US: 'An unexpected error occurred. Please try again later.',
      tr_TR: 'Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar dene.',
    },
  },
  5001: {
    classId: 'Payment',
    code: 5001,
    statusCode: 400,
    title: {
      en_US: 'Invalid Data',
      tr_TR: 'Geçersiz Veri',
    },
    message: {
      en_US: 'The data provided is invalid. Please check your input and try again.',
      tr_TR: 'Sağlanan veri geçersiz. Lütfen girdiğinizi kontrol edin ve tekrar deneyin.',
    },
  },
  5002: {
    classId: 'Payment',
    code: 5002,
    statusCode: 500,
    title: {
      en_US: 'Contactless Payment Failed',
      tr_TR: 'Temassız Ödeme Başarısız',
    },
    message: {
      en_US: 'The contactless payment process failed. Please try again.',
      tr_TR: 'Temassız ödeme işlemi başarısız oldu. Lütfen tekrar deneyin.',
    },
  },
  5003: {
    classId: 'Payment',
    code: 5003,
    statusCode: 400,
    title: {
      en_US: 'NFC Check Failed',
      tr_TR: 'NFC Kontrolü Başarısız',
    },
    message: {
      en_US: 'NFC check failed. Please ensure your device supports NFC and try again.',
      tr_TR: 'NFC kontrolü başarısız oldu. Lütfen cihazınızın NFC desteklediğinden emin olun ve tekrar deneyin.',
    },
  },
}
