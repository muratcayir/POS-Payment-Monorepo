import { ErrorType } from '../types'

export const OtpAuthenticator: Record<number, ErrorType> = {
  1000: {
    classId: 'OtpAuthenticator',
    code: 1000,
    statusCode: 400,
    title: {
      en_US: 'Warning!',
      tr_TR: 'Uyarı!',
    },
    message: {
      en_US: 'An unexpected error occurred. Please try again later.',
      tr_TR: 'Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
    },
  },
  1001: {
    classId: 'OtpAuthenticator',
    code: 1001,
    statusCode: 400,
    message: {
      en_US: 'You have sent too many verification codes. Please wait 15 minutes and try logging in again.',
      tr_TR: 'Çok sayıda doğrulama kodu gönderdin. Lütfen 15 dakika bekleyip tekrar giriş yapmayı dene.',
    },
    title: {
      en_US: 'Verification Code Limit Reached',
      tr_TR: 'Doğrulama Kodu Limiti Aşıldı',
    },
  },
  1002: {
    classId: 'OtpAuthenticator',
    code: 1002,
    statusCode: 400,
    message: {
      en_US: 'The OTP you entered is invalid. Please check and try again.',
      tr_TR: 'Girdiğin OTP geçersiz. Lütfen kontrol edip tekrar dene.',
    },
    title: {
      en_US: 'Invalid OTP',
      tr_TR: 'Geçersiz OTP',
    },
  },
  1003: {
    classId: 'OtpAuthenticator',
    code: 1003,
    statusCode: 400,
    message: {
      en_US: 'Your OTP has expired. Please request a new one to continue.',
      tr_TR: 'OTP süren doldu. Devam etmek için lütfen yeni bir OTP iste.',
    },
    title: {
      en_US: 'OTP Expired',
      tr_TR: 'OTP Süresi Doldu',
    },
  },
  1004: {
    classId: 'OtpAuthenticator',
    code: 1004,
    statusCode: 429,
    message: {
      en_US: 'You have exceeded the maximum number of OTP attempts. Please wait a while before trying again.',
      tr_TR: 'Maksimum OTP deneme sayısını aştın. Lütfen tekrar denemeden önce biraz bekle.',
    },
    title: {
      en_US: 'Too Many OTP Attempts',
      tr_TR: 'Çok Fazla OTP Denemesi',
    },
  },
  1005: {
    classId: 'OtpAuthenticator',
    code: 1005,
    statusCode: 400,
    message: {
      en_US: 'The OTP you provided is incorrect. Please try again.',
      tr_TR: 'Girdiğin OTP yanlış. Lütfen tekrar dene.',
    },
    title: {
      en_US: 'Incorrect OTP',
      tr_TR: 'Yanlış OTP',
    },
  },
  1006: {
    classId: 'OtpAuthenticator',
    code: 1006,
    statusCode: 404,
    message: {
      en_US: "We couldn't find your session or it has expired. Please start over.",
      tr_TR: 'Oturumunu bulamadık veya süresi doldu. Lütfen baştan başla.',
    },
    title: {
      en_US: 'Session Not Found',
      tr_TR: 'Oturum Bulunamadı',
    },
  },
  1007: {
    classId: 'OtpAuthenticator',
    code: 1007,
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
  1008: {
    classId: 'OtpAuthenticator',
    code: 1008,
    statusCode: 400,
    message: {
      en_US: 'The city or district you selected is invalid. Please choose a valid city and district to continue.',
      tr_TR: 'Seçtiğin şehir veya ilçe geçersiz. Lütfen devam etmek için geçerli bir şehir ve ilçe seç.',
    },
    title: {
      en_US: 'Invalid City or District',
      tr_TR: 'Geçersiz Şehir veya İlçe',
    },
  },
  1009: {
    classId: 'OtpAuthenticator',
    code: 1009,
    statusCode: 400,
    message: {
      en_US: 'Invalid phone number format',
      tr_TR: 'Geçersiz telefon numarası formatı',
    },
    title: {
      en_US: 'Invalid phone number format',
      tr_TR: 'Geçersiz telefon numarası formatı',
    },
  },
  1010: {
    classId: 'OtpAuthenticator',
    code: 1010,
    statusCode: 400,
    title: {
      en_US: 'Session ID Not Found',
      tr_TR: 'Oturum ID Bulunamadı',
    },
    message: {
      en_US: 'The session ID you provided could not be found. Please check and try again.',
      tr_TR: 'Sağladığınız oturum ID’si bulunamadı. Lütfen kontrol edip tekrar deneyin.',
    },
  },
  1011: {
    classId: 'OtpAuthenticator',
    code: 1011,
    statusCode: 400,
    title: {
      en_US: 'Missing Required Information',
      tr_TR: 'Gerekli Bilgiler Eksik',
    },
    message: {
      en_US: 'Please provide both the T.C. number and birthday to proceed.',
      tr_TR: 'Lütfen devam etmek için hem T.C. kimlik numarasını hem de doğum tarihini sağlayın.',
    },
  },
  1012: {
    classId: 'OtpAuthenticator',
    code: 1012,
    statusCode: 500,
    title: {
      en_US: 'Identity Verification Failed',
      tr_TR: 'Kimlik Doğrulama Başarısız',
    },
    message: {
      en_US: 'Identity verification process failed due to missing or incorrect information. Please try again.',
      tr_TR: 'Kimlik doğrulama işlemi eksik ya da yanlış bilgi nedeniyle başarısız oldu. Lütfen tekrar deneyin.',
    },
  },

  1013: {
    classId: 'OtpAuthenticator',
    code: 1013,
    statusCode: 404,
    title: {
      en_US: 'Operation Failed',
      tr_TR: 'İşlem Başarısız',
    },
    message: {
      en_US: 'The operation failed. Please check the information you entered and try again.',
      tr_TR: 'İşlem başarısız oldu. Lütfen girdiğiniz bilgileri kontrol edin ve tekrar deneyin.',
    },
  },

  1014: {
    classId: 'OtpAuthenticator',
    code: 1014,
    statusCode: 404,
    title: {
      en_US: 'Person Not Found',
      tr_TR: 'Kişi Bulunamadı',
    },
    message: {
      en_US: 'The person could not be found in the system. Please check the information and try again.',
      tr_TR: 'Sistemde kişi bulunamadı. Lütfen bilgilerinizi kontrol edin ve tekrar deneyin.',
    },
  },
}
