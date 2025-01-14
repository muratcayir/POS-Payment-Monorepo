import { PaymentMethod } from '../../helper/payment-method'

export class LinkPayment implements PaymentMethod {
  async pay(amount: number): Promise<void> {
    // Link ile ödeme işlemi mantığı
    console.log(`Ödeme linki ile ${amount} TL ödendi.`)
  }
}
