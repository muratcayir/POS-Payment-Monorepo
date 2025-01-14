const otpChars = '0123456789'

export const generateOTP = (): string => {
  let code = ''
  for (let index = 0; index < 6; index++) {
    code += otpChars.charAt(Math.floor(Math.random() * otpChars.length))
  }
  return code
}

export const extractAreaCodeAndPhoneNumber = (toPhone: string) => {
  const areaCode = '+90'
  let phoneNumber = ''

  if (toPhone.length === 10 && !toPhone.startsWith('0')) {
    phoneNumber = toPhone
  } else {
    return null
  }

  return { areaCode, phoneNumber }
}
