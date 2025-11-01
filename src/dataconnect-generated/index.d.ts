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

export interface CollectionFromCsv_Key {
  id: UUIDString;
  __typename?: 'CollectionFromCsv_Key';
}

export interface Consumer_Key {
  id: UUIDString;
  __typename?: 'Consumer_Key';
}

export interface CountBillingFromCsvData {
  billingFromCsvs: ({
    _count: number;
  })[];
}

export interface CountCollectionFromCsvData {
  collectionFromCsvs: ({
    _count: number;
  })[];
}

export interface CountConsumersData {
  consumers: ({
    _count: number;
  })[];
}

export interface CountLedgerFromCsvData {
  ledgerFromCsvs: ({
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

export interface CreateCollectionFromCsvData {
  collectionFromCsv_insert: CollectionFromCsv_Key;
}

export interface CreateCollectionFromCsvVariables {
  accountNo: string;
  amortize?: number | null;
  arrearsAmt?: number | null;
  arrearsEnv?: number | null;
  bankGroup?: number | null;
  bankId?: string | null;
  bankOnline?: number | null;
  batchNo?: string | null;
  billNo?: string | null;
  branch?: string | null;
  cash: number;
  check: number;
  checkDate?: string | null;
  checkNo?: string | null;
  cmrrfAmnt: number;
  custNo: number;
  discAmnt: number;
  envFee: number;
  fullName: string;
  mrrfAmnt: number;
  onlineref?: string | null;
  othrApply?: number | null;
  othrIncome?: number | null;
  othrReconn?: number | null;
  pacyAmnt: number;
  papYAmnt: number;
  payArrears: boolean;
  penAmnt: number;
  pymtDate: string;
  pymtMethod: number;
  receiptNo: string;
  receiptStatus: string;
  receiptType: string;
  runBalance?: number | null;
  sysNo: number;
  teller: string;
  trackDt: string;
  waterBill: number;
}

export interface CreateConsumerData {
  consumer_insert: Consumer_Key;
}

export interface CreateConsumerVariables {
  accountNo: string;
  fullName: string;
  book: string;
  classType: string;
}

export interface CreateLedgerFromCsvData {
  ledgerFromCsv_insert: LedgerFromCsv_Key;
}

export interface CreateLedgerFromCsvVariables {
  accountNo: string;
  transDate: string;
  refCode: string;
  refNo: string;
  amount: number;
  timestamp?: string | null;
  tag: string;
  reading: number;
  consumption: number;
  sequence: number;
  custNo: string;
}

export interface DeleteBillingFromCsvData {
  billingFromCsv_delete?: BillingFromCsv_Key | null;
}

export interface DeleteBillingFromCsvVariables {
  id: UUIDString;
}

export interface DeleteCollectionFromCsvData {
  collectionFromCsv_delete?: CollectionFromCsv_Key | null;
}

export interface DeleteCollectionFromCsvVariables {
  id: UUIDString;
}

export interface DeleteConsumerData {
  consumer_delete?: Consumer_Key | null;
}

export interface DeleteConsumerVariables {
  id: UUIDString;
}

export interface DeleteLedgerFromCsvData {
  ledgerFromCsv_delete?: LedgerFromCsv_Key | null;
}

export interface DeleteLedgerFromCsvVariables {
  id: UUIDString;
}

export interface GetConsumerData {
  consumer?: {
    id: UUIDString;
    accountNo: string;
    fullName: string;
    book: string;
    classType: string;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
  } & Consumer_Key;
}

export interface GetConsumerVariables {
  id: UUIDString;
}

export interface LedgerFromCsv_Key {
  id: UUIDString;
  __typename?: 'LedgerFromCsv_Key';
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
    updatedAt?: TimestampString | null;
  } & BillingFromCsv_Key)[];
}

export interface PaginatedBillingsVariables {
  limit?: number | null;
  offset?: number | null;
  orderByField?: string | null;
  orderDirection?: string | null;
}

export interface PaginatedCollectionsData {
  collectionFromCsvs: ({
    accountNo: string;
    amortize?: number | null;
    arrearsAmt?: number | null;
    arrearsEnv?: number | null;
    bankGroup?: number | null;
    bankId?: string | null;
    bankOnline?: number | null;
    batchNo?: string | null;
    billNo?: string | null;
    branch?: string | null;
    cash: number;
    check: number;
    checkDate?: string | null;
    checkNo?: string | null;
    cmrrfAmnt: number;
    custNo: number;
    discAmnt: number;
    envFee: number;
    fullName: string;
    mrrfAmnt: number;
    onlineref?: string | null;
    othrApply?: number | null;
    othrIncome?: number | null;
    othrReconn?: number | null;
    pacyAmnt: number;
    papYAmnt: number;
    payArrears: boolean;
    penAmnt: number;
    pymtDate: string;
    pymtMethod: number;
    receiptNo: string;
    receiptStatus: string;
    receiptType: string;
    runBalance?: number | null;
    sysNo: number;
    teller: string;
    trackDt: string;
    waterBill: number;
    id: UUIDString;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
  } & CollectionFromCsv_Key)[];
}

export interface PaginatedCollectionsVariables {
  limit?: number | null;
  offset?: number | null;
  orderByField?: string | null;
  orderDirection?: string | null;
}

export interface PaginatedConsumersData {
  consumers: ({
    id: UUIDString;
    accountNo: string;
    fullName: string;
    book: string;
    classType: string;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
  } & Consumer_Key)[];
}

export interface PaginatedConsumersVariables {
  limit?: number | null;
  offset?: number | null;
  orderByField?: string | null;
  orderDirection?: string | null;
}

export interface PaginatedLedgersData {
  ledgerFromCsvs: ({
    id: UUIDString;
    accountNo: string;
    transDate: string;
    refCode: string;
    refNo: string;
    amount: number;
    timestamp?: string | null;
    tag: string;
    reading: number;
    consumption: number;
    sequence: number;
    custNo: string;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
  } & LedgerFromCsv_Key)[];
}

export interface PaginatedLedgersVariables {
  limit?: number | null;
  offset?: number | null;
  orderByField?: string | null;
  orderDirection?: string | null;
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
    updatedAt?: TimestampString | null;
  })[];
}

export interface SearchBillingFromCsvVariables {
  query?: string | null;
  limit?: number | null;
}

export interface SearchCollectionFromCsvData {
  collectionFromCsvs_search: ({
    accountNo: string;
    amortize?: number | null;
    arrearsAmt?: number | null;
    arrearsEnv?: number | null;
    bankGroup?: number | null;
    bankId?: string | null;
    bankOnline?: number | null;
    batchNo?: string | null;
    billNo?: string | null;
    branch?: string | null;
    cash: number;
    check: number;
    checkDate?: string | null;
    checkNo?: string | null;
    cmrrfAmnt: number;
    custNo: number;
    discAmnt: number;
    envFee: number;
    fullName: string;
    mrrfAmnt: number;
    onlineref?: string | null;
    othrApply?: number | null;
    othrIncome?: number | null;
    othrReconn?: number | null;
    pacyAmnt: number;
    papYAmnt: number;
    payArrears: boolean;
    penAmnt: number;
    pymtDate: string;
    pymtMethod: number;
    receiptNo: string;
    receiptStatus: string;
    receiptType: string;
    runBalance?: number | null;
    sysNo: number;
    teller: string;
    trackDt: string;
    waterBill: number;
    id: UUIDString;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
  } & CollectionFromCsv_Key)[];
}

export interface SearchCollectionFromCsvVariables {
  query?: string | null;
  limit?: number | null;
}

export interface SearchConsumersData {
  consumers_search: ({
    id: UUIDString;
    accountNo: string;
    fullName: string;
    book: string;
    classType: string;
  } & Consumer_Key)[];
}

export interface SearchConsumersVariables {
  query: string;
}

export interface SearchLedgerFromCsvData {
  ledgerFromCsvs_search: ({
    accountNo: string;
    transDate: string;
    refCode: string;
    refNo: string;
    amount: number;
    timestamp?: string | null;
    tag: string;
    reading: number;
    consumption: number;
    sequence: number;
    custNo: string;
    id: UUIDString;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
  } & LedgerFromCsv_Key)[];
}

export interface SearchLedgerFromCsvVariables {
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

export interface UpdateCollectionFromCsvData {
  collectionFromCsv_update?: CollectionFromCsv_Key | null;
}

export interface UpdateCollectionFromCsvVariables {
  id: UUIDString;
  accountNo?: string | null;
  amortize?: number | null;
  arrearsAmt?: number | null;
  arrearsEnv?: number | null;
  bankGroup?: number | null;
  bankId?: string | null;
  bankOnline?: number | null;
  batchNo?: string | null;
  billNo?: string | null;
  branch?: string | null;
  cash?: number | null;
  check?: number | null;
  checkDate?: string | null;
  checkNo?: string | null;
  cmrrfAmnt?: number | null;
  custNo?: number | null;
  discAmnt?: number | null;
  envFee?: number | null;
  fullName?: string | null;
  mrrfAmnt?: number | null;
  onlineref?: string | null;
  othrApply?: number | null;
  othrIncome?: number | null;
  othrReconn?: number | null;
  pacyAmnt?: number | null;
  papYAmnt?: number | null;
  payArrears?: boolean | null;
  penAmnt?: number | null;
  pymtDate?: string | null;
  pymtMethod?: number | null;
  receiptNo?: string | null;
  receiptStatus?: string | null;
  receiptType?: string | null;
  runBalance?: number | null;
  sysNo?: number | null;
  teller?: string | null;
  trackDt?: string | null;
  waterBill?: number | null;
}

export interface UpdateConsumerData {
  consumer_update?: Consumer_Key | null;
}

export interface UpdateConsumerVariables {
  id: UUIDString;
  accountNo?: string | null;
  fullName?: string | null;
  book?: string | null;
  classType?: string | null;
}

export interface UpdateLedgerFromCsvData {
  ledgerFromCsv_update?: LedgerFromCsv_Key | null;
}

export interface UpdateLedgerFromCsvVariables {
  id: UUIDString;
  accountNo?: string | null;
  transDate?: string | null;
  refCode?: string | null;
  refNo?: string | null;
  amount?: number | null;
  timestamp?: string | null;
  tag?: string | null;
  reading?: number | null;
  consumption?: number | null;
  sequence?: number | null;
  custNo?: string | null;
}

interface PaginatedCollectionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: PaginatedCollectionsVariables): QueryRef<PaginatedCollectionsData, PaginatedCollectionsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: PaginatedCollectionsVariables): QueryRef<PaginatedCollectionsData, PaginatedCollectionsVariables>;
  operationName: string;
}
export const paginatedCollectionsRef: PaginatedCollectionsRef;

export function paginatedCollections(vars?: PaginatedCollectionsVariables): QueryPromise<PaginatedCollectionsData, PaginatedCollectionsVariables>;
export function paginatedCollections(dc: DataConnect, vars?: PaginatedCollectionsVariables): QueryPromise<PaginatedCollectionsData, PaginatedCollectionsVariables>;

interface CountCollectionFromCsvRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<CountCollectionFromCsvData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<CountCollectionFromCsvData, undefined>;
  operationName: string;
}
export const countCollectionFromCsvRef: CountCollectionFromCsvRef;

export function countCollectionFromCsv(): QueryPromise<CountCollectionFromCsvData, undefined>;
export function countCollectionFromCsv(dc: DataConnect): QueryPromise<CountCollectionFromCsvData, undefined>;

interface SearchCollectionFromCsvRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: SearchCollectionFromCsvVariables): QueryRef<SearchCollectionFromCsvData, SearchCollectionFromCsvVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: SearchCollectionFromCsvVariables): QueryRef<SearchCollectionFromCsvData, SearchCollectionFromCsvVariables>;
  operationName: string;
}
export const searchCollectionFromCsvRef: SearchCollectionFromCsvRef;

export function searchCollectionFromCsv(vars?: SearchCollectionFromCsvVariables): QueryPromise<SearchCollectionFromCsvData, SearchCollectionFromCsvVariables>;
export function searchCollectionFromCsv(dc: DataConnect, vars?: SearchCollectionFromCsvVariables): QueryPromise<SearchCollectionFromCsvData, SearchCollectionFromCsvVariables>;

interface CreateConsumerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateConsumerVariables): MutationRef<CreateConsumerData, CreateConsumerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateConsumerVariables): MutationRef<CreateConsumerData, CreateConsumerVariables>;
  operationName: string;
}
export const createConsumerRef: CreateConsumerRef;

export function createConsumer(vars: CreateConsumerVariables): MutationPromise<CreateConsumerData, CreateConsumerVariables>;
export function createConsumer(dc: DataConnect, vars: CreateConsumerVariables): MutationPromise<CreateConsumerData, CreateConsumerVariables>;

interface UpdateConsumerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateConsumerVariables): MutationRef<UpdateConsumerData, UpdateConsumerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateConsumerVariables): MutationRef<UpdateConsumerData, UpdateConsumerVariables>;
  operationName: string;
}
export const updateConsumerRef: UpdateConsumerRef;

export function updateConsumer(vars: UpdateConsumerVariables): MutationPromise<UpdateConsumerData, UpdateConsumerVariables>;
export function updateConsumer(dc: DataConnect, vars: UpdateConsumerVariables): MutationPromise<UpdateConsumerData, UpdateConsumerVariables>;

interface DeleteConsumerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteConsumerVariables): MutationRef<DeleteConsumerData, DeleteConsumerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteConsumerVariables): MutationRef<DeleteConsumerData, DeleteConsumerVariables>;
  operationName: string;
}
export const deleteConsumerRef: DeleteConsumerRef;

export function deleteConsumer(vars: DeleteConsumerVariables): MutationPromise<DeleteConsumerData, DeleteConsumerVariables>;
export function deleteConsumer(dc: DataConnect, vars: DeleteConsumerVariables): MutationPromise<DeleteConsumerData, DeleteConsumerVariables>;

interface GetConsumerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetConsumerVariables): QueryRef<GetConsumerData, GetConsumerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetConsumerVariables): QueryRef<GetConsumerData, GetConsumerVariables>;
  operationName: string;
}
export const getConsumerRef: GetConsumerRef;

export function getConsumer(vars: GetConsumerVariables): QueryPromise<GetConsumerData, GetConsumerVariables>;
export function getConsumer(dc: DataConnect, vars: GetConsumerVariables): QueryPromise<GetConsumerData, GetConsumerVariables>;

interface PaginatedConsumersRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: PaginatedConsumersVariables): QueryRef<PaginatedConsumersData, PaginatedConsumersVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: PaginatedConsumersVariables): QueryRef<PaginatedConsumersData, PaginatedConsumersVariables>;
  operationName: string;
}
export const paginatedConsumersRef: PaginatedConsumersRef;

export function paginatedConsumers(vars?: PaginatedConsumersVariables): QueryPromise<PaginatedConsumersData, PaginatedConsumersVariables>;
export function paginatedConsumers(dc: DataConnect, vars?: PaginatedConsumersVariables): QueryPromise<PaginatedConsumersData, PaginatedConsumersVariables>;

interface SearchConsumersRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SearchConsumersVariables): QueryRef<SearchConsumersData, SearchConsumersVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SearchConsumersVariables): QueryRef<SearchConsumersData, SearchConsumersVariables>;
  operationName: string;
}
export const searchConsumersRef: SearchConsumersRef;

export function searchConsumers(vars: SearchConsumersVariables): QueryPromise<SearchConsumersData, SearchConsumersVariables>;
export function searchConsumers(dc: DataConnect, vars: SearchConsumersVariables): QueryPromise<SearchConsumersData, SearchConsumersVariables>;

interface CountConsumersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<CountConsumersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<CountConsumersData, undefined>;
  operationName: string;
}
export const countConsumersRef: CountConsumersRef;

export function countConsumers(): QueryPromise<CountConsumersData, undefined>;
export function countConsumers(dc: DataConnect): QueryPromise<CountConsumersData, undefined>;

interface CreateLedgerFromCsvRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLedgerFromCsvVariables): MutationRef<CreateLedgerFromCsvData, CreateLedgerFromCsvVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateLedgerFromCsvVariables): MutationRef<CreateLedgerFromCsvData, CreateLedgerFromCsvVariables>;
  operationName: string;
}
export const createLedgerFromCsvRef: CreateLedgerFromCsvRef;

export function createLedgerFromCsv(vars: CreateLedgerFromCsvVariables): MutationPromise<CreateLedgerFromCsvData, CreateLedgerFromCsvVariables>;
export function createLedgerFromCsv(dc: DataConnect, vars: CreateLedgerFromCsvVariables): MutationPromise<CreateLedgerFromCsvData, CreateLedgerFromCsvVariables>;

interface UpdateLedgerFromCsvRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLedgerFromCsvVariables): MutationRef<UpdateLedgerFromCsvData, UpdateLedgerFromCsvVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateLedgerFromCsvVariables): MutationRef<UpdateLedgerFromCsvData, UpdateLedgerFromCsvVariables>;
  operationName: string;
}
export const updateLedgerFromCsvRef: UpdateLedgerFromCsvRef;

export function updateLedgerFromCsv(vars: UpdateLedgerFromCsvVariables): MutationPromise<UpdateLedgerFromCsvData, UpdateLedgerFromCsvVariables>;
export function updateLedgerFromCsv(dc: DataConnect, vars: UpdateLedgerFromCsvVariables): MutationPromise<UpdateLedgerFromCsvData, UpdateLedgerFromCsvVariables>;

interface DeleteLedgerFromCsvRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteLedgerFromCsvVariables): MutationRef<DeleteLedgerFromCsvData, DeleteLedgerFromCsvVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteLedgerFromCsvVariables): MutationRef<DeleteLedgerFromCsvData, DeleteLedgerFromCsvVariables>;
  operationName: string;
}
export const deleteLedgerFromCsvRef: DeleteLedgerFromCsvRef;

export function deleteLedgerFromCsv(vars: DeleteLedgerFromCsvVariables): MutationPromise<DeleteLedgerFromCsvData, DeleteLedgerFromCsvVariables>;
export function deleteLedgerFromCsv(dc: DataConnect, vars: DeleteLedgerFromCsvVariables): MutationPromise<DeleteLedgerFromCsvData, DeleteLedgerFromCsvVariables>;

interface PaginatedLedgersRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: PaginatedLedgersVariables): QueryRef<PaginatedLedgersData, PaginatedLedgersVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: PaginatedLedgersVariables): QueryRef<PaginatedLedgersData, PaginatedLedgersVariables>;
  operationName: string;
}
export const paginatedLedgersRef: PaginatedLedgersRef;

export function paginatedLedgers(vars?: PaginatedLedgersVariables): QueryPromise<PaginatedLedgersData, PaginatedLedgersVariables>;
export function paginatedLedgers(dc: DataConnect, vars?: PaginatedLedgersVariables): QueryPromise<PaginatedLedgersData, PaginatedLedgersVariables>;

interface CountLedgerFromCsvRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<CountLedgerFromCsvData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<CountLedgerFromCsvData, undefined>;
  operationName: string;
}
export const countLedgerFromCsvRef: CountLedgerFromCsvRef;

export function countLedgerFromCsv(): QueryPromise<CountLedgerFromCsvData, undefined>;
export function countLedgerFromCsv(dc: DataConnect): QueryPromise<CountLedgerFromCsvData, undefined>;

interface SearchLedgerFromCsvRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: SearchLedgerFromCsvVariables): QueryRef<SearchLedgerFromCsvData, SearchLedgerFromCsvVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: SearchLedgerFromCsvVariables): QueryRef<SearchLedgerFromCsvData, SearchLedgerFromCsvVariables>;
  operationName: string;
}
export const searchLedgerFromCsvRef: SearchLedgerFromCsvRef;

export function searchLedgerFromCsv(vars?: SearchLedgerFromCsvVariables): QueryPromise<SearchLedgerFromCsvData, SearchLedgerFromCsvVariables>;
export function searchLedgerFromCsv(dc: DataConnect, vars?: SearchLedgerFromCsvVariables): QueryPromise<SearchLedgerFromCsvData, SearchLedgerFromCsvVariables>;

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

interface CreateCollectionFromCsvRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCollectionFromCsvVariables): MutationRef<CreateCollectionFromCsvData, CreateCollectionFromCsvVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCollectionFromCsvVariables): MutationRef<CreateCollectionFromCsvData, CreateCollectionFromCsvVariables>;
  operationName: string;
}
export const createCollectionFromCsvRef: CreateCollectionFromCsvRef;

export function createCollectionFromCsv(vars: CreateCollectionFromCsvVariables): MutationPromise<CreateCollectionFromCsvData, CreateCollectionFromCsvVariables>;
export function createCollectionFromCsv(dc: DataConnect, vars: CreateCollectionFromCsvVariables): MutationPromise<CreateCollectionFromCsvData, CreateCollectionFromCsvVariables>;

interface DeleteCollectionFromCsvRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCollectionFromCsvVariables): MutationRef<DeleteCollectionFromCsvData, DeleteCollectionFromCsvVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteCollectionFromCsvVariables): MutationRef<DeleteCollectionFromCsvData, DeleteCollectionFromCsvVariables>;
  operationName: string;
}
export const deleteCollectionFromCsvRef: DeleteCollectionFromCsvRef;

export function deleteCollectionFromCsv(vars: DeleteCollectionFromCsvVariables): MutationPromise<DeleteCollectionFromCsvData, DeleteCollectionFromCsvVariables>;
export function deleteCollectionFromCsv(dc: DataConnect, vars: DeleteCollectionFromCsvVariables): MutationPromise<DeleteCollectionFromCsvData, DeleteCollectionFromCsvVariables>;

interface UpdateCollectionFromCsvRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCollectionFromCsvVariables): MutationRef<UpdateCollectionFromCsvData, UpdateCollectionFromCsvVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateCollectionFromCsvVariables): MutationRef<UpdateCollectionFromCsvData, UpdateCollectionFromCsvVariables>;
  operationName: string;
}
export const updateCollectionFromCsvRef: UpdateCollectionFromCsvRef;

export function updateCollectionFromCsv(vars: UpdateCollectionFromCsvVariables): MutationPromise<UpdateCollectionFromCsvData, UpdateCollectionFromCsvVariables>;
export function updateCollectionFromCsv(dc: DataConnect, vars: UpdateCollectionFromCsvVariables): MutationPromise<UpdateCollectionFromCsvData, UpdateCollectionFromCsvVariables>;

