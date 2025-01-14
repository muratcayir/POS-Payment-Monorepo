import { PaymentMethod } from '../../helper/payment-method'

export class CuzdanPayment implements PaymentMethod {
  async pay(amount: number): Promise<void> {
    // Cüzdan ile ödeme işlemi mantığı
    console.log(`Cüzdan ile ${amount} TL ödendi.`)
  }
}
