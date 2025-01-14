import { PaymentMethod } from '../helper/payment-method'

export class PaymentProcessor {
  constructor(private paymentMethod: PaymentMethod) {}

  async processPayment(amount: number, partialAmount?: number): Promise<void> {
    const finalAmount = partialAmount ?? amount

    try {
      await this.paymentMethod.pay(finalAmount)
      console.log('Ödeme başarılı')
    } catch (error) {
      console.error('Ödeme başarısız:', error)
      throw error
    }
  }
}
