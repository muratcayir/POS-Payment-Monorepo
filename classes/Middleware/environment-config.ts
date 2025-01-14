import * as dotenv from 'dotenv'

dotenv.config()

const { JWT_SECRET_KEY } = process.env

const requiredEnvironmentVariables = ['JWT_SECRET_KEY']

for (const variableName of requiredEnvironmentVariables) {
  if (!process.env[variableName]) {
    throw new Error(`${variableName} is required`)
  }
}

export const environmentConfig = {
  jwtSecretKey: JWT_SECRET_KEY!,
}
