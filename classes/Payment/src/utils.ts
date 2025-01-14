import { Request, Response } from 'express'

export const confirmWithPin = async (req: Request, res: Response) => {
  const { pin } = req.body

  try {
    // Ödeme limit kontrolü yapılırsa
    const isPinRequired = true // Bu kontrol gerekli koşullara bağlı olarak değişebilir
    if (isPinRequired && pin !== '1234') {
      // PIN doğrulama
      throw new Error('Geçersiz PIN kodu.')
    }
    res.status(200).json({ message: 'PIN doğrulama başarılı.' })
  } catch (error: any) {
    res.status(400).json({ message: `PIN doğrulama başarısız: ${error.message}` })
  }
}
