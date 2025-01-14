import * as dotenv from 'dotenv'

dotenv.config()

const { JWT_SECRET_KEY, DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME, VEHICLE_LIST_URL } = process.env

const requiredEnvironmentVariables = ['JWT_SECRET_KEY', 'DB_SERVER', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'VEHICLE_LIST_URL']

for (const variableName of requiredEnvironmentVariables) {
  if (!process.env[variableName]) {
    throw new Error(`${variableName} is required`)
  }
}

export const environmentConfig = {
  dbServer: DB_SERVER!,
  dbUser: DB_USER!,
  dbPassword: DB_PASSWORD!,
  dbName: DB_NAME!,
  vehicleListUrl: VEHICLE_LIST_URL!,
  jwtSecretKey: JWT_SECRET_KEY!,
}
