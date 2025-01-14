import axios from 'axios'
import { environmentConfig } from '../environment-config'

export const fetchVehicle = async () => {
  try {
    const response = await axios.get(environmentConfig.vehicleListUrl)
    return response.data
  } catch (error) {
    console.error('Error fetching vehicle:', error)
    throw new Error('Could not fetch vehicle')
  }
}
