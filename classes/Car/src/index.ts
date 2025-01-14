import express from 'express'
import dotenv from 'dotenv'
import { syncDatabase } from 'config/database'
import { carRouter } from './routes/car'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/classes', carRouter)

const startServer = async () => {
  try {
    await syncDatabase()
    const PORT = process.env.APP_PORT || 3000
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start the server:', error)
  }
}

startServer().catch((error) => console.error('Error starting server:', error))

export { app }
