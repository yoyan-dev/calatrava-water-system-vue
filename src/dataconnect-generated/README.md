# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `calatrava-water-system`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*PaginatedBillings*](#paginatedbillings)
  - [*CountBillingFromCsv*](#countbillingfromcsv)
  - [*SearchBillingFromCsv*](#searchbillingfromcsv)
- [**Mutations**](#mutations)
  - [*CreateBook*](#createbook)
  - [*CreateResident*](#createresident)
  - [*CreateBilling*](#createbilling)
  - [*CreateBillingFromCsv*](#createbillingfromcsv)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `calatrava-water-system`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `calatrava-water-system` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## PaginatedBillings
You can execute the `PaginatedBillings` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
paginatedBillings(vars?: PaginatedBillingsVariables): QueryPromise<PaginatedBillingsData, PaginatedBillingsVariables>;

interface PaginatedBillingsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: PaginatedBillingsVariables): QueryRef<PaginatedBillingsData, PaginatedBillingsVariables>;
}
export const paginatedBillingsRef: PaginatedBillingsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
paginatedBillings(dc: DataConnect, vars?: PaginatedBillingsVariables): QueryPromise<PaginatedBillingsData, PaginatedBillingsVariables>;

interface PaginatedBillingsRef {
  ...
  (dc: DataConnect, vars?: PaginatedBillingsVariables): QueryRef<PaginatedBillingsData, PaginatedBillingsVariables>;
}
export const paginatedBillingsRef: PaginatedBillingsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the paginatedBillingsRef:
```typescript
const name = paginatedBillingsRef.operationName;
console.log(name);
```

### Variables
The `PaginatedBillings` query has an optional argument of type `PaginatedBillingsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface PaginatedBillingsVariables {
  limit?: number | null;
  offset?: number | null;
  orderByField?: string | null;
  orderDirection?: string | null;
}
```
### Return Type
Recall that executing the `PaginatedBillings` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `PaginatedBillingsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface PaginatedBillingsData {
  billingFromCsvs: ({
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
```
### Using `PaginatedBillings`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, paginatedBillings, PaginatedBillingsVariables } from '@dataconnect/generated';

// The `PaginatedBillings` query has an optional argument of type `PaginatedBillingsVariables`:
const paginatedBillingsVars: PaginatedBillingsVariables = {
  limit: ..., // optional
  offset: ..., // optional
  orderByField: ..., // optional
  orderDirection: ..., // optional
};

// Call the `paginatedBillings()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await paginatedBillings(paginatedBillingsVars);
// Variables can be defined inline as well.
const { data } = await paginatedBillings({ limit: ..., offset: ..., orderByField: ..., orderDirection: ..., });
// Since all variables are optional for this query, you can omit the `PaginatedBillingsVariables` argument.
const { data } = await paginatedBillings();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await paginatedBillings(dataConnect, paginatedBillingsVars);

console.log(data.billingFromCsvs);

// Or, you can use the `Promise` API.
paginatedBillings(paginatedBillingsVars).then((response) => {
  const data = response.data;
  console.log(data.billingFromCsvs);
});
```

### Using `PaginatedBillings`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, paginatedBillingsRef, PaginatedBillingsVariables } from '@dataconnect/generated';

// The `PaginatedBillings` query has an optional argument of type `PaginatedBillingsVariables`:
const paginatedBillingsVars: PaginatedBillingsVariables = {
  limit: ..., // optional
  offset: ..., // optional
  orderByField: ..., // optional
  orderDirection: ..., // optional
};

// Call the `paginatedBillingsRef()` function to get a reference to the query.
const ref = paginatedBillingsRef(paginatedBillingsVars);
// Variables can be defined inline as well.
const ref = paginatedBillingsRef({ limit: ..., offset: ..., orderByField: ..., orderDirection: ..., });
// Since all variables are optional for this query, you can omit the `PaginatedBillingsVariables` argument.
const ref = paginatedBillingsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = paginatedBillingsRef(dataConnect, paginatedBillingsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.billingFromCsvs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.billingFromCsvs);
});
```

## CountBillingFromCsv
You can execute the `CountBillingFromCsv` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
countBillingFromCsv(): QueryPromise<CountBillingFromCsvData, undefined>;

interface CountBillingFromCsvRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<CountBillingFromCsvData, undefined>;
}
export const countBillingFromCsvRef: CountBillingFromCsvRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
countBillingFromCsv(dc: DataConnect): QueryPromise<CountBillingFromCsvData, undefined>;

interface CountBillingFromCsvRef {
  ...
  (dc: DataConnect): QueryRef<CountBillingFromCsvData, undefined>;
}
export const countBillingFromCsvRef: CountBillingFromCsvRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the countBillingFromCsvRef:
```typescript
const name = countBillingFromCsvRef.operationName;
console.log(name);
```

### Variables
The `CountBillingFromCsv` query has no variables.
### Return Type
Recall that executing the `CountBillingFromCsv` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CountBillingFromCsvData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CountBillingFromCsvData {
  billingFromCsvs: ({
    _count: number;
  })[];
}
```
### Using `CountBillingFromCsv`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, countBillingFromCsv } from '@dataconnect/generated';


// Call the `countBillingFromCsv()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await countBillingFromCsv();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await countBillingFromCsv(dataConnect);

console.log(data.billingFromCsvs);

// Or, you can use the `Promise` API.
countBillingFromCsv().then((response) => {
  const data = response.data;
  console.log(data.billingFromCsvs);
});
```

### Using `CountBillingFromCsv`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, countBillingFromCsvRef } from '@dataconnect/generated';


// Call the `countBillingFromCsvRef()` function to get a reference to the query.
const ref = countBillingFromCsvRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = countBillingFromCsvRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.billingFromCsvs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.billingFromCsvs);
});
```

## SearchBillingFromCsv
You can execute the `SearchBillingFromCsv` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
searchBillingFromCsv(vars?: SearchBillingFromCsvVariables): QueryPromise<SearchBillingFromCsvData, SearchBillingFromCsvVariables>;

interface SearchBillingFromCsvRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: SearchBillingFromCsvVariables): QueryRef<SearchBillingFromCsvData, SearchBillingFromCsvVariables>;
}
export const searchBillingFromCsvRef: SearchBillingFromCsvRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
searchBillingFromCsv(dc: DataConnect, vars?: SearchBillingFromCsvVariables): QueryPromise<SearchBillingFromCsvData, SearchBillingFromCsvVariables>;

interface SearchBillingFromCsvRef {
  ...
  (dc: DataConnect, vars?: SearchBillingFromCsvVariables): QueryRef<SearchBillingFromCsvData, SearchBillingFromCsvVariables>;
}
export const searchBillingFromCsvRef: SearchBillingFromCsvRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the searchBillingFromCsvRef:
```typescript
const name = searchBillingFromCsvRef.operationName;
console.log(name);
```

### Variables
The `SearchBillingFromCsv` query has an optional argument of type `SearchBillingFromCsvVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SearchBillingFromCsvVariables {
  query?: string | null;
  limit?: number | null;
}
```
### Return Type
Recall that executing the `SearchBillingFromCsv` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SearchBillingFromCsvData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `SearchBillingFromCsv`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, searchBillingFromCsv, SearchBillingFromCsvVariables } from '@dataconnect/generated';

// The `SearchBillingFromCsv` query has an optional argument of type `SearchBillingFromCsvVariables`:
const searchBillingFromCsvVars: SearchBillingFromCsvVariables = {
  query: ..., // optional
  limit: ..., // optional
};

// Call the `searchBillingFromCsv()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await searchBillingFromCsv(searchBillingFromCsvVars);
// Variables can be defined inline as well.
const { data } = await searchBillingFromCsv({ query: ..., limit: ..., });
// Since all variables are optional for this query, you can omit the `SearchBillingFromCsvVariables` argument.
const { data } = await searchBillingFromCsv();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await searchBillingFromCsv(dataConnect, searchBillingFromCsvVars);

console.log(data.billingFromCsvs_search);

// Or, you can use the `Promise` API.
searchBillingFromCsv(searchBillingFromCsvVars).then((response) => {
  const data = response.data;
  console.log(data.billingFromCsvs_search);
});
```

### Using `SearchBillingFromCsv`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, searchBillingFromCsvRef, SearchBillingFromCsvVariables } from '@dataconnect/generated';

// The `SearchBillingFromCsv` query has an optional argument of type `SearchBillingFromCsvVariables`:
const searchBillingFromCsvVars: SearchBillingFromCsvVariables = {
  query: ..., // optional
  limit: ..., // optional
};

// Call the `searchBillingFromCsvRef()` function to get a reference to the query.
const ref = searchBillingFromCsvRef(searchBillingFromCsvVars);
// Variables can be defined inline as well.
const ref = searchBillingFromCsvRef({ query: ..., limit: ..., });
// Since all variables are optional for this query, you can omit the `SearchBillingFromCsvVariables` argument.
const ref = searchBillingFromCsvRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = searchBillingFromCsvRef(dataConnect, searchBillingFromCsvVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.billingFromCsvs_search);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.billingFromCsvs_search);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `calatrava-water-system` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateBook
You can execute the `CreateBook` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createBook(vars: CreateBookVariables): MutationPromise<CreateBookData, CreateBookVariables>;

interface CreateBookRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBookVariables): MutationRef<CreateBookData, CreateBookVariables>;
}
export const createBookRef: CreateBookRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createBook(dc: DataConnect, vars: CreateBookVariables): MutationPromise<CreateBookData, CreateBookVariables>;

interface CreateBookRef {
  ...
  (dc: DataConnect, vars: CreateBookVariables): MutationRef<CreateBookData, CreateBookVariables>;
}
export const createBookRef: CreateBookRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createBookRef:
```typescript
const name = createBookRef.operationName;
console.log(name);
```

### Variables
The `CreateBook` mutation requires an argument of type `CreateBookVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateBookVariables {
  name: string;
}
```
### Return Type
Recall that executing the `CreateBook` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateBookData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateBookData {
  query?: {
    books: ({
      id: UUIDString;
    } & Book_Key)[];
  };
    book_insert: Book_Key;
}
```
### Using `CreateBook`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createBook, CreateBookVariables } from '@dataconnect/generated';

// The `CreateBook` mutation requires an argument of type `CreateBookVariables`:
const createBookVars: CreateBookVariables = {
  name: ..., 
};

// Call the `createBook()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createBook(createBookVars);
// Variables can be defined inline as well.
const { data } = await createBook({ name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createBook(dataConnect, createBookVars);

console.log(data.query);
console.log(data.book_insert);

// Or, you can use the `Promise` API.
createBook(createBookVars).then((response) => {
  const data = response.data;
  console.log(data.query);
  console.log(data.book_insert);
});
```

### Using `CreateBook`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createBookRef, CreateBookVariables } from '@dataconnect/generated';

// The `CreateBook` mutation requires an argument of type `CreateBookVariables`:
const createBookVars: CreateBookVariables = {
  name: ..., 
};

// Call the `createBookRef()` function to get a reference to the mutation.
const ref = createBookRef(createBookVars);
// Variables can be defined inline as well.
const ref = createBookRef({ name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createBookRef(dataConnect, createBookVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.query);
console.log(data.book_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.query);
  console.log(data.book_insert);
});
```

## CreateResident
You can execute the `CreateResident` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createResident(vars: CreateResidentVariables): MutationPromise<CreateResidentData, CreateResidentVariables>;

interface CreateResidentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateResidentVariables): MutationRef<CreateResidentData, CreateResidentVariables>;
}
export const createResidentRef: CreateResidentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createResident(dc: DataConnect, vars: CreateResidentVariables): MutationPromise<CreateResidentData, CreateResidentVariables>;

interface CreateResidentRef {
  ...
  (dc: DataConnect, vars: CreateResidentVariables): MutationRef<CreateResidentData, CreateResidentVariables>;
}
export const createResidentRef: CreateResidentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createResidentRef:
```typescript
const name = createResidentRef.operationName;
console.log(name);
```

### Variables
The `CreateResident` mutation requires an argument of type `CreateResidentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateResidentVariables {
  accountNo: number;
  fullName: string;
  classType: string;
  bookId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateResident` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateResidentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateResidentData {
  query?: {
    residents: ({
      id: UUIDString;
    } & Resident_Key)[];
  };
    resident_insert: Resident_Key;
}
```
### Using `CreateResident`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createResident, CreateResidentVariables } from '@dataconnect/generated';

// The `CreateResident` mutation requires an argument of type `CreateResidentVariables`:
const createResidentVars: CreateResidentVariables = {
  accountNo: ..., 
  fullName: ..., 
  classType: ..., 
  bookId: ..., 
};

// Call the `createResident()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createResident(createResidentVars);
// Variables can be defined inline as well.
const { data } = await createResident({ accountNo: ..., fullName: ..., classType: ..., bookId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createResident(dataConnect, createResidentVars);

console.log(data.query);
console.log(data.resident_insert);

// Or, you can use the `Promise` API.
createResident(createResidentVars).then((response) => {
  const data = response.data;
  console.log(data.query);
  console.log(data.resident_insert);
});
```

### Using `CreateResident`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createResidentRef, CreateResidentVariables } from '@dataconnect/generated';

// The `CreateResident` mutation requires an argument of type `CreateResidentVariables`:
const createResidentVars: CreateResidentVariables = {
  accountNo: ..., 
  fullName: ..., 
  classType: ..., 
  bookId: ..., 
};

// Call the `createResidentRef()` function to get a reference to the mutation.
const ref = createResidentRef(createResidentVars);
// Variables can be defined inline as well.
const ref = createResidentRef({ accountNo: ..., fullName: ..., classType: ..., bookId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createResidentRef(dataConnect, createResidentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.query);
console.log(data.resident_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.query);
  console.log(data.resident_insert);
});
```

## CreateBilling
You can execute the `CreateBilling` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createBilling(vars: CreateBillingVariables): MutationPromise<CreateBillingData, CreateBillingVariables>;

interface CreateBillingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBillingVariables): MutationRef<CreateBillingData, CreateBillingVariables>;
}
export const createBillingRef: CreateBillingRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createBilling(dc: DataConnect, vars: CreateBillingVariables): MutationPromise<CreateBillingData, CreateBillingVariables>;

interface CreateBillingRef {
  ...
  (dc: DataConnect, vars: CreateBillingVariables): MutationRef<CreateBillingData, CreateBillingVariables>;
}
export const createBillingRef: CreateBillingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createBillingRef:
```typescript
const name = createBillingRef.operationName;
console.log(name);
```

### Variables
The `CreateBilling` mutation requires an argument of type `CreateBillingVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateBilling` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateBillingData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateBillingData {
  billing_insert: Billing_Key;
}
```
### Using `CreateBilling`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createBilling, CreateBillingVariables } from '@dataconnect/generated';

// The `CreateBilling` mutation requires an argument of type `CreateBillingVariables`:
const createBillingVars: CreateBillingVariables = {
  billNo: ..., 
  billDate: ..., 
  dueDate: ..., 
  bStatus: ..., 
  mrSysNo: ..., 
  penalized: ..., 
  mPenalty: ..., 
  discount: ..., 
  paid: ..., 
  verified: ..., 
  arrearsAmt: ..., 
  mrrfDue: ..., 
  curReading: ..., 
  disconDate: ..., // optional
  mtrNo: ..., 
  preReading: ..., 
  purokCode: ..., 
  billPurok: ..., 
  billBrgy: ..., 
  prevUsed: ..., 
  prevUsed2: ..., 
  prvBillDate: ..., 
  prvDueDate: ..., 
  prvDiscon: ..., 
  stubOut: ..., 
  amortAmt: ..., 
  nrWater: ..., 
  residentId: ..., 
  bookId: ..., 
  billAmt: ..., 
  duePenalty: ..., 
  arrearsEnv: ..., 
  environmentFee: ..., 
  totalBill: ..., 
  waterUsage: ..., 
  paymentReceipt: ..., // optional
  paymentStatus: ..., // optional
  paymentDate: ..., // optional
};

// Call the `createBilling()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createBilling(createBillingVars);
// Variables can be defined inline as well.
const { data } = await createBilling({ billNo: ..., billDate: ..., dueDate: ..., bStatus: ..., mrSysNo: ..., penalized: ..., mPenalty: ..., discount: ..., paid: ..., verified: ..., arrearsAmt: ..., mrrfDue: ..., curReading: ..., disconDate: ..., mtrNo: ..., preReading: ..., purokCode: ..., billPurok: ..., billBrgy: ..., prevUsed: ..., prevUsed2: ..., prvBillDate: ..., prvDueDate: ..., prvDiscon: ..., stubOut: ..., amortAmt: ..., nrWater: ..., residentId: ..., bookId: ..., billAmt: ..., duePenalty: ..., arrearsEnv: ..., environmentFee: ..., totalBill: ..., waterUsage: ..., paymentReceipt: ..., paymentStatus: ..., paymentDate: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createBilling(dataConnect, createBillingVars);

console.log(data.billing_insert);

// Or, you can use the `Promise` API.
createBilling(createBillingVars).then((response) => {
  const data = response.data;
  console.log(data.billing_insert);
});
```

### Using `CreateBilling`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createBillingRef, CreateBillingVariables } from '@dataconnect/generated';

// The `CreateBilling` mutation requires an argument of type `CreateBillingVariables`:
const createBillingVars: CreateBillingVariables = {
  billNo: ..., 
  billDate: ..., 
  dueDate: ..., 
  bStatus: ..., 
  mrSysNo: ..., 
  penalized: ..., 
  mPenalty: ..., 
  discount: ..., 
  paid: ..., 
  verified: ..., 
  arrearsAmt: ..., 
  mrrfDue: ..., 
  curReading: ..., 
  disconDate: ..., // optional
  mtrNo: ..., 
  preReading: ..., 
  purokCode: ..., 
  billPurok: ..., 
  billBrgy: ..., 
  prevUsed: ..., 
  prevUsed2: ..., 
  prvBillDate: ..., 
  prvDueDate: ..., 
  prvDiscon: ..., 
  stubOut: ..., 
  amortAmt: ..., 
  nrWater: ..., 
  residentId: ..., 
  bookId: ..., 
  billAmt: ..., 
  duePenalty: ..., 
  arrearsEnv: ..., 
  environmentFee: ..., 
  totalBill: ..., 
  waterUsage: ..., 
  paymentReceipt: ..., // optional
  paymentStatus: ..., // optional
  paymentDate: ..., // optional
};

// Call the `createBillingRef()` function to get a reference to the mutation.
const ref = createBillingRef(createBillingVars);
// Variables can be defined inline as well.
const ref = createBillingRef({ billNo: ..., billDate: ..., dueDate: ..., bStatus: ..., mrSysNo: ..., penalized: ..., mPenalty: ..., discount: ..., paid: ..., verified: ..., arrearsAmt: ..., mrrfDue: ..., curReading: ..., disconDate: ..., mtrNo: ..., preReading: ..., purokCode: ..., billPurok: ..., billBrgy: ..., prevUsed: ..., prevUsed2: ..., prvBillDate: ..., prvDueDate: ..., prvDiscon: ..., stubOut: ..., amortAmt: ..., nrWater: ..., residentId: ..., bookId: ..., billAmt: ..., duePenalty: ..., arrearsEnv: ..., environmentFee: ..., totalBill: ..., waterUsage: ..., paymentReceipt: ..., paymentStatus: ..., paymentDate: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createBillingRef(dataConnect, createBillingVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.billing_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.billing_insert);
});
```

## CreateBillingFromCsv
You can execute the `CreateBillingFromCsv` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createBillingFromCsv(vars: CreateBillingFromCsvVariables): MutationPromise<CreateBillingFromCsvData, CreateBillingFromCsvVariables>;

interface CreateBillingFromCsvRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBillingFromCsvVariables): MutationRef<CreateBillingFromCsvData, CreateBillingFromCsvVariables>;
}
export const createBillingFromCsvRef: CreateBillingFromCsvRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createBillingFromCsv(dc: DataConnect, vars: CreateBillingFromCsvVariables): MutationPromise<CreateBillingFromCsvData, CreateBillingFromCsvVariables>;

interface CreateBillingFromCsvRef {
  ...
  (dc: DataConnect, vars: CreateBillingFromCsvVariables): MutationRef<CreateBillingFromCsvData, CreateBillingFromCsvVariables>;
}
export const createBillingFromCsvRef: CreateBillingFromCsvRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createBillingFromCsvRef:
```typescript
const name = createBillingFromCsvRef.operationName;
console.log(name);
```

### Variables
The `CreateBillingFromCsv` mutation requires an argument of type `CreateBillingFromCsvVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateBillingFromCsv` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateBillingFromCsvData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateBillingFromCsvData {
  billingFromCsv_insert: BillingFromCsv_Key;
}
```
### Using `CreateBillingFromCsv`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createBillingFromCsv, CreateBillingFromCsvVariables } from '@dataconnect/generated';

// The `CreateBillingFromCsv` mutation requires an argument of type `CreateBillingFromCsvVariables`:
const createBillingFromCsvVars: CreateBillingFromCsvVariables = {
  accountNo: ..., 
  amortAmnt: ..., 
  arrearsAmnt: ..., 
  arrearsEnv: ..., 
  bStatus: ..., 
  billAmnt: ..., 
  billBrgy: ..., // optional
  billDate: ..., 
  billNo: ..., 
  billPurok: ..., // optional
  book: ..., 
  classType: ..., 
  curReading: ..., 
  custNo: ..., 
  discount: ..., 
  disconDate: ..., 
  dueDate: ..., 
  duePenalty: ..., 
  environmentFee: ..., 
  fullName: ..., 
  mPenalty: ..., 
  mrrfDue: ..., 
  mrSysNo: ..., 
  mtrNo: ..., 
  nrWater: ..., 
  paid: ..., 
  paymentDate: ..., // optional
  paymentReceipt: ..., // optional
  paymentStatus: ..., // optional
  penalized: ..., 
  preReading: ..., 
  prevUsed: ..., 
  prevUsed2: ..., 
  prvBillDate: ..., 
  prvDiscon: ..., 
  prvDueDate: ..., 
  purokCode: ..., // optional
  stubOut: ..., // optional
  totalBill: ..., 
  verified: ..., 
  waterUsage: ..., 
};

// Call the `createBillingFromCsv()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createBillingFromCsv(createBillingFromCsvVars);
// Variables can be defined inline as well.
const { data } = await createBillingFromCsv({ accountNo: ..., amortAmnt: ..., arrearsAmnt: ..., arrearsEnv: ..., bStatus: ..., billAmnt: ..., billBrgy: ..., billDate: ..., billNo: ..., billPurok: ..., book: ..., classType: ..., curReading: ..., custNo: ..., discount: ..., disconDate: ..., dueDate: ..., duePenalty: ..., environmentFee: ..., fullName: ..., mPenalty: ..., mrrfDue: ..., mrSysNo: ..., mtrNo: ..., nrWater: ..., paid: ..., paymentDate: ..., paymentReceipt: ..., paymentStatus: ..., penalized: ..., preReading: ..., prevUsed: ..., prevUsed2: ..., prvBillDate: ..., prvDiscon: ..., prvDueDate: ..., purokCode: ..., stubOut: ..., totalBill: ..., verified: ..., waterUsage: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createBillingFromCsv(dataConnect, createBillingFromCsvVars);

console.log(data.billingFromCsv_insert);

// Or, you can use the `Promise` API.
createBillingFromCsv(createBillingFromCsvVars).then((response) => {
  const data = response.data;
  console.log(data.billingFromCsv_insert);
});
```

### Using `CreateBillingFromCsv`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createBillingFromCsvRef, CreateBillingFromCsvVariables } from '@dataconnect/generated';

// The `CreateBillingFromCsv` mutation requires an argument of type `CreateBillingFromCsvVariables`:
const createBillingFromCsvVars: CreateBillingFromCsvVariables = {
  accountNo: ..., 
  amortAmnt: ..., 
  arrearsAmnt: ..., 
  arrearsEnv: ..., 
  bStatus: ..., 
  billAmnt: ..., 
  billBrgy: ..., // optional
  billDate: ..., 
  billNo: ..., 
  billPurok: ..., // optional
  book: ..., 
  classType: ..., 
  curReading: ..., 
  custNo: ..., 
  discount: ..., 
  disconDate: ..., 
  dueDate: ..., 
  duePenalty: ..., 
  environmentFee: ..., 
  fullName: ..., 
  mPenalty: ..., 
  mrrfDue: ..., 
  mrSysNo: ..., 
  mtrNo: ..., 
  nrWater: ..., 
  paid: ..., 
  paymentDate: ..., // optional
  paymentReceipt: ..., // optional
  paymentStatus: ..., // optional
  penalized: ..., 
  preReading: ..., 
  prevUsed: ..., 
  prevUsed2: ..., 
  prvBillDate: ..., 
  prvDiscon: ..., 
  prvDueDate: ..., 
  purokCode: ..., // optional
  stubOut: ..., // optional
  totalBill: ..., 
  verified: ..., 
  waterUsage: ..., 
};

// Call the `createBillingFromCsvRef()` function to get a reference to the mutation.
const ref = createBillingFromCsvRef(createBillingFromCsvVars);
// Variables can be defined inline as well.
const ref = createBillingFromCsvRef({ accountNo: ..., amortAmnt: ..., arrearsAmnt: ..., arrearsEnv: ..., bStatus: ..., billAmnt: ..., billBrgy: ..., billDate: ..., billNo: ..., billPurok: ..., book: ..., classType: ..., curReading: ..., custNo: ..., discount: ..., disconDate: ..., dueDate: ..., duePenalty: ..., environmentFee: ..., fullName: ..., mPenalty: ..., mrrfDue: ..., mrSysNo: ..., mtrNo: ..., nrWater: ..., paid: ..., paymentDate: ..., paymentReceipt: ..., paymentStatus: ..., penalized: ..., preReading: ..., prevUsed: ..., prevUsed2: ..., prvBillDate: ..., prvDiscon: ..., prvDueDate: ..., purokCode: ..., stubOut: ..., totalBill: ..., verified: ..., waterUsage: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createBillingFromCsvRef(dataConnect, createBillingFromCsvVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.billingFromCsv_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.billingFromCsv_insert);
});
```

