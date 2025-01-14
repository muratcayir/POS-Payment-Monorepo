import Errors, { CustomError } from 'utils/custom-error'
import { EmergencyContact } from 'utils/models'
import { Request, Response } from 'express'
import { sequelize } from 'config/database'
import { handleTransactionError } from 'utils/common'
import { sendCode } from 'sms-manager/sms'
import { upsertEmergencyContactInput } from '../models'
import { extractAreaCodeAndPhoneNumber } from '../utils'

export const upsertEmergencyContact = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction()
  try {
    const { userId } = req.user
    const input = upsertEmergencyContactInput.parse(req.body)

    const extractedPhone = extractAreaCodeAndPhoneNumber(input.phoneNumber)

    if (!extractedPhone) {
      throw new CustomError({ error: Errors.EmergencyContact['4001'] })
    }
    const existingContact = await EmergencyContact.findOne({
      where: {
        userId,
        phoneNumber: input.phoneNumber,
      },
      transaction,
    })

    let upsertedContact

    if (existingContact) {
      existingContact.name = input.name
      existingContact.phoneNumber = input.phoneNumber
      upsertedContact = await existingContact.save({ transaction })
    } else {
      upsertedContact = await EmergencyContact.create(
        {
          userId,
          name: input.name,
          phoneNumber: input.phoneNumber,
        },
        { transaction },
      )
    }

    await transaction.commit()
    res.status(200).json({
      message: existingContact ? 'Kişi başarıyla güncellendi.' : 'Kişi başarıyla eklendi.',
      data: upsertedContact,
    })
  } catch (error) {
    console.error('Kişi eklerken bir hata oluştu:', error)
    await transaction.rollback()
    await handleTransactionError(error, res)
  }
}

export const getEmergencyContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.user

    const contactList = await EmergencyContact.findAll({
      where: { userId },
    })

    res.status(201).json({ contactList })
  } catch (error) {
    console.error('Kişiler listelenirken bir hata oluştu:', error)
    await handleTransactionError(error, res)
  }
}

export const deleteEmergencyContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.user
    const { contactId } = req.params

    const deletedContact = await EmergencyContact.destroy({
      where: {
        id: contactId,
        userId,
      },
    })

    if (!deletedContact) {
      throw new CustomError({ error: Errors.EmergencyContact['4002'] })
    }

    res.status(200).json({ message: 'Kişi başarıyla silindi.' })
  } catch (error) {
    console.error('Kişi silinirken bir hata oluştu:', error)
    await handleTransactionError(error, res)
  }
}

export const sendEmergencySMS = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, username, phone: senderPhoneNumber } = req.user

    const contactList = await EmergencyContact.findAll({
      where: { userId },
    })

    if (contactList.length === 0) {
      throw new CustomError({ error: Errors.EmergencyContact['4003'] })
    }

    const emergencyMessage = `Emergency! ${username} is trying to reach you.`

    const sendPromises = contactList.map(async (contact) => {
      const { phoneNumber } = contact.dataValues

      if (phoneNumber === senderPhoneNumber) {
        console.warn(`Sender and recipient are the same - Phone: ${phoneNumber}. SMS sending skipped.`)
        throw new CustomError({ error: Errors.EmergencyContact['4004'] })
      }

      try {
        await sendCode(phoneNumber, emergencyMessage)
        console.log(`SMS sent - Phone: ${phoneNumber}`)
        return { success: true }
      } catch (error) {
        console.error(`SMS sending failed - Phone: ${phoneNumber}`, error)
        throw new CustomError({ error: Errors.EmergencyContact['4005'] })
      }
    })

    const results = await Promise.all(sendPromises)
    const failedMessages = results.filter((result) => !result.success)

    if (failedMessages.length > 0) {
      throw new CustomError({
        error: Errors.EmergencyContact['4005'],
        addons: { failedContacts: failedMessages.map((message: any) => message.phoneNumber) },
      })
    }

    res.status(200).json({ message: 'Emergency messages were sent successfully.' })
  } catch (error) {
    console.error('An error occurred while sending SMS:', error)
    await handleTransactionError(error, res)
  }
}
