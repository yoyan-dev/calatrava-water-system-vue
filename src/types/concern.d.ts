import type { Timestamp } from "firebase/firestore";

export interface Concern {
  id?: string;
  uid?: string;
  name?: string;
  area?: string;
  accountNumber?: number;
  content?: string;
  createdAt?: Timestamp;
}
