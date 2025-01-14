import { Request, Response } from 'express'
import { User } from 'utils/models'
import { updateProfileInput } from 'utils/commonSchemas'
import { handleTransactionError } from 'utils/common'
import Errors, { CustomError } from 'utils/custom-error'

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.user

  if (!userId) {
    throw new CustomError({ error: Errors.User['2002'] })
  }

  try {
    const profile = await User.findOne({
      where: { id: userId },
    })

    res.status(200).send(profile)
  } catch (error) {
    await handleTransactionError(error, res)
  }
}

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.user

    if (!userId) {
      throw new CustomError({ error: Errors.User['2002'] })
    }

    const profileInfo = await User.findOne({ where: { id: userId } })

    if (!profileInfo) {
      throw new CustomError({ error: Errors.User['2003'] })
    }

    const input = updateProfileInput.parse(req.body)

    const shouldUpdateProfile =
      input.businessName !== profileInfo.businessName ||
      input.authorizedName !== profileInfo.authorizedName ||
      input.city !== profileInfo.city ||
      input.district !== profileInfo.district ||
      input.address !== profileInfo.address ||
      input.email !== profileInfo.email

    if (shouldUpdateProfile) {
      if (input.email && input.email !== profileInfo.email) {
        const existingEmail = await User.findOne({ where: { email: input.email } })

        if (existingEmail) {
          throw new CustomError({ error: Errors.User['2001'], params: { email: input.email } })
        }
      }

      await User.update(
        {
          businessName: input.businessName,
          authorizedName: input.authorizedName,
          city: input.city,
          district: input.district,
          address: input.address,
          email: input.email,
        },
        { where: { id: userId } },
      )
    }

    res.status(200).json({ message: 'Profile updated successfully' })
  } catch (error) {
    await handleTransactionError(error, res)
  }
}
