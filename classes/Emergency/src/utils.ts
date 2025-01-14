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
