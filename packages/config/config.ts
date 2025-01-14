import { environmentConfig } from './environment-config'

export const config = {
  db: {
    database: environmentConfig.dbName,
    username: environmentConfig.dbUser,
    password: environmentConfig.dbPassword,
    host: environmentConfig.dbServer,
    dialect: 'mssql' as const,
    dialectOptions: {
      options: {
        encrypt: true,
        enableArithAbort: true,
        server: environmentConfig.dbServer,
      },
    },
  },
}
