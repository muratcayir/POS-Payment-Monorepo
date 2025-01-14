/* eslint-disable unicorn/import-style */
import * as dotenv from 'dotenv'
import * as path from 'node:path'

dotenv.config({ path: path.resolve(__dirname, './.env') })

const { DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME } = process.env

const requiredEnvironmentVariables = ['DB_SERVER', 'DB_USER', 'DB_PASSWORD', 'DB_NAME']

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
}
