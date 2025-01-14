import { ErrorType } from '../types'

export const EmergencyContact: Record<number, ErrorType> = {
  4000: {
    classId: 'EmergencyContact',
    code: 4000,
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
  4001: {
    classId: 'EmergencyContact',
    code: 4001,
    statusCode: 400,
    title: {
      en_US: 'Invalid Phone Number',
      tr_TR: 'Geçersiz Telefon Numarası',
    },
    message: {
      en_US: 'The phone number you provided is invalid. Please check and try again.',
      tr_TR: 'Sağladığınız telefon numarası geçersiz. Lütfen kontrol edin ve tekrar deneyin.',
    },
  },
  4002: {
    classId: 'EmergencyContact',
    code: 4002,
    statusCode: 404,
    title: {
      en_US: 'EmergencyContact Contact Not Found',
      tr_TR: 'Acil Durum Kişisi Bulunamadı',
    },
    message: {
      en_US: 'The emergency contact you are trying to delete does not exist. Please check the contact ID and try again.',
      tr_TR: 'Silmek istediğiniz acil durum kişisi bulunamadı. Lütfen kişi ID’sini kontrol edin ve tekrar deneyin.',
    },
  },
  4003: {
    classId: 'EmergencyContact',
    code: 4003,
    statusCode: 400,
    title: {
      en_US: 'Invalid Phone Number',
      tr_TR: 'Geçersiz Telefon Numarası',
    },
    message: {
      en_US: 'The phone number provided is invalid. Please check the number and try again.',
      tr_TR: 'Sağlanan telefon numarası geçersiz. Lütfen numarayı kontrol edin ve tekrar deneyin.',
    },
  },
  4004: {
    classId: 'EmergencyContact',
    code: 4004,
    statusCode: 400,
    title: {
      en_US: 'Sender and Recipient are the Same',
      tr_TR: 'Gönderici ve Alıcı Aynı',
    },
    message: {
      en_US: 'The sender and recipient cannot be the same. Please choose a different recipient.',
      tr_TR: 'Gönderici ve alıcı aynı olamaz. Lütfen farklı bir alıcı seçin.',
    },
  },
  4005: {
    classId: 'EmergencyContact',
    code: 4005,
    statusCode: 500,
    title: {
      en_US: 'SMS Delivery Failed',
      tr_TR: 'SMS Gönderimi Başarısız',
    },
    message: {
      en_US: 'Some SMS deliveries failed. Please check the phone numbers and try again.',
      tr_TR: 'Bazı SMS gönderimleri başarısız oldu. Lütfen telefon numaralarını kontrol edin ve tekrar deneyin.',
    },
  },
}
