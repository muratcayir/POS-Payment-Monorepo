import { TErrorMessages } from './types'

const messages: TErrorMessages = {
  System: [
    {
      code: 1000,
      message: 'An error occurred while processing your request.',
    },
    {
      code: 1001,
      message: 'User identity is missing',
    },
    {
      code: 1002,
      message: 'User id is missing',
    },
  ],
  User: [
    {
      code: 1000,
      message: 'An error occurred while processing your request.',
    },
    {
      code: 1001,
      message: 'User identity is missing',
    },
    {
      code: 1002,
      message: 'User id is missing',
    },
  ],
  OtpAuthenticator: [
    {
      code: 1000,
      message: 'An error occurred while processing your request.',
    },
    {
      code: 1005,
      message: 'Kimlik Numarası alanına girdiğiniz değer geçerli bir T.C. Kimlik Numarası değildir.',
    },
    {
      code: 1006,
      message: 'Aradığınız doğum tarihi bilgisi ile kişinin doğum tarihi uyuşmamaktadır.',
    },
  ],
  Car: [
    {
      code: 1000,
      message: 'An error occurred while processing your request.',
    },
  ],
  Payment: [
    {
      code: 1000,
      message: 'An error occurred while processing your request.',
    },
  ],
  EmergencyContact: [
    {
      code: 1000,
      message: 'An error occurred while processing your request.',
    },
  ],
}

export default messages
