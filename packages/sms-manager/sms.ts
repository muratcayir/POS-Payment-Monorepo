import axios from 'axios'
import { environmentConfig } from './environment-config'

export const sendCode = async (toPhone: string, message: string): Promise<boolean> => {
  try {
    const payload = {
      Message: message,
      Phone: [toPhone],
    }
    await axios.post(environmentConfig.smsApiUrl!, payload, {
      headers: {
        'Content-Type': 'application/json',
        Key: environmentConfig.smsApiKey,
      },
    })
    return true
  } catch (error) {
    console.error('Error sending verification code:', error)
    return false
  }
}
