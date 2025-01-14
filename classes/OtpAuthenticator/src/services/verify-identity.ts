import axios from 'axios'
import Errors, { CustomError } from 'utils/custom-error'
import { defaultErrorResponse } from 'utils/common'
import { TcNoServicesSchemaInput, tcNoServicesSchemaInput, tcNoServicesSchemaOutput } from '../models'
import { environmentConfig } from '../environment-config'

export const verifyIdentity = async (input: TcNoServicesSchemaInput) => {
  try {
    tcNoServicesSchemaInput.parse(input)

    const { data, status } = await axios.post(`${environmentConfig.identityVerificationUrl}?kimlikNo=${input.tcno}&dogumTarihi=${input.birthday}&sorguTur=TcKisi`)

    if (data.Message === 'İşlem başarısız' && data.ErrorCode === 404) {
      throw new CustomError({ error: Errors.OtpAuthenticator[1012] })
    }

    if (data.ErrorCode === 404) {
      throw new CustomError({ error: Errors.OtpAuthenticator[1013] })
    }

    if (!data.Content || !data.Content.TcKisi || !data.Content.TcKisi.KisiCuzdanBilgi || !data.Content.TcKisi.KisiCuzdanBilgi.TemelBilgi) {
      throw new CustomError({ error: Errors.OtpAuthenticator[1014] })
    }

    const kpsResult = tcNoServicesSchemaOutput.parse({
      statusCode: status,
      body: {
        message: data.Message,
        errorCode: data.ErrorCode,
        isDone: data.IsDone,
        content: {
          tcPerson: {
            personInfo: {
              name: data.Content?.TcKisi.KisiCuzdanBilgi.TemelBilgi.Ad,
              surname: data.Content?.TcKisi.KisiCuzdanBilgi.TemelBilgi.Soyad,
              gender: data.Content?.TcKisi.KisiCuzdanBilgi.TemelBilgi.Cinsiyet,
            },
          },
        },
      },
    })

    return {
      statusCode: kpsResult.statusCode,
      body: kpsResult.body,
    }
  } catch (error: any) {
    const errorResponse = await defaultErrorResponse(error)
    return {
      body: errorResponse.body._friendlyMessage?.message,
    }
  }
}
