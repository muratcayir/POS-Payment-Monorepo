import { ErrorType } from '../types'

export const Car: Record<number, ErrorType> = {
  3000: {
    classId: 'Car',
    code: 2000,
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
  3001: {
    classId: 'Car',
    code: 3001,
    statusCode: 400,
    title: {
      en_US: 'User ID Not Found',
      tr_TR: 'Kullanıcı ID Bulunamadı',
    },
    message: {
      en_US: 'Oops, we couldn’t find the user ID you provided. Please check and try again.',
      tr_TR: 'Üzgünüz, sağladığınız kullanıcı ID’sini bulamadık. Lütfen kontrol edip tekrar deneyin.',
    },
  },
  3002: {
    classId: 'Car',
    code: 3002,
    statusCode: 400,
    title: {
      en_US: 'Incomplete Vehicle Details',
      tr_TR: 'Eksik Araç Detayları',
    },
    message: {
      en_US: 'Oops! It looks like you forgot to enter the year or license plate. Please provide them to proceed.',
      tr_TR: 'Oops! Yılı veya plaka numarasını girmeyi unuttun gibi görünüyor. Devam etmek için lütfen onları gir.',
    },
  },

  3003: {
    classId: 'Car',
    code: 3003,
    statusCode: 400,
    title: {
      en_US: 'Brand or Model Not Found',
      tr_TR: 'Marka veya Model Bulunamadı',
    },
    message: {
      en_US: 'Hmm, we couldn’t find the brand or model you entered. Please check and try again.',
      tr_TR: 'Hmm, girdiğin marka veya modeli bulamadık. Lütfen kontrol edip tekrar dene.',
    },
  },

  3004: {
    classId: 'Car',
    code: 3004,
    statusCode: 400,
    title: {
      en_US: 'Car ID Not Found',
      tr_TR: 'Araç ID Bulunamadı',
    },
    message: {
      en_US: 'Oops, we couldn’t find the car ID you provided. Please check and try again.',
      tr_TR: 'Üzgünüz, sağladığınız araç ID’sini bulamadık. Lütfen kontrol edip tekrar deneyin.',
    },
  },

  3005: {
    classId: 'Car',
    code: 3005,
    statusCode: 404,
    title: {
      en_US: 'Car Not Found',
      tr_TR: 'Araç Bulunamadı',
    },
    message: {
      en_US: 'It seems the car you are looking for does not exist. Please check and try again.',
      tr_TR: 'Aradığınız araç bulunamadı. Lütfen kontrol edip tekrar deneyin.',
    },
  },

  3006: {
    classId: 'Car',
    code: 3006,
    statusCode: 400,
    title: {
      en_US: 'File Not Found',
      tr_TR: 'Dosya Bulunamadı',
    },
    message: {
      en_US: 'We couldn’t find the file you tried to upload. Please make sure to upload the correct file and try again.',
      tr_TR: 'Yüklemeye çalıştığınız dosyayı bulamadık. Lütfen doğru dosyayı yüklediğinizden emin olun ve tekrar deneyin.',
    },
  },
}
