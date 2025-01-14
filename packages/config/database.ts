import { Sequelize } from 'sequelize-typescript'
import { Dialect } from 'sequelize'
import { Otp, User, Car, Session, File, EmergencyContact, UserEmergency, Payment } from 'utils/models'
import { config } from './config'

export const sequelize = new Sequelize({
  ...config.db,
  dialect: 'mssql' as Dialect,
  timezone: '+03:00',
  models: [Otp, User, Car, File, Session, Payment, EmergencyContact, UserEmergency],
})

export const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true })
    console.log('Database synchronized')
  } catch (error) {
    console.error('Failed to synchronize the database:', error)
    throw new Error('Database synchronization failed')
  }
}
