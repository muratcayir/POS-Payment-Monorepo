export const SESSION_KEY_PREFIX = 'SIGNUP:session'
export const ORMAPI_KEY_PREFIX = 'ORMAPI:session'
export const SESSION_EXPIRATION_TIME = 3600

export const tokenExpirationTimes: { [key: string]: any } = {
  '1': {
    tokenExpiresIn: '5m',
    refreshTokenExpiresIn: '1d',
  },
  '9': {
    tokenExpiresIn: '15m',
    refreshTokenExpiresIn: '1d',
  },
  default: {
    tokenExpiresIn: '15m',
    refreshTokenExpiresIn: '1h',
  },
}

export function convertToSeconds(timeString: string): number {
  const timeUnit = timeString.slice(-1)
  const timeValue = Number.parseInt(timeString.slice(0, -1), 10)

  switch (timeUnit) {
    case 'm':
      return timeValue * 60
    case 'h':
      return timeValue * 60 * 60
    case 'd':
      return timeValue * 24 * 60 * 60
    case 's':
      return timeValue
    default:
      throw new Error(`Unsupported time unit: ${timeUnit}`)
  }
}
