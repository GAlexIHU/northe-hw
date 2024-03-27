import { IVoucher } from './voucher.interface'

export interface ICampaign {
  id: string
  name: string
  from: string
  to: string
  amount: string
  prefix: string
  currency: string
  vouchers: IVoucher[]
  hasVouchers?: string
  dateFromTo?: string
  discount?: string
}
