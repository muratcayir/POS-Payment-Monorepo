import { PaymentMethod } from '../../helper/payment-method'

export class CardNumberPayment implements PaymentMethod {
  async pay(amount: number): Promise<void> {
    // Kart numarası ile ödeme işlemi mantığı
    console.log(`Kart numarası ile ${amount} TL ödendi.`)
  }
}
