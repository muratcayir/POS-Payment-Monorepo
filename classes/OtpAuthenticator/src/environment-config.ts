import * as dotenv from 'dotenv'

dotenv.config()

const { SMS_API_URL, SMS_API_KEY, IDENTITY_VERIFICATION_URL, JWT_SECRET_KEY, ADDRESSES_LIST_URL, USE_DEVELOPMENT_OTP, DEVELOPMENT_CODE } = process.env

const requiredEnvironmentVariables = ['SMS_API_URL', 'SMS_API_KEY', 'IDENTITY_VERIFICATION_URL', 'JWT_SECRET_KEY', 'ADDRESSES_LIST_URL', 'USE_DEVELOPMENT_OTP', 'DEVELOPMENT_CODE']

for (const variableName of requiredEnvironmentVariables) {
  if (!process.env[variableName]) {
    throw new Error(`${variableName} is required`)
  }
}

export const environmentConfig = {
  smsApiUrl: SMS_API_URL!,
  smsApiKey: SMS_API_KEY!,
  identityVerificationUrl: IDENTITY_VERIFICATION_URL!,
  jwtSecretKey: JWT_SECRET_KEY!,
  addressesListUrl: ADDRESSES_LIST_URL!,
  developmentCode: DEVELOPMENT_CODE!,
  useDevelopmentOtp: USE_DEVELOPMENT_OTP!,
}
