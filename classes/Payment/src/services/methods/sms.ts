import { PaymentMethod } from '../../helper/payment-method'

export class SmsPayment implements PaymentMethod {
  async pay(amount: number): Promise<void> {
    // SMS ile para isteme işlemi mantığı
    console.log(`SMS ile ${amount} TL para istendi.`)
  }
}
