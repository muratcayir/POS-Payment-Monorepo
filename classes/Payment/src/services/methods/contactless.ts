import axios from 'axios'
import { PaymentMethod } from '../../helper/payment-method'

export class ContactlessPayment implements PaymentMethod {
  constructor(private deviceId: string) {}

  async checkNFC(): Promise<void> {
    const isNFCAviable = true
    if (!isNFCAviable) {
      throw new Error("NFC özelliği açık değil. Lütfen NFC'yi etkinleştirin.")
    }
  }

  async pay(amount: number): Promise<void> {
    console.log(`Cihaz ${this.deviceId} üzerinden temassız ödeme ile ${amount} TL ödendi.`)
    try {
      const response = await axios.post('https://payment-gateway.example.com/pay', {
        deviceId: this.deviceId,
        amount,
      })
      if (response.status !== 200) {
        throw new Error(`Ödeme ağ geçidi hatası: ${response.data.message}`)
      }

      if (response.data.status === 'PIN_REQUIRED') {
        console.log('PIN doğrulaması gerekiyor. Müşteri terminale PIN girmelidir.')
        // Burada, terminalde PIN girilmesini bekleyen bir süreç
      }

      if (response.data.status !== 'SUCCESS') {
        throw new Error(`Ödeme başarısız: ${response.data.message}`)
      }
    } catch (error: any) {
      throw new Error(`Ödeme işlemi sırasında bir hata oluştu: ${error.message}`)
    }
  }
}
