import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface BillingFromCsv_Key {
  id: UUIDString;
  __typename?: 'BillingFromCsv_Key';
}

export interface Billing_Key {
  id: UUIDString;
  __typename?: 'Billing_Key';
}

export interface Book_Key {
  id: UUIDString;
  __typename?: 'Book_Key';
}

export interface CollectionFromCsv_Key {
  id: UUIDString;
  __typename?: 'CollectionFromCsv_Key';
}

export interface CountBillingFromCsvData {
  billingFromCsvs: ({
    _count: number;
  })[];
}

export interface CreateBillingFromCsvData {
  billingFromCsv_insert: BillingFromCsv_Key;
}

export interface CreateBillingFromCsvVariables {
  accountNo: string;
  amortAmnt: number;
  arrearsAmnt: number;
  arrearsEnv: number;
  bStatus: string;
  billAmnt: number;
  billBrgy?: string | null;
  billDate: string;
  billNo: string;
  billPurok?: string | null;
  book: string;
  classType: string;
  curReading: number;
  custNo: number;
  discount: number;
  disconDate: string;
  dueDate: string;
  duePenalty: number;
  environmentFee: number;
  fullName: string;
  mPenalty: number;
  mrrfDue: number;
  mrSysNo: number;
  mtrNo: string;
  nrWater: number;
  paid: string;
  paymentDate?: string | null;
  paymentReceipt?: string | null;
  paymentStatus?: string | null;
  penalized: number;
  preReading: number;
  prevUsed: number;
  prevUsed2: number;
  prvBillDate: string;
  prvDiscon: string;
  prvDueDate: string;
  purokCode?: string | null;
  stubOut?: string | null;
  totalBill: number;
  verified: string;
  waterUsage: number;
}

export interface CreateBookData {
  query?: {
    books: ({
      id: UUIDString;
    } & Book_Key)[];
  };
    book_insert: Book_Key;
}

export interface CreateBookVariables {
  name: string;
}

export interface CreateResidentData {
  query?: {
    residents: ({
      id: UUIDString;
    } & Resident_Key)[];
  };
    resident_insert: Resident_Key;
}

export interface CreateResidentVariables {
  accountNo: number;
  fullName: string;
  classType: string;
  bookId: UUIDString;
}

export interface DeleteBillingFromCsvData {
  billingFromCsv_delete?: BillingFromCsv_Key | null;
}

export interface DeleteBillingFromCsvVariables {
  id: UUIDString;
}

export interface PaginatedBillingsData {
  billingFromCsvs: ({
    id: UUIDString;
    accountNo: string;
    amortAmnt: number;
    arrearsAmnt: number;
    arrearsEnv: number;
    bStatus: string;
    billAmnt: number;
    billBrgy?: string | null;
    billDate: string;
    billNo: string;
    billPurok?: string | null;
    book: string;
    classType: string;
    curReading: number;
    discount: number;
    disconDate: string;
    dueDate: string;
    duePenalty: number;
    environmentFee: number;
    fullName: string;
    mPenalty: number;
    mrSysNo: number;
    mtrNo: string;
    nrWater: number;
    paid: string;
    paymentDate?: string | null;
    paymentReceipt?: string | null;
    paymentStatus?: string | null;
    preReading: number;
    prevUsed: number;
    prevUsed2: number;
    prvBillDate: string;
    prvDiscon: string;
    prvDueDate: string;
    purokCode?: string | null;
    stubOut?: string | null;
    totalBill: number;
    verified: string;
    waterUsage: number;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & BillingFromCsv_Key)[];
}

export interface PaginatedBillingsVariables {
  limit?: number | null;
  offset?: number | null;
  orderByField?: string | null;
  orderDirection?: string | null;
}

export interface Resident_Key {
  id: UUIDString;
  __typename?: 'Resident_Key';
}

export interface SearchBillingFromCsvData {
  billingFromCsvs_search: ({
    accountNo: string;
    amortAmnt: number;
    arrearsAmnt: number;
    arrearsEnv: number;
    bStatus: string;
    billAmnt: number;
    billBrgy?: string | null;
    billDate: string;
    billNo: string;
    billPurok?: string | null;
    book: string;
    classType: string;
    curReading: number;
    discount: number;
    disconDate: string;
    dueDate: string;
    duePenalty: number;
    environmentFee: number;
    fullName: string;
    mPenalty: number;
    mrSysNo: number;
    mtrNo: string;
    nrWater: number;
    paid: string;
    paymentDate?: string | null;
    paymentReceipt?: string | null;
    paymentStatus?: string | null;
    preReading: number;
    prevUsed: number;
    prevUsed2: number;
    prvBillDate: string;
    prvDiscon: string;
    prvDueDate: string;
    purokCode?: string | null;
    stubOut?: string | null;
    totalBill: number;
    verified: string;
    waterUsage: number;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  })[];
}

export interface SearchBillingFromCsvVariables {
  query?: string | null;
  limit?: number | null;
}

export interface UpdateBillingFromCsvData {
  billingFromCsv_update?: BillingFromCsv_Key | null;
}

export interface UpdateBillingFromCsvVariables {
  id: UUIDString;
  accountNo?: string | null;
  amortAmnt?: number | null;
  arrearsAmnt?: number | null;
  arrearsEnv?: number | null;
  bStatus?: string | null;
  billAmnt?: number | null;
  billBrgy?: string | null;
  billDate?: string | null;
  billNo?: string | null;
  billPurok?: string | null;
  book?: string | null;
  classType?: string | null;
  curReading?: number | null;
  custNo?: number | null;
  discount?: number | null;
  disconDate?: string | null;
  dueDate?: string | null;
  duePenalty?: number | null;
  environmentFee?: number | null;
  fullName?: string | null;
  mPenalty?: number | null;
  mrrfDue?: number | null;
  mrSysNo?: number | null;
  mtrNo?: string | null;
  nrWater?: number | null;
  paid?: string | null;
  paymentDate?: string | null;
  paymentReceipt?: string | null;
  paymentStatus?: string | null;
  penalized?: number | null;
  preReading?: number | null;
  prevUsed?: number | null;
  prevUsed2?: number | null;
  prvBillDate?: string | null;
  prvDiscon?: string | null;
  prvDueDate?: string | null;
  purokCode?: string | null;
  stubOut?: string | null;
  totalBill?: number | null;
  verified?: string | null;
  waterUsage?: number | null;
}

interface CreateBookRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBookVariables): MutationRef<CreateBookData, CreateBookVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateBookVariables): MutationRef<CreateBookData, CreateBookVariables>;
  operationName: string;
}
export const createBookRef: CreateBookRef;

export function createBook(vars: CreateBookVariables): MutationPromise<CreateBookData, CreateBookVariables>;
export function createBook(dc: DataConnect, vars: CreateBookVariables): MutationPromise<CreateBookData, CreateBookVariables>;

interface CreateResidentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateResidentVariables): MutationRef<CreateResidentData, CreateResidentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateResidentVariables): MutationRef<CreateResidentData, CreateResidentVariables>;
  operationName: string;
}
export const createResidentRef: CreateResidentRef;

export function createResident(vars: CreateResidentVariables): MutationPromise<CreateResidentData, CreateResidentVariables>;
export function createResident(dc: DataConnect, vars: CreateResidentVariables): MutationPromise<CreateResidentData, CreateResidentVariables>;

interface CreateBillingFromCsvRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBillingFromCsvVariables): MutationRef<CreateBillingFromCsvData, CreateBillingFromCsvVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateBillingFromCsvVariables): MutationRef<CreateBillingFromCsvData, CreateBillingFromCsvVariables>;
  operationName: string;
}
export const createBillingFromCsvRef: CreateBillingFromCsvRef;

export function createBillingFromCsv(vars: CreateBillingFromCsvVariables): MutationPromise<CreateBillingFromCsvData, CreateBillingFromCsvVariables>;
export function createBillingFromCsv(dc: DataConnect, vars: CreateBillingFromCsvVariables): MutationPromise<CreateBillingFromCsvData, CreateBillingFromCsvVariables>;

interface DeleteBillingFromCsvRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteBillingFromCsvVariables): MutationRef<DeleteBillingFromCsvData, DeleteBillingFromCsvVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteBillingFromCsvVariables): MutationRef<DeleteBillingFromCsvData, DeleteBillingFromCsvVariables>;
  operationName: string;
}
export const deleteBillingFromCsvRef: DeleteBillingFromCsvRef;

export function deleteBillingFromCsv(vars: DeleteBillingFromCsvVariables): MutationPromise<DeleteBillingFromCsvData, DeleteBillingFromCsvVariables>;
export function deleteBillingFromCsv(dc: DataConnect, vars: DeleteBillingFromCsvVariables): MutationPromise<DeleteBillingFromCsvData, DeleteBillingFromCsvVariables>;

interface UpdateBillingFromCsvRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateBillingFromCsvVariables): MutationRef<UpdateBillingFromCsvData, UpdateBillingFromCsvVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateBillingFromCsvVariables): MutationRef<UpdateBillingFromCsvData, UpdateBillingFromCsvVariables>;
  operationName: string;
}
export const updateBillingFromCsvRef: UpdateBillingFromCsvRef;

export function updateBillingFromCsv(vars: UpdateBillingFromCsvVariables): MutationPromise<UpdateBillingFromCsvData, UpdateBillingFromCsvVariables>;
export function updateBillingFromCsv(dc: DataConnect, vars: UpdateBillingFromCsvVariables): MutationPromise<UpdateBillingFromCsvData, UpdateBillingFromCsvVariables>;

interface PaginatedBillingsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: PaginatedBillingsVariables): QueryRef<PaginatedBillingsData, PaginatedBillingsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: PaginatedBillingsVariables): QueryRef<PaginatedBillingsData, PaginatedBillingsVariables>;
  operationName: string;
}
export const paginatedBillingsRef: PaginatedBillingsRef;

export function paginatedBillings(vars?: PaginatedBillingsVariables): QueryPromise<PaginatedBillingsData, PaginatedBillingsVariables>;
export function paginatedBillings(dc: DataConnect, vars?: PaginatedBillingsVariables): QueryPromise<PaginatedBillingsData, PaginatedBillingsVariables>;

interface CountBillingFromCsvRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<CountBillingFromCsvData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<CountBillingFromCsvData, undefined>;
  operationName: string;
}
export const countBillingFromCsvRef: CountBillingFromCsvRef;

export function countBillingFromCsv(): QueryPromise<CountBillingFromCsvData, undefined>;
export function countBillingFromCsv(dc: DataConnect): QueryPromise<CountBillingFromCsvData, undefined>;

interface SearchBillingFromCsvRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: SearchBillingFromCsvVariables): QueryRef<SearchBillingFromCsvData, SearchBillingFromCsvVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: SearchBillingFromCsvVariables): QueryRef<SearchBillingFromCsvData, SearchBillingFromCsvVariables>;
  operationName: string;
}
export const searchBillingFromCsvRef: SearchBillingFromCsvRef;

export function searchBillingFromCsv(vars?: SearchBillingFromCsvVariables): QueryPromise<SearchBillingFromCsvData, SearchBillingFromCsvVariables>;
export function searchBillingFromCsv(dc: DataConnect, vars?: SearchBillingFromCsvVariables): QueryPromise<SearchBillingFromCsvData, SearchBillingFromCsvVariables>;

