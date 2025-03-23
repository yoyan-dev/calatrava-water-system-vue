import type { Timestamp } from "firebase/firestore";
import type { Billing } from "./billing";
import type { Ledger } from "./ledger";
import type { Collection } from "./collection";

export interface Resident {
  id?: string;
  uid?: string;
  fullname?: string;
  accountNumber?: number;
  firstName?: string;
  book?: string;
  classtype?: string;
  classification?: string;
  searchKeyword?: string[];
  createdAt?: any;
  updatedAt?: any;
  currentBilling?: Billing;
  billings?: Billing[];
  ledgers?: Ledger[];
  collections?: Collection[];
}
