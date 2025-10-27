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

export interface CreateBillingData {
  billing_insert: Billing_Key;
}

export interface CreateBillingFromCsvData {
  billingFromCsv_insert: BillingFromCsv_Key;
}

export interface CreateBillingFromCsvVariables {
  accountNo: number;
  amortAmnt: number;
  arrearsAmnt: number;
  arrearsEnv: number;
  bStatus: string;
  billAmnt: number;
  billBrgy?: string | null;
  billDate: string;
  billNo: number;
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
  residentId: string;
  stubOut?: string | null;
  totalBill: number;
  verified: string;
  waterUsage: number;
}

export interface CreateBillingVariables {
  billNo: number;
  billDate: DateString;
  dueDate: DateString;
  bStatus: string;
  mrSysNo: number;
  penalized: string;
  mPenalty: number;
  discount: number;
  paid: string;
  verified: string;
  arrearsAmt: number;
  mrrfDue: number;
  curReading: number;
  disconDate?: DateString | null;
  mtrNo: string;
  preReading: number;
  purokCode: string;
  billPurok: string;
  billBrgy: string;
  prevUsed: number;
  prevUsed2: number;
  prvBillDate: string;
  prvDueDate: string;
  prvDiscon: string;
  stubOut: string;
  amortAmt: number;
  nrWater: number;
  residentId: UUIDString;
  bookId: UUIDString;
  billAmt: number;
  duePenalty: number;
  arrearsEnv: number;
  environmentFee: number;
  totalBill: number;
  waterUsage: number;
  paymentReceipt?: string | null;
  paymentStatus?: string | null;
  paymentDate?: DateString | null;
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

export interface GetBookByNameData {
  books: ({
    id: UUIDString;
  } & Book_Key)[];
}

export interface GetBookByNameVariables {
  name: string;
}

export interface GetBooksData {
  books: ({
    id: UUIDString;
    name: string;
  } & Book_Key)[];
}

export interface GetResidentByAccountNoData {
  residents: ({
    id: UUIDString;
  } & Resident_Key)[];
}

export interface GetResidentByAccountNoVariables {
  accountNo: number;
}

export interface GetResidentsData {
  residents: ({
    id: UUIDString;
    accountNo: number;
    fullName: string;
    classType: string;
    book: {
      name: string;
    };
  } & Resident_Key)[];
}

export interface PaginatedBillingsData {
  billingFromCsvs: ({
    accountNo: number;
    amortAmnt: number;
    arrearsAmnt: number;
    arrearsEnv: number;
    bStatus: string;
    billAmnt: number;
    billBrgy?: string | null;
    billDate: string;
    billNo: number;
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
    residentId: string;
    stubOut?: string | null;
    totalBill: number;
    verified: string;
    waterUsage: number;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  })[];
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

interface CreateBillingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBillingVariables): MutationRef<CreateBillingData, CreateBillingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateBillingVariables): MutationRef<CreateBillingData, CreateBillingVariables>;
  operationName: string;
}
export const createBillingRef: CreateBillingRef;

export function createBilling(vars: CreateBillingVariables): MutationPromise<CreateBillingData, CreateBillingVariables>;
export function createBilling(dc: DataConnect, vars: CreateBillingVariables): MutationPromise<CreateBillingData, CreateBillingVariables>;

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

interface GetBooksRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetBooksData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetBooksData, undefined>;
  operationName: string;
}
export const getBooksRef: GetBooksRef;

export function getBooks(): QueryPromise<GetBooksData, undefined>;
export function getBooks(dc: DataConnect): QueryPromise<GetBooksData, undefined>;

interface GetBookByNameRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetBookByNameVariables): QueryRef<GetBookByNameData, GetBookByNameVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetBookByNameVariables): QueryRef<GetBookByNameData, GetBookByNameVariables>;
  operationName: string;
}
export const getBookByNameRef: GetBookByNameRef;

export function getBookByName(vars: GetBookByNameVariables): QueryPromise<GetBookByNameData, GetBookByNameVariables>;
export function getBookByName(dc: DataConnect, vars: GetBookByNameVariables): QueryPromise<GetBookByNameData, GetBookByNameVariables>;

interface GetResidentByAccountNoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetResidentByAccountNoVariables): QueryRef<GetResidentByAccountNoData, GetResidentByAccountNoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetResidentByAccountNoVariables): QueryRef<GetResidentByAccountNoData, GetResidentByAccountNoVariables>;
  operationName: string;
}
export const getResidentByAccountNoRef: GetResidentByAccountNoRef;

export function getResidentByAccountNo(vars: GetResidentByAccountNoVariables): QueryPromise<GetResidentByAccountNoData, GetResidentByAccountNoVariables>;
export function getResidentByAccountNo(dc: DataConnect, vars: GetResidentByAccountNoVariables): QueryPromise<GetResidentByAccountNoData, GetResidentByAccountNoVariables>;

interface GetResidentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetResidentsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetResidentsData, undefined>;
  operationName: string;
}
export const getResidentsRef: GetResidentsRef;

export function getResidents(): QueryPromise<GetResidentsData, undefined>;
export function getResidents(dc: DataConnect): QueryPromise<GetResidentsData, undefined>;

