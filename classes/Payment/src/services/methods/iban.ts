import { PaymentMethod } from '../../helper/payment-method'

export class IBANPayment implements PaymentMethod {
  async pay(amount: number): Promise<void> {
    // IBAN ile ödeme işlemi mantığı
    console.log(`IBAN ile ${amount} TL ödendi.`)
  }
}
