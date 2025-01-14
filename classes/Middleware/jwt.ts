import jwt from 'jsonwebtoken'
// import { convertToSeconds, tokenExpirationTimes } from './utils'

const secretKey = process.env.JWT_SECRET_KEY

if (!secretKey) {
  throw new Error('JWT_SECRET_KEY environment variable is not defined')
}

// export const getTokenExpirationTime = (distributorId: string): { tokenExpiresIn: number; refreshTokenExpiresIn: number } => {
//   const distributorSettings = tokenExpirationTimes[distributorId] || tokenExpirationTimes.default
//   const tokenExpiresIn = convertToSeconds(distributorSettings.tokenExpiresIn)
//   const refreshTokenExpiresIn = convertToSeconds(distributorSettings.refreshTokenExpiresIn)

//   return { tokenExpiresIn, refreshTokenExpiresIn }
// }

export const jwtService = {
  signAccessToken: (payload: object) => {
    //  const distributorId = payload.distributor_id || 'default'
    // const { tokenExpiresIn } = getTokenExpirationTime(distributorId)

    return jwt.sign(payload, secretKey, {
      algorithm: 'HS256',
      expiresIn: '1d', // Saniye cinsinden
      issuer: 'ORMAPI',
      audience: 'API',
    })
  },

  signRefreshToken: (payload: object) => {
    // const distributorId = payload.distributor_id || 'default'
    // const { refreshTokenExpiresIn } = getTokenExpirationTime(distributorId)

    return jwt.sign(payload, secretKey, {
      algorithm: 'HS256',
      expiresIn: '7d', // Saniye cinsinden
      issuer: 'ORMAPI',
      audience: 'API',
    })
  },

  verify: (token: string) => jwt.verify(token, secretKey),
  decode: (token: string) => jwt.decode(token),
}
