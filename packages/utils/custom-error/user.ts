import { ErrorType } from '../types'

export const User: Record<number, ErrorType> = {
  2000: {
    classId: 'User',
    code: 2000,
    statusCode: 400,
    title: {
      en_US: 'Warning!',
      tr_TR: 'Uyarı !',
    },
    message: {
      en_US: 'An error occured',
      tr_TR: 'Genel hata',
    },
  },
  2001: {
    classId: 'OtpAuthenticator',
    code: 2000,
    statusCode: 400,
    message: {
      en_US: 'The email address you entered ({{email}}) is already registered with us. Please use a different email.',
      tr_TR: 'Girdiğin ({{email}}) e-posta adresi zaten bizde kayıtlı. Lütfen farklı bir e-posta kullan.',
    },
    title: {
      en_US: 'Email Already Registered',
      tr_TR: 'E-posta Zaten Kayıtlı',
    },
  },
  2002: {
    classId: 'User',
    code: 2002,
    statusCode: 400,
    title: {
      en_US: 'User ID Not Provided',
      tr_TR: 'Kullanıcı ID Sağlanmadı',
    },
    message: {
      en_US: 'The user ID is missing. Please provide a valid user ID and try again.',
      tr_TR: 'Kullanıcı ID’si eksik. Lütfen geçerli bir kullanıcı ID’si sağlayın ve tekrar deneyin.',
    },
  },
  2003: {
    classId: 'User',
    code: 2003,
    statusCode: 400,
    title: {
      en_US: 'Profile Information Not Provided',
      tr_TR: 'Profil Bilgisi Sağlanmadı',
    },
    message: {
      en_US: 'Profile information is required to proceed. Please provide the necessary details.',
      tr_TR: 'Devam etmek için profil bilgileri gereklidir. Lütfen gerekli bilgileri sağlayın.',
    },
  },
}
