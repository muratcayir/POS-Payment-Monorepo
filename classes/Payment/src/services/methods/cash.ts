import { PaymentMethod } from '../../helper/payment-method'

export class CashPayment implements PaymentMethod {
  async pay(amount: number): Promise<void> {
    // Nakit ödeme işlemi mantığı
    console.log(`Nakit olarak ${amount} TL ödendi.`)
  }
}
