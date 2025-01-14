import { ErrorType } from '../types'

export const System: Record<number, ErrorType> = {
  1000: {
    classId: 'System',
    code: 1000,
    statusCode: 500,
    title: {
      en_US: 'Service error',
      tr_TR: 'Servis hatası',
    },
    message: {
      en_US: 'Service error',
      tr_TR: 'Servis hatası',
    },
  },
  1001: {
    classId: 'System',
    code: 1001,
    statusCode: 500,
    message: {
      en_US: 'User id cannot be found',
      tr_TR: 'Kullanıcı numaranız bulunamadı',
    },
  },
  1002: {
    classId: 'System',
    code: 1002,
    statusCode: 403,
    message: {
      en_US: 'Auth service error',
      tr_TR: 'Yetkilendirme servisi hatası',
    },
  },
}
