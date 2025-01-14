import axios from 'axios'
import { environmentConfig } from '../environment-config'

export const fetchAddresses = async () => {
  try {
    const response = await axios.get(environmentConfig.addressesListUrl)

    return response.data
  } catch (error) {
    console.error('Error fetching addresses:', error)
    throw new Error('Could not fetch addresses')
  }
}
