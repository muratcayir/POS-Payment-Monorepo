export interface PaymentMethod {
  pay(amount: number): Promise<void>
}
