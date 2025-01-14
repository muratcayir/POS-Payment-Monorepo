import { PaymentMethod } from '../../helper/payment-method'

export class QRPayment implements PaymentMethod {
  async pay(amount: number): Promise<void> {
    console.log(`QR kod ile ${amount} TL ödendi.`)
  }
}
