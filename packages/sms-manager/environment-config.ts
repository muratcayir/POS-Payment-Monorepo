import * as dotenv from 'dotenv'

dotenv.config()

const { SMS_API_URL, SMS_API_KEY } = process.env

const requiredEnvironmentVariables = ['SMS_API_URL', 'SMS_API_KEY']

for (const variableName of requiredEnvironmentVariables) {
  if (!process.env[variableName]) {
    throw new Error(`${variableName} is required`)
  }
}

export const environmentConfig = {
  smsApiUrl: SMS_API_URL!,
  smsApiKey: SMS_API_KEY!,
}
