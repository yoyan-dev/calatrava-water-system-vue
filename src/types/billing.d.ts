export interface Billing {
  id?: string;
  uid?: string;
  billNo?: string;
  accountno?: string;
  billDate?: any;
  dueDate?: any;
  bStatus?: string;
  mrSysNo?: string;
  duePenalty?: string;
  penalized?: string;
  mPenalty?: string;
  discount?: string;
  paid?: string;
  verified?: string;
  billamnt?: any;
  arrearsamt?: string;
  mrrfdue?: string;
  waterusage?: string;
  curreading?: string;
  disconDate?: string;
  mtrNo?: string;
  book?: string;
  classtype?: string;
  fullname?: string;
  prereading?: string;
  purokcode?: string;
  billpurok?: string;
  billbrgy?: string;
  custno?: string;
  prevused?: string;
  prevused2?: string;
  prvbilldate?: string;
  prvduedate?: string;
  prvdiscon?: string;
  stubout?: string;
  amortamnt?: string;
  nrwater?: string;
  arrearsenv?: string;
  totalBill?: number;
  paymentReceipt?: string;
  paymentStatus?: "verifying" | "paid" | null | undefined;
  paymentDate?: any;
  createdAt?: any;
}
