# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `calatrava-water-system`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*PaginatedCollections*](#paginatedcollections)
  - [*CountCollectionFromCsv*](#countcollectionfromcsv)
  - [*SearchCollectionFromCsv*](#searchcollectionfromcsv)
  - [*GetConsumer*](#getconsumer)
  - [*PaginatedConsumers*](#paginatedconsumers)
  - [*SearchConsumers*](#searchconsumers)
  - [*CountConsumers*](#countconsumers)
  - [*PaginatedLedgers*](#paginatedledgers)
  - [*CountLedgerFromCsv*](#countledgerfromcsv)
  - [*SearchLedgerFromCsv*](#searchledgerfromcsv)
  - [*PaginatedBillings*](#paginatedbillings)
  - [*CountBillingFromCsv*](#countbillingfromcsv)
  - [*SearchBillingFromCsv*](#searchbillingfromcsv)
- [**Mutations**](#mutations)
  - [*CreateConsumer*](#createconsumer)
  - [*UpdateConsumer*](#updateconsumer)
  - [*DeleteConsumer*](#deleteconsumer)
  - [*CreateLedgerFromCsv*](#createledgerfromcsv)
  - [*UpdateLedgerFromCsv*](#updateledgerfromcsv)
  - [*DeleteLedgerFromCsv*](#deleteledgerfromcsv)
  - [*CreateBillingFromCsv*](#createbillingfromcsv)
  - [*DeleteBillingFromCsv*](#deletebillingfromcsv)
  - [*UpdateBillingFromCsv*](#updatebillingfromcsv)
  - [*CreateCollectionFromCsv*](#createcollectionfromcsv)
  - [*DeleteCollectionFromCsv*](#deletecollectionfromcsv)
  - [*UpdateCollectionFromCsv*](#updatecollectionfromcsv)

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

## PaginatedCollections
You can execute the `PaginatedCollections` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
paginatedCollections(vars?: PaginatedCollectionsVariables): QueryPromise<PaginatedCollectionsData, PaginatedCollectionsVariables>;

interface PaginatedCollectionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: PaginatedCollectionsVariables): QueryRef<PaginatedCollectionsData, PaginatedCollectionsVariables>;
}
export const paginatedCollectionsRef: PaginatedCollectionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
paginatedCollections(dc: DataConnect, vars?: PaginatedCollectionsVariables): QueryPromise<PaginatedCollectionsData, PaginatedCollectionsVariables>;

interface PaginatedCollectionsRef {
  ...
  (dc: DataConnect, vars?: PaginatedCollectionsVariables): QueryRef<PaginatedCollectionsData, PaginatedCollectionsVariables>;
}
export const paginatedCollectionsRef: PaginatedCollectionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the paginatedCollectionsRef:
```typescript
const name = paginatedCollectionsRef.operationName;
console.log(name);
```

### Variables
The `PaginatedCollections` query has an optional argument of type `PaginatedCollectionsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface PaginatedCollectionsVariables {
  limit?: number | null;
  offset?: number | null;
  orderByField?: string | null;
  orderDirection?: string | null;
}
```
### Return Type
Recall that executing the `PaginatedCollections` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `PaginatedCollectionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `PaginatedCollections`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, paginatedCollections, PaginatedCollectionsVariables } from '@dataconnect/generated';

// The `PaginatedCollections` query has an optional argument of type `PaginatedCollectionsVariables`:
const paginatedCollectionsVars: PaginatedCollectionsVariables = {
  limit: ..., // optional
  offset: ..., // optional
  orderByField: ..., // optional
  orderDirection: ..., // optional
};

// Call the `paginatedCollections()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await paginatedCollections(paginatedCollectionsVars);
// Variables can be defined inline as well.
const { data } = await paginatedCollections({ limit: ..., offset: ..., orderByField: ..., orderDirection: ..., });
// Since all variables are optional for this query, you can omit the `PaginatedCollectionsVariables` argument.
const { data } = await paginatedCollections();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await paginatedCollections(dataConnect, paginatedCollectionsVars);

console.log(data.collectionFromCsvs);

// Or, you can use the `Promise` API.
paginatedCollections(paginatedCollectionsVars).then((response) => {
  const data = response.data;
  console.log(data.collectionFromCsvs);
});
```

### Using `PaginatedCollections`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, paginatedCollectionsRef, PaginatedCollectionsVariables } from '@dataconnect/generated';

// The `PaginatedCollections` query has an optional argument of type `PaginatedCollectionsVariables`:
const paginatedCollectionsVars: PaginatedCollectionsVariables = {
  limit: ..., // optional
  offset: ..., // optional
  orderByField: ..., // optional
  orderDirection: ..., // optional
};

// Call the `paginatedCollectionsRef()` function to get a reference to the query.
const ref = paginatedCollectionsRef(paginatedCollectionsVars);
// Variables can be defined inline as well.
const ref = paginatedCollectionsRef({ limit: ..., offset: ..., orderByField: ..., orderDirection: ..., });
// Since all variables are optional for this query, you can omit the `PaginatedCollectionsVariables` argument.
const ref = paginatedCollectionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = paginatedCollectionsRef(dataConnect, paginatedCollectionsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.collectionFromCsvs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.collectionFromCsvs);
});
```

## CountCollectionFromCsv
You can execute the `CountCollectionFromCsv` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
countCollectionFromCsv(): QueryPromise<CountCollectionFromCsvData, undefined>;

interface CountCollectionFromCsvRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<CountCollectionFromCsvData, undefined>;
}
export const countCollectionFromCsvRef: CountCollectionFromCsvRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
countCollectionFromCsv(dc: DataConnect): QueryPromise<CountCollectionFromCsvData, undefined>;

interface CountCollectionFromCsvRef {
  ...
  (dc: DataConnect): QueryRef<CountCollectionFromCsvData, undefined>;
}
export const countCollectionFromCsvRef: CountCollectionFromCsvRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the countCollectionFromCsvRef:
```typescript
const name = countCollectionFromCsvRef.operationName;
console.log(name);
```

### Variables
The `CountCollectionFromCsv` query has no variables.
### Return Type
Recall that executing the `CountCollectionFromCsv` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CountCollectionFromCsvData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CountCollectionFromCsvData {
  collectionFromCsvs: ({
    _count: number;
  })[];
}
```
### Using `CountCollectionFromCsv`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, countCollectionFromCsv } from '@dataconnect/generated';


// Call the `countCollectionFromCsv()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await countCollectionFromCsv();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await countCollectionFromCsv(dataConnect);

console.log(data.collectionFromCsvs);

// Or, you can use the `Promise` API.
countCollectionFromCsv().then((response) => {
  const data = response.data;
  console.log(data.collectionFromCsvs);
});
```

### Using `CountCollectionFromCsv`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, countCollectionFromCsvRef } from '@dataconnect/generated';


// Call the `countCollectionFromCsvRef()` function to get a reference to the query.
const ref = countCollectionFromCsvRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = countCollectionFromCsvRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.collectionFromCsvs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.collectionFromCsvs);
});
```

## SearchCollectionFromCsv
You can execute the `SearchCollectionFromCsv` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
searchCollectionFromCsv(vars?: SearchCollectionFromCsvVariables): QueryPromise<SearchCollectionFromCsvData, SearchCollectionFromCsvVariables>;

interface SearchCollectionFromCsvRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: SearchCollectionFromCsvVariables): QueryRef<SearchCollectionFromCsvData, SearchCollectionFromCsvVariables>;
}
export const searchCollectionFromCsvRef: SearchCollectionFromCsvRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
searchCollectionFromCsv(dc: DataConnect, vars?: SearchCollectionFromCsvVariables): QueryPromise<SearchCollectionFromCsvData, SearchCollectionFromCsvVariables>;

interface SearchCollectionFromCsvRef {
  ...
  (dc: DataConnect, vars?: SearchCollectionFromCsvVariables): QueryRef<SearchCollectionFromCsvData, SearchCollectionFromCsvVariables>;
}
export const searchCollectionFromCsvRef: SearchCollectionFromCsvRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the searchCollectionFromCsvRef:
```typescript
const name = searchCollectionFromCsvRef.operationName;
console.log(name);
```

### Variables
The `SearchCollectionFromCsv` query has an optional argument of type `SearchCollectionFromCsvVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SearchCollectionFromCsvVariables {
  query?: string | null;
  limit?: number | null;
}
```
### Return Type
Recall that executing the `SearchCollectionFromCsv` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SearchCollectionFromCsvData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `SearchCollectionFromCsv`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, searchCollectionFromCsv, SearchCollectionFromCsvVariables } from '@dataconnect/generated';

// The `SearchCollectionFromCsv` query has an optional argument of type `SearchCollectionFromCsvVariables`:
const searchCollectionFromCsvVars: SearchCollectionFromCsvVariables = {
  query: ..., // optional
  limit: ..., // optional
};

// Call the `searchCollectionFromCsv()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await searchCollectionFromCsv(searchCollectionFromCsvVars);
// Variables can be defined inline as well.
const { data } = await searchCollectionFromCsv({ query: ..., limit: ..., });
// Since all variables are optional for this query, you can omit the `SearchCollectionFromCsvVariables` argument.
const { data } = await searchCollectionFromCsv();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await searchCollectionFromCsv(dataConnect, searchCollectionFromCsvVars);

console.log(data.collectionFromCsvs_search);

// Or, you can use the `Promise` API.
searchCollectionFromCsv(searchCollectionFromCsvVars).then((response) => {
  const data = response.data;
  console.log(data.collectionFromCsvs_search);
});
```

### Using `SearchCollectionFromCsv`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, searchCollectionFromCsvRef, SearchCollectionFromCsvVariables } from '@dataconnect/generated';

// The `SearchCollectionFromCsv` query has an optional argument of type `SearchCollectionFromCsvVariables`:
const searchCollectionFromCsvVars: SearchCollectionFromCsvVariables = {
  query: ..., // optional
  limit: ..., // optional
};

// Call the `searchCollectionFromCsvRef()` function to get a reference to the query.
const ref = searchCollectionFromCsvRef(searchCollectionFromCsvVars);
// Variables can be defined inline as well.
const ref = searchCollectionFromCsvRef({ query: ..., limit: ..., });
// Since all variables are optional for this query, you can omit the `SearchCollectionFromCsvVariables` argument.
const ref = searchCollectionFromCsvRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = searchCollectionFromCsvRef(dataConnect, searchCollectionFromCsvVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.collectionFromCsvs_search);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.collectionFromCsvs_search);
});
```

## GetConsumer
You can execute the `GetConsumer` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getConsumer(vars: GetConsumerVariables): QueryPromise<GetConsumerData, GetConsumerVariables>;

interface GetConsumerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetConsumerVariables): QueryRef<GetConsumerData, GetConsumerVariables>;
}
export const getConsumerRef: GetConsumerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getConsumer(dc: DataConnect, vars: GetConsumerVariables): QueryPromise<GetConsumerData, GetConsumerVariables>;

interface GetConsumerRef {
  ...
  (dc: DataConnect, vars: GetConsumerVariables): QueryRef<GetConsumerData, GetConsumerVariables>;
}
export const getConsumerRef: GetConsumerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getConsumerRef:
```typescript
const name = getConsumerRef.operationName;
console.log(name);
```

### Variables
The `GetConsumer` query requires an argument of type `GetConsumerVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetConsumerVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetConsumer` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetConsumerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetConsumer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getConsumer, GetConsumerVariables } from '@dataconnect/generated';

// The `GetConsumer` query requires an argument of type `GetConsumerVariables`:
const getConsumerVars: GetConsumerVariables = {
  id: ..., 
};

// Call the `getConsumer()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getConsumer(getConsumerVars);
// Variables can be defined inline as well.
const { data } = await getConsumer({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getConsumer(dataConnect, getConsumerVars);

console.log(data.consumer);

// Or, you can use the `Promise` API.
getConsumer(getConsumerVars).then((response) => {
  const data = response.data;
  console.log(data.consumer);
});
```

### Using `GetConsumer`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getConsumerRef, GetConsumerVariables } from '@dataconnect/generated';

// The `GetConsumer` query requires an argument of type `GetConsumerVariables`:
const getConsumerVars: GetConsumerVariables = {
  id: ..., 
};

// Call the `getConsumerRef()` function to get a reference to the query.
const ref = getConsumerRef(getConsumerVars);
// Variables can be defined inline as well.
const ref = getConsumerRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getConsumerRef(dataConnect, getConsumerVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.consumer);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.consumer);
});
```

## PaginatedConsumers
You can execute the `PaginatedConsumers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
paginatedConsumers(vars?: PaginatedConsumersVariables): QueryPromise<PaginatedConsumersData, PaginatedConsumersVariables>;

interface PaginatedConsumersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: PaginatedConsumersVariables): QueryRef<PaginatedConsumersData, PaginatedConsumersVariables>;
}
export const paginatedConsumersRef: PaginatedConsumersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
paginatedConsumers(dc: DataConnect, vars?: PaginatedConsumersVariables): QueryPromise<PaginatedConsumersData, PaginatedConsumersVariables>;

interface PaginatedConsumersRef {
  ...
  (dc: DataConnect, vars?: PaginatedConsumersVariables): QueryRef<PaginatedConsumersData, PaginatedConsumersVariables>;
}
export const paginatedConsumersRef: PaginatedConsumersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the paginatedConsumersRef:
```typescript
const name = paginatedConsumersRef.operationName;
console.log(name);
```

### Variables
The `PaginatedConsumers` query has an optional argument of type `PaginatedConsumersVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface PaginatedConsumersVariables {
  limit?: number | null;
  offset?: number | null;
  orderByField?: string | null;
  orderDirection?: string | null;
}
```
### Return Type
Recall that executing the `PaginatedConsumers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `PaginatedConsumersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `PaginatedConsumers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, paginatedConsumers, PaginatedConsumersVariables } from '@dataconnect/generated';

// The `PaginatedConsumers` query has an optional argument of type `PaginatedConsumersVariables`:
const paginatedConsumersVars: PaginatedConsumersVariables = {
  limit: ..., // optional
  offset: ..., // optional
  orderByField: ..., // optional
  orderDirection: ..., // optional
};

// Call the `paginatedConsumers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await paginatedConsumers(paginatedConsumersVars);
// Variables can be defined inline as well.
const { data } = await paginatedConsumers({ limit: ..., offset: ..., orderByField: ..., orderDirection: ..., });
// Since all variables are optional for this query, you can omit the `PaginatedConsumersVariables` argument.
const { data } = await paginatedConsumers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await paginatedConsumers(dataConnect, paginatedConsumersVars);

console.log(data.consumers);

// Or, you can use the `Promise` API.
paginatedConsumers(paginatedConsumersVars).then((response) => {
  const data = response.data;
  console.log(data.consumers);
});
```

### Using `PaginatedConsumers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, paginatedConsumersRef, PaginatedConsumersVariables } from '@dataconnect/generated';

// The `PaginatedConsumers` query has an optional argument of type `PaginatedConsumersVariables`:
const paginatedConsumersVars: PaginatedConsumersVariables = {
  limit: ..., // optional
  offset: ..., // optional
  orderByField: ..., // optional
  orderDirection: ..., // optional
};

// Call the `paginatedConsumersRef()` function to get a reference to the query.
const ref = paginatedConsumersRef(paginatedConsumersVars);
// Variables can be defined inline as well.
const ref = paginatedConsumersRef({ limit: ..., offset: ..., orderByField: ..., orderDirection: ..., });
// Since all variables are optional for this query, you can omit the `PaginatedConsumersVariables` argument.
const ref = paginatedConsumersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = paginatedConsumersRef(dataConnect, paginatedConsumersVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.consumers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.consumers);
});
```

## SearchConsumers
You can execute the `SearchConsumers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
searchConsumers(vars: SearchConsumersVariables): QueryPromise<SearchConsumersData, SearchConsumersVariables>;

interface SearchConsumersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SearchConsumersVariables): QueryRef<SearchConsumersData, SearchConsumersVariables>;
}
export const searchConsumersRef: SearchConsumersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
searchConsumers(dc: DataConnect, vars: SearchConsumersVariables): QueryPromise<SearchConsumersData, SearchConsumersVariables>;

interface SearchConsumersRef {
  ...
  (dc: DataConnect, vars: SearchConsumersVariables): QueryRef<SearchConsumersData, SearchConsumersVariables>;
}
export const searchConsumersRef: SearchConsumersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the searchConsumersRef:
```typescript
const name = searchConsumersRef.operationName;
console.log(name);
```

### Variables
The `SearchConsumers` query requires an argument of type `SearchConsumersVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SearchConsumersVariables {
  query: string;
}
```
### Return Type
Recall that executing the `SearchConsumers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SearchConsumersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SearchConsumersData {
  consumers_search: ({
    id: UUIDString;
    accountNo: string;
    fullName: string;
    book: string;
    classType: string;
  } & Consumer_Key)[];
}
```
### Using `SearchConsumers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, searchConsumers, SearchConsumersVariables } from '@dataconnect/generated';

// The `SearchConsumers` query requires an argument of type `SearchConsumersVariables`:
const searchConsumersVars: SearchConsumersVariables = {
  query: ..., 
};

// Call the `searchConsumers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await searchConsumers(searchConsumersVars);
// Variables can be defined inline as well.
const { data } = await searchConsumers({ query: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await searchConsumers(dataConnect, searchConsumersVars);

console.log(data.consumers_search);

// Or, you can use the `Promise` API.
searchConsumers(searchConsumersVars).then((response) => {
  const data = response.data;
  console.log(data.consumers_search);
});
```

### Using `SearchConsumers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, searchConsumersRef, SearchConsumersVariables } from '@dataconnect/generated';

// The `SearchConsumers` query requires an argument of type `SearchConsumersVariables`:
const searchConsumersVars: SearchConsumersVariables = {
  query: ..., 
};

// Call the `searchConsumersRef()` function to get a reference to the query.
const ref = searchConsumersRef(searchConsumersVars);
// Variables can be defined inline as well.
const ref = searchConsumersRef({ query: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = searchConsumersRef(dataConnect, searchConsumersVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.consumers_search);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.consumers_search);
});
```

## CountConsumers
You can execute the `CountConsumers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
countConsumers(): QueryPromise<CountConsumersData, undefined>;

interface CountConsumersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<CountConsumersData, undefined>;
}
export const countConsumersRef: CountConsumersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
countConsumers(dc: DataConnect): QueryPromise<CountConsumersData, undefined>;

interface CountConsumersRef {
  ...
  (dc: DataConnect): QueryRef<CountConsumersData, undefined>;
}
export const countConsumersRef: CountConsumersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the countConsumersRef:
```typescript
const name = countConsumersRef.operationName;
console.log(name);
```

### Variables
The `CountConsumers` query has no variables.
### Return Type
Recall that executing the `CountConsumers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CountConsumersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CountConsumersData {
  consumers: ({
    _count: number;
  })[];
}
```
### Using `CountConsumers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, countConsumers } from '@dataconnect/generated';


// Call the `countConsumers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await countConsumers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await countConsumers(dataConnect);

console.log(data.consumers);

// Or, you can use the `Promise` API.
countConsumers().then((response) => {
  const data = response.data;
  console.log(data.consumers);
});
```

### Using `CountConsumers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, countConsumersRef } from '@dataconnect/generated';


// Call the `countConsumersRef()` function to get a reference to the query.
const ref = countConsumersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = countConsumersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.consumers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.consumers);
});
```

## PaginatedLedgers
You can execute the `PaginatedLedgers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
paginatedLedgers(vars?: PaginatedLedgersVariables): QueryPromise<PaginatedLedgersData, PaginatedLedgersVariables>;

interface PaginatedLedgersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: PaginatedLedgersVariables): QueryRef<PaginatedLedgersData, PaginatedLedgersVariables>;
}
export const paginatedLedgersRef: PaginatedLedgersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
paginatedLedgers(dc: DataConnect, vars?: PaginatedLedgersVariables): QueryPromise<PaginatedLedgersData, PaginatedLedgersVariables>;

interface PaginatedLedgersRef {
  ...
  (dc: DataConnect, vars?: PaginatedLedgersVariables): QueryRef<PaginatedLedgersData, PaginatedLedgersVariables>;
}
export const paginatedLedgersRef: PaginatedLedgersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the paginatedLedgersRef:
```typescript
const name = paginatedLedgersRef.operationName;
console.log(name);
```

### Variables
The `PaginatedLedgers` query has an optional argument of type `PaginatedLedgersVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface PaginatedLedgersVariables {
  limit?: number | null;
  offset?: number | null;
  orderByField?: string | null;
  orderDirection?: string | null;
}
```
### Return Type
Recall that executing the `PaginatedLedgers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `PaginatedLedgersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `PaginatedLedgers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, paginatedLedgers, PaginatedLedgersVariables } from '@dataconnect/generated';

// The `PaginatedLedgers` query has an optional argument of type `PaginatedLedgersVariables`:
const paginatedLedgersVars: PaginatedLedgersVariables = {
  limit: ..., // optional
  offset: ..., // optional
  orderByField: ..., // optional
  orderDirection: ..., // optional
};

// Call the `paginatedLedgers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await paginatedLedgers(paginatedLedgersVars);
// Variables can be defined inline as well.
const { data } = await paginatedLedgers({ limit: ..., offset: ..., orderByField: ..., orderDirection: ..., });
// Since all variables are optional for this query, you can omit the `PaginatedLedgersVariables` argument.
const { data } = await paginatedLedgers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await paginatedLedgers(dataConnect, paginatedLedgersVars);

console.log(data.ledgerFromCsvs);

// Or, you can use the `Promise` API.
paginatedLedgers(paginatedLedgersVars).then((response) => {
  const data = response.data;
  console.log(data.ledgerFromCsvs);
});
```

### Using `PaginatedLedgers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, paginatedLedgersRef, PaginatedLedgersVariables } from '@dataconnect/generated';

// The `PaginatedLedgers` query has an optional argument of type `PaginatedLedgersVariables`:
const paginatedLedgersVars: PaginatedLedgersVariables = {
  limit: ..., // optional
  offset: ..., // optional
  orderByField: ..., // optional
  orderDirection: ..., // optional
};

// Call the `paginatedLedgersRef()` function to get a reference to the query.
const ref = paginatedLedgersRef(paginatedLedgersVars);
// Variables can be defined inline as well.
const ref = paginatedLedgersRef({ limit: ..., offset: ..., orderByField: ..., orderDirection: ..., });
// Since all variables are optional for this query, you can omit the `PaginatedLedgersVariables` argument.
const ref = paginatedLedgersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = paginatedLedgersRef(dataConnect, paginatedLedgersVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.ledgerFromCsvs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.ledgerFromCsvs);
});
```

## CountLedgerFromCsv
You can execute the `CountLedgerFromCsv` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
countLedgerFromCsv(): QueryPromise<CountLedgerFromCsvData, undefined>;

interface CountLedgerFromCsvRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<CountLedgerFromCsvData, undefined>;
}
export const countLedgerFromCsvRef: CountLedgerFromCsvRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
countLedgerFromCsv(dc: DataConnect): QueryPromise<CountLedgerFromCsvData, undefined>;

interface CountLedgerFromCsvRef {
  ...
  (dc: DataConnect): QueryRef<CountLedgerFromCsvData, undefined>;
}
export const countLedgerFromCsvRef: CountLedgerFromCsvRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the countLedgerFromCsvRef:
```typescript
const name = countLedgerFromCsvRef.operationName;
console.log(name);
```

### Variables
The `CountLedgerFromCsv` query has no variables.
### Return Type
Recall that executing the `CountLedgerFromCsv` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CountLedgerFromCsvData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CountLedgerFromCsvData {
  ledgerFromCsvs: ({
    _count: number;
  })[];
}
```
### Using `CountLedgerFromCsv`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, countLedgerFromCsv } from '@dataconnect/generated';


// Call the `countLedgerFromCsv()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await countLedgerFromCsv();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await countLedgerFromCsv(dataConnect);

console.log(data.ledgerFromCsvs);

// Or, you can use the `Promise` API.
countLedgerFromCsv().then((response) => {
  const data = response.data;
  console.log(data.ledgerFromCsvs);
});
```

### Using `CountLedgerFromCsv`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, countLedgerFromCsvRef } from '@dataconnect/generated';


// Call the `countLedgerFromCsvRef()` function to get a reference to the query.
const ref = countLedgerFromCsvRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = countLedgerFromCsvRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.ledgerFromCsvs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.ledgerFromCsvs);
});
```

## SearchLedgerFromCsv
You can execute the `SearchLedgerFromCsv` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
searchLedgerFromCsv(vars?: SearchLedgerFromCsvVariables): QueryPromise<SearchLedgerFromCsvData, SearchLedgerFromCsvVariables>;

interface SearchLedgerFromCsvRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: SearchLedgerFromCsvVariables): QueryRef<SearchLedgerFromCsvData, SearchLedgerFromCsvVariables>;
}
export const searchLedgerFromCsvRef: SearchLedgerFromCsvRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
searchLedgerFromCsv(dc: DataConnect, vars?: SearchLedgerFromCsvVariables): QueryPromise<SearchLedgerFromCsvData, SearchLedgerFromCsvVariables>;

interface SearchLedgerFromCsvRef {
  ...
  (dc: DataConnect, vars?: SearchLedgerFromCsvVariables): QueryRef<SearchLedgerFromCsvData, SearchLedgerFromCsvVariables>;
}
export const searchLedgerFromCsvRef: SearchLedgerFromCsvRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the searchLedgerFromCsvRef:
```typescript
const name = searchLedgerFromCsvRef.operationName;
console.log(name);
```

### Variables
The `SearchLedgerFromCsv` query has an optional argument of type `SearchLedgerFromCsvVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SearchLedgerFromCsvVariables {
  query?: string | null;
  limit?: number | null;
}
```
### Return Type
Recall that executing the `SearchLedgerFromCsv` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SearchLedgerFromCsvData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `SearchLedgerFromCsv`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, searchLedgerFromCsv, SearchLedgerFromCsvVariables } from '@dataconnect/generated';

// The `SearchLedgerFromCsv` query has an optional argument of type `SearchLedgerFromCsvVariables`:
const searchLedgerFromCsvVars: SearchLedgerFromCsvVariables = {
  query: ..., // optional
  limit: ..., // optional
};

// Call the `searchLedgerFromCsv()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await searchLedgerFromCsv(searchLedgerFromCsvVars);
// Variables can be defined inline as well.
const { data } = await searchLedgerFromCsv({ query: ..., limit: ..., });
// Since all variables are optional for this query, you can omit the `SearchLedgerFromCsvVariables` argument.
const { data } = await searchLedgerFromCsv();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await searchLedgerFromCsv(dataConnect, searchLedgerFromCsvVars);

console.log(data.ledgerFromCsvs_search);

// Or, you can use the `Promise` API.
searchLedgerFromCsv(searchLedgerFromCsvVars).then((response) => {
  const data = response.data;
  console.log(data.ledgerFromCsvs_search);
});
```

### Using `SearchLedgerFromCsv`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, searchLedgerFromCsvRef, SearchLedgerFromCsvVariables } from '@dataconnect/generated';

// The `SearchLedgerFromCsv` query has an optional argument of type `SearchLedgerFromCsvVariables`:
const searchLedgerFromCsvVars: SearchLedgerFromCsvVariables = {
  query: ..., // optional
  limit: ..., // optional
};

// Call the `searchLedgerFromCsvRef()` function to get a reference to the query.
const ref = searchLedgerFromCsvRef(searchLedgerFromCsvVars);
// Variables can be defined inline as well.
const ref = searchLedgerFromCsvRef({ query: ..., limit: ..., });
// Since all variables are optional for this query, you can omit the `SearchLedgerFromCsvVariables` argument.
const ref = searchLedgerFromCsvRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = searchLedgerFromCsvRef(dataConnect, searchLedgerFromCsvVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.ledgerFromCsvs_search);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.ledgerFromCsvs_search);
});
```

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
    updatedAt?: TimestampString | null;
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

## CreateConsumer
You can execute the `CreateConsumer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createConsumer(vars: CreateConsumerVariables): MutationPromise<CreateConsumerData, CreateConsumerVariables>;

interface CreateConsumerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateConsumerVariables): MutationRef<CreateConsumerData, CreateConsumerVariables>;
}
export const createConsumerRef: CreateConsumerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createConsumer(dc: DataConnect, vars: CreateConsumerVariables): MutationPromise<CreateConsumerData, CreateConsumerVariables>;

interface CreateConsumerRef {
  ...
  (dc: DataConnect, vars: CreateConsumerVariables): MutationRef<CreateConsumerData, CreateConsumerVariables>;
}
export const createConsumerRef: CreateConsumerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createConsumerRef:
```typescript
const name = createConsumerRef.operationName;
console.log(name);
```

### Variables
The `CreateConsumer` mutation requires an argument of type `CreateConsumerVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateConsumerVariables {
  accountNo: string;
  fullName: string;
  book: string;
  classType: string;
}
```
### Return Type
Recall that executing the `CreateConsumer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateConsumerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateConsumerData {
  consumer_insert: Consumer_Key;
}
```
### Using `CreateConsumer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createConsumer, CreateConsumerVariables } from '@dataconnect/generated';

// The `CreateConsumer` mutation requires an argument of type `CreateConsumerVariables`:
const createConsumerVars: CreateConsumerVariables = {
  accountNo: ..., 
  fullName: ..., 
  book: ..., 
  classType: ..., 
};

// Call the `createConsumer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createConsumer(createConsumerVars);
// Variables can be defined inline as well.
const { data } = await createConsumer({ accountNo: ..., fullName: ..., book: ..., classType: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createConsumer(dataConnect, createConsumerVars);

console.log(data.consumer_insert);

// Or, you can use the `Promise` API.
createConsumer(createConsumerVars).then((response) => {
  const data = response.data;
  console.log(data.consumer_insert);
});
```

### Using `CreateConsumer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createConsumerRef, CreateConsumerVariables } from '@dataconnect/generated';

// The `CreateConsumer` mutation requires an argument of type `CreateConsumerVariables`:
const createConsumerVars: CreateConsumerVariables = {
  accountNo: ..., 
  fullName: ..., 
  book: ..., 
  classType: ..., 
};

// Call the `createConsumerRef()` function to get a reference to the mutation.
const ref = createConsumerRef(createConsumerVars);
// Variables can be defined inline as well.
const ref = createConsumerRef({ accountNo: ..., fullName: ..., book: ..., classType: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createConsumerRef(dataConnect, createConsumerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.consumer_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.consumer_insert);
});
```

## UpdateConsumer
You can execute the `UpdateConsumer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateConsumer(vars: UpdateConsumerVariables): MutationPromise<UpdateConsumerData, UpdateConsumerVariables>;

interface UpdateConsumerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateConsumerVariables): MutationRef<UpdateConsumerData, UpdateConsumerVariables>;
}
export const updateConsumerRef: UpdateConsumerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateConsumer(dc: DataConnect, vars: UpdateConsumerVariables): MutationPromise<UpdateConsumerData, UpdateConsumerVariables>;

interface UpdateConsumerRef {
  ...
  (dc: DataConnect, vars: UpdateConsumerVariables): MutationRef<UpdateConsumerData, UpdateConsumerVariables>;
}
export const updateConsumerRef: UpdateConsumerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateConsumerRef:
```typescript
const name = updateConsumerRef.operationName;
console.log(name);
```

### Variables
The `UpdateConsumer` mutation requires an argument of type `UpdateConsumerVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateConsumerVariables {
  id: UUIDString;
  accountNo?: string | null;
  fullName?: string | null;
  book?: string | null;
  classType?: string | null;
}
```
### Return Type
Recall that executing the `UpdateConsumer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateConsumerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateConsumerData {
  consumer_update?: Consumer_Key | null;
}
```
### Using `UpdateConsumer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateConsumer, UpdateConsumerVariables } from '@dataconnect/generated';

// The `UpdateConsumer` mutation requires an argument of type `UpdateConsumerVariables`:
const updateConsumerVars: UpdateConsumerVariables = {
  id: ..., 
  accountNo: ..., // optional
  fullName: ..., // optional
  book: ..., // optional
  classType: ..., // optional
};

// Call the `updateConsumer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateConsumer(updateConsumerVars);
// Variables can be defined inline as well.
const { data } = await updateConsumer({ id: ..., accountNo: ..., fullName: ..., book: ..., classType: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateConsumer(dataConnect, updateConsumerVars);

console.log(data.consumer_update);

// Or, you can use the `Promise` API.
updateConsumer(updateConsumerVars).then((response) => {
  const data = response.data;
  console.log(data.consumer_update);
});
```

### Using `UpdateConsumer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateConsumerRef, UpdateConsumerVariables } from '@dataconnect/generated';

// The `UpdateConsumer` mutation requires an argument of type `UpdateConsumerVariables`:
const updateConsumerVars: UpdateConsumerVariables = {
  id: ..., 
  accountNo: ..., // optional
  fullName: ..., // optional
  book: ..., // optional
  classType: ..., // optional
};

// Call the `updateConsumerRef()` function to get a reference to the mutation.
const ref = updateConsumerRef(updateConsumerVars);
// Variables can be defined inline as well.
const ref = updateConsumerRef({ id: ..., accountNo: ..., fullName: ..., book: ..., classType: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateConsumerRef(dataConnect, updateConsumerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.consumer_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.consumer_update);
});
```

## DeleteConsumer
You can execute the `DeleteConsumer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteConsumer(vars: DeleteConsumerVariables): MutationPromise<DeleteConsumerData, DeleteConsumerVariables>;

interface DeleteConsumerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteConsumerVariables): MutationRef<DeleteConsumerData, DeleteConsumerVariables>;
}
export const deleteConsumerRef: DeleteConsumerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteConsumer(dc: DataConnect, vars: DeleteConsumerVariables): MutationPromise<DeleteConsumerData, DeleteConsumerVariables>;

interface DeleteConsumerRef {
  ...
  (dc: DataConnect, vars: DeleteConsumerVariables): MutationRef<DeleteConsumerData, DeleteConsumerVariables>;
}
export const deleteConsumerRef: DeleteConsumerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteConsumerRef:
```typescript
const name = deleteConsumerRef.operationName;
console.log(name);
```

### Variables
The `DeleteConsumer` mutation requires an argument of type `DeleteConsumerVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteConsumerVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteConsumer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteConsumerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteConsumerData {
  consumer_delete?: Consumer_Key | null;
}
```
### Using `DeleteConsumer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteConsumer, DeleteConsumerVariables } from '@dataconnect/generated';

// The `DeleteConsumer` mutation requires an argument of type `DeleteConsumerVariables`:
const deleteConsumerVars: DeleteConsumerVariables = {
  id: ..., 
};

// Call the `deleteConsumer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteConsumer(deleteConsumerVars);
// Variables can be defined inline as well.
const { data } = await deleteConsumer({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteConsumer(dataConnect, deleteConsumerVars);

console.log(data.consumer_delete);

// Or, you can use the `Promise` API.
deleteConsumer(deleteConsumerVars).then((response) => {
  const data = response.data;
  console.log(data.consumer_delete);
});
```

### Using `DeleteConsumer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteConsumerRef, DeleteConsumerVariables } from '@dataconnect/generated';

// The `DeleteConsumer` mutation requires an argument of type `DeleteConsumerVariables`:
const deleteConsumerVars: DeleteConsumerVariables = {
  id: ..., 
};

// Call the `deleteConsumerRef()` function to get a reference to the mutation.
const ref = deleteConsumerRef(deleteConsumerVars);
// Variables can be defined inline as well.
const ref = deleteConsumerRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteConsumerRef(dataConnect, deleteConsumerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.consumer_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.consumer_delete);
});
```

## CreateLedgerFromCsv
You can execute the `CreateLedgerFromCsv` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createLedgerFromCsv(vars: CreateLedgerFromCsvVariables): MutationPromise<CreateLedgerFromCsvData, CreateLedgerFromCsvVariables>;

interface CreateLedgerFromCsvRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLedgerFromCsvVariables): MutationRef<CreateLedgerFromCsvData, CreateLedgerFromCsvVariables>;
}
export const createLedgerFromCsvRef: CreateLedgerFromCsvRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createLedgerFromCsv(dc: DataConnect, vars: CreateLedgerFromCsvVariables): MutationPromise<CreateLedgerFromCsvData, CreateLedgerFromCsvVariables>;

interface CreateLedgerFromCsvRef {
  ...
  (dc: DataConnect, vars: CreateLedgerFromCsvVariables): MutationRef<CreateLedgerFromCsvData, CreateLedgerFromCsvVariables>;
}
export const createLedgerFromCsvRef: CreateLedgerFromCsvRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createLedgerFromCsvRef:
```typescript
const name = createLedgerFromCsvRef.operationName;
console.log(name);
```

### Variables
The `CreateLedgerFromCsv` mutation requires an argument of type `CreateLedgerFromCsvVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateLedgerFromCsv` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateLedgerFromCsvData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateLedgerFromCsvData {
  ledgerFromCsv_insert: LedgerFromCsv_Key;
}
```
### Using `CreateLedgerFromCsv`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createLedgerFromCsv, CreateLedgerFromCsvVariables } from '@dataconnect/generated';

// The `CreateLedgerFromCsv` mutation requires an argument of type `CreateLedgerFromCsvVariables`:
const createLedgerFromCsvVars: CreateLedgerFromCsvVariables = {
  accountNo: ..., 
  transDate: ..., 
  refCode: ..., 
  refNo: ..., 
  amount: ..., 
  timestamp: ..., // optional
  tag: ..., 
  reading: ..., 
  consumption: ..., 
  sequence: ..., 
  custNo: ..., 
};

// Call the `createLedgerFromCsv()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createLedgerFromCsv(createLedgerFromCsvVars);
// Variables can be defined inline as well.
const { data } = await createLedgerFromCsv({ accountNo: ..., transDate: ..., refCode: ..., refNo: ..., amount: ..., timestamp: ..., tag: ..., reading: ..., consumption: ..., sequence: ..., custNo: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createLedgerFromCsv(dataConnect, createLedgerFromCsvVars);

console.log(data.ledgerFromCsv_insert);

// Or, you can use the `Promise` API.
createLedgerFromCsv(createLedgerFromCsvVars).then((response) => {
  const data = response.data;
  console.log(data.ledgerFromCsv_insert);
});
```

### Using `CreateLedgerFromCsv`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createLedgerFromCsvRef, CreateLedgerFromCsvVariables } from '@dataconnect/generated';

// The `CreateLedgerFromCsv` mutation requires an argument of type `CreateLedgerFromCsvVariables`:
const createLedgerFromCsvVars: CreateLedgerFromCsvVariables = {
  accountNo: ..., 
  transDate: ..., 
  refCode: ..., 
  refNo: ..., 
  amount: ..., 
  timestamp: ..., // optional
  tag: ..., 
  reading: ..., 
  consumption: ..., 
  sequence: ..., 
  custNo: ..., 
};

// Call the `createLedgerFromCsvRef()` function to get a reference to the mutation.
const ref = createLedgerFromCsvRef(createLedgerFromCsvVars);
// Variables can be defined inline as well.
const ref = createLedgerFromCsvRef({ accountNo: ..., transDate: ..., refCode: ..., refNo: ..., amount: ..., timestamp: ..., tag: ..., reading: ..., consumption: ..., sequence: ..., custNo: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createLedgerFromCsvRef(dataConnect, createLedgerFromCsvVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.ledgerFromCsv_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.ledgerFromCsv_insert);
});
```

## UpdateLedgerFromCsv
You can execute the `UpdateLedgerFromCsv` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateLedgerFromCsv(vars: UpdateLedgerFromCsvVariables): MutationPromise<UpdateLedgerFromCsvData, UpdateLedgerFromCsvVariables>;

interface UpdateLedgerFromCsvRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLedgerFromCsvVariables): MutationRef<UpdateLedgerFromCsvData, UpdateLedgerFromCsvVariables>;
}
export const updateLedgerFromCsvRef: UpdateLedgerFromCsvRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateLedgerFromCsv(dc: DataConnect, vars: UpdateLedgerFromCsvVariables): MutationPromise<UpdateLedgerFromCsvData, UpdateLedgerFromCsvVariables>;

interface UpdateLedgerFromCsvRef {
  ...
  (dc: DataConnect, vars: UpdateLedgerFromCsvVariables): MutationRef<UpdateLedgerFromCsvData, UpdateLedgerFromCsvVariables>;
}
export const updateLedgerFromCsvRef: UpdateLedgerFromCsvRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateLedgerFromCsvRef:
```typescript
const name = updateLedgerFromCsvRef.operationName;
console.log(name);
```

### Variables
The `UpdateLedgerFromCsv` mutation requires an argument of type `UpdateLedgerFromCsvVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpdateLedgerFromCsv` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateLedgerFromCsvData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateLedgerFromCsvData {
  ledgerFromCsv_update?: LedgerFromCsv_Key | null;
}
```
### Using `UpdateLedgerFromCsv`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateLedgerFromCsv, UpdateLedgerFromCsvVariables } from '@dataconnect/generated';

// The `UpdateLedgerFromCsv` mutation requires an argument of type `UpdateLedgerFromCsvVariables`:
const updateLedgerFromCsvVars: UpdateLedgerFromCsvVariables = {
  id: ..., 
  accountNo: ..., // optional
  transDate: ..., // optional
  refCode: ..., // optional
  refNo: ..., // optional
  amount: ..., // optional
  timestamp: ..., // optional
  tag: ..., // optional
  reading: ..., // optional
  consumption: ..., // optional
  sequence: ..., // optional
  custNo: ..., // optional
};

// Call the `updateLedgerFromCsv()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateLedgerFromCsv(updateLedgerFromCsvVars);
// Variables can be defined inline as well.
const { data } = await updateLedgerFromCsv({ id: ..., accountNo: ..., transDate: ..., refCode: ..., refNo: ..., amount: ..., timestamp: ..., tag: ..., reading: ..., consumption: ..., sequence: ..., custNo: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateLedgerFromCsv(dataConnect, updateLedgerFromCsvVars);

console.log(data.ledgerFromCsv_update);

// Or, you can use the `Promise` API.
updateLedgerFromCsv(updateLedgerFromCsvVars).then((response) => {
  const data = response.data;
  console.log(data.ledgerFromCsv_update);
});
```

### Using `UpdateLedgerFromCsv`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateLedgerFromCsvRef, UpdateLedgerFromCsvVariables } from '@dataconnect/generated';

// The `UpdateLedgerFromCsv` mutation requires an argument of type `UpdateLedgerFromCsvVariables`:
const updateLedgerFromCsvVars: UpdateLedgerFromCsvVariables = {
  id: ..., 
  accountNo: ..., // optional
  transDate: ..., // optional
  refCode: ..., // optional
  refNo: ..., // optional
  amount: ..., // optional
  timestamp: ..., // optional
  tag: ..., // optional
  reading: ..., // optional
  consumption: ..., // optional
  sequence: ..., // optional
  custNo: ..., // optional
};

// Call the `updateLedgerFromCsvRef()` function to get a reference to the mutation.
const ref = updateLedgerFromCsvRef(updateLedgerFromCsvVars);
// Variables can be defined inline as well.
const ref = updateLedgerFromCsvRef({ id: ..., accountNo: ..., transDate: ..., refCode: ..., refNo: ..., amount: ..., timestamp: ..., tag: ..., reading: ..., consumption: ..., sequence: ..., custNo: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateLedgerFromCsvRef(dataConnect, updateLedgerFromCsvVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.ledgerFromCsv_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.ledgerFromCsv_update);
});
```

## DeleteLedgerFromCsv
You can execute the `DeleteLedgerFromCsv` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteLedgerFromCsv(vars: DeleteLedgerFromCsvVariables): MutationPromise<DeleteLedgerFromCsvData, DeleteLedgerFromCsvVariables>;

interface DeleteLedgerFromCsvRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteLedgerFromCsvVariables): MutationRef<DeleteLedgerFromCsvData, DeleteLedgerFromCsvVariables>;
}
export const deleteLedgerFromCsvRef: DeleteLedgerFromCsvRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteLedgerFromCsv(dc: DataConnect, vars: DeleteLedgerFromCsvVariables): MutationPromise<DeleteLedgerFromCsvData, DeleteLedgerFromCsvVariables>;

interface DeleteLedgerFromCsvRef {
  ...
  (dc: DataConnect, vars: DeleteLedgerFromCsvVariables): MutationRef<DeleteLedgerFromCsvData, DeleteLedgerFromCsvVariables>;
}
export const deleteLedgerFromCsvRef: DeleteLedgerFromCsvRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteLedgerFromCsvRef:
```typescript
const name = deleteLedgerFromCsvRef.operationName;
console.log(name);
```

### Variables
The `DeleteLedgerFromCsv` mutation requires an argument of type `DeleteLedgerFromCsvVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteLedgerFromCsvVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteLedgerFromCsv` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteLedgerFromCsvData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteLedgerFromCsvData {
  ledgerFromCsv_delete?: LedgerFromCsv_Key | null;
}
```
### Using `DeleteLedgerFromCsv`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteLedgerFromCsv, DeleteLedgerFromCsvVariables } from '@dataconnect/generated';

// The `DeleteLedgerFromCsv` mutation requires an argument of type `DeleteLedgerFromCsvVariables`:
const deleteLedgerFromCsvVars: DeleteLedgerFromCsvVariables = {
  id: ..., 
};

// Call the `deleteLedgerFromCsv()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteLedgerFromCsv(deleteLedgerFromCsvVars);
// Variables can be defined inline as well.
const { data } = await deleteLedgerFromCsv({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteLedgerFromCsv(dataConnect, deleteLedgerFromCsvVars);

console.log(data.ledgerFromCsv_delete);

// Or, you can use the `Promise` API.
deleteLedgerFromCsv(deleteLedgerFromCsvVars).then((response) => {
  const data = response.data;
  console.log(data.ledgerFromCsv_delete);
});
```

### Using `DeleteLedgerFromCsv`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteLedgerFromCsvRef, DeleteLedgerFromCsvVariables } from '@dataconnect/generated';

// The `DeleteLedgerFromCsv` mutation requires an argument of type `DeleteLedgerFromCsvVariables`:
const deleteLedgerFromCsvVars: DeleteLedgerFromCsvVariables = {
  id: ..., 
};

// Call the `deleteLedgerFromCsvRef()` function to get a reference to the mutation.
const ref = deleteLedgerFromCsvRef(deleteLedgerFromCsvVars);
// Variables can be defined inline as well.
const ref = deleteLedgerFromCsvRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteLedgerFromCsvRef(dataConnect, deleteLedgerFromCsvVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.ledgerFromCsv_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.ledgerFromCsv_delete);
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

## DeleteBillingFromCsv
You can execute the `DeleteBillingFromCsv` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteBillingFromCsv(vars: DeleteBillingFromCsvVariables): MutationPromise<DeleteBillingFromCsvData, DeleteBillingFromCsvVariables>;

interface DeleteBillingFromCsvRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteBillingFromCsvVariables): MutationRef<DeleteBillingFromCsvData, DeleteBillingFromCsvVariables>;
}
export const deleteBillingFromCsvRef: DeleteBillingFromCsvRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteBillingFromCsv(dc: DataConnect, vars: DeleteBillingFromCsvVariables): MutationPromise<DeleteBillingFromCsvData, DeleteBillingFromCsvVariables>;

interface DeleteBillingFromCsvRef {
  ...
  (dc: DataConnect, vars: DeleteBillingFromCsvVariables): MutationRef<DeleteBillingFromCsvData, DeleteBillingFromCsvVariables>;
}
export const deleteBillingFromCsvRef: DeleteBillingFromCsvRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteBillingFromCsvRef:
```typescript
const name = deleteBillingFromCsvRef.operationName;
console.log(name);
```

### Variables
The `DeleteBillingFromCsv` mutation requires an argument of type `DeleteBillingFromCsvVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteBillingFromCsvVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteBillingFromCsv` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteBillingFromCsvData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteBillingFromCsvData {
  billingFromCsv_delete?: BillingFromCsv_Key | null;
}
```
### Using `DeleteBillingFromCsv`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteBillingFromCsv, DeleteBillingFromCsvVariables } from '@dataconnect/generated';

// The `DeleteBillingFromCsv` mutation requires an argument of type `DeleteBillingFromCsvVariables`:
const deleteBillingFromCsvVars: DeleteBillingFromCsvVariables = {
  id: ..., 
};

// Call the `deleteBillingFromCsv()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteBillingFromCsv(deleteBillingFromCsvVars);
// Variables can be defined inline as well.
const { data } = await deleteBillingFromCsv({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteBillingFromCsv(dataConnect, deleteBillingFromCsvVars);

console.log(data.billingFromCsv_delete);

// Or, you can use the `Promise` API.
deleteBillingFromCsv(deleteBillingFromCsvVars).then((response) => {
  const data = response.data;
  console.log(data.billingFromCsv_delete);
});
```

### Using `DeleteBillingFromCsv`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteBillingFromCsvRef, DeleteBillingFromCsvVariables } from '@dataconnect/generated';

// The `DeleteBillingFromCsv` mutation requires an argument of type `DeleteBillingFromCsvVariables`:
const deleteBillingFromCsvVars: DeleteBillingFromCsvVariables = {
  id: ..., 
};

// Call the `deleteBillingFromCsvRef()` function to get a reference to the mutation.
const ref = deleteBillingFromCsvRef(deleteBillingFromCsvVars);
// Variables can be defined inline as well.
const ref = deleteBillingFromCsvRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteBillingFromCsvRef(dataConnect, deleteBillingFromCsvVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.billingFromCsv_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.billingFromCsv_delete);
});
```

## UpdateBillingFromCsv
You can execute the `UpdateBillingFromCsv` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateBillingFromCsv(vars: UpdateBillingFromCsvVariables): MutationPromise<UpdateBillingFromCsvData, UpdateBillingFromCsvVariables>;

interface UpdateBillingFromCsvRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateBillingFromCsvVariables): MutationRef<UpdateBillingFromCsvData, UpdateBillingFromCsvVariables>;
}
export const updateBillingFromCsvRef: UpdateBillingFromCsvRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateBillingFromCsv(dc: DataConnect, vars: UpdateBillingFromCsvVariables): MutationPromise<UpdateBillingFromCsvData, UpdateBillingFromCsvVariables>;

interface UpdateBillingFromCsvRef {
  ...
  (dc: DataConnect, vars: UpdateBillingFromCsvVariables): MutationRef<UpdateBillingFromCsvData, UpdateBillingFromCsvVariables>;
}
export const updateBillingFromCsvRef: UpdateBillingFromCsvRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateBillingFromCsvRef:
```typescript
const name = updateBillingFromCsvRef.operationName;
console.log(name);
```

### Variables
The `UpdateBillingFromCsv` mutation requires an argument of type `UpdateBillingFromCsvVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpdateBillingFromCsv` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateBillingFromCsvData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateBillingFromCsvData {
  billingFromCsv_update?: BillingFromCsv_Key | null;
}
```
### Using `UpdateBillingFromCsv`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateBillingFromCsv, UpdateBillingFromCsvVariables } from '@dataconnect/generated';

// The `UpdateBillingFromCsv` mutation requires an argument of type `UpdateBillingFromCsvVariables`:
const updateBillingFromCsvVars: UpdateBillingFromCsvVariables = {
  id: ..., 
  accountNo: ..., // optional
  amortAmnt: ..., // optional
  arrearsAmnt: ..., // optional
  arrearsEnv: ..., // optional
  bStatus: ..., // optional
  billAmnt: ..., // optional
  billBrgy: ..., // optional
  billDate: ..., // optional
  billNo: ..., // optional
  billPurok: ..., // optional
  book: ..., // optional
  classType: ..., // optional
  curReading: ..., // optional
  custNo: ..., // optional
  discount: ..., // optional
  disconDate: ..., // optional
  dueDate: ..., // optional
  duePenalty: ..., // optional
  environmentFee: ..., // optional
  fullName: ..., // optional
  mPenalty: ..., // optional
  mrrfDue: ..., // optional
  mrSysNo: ..., // optional
  mtrNo: ..., // optional
  nrWater: ..., // optional
  paid: ..., // optional
  paymentDate: ..., // optional
  paymentReceipt: ..., // optional
  paymentStatus: ..., // optional
  penalized: ..., // optional
  preReading: ..., // optional
  prevUsed: ..., // optional
  prevUsed2: ..., // optional
  prvBillDate: ..., // optional
  prvDiscon: ..., // optional
  prvDueDate: ..., // optional
  purokCode: ..., // optional
  stubOut: ..., // optional
  totalBill: ..., // optional
  verified: ..., // optional
  waterUsage: ..., // optional
};

// Call the `updateBillingFromCsv()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateBillingFromCsv(updateBillingFromCsvVars);
// Variables can be defined inline as well.
const { data } = await updateBillingFromCsv({ id: ..., accountNo: ..., amortAmnt: ..., arrearsAmnt: ..., arrearsEnv: ..., bStatus: ..., billAmnt: ..., billBrgy: ..., billDate: ..., billNo: ..., billPurok: ..., book: ..., classType: ..., curReading: ..., custNo: ..., discount: ..., disconDate: ..., dueDate: ..., duePenalty: ..., environmentFee: ..., fullName: ..., mPenalty: ..., mrrfDue: ..., mrSysNo: ..., mtrNo: ..., nrWater: ..., paid: ..., paymentDate: ..., paymentReceipt: ..., paymentStatus: ..., penalized: ..., preReading: ..., prevUsed: ..., prevUsed2: ..., prvBillDate: ..., prvDiscon: ..., prvDueDate: ..., purokCode: ..., stubOut: ..., totalBill: ..., verified: ..., waterUsage: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateBillingFromCsv(dataConnect, updateBillingFromCsvVars);

console.log(data.billingFromCsv_update);

// Or, you can use the `Promise` API.
updateBillingFromCsv(updateBillingFromCsvVars).then((response) => {
  const data = response.data;
  console.log(data.billingFromCsv_update);
});
```

### Using `UpdateBillingFromCsv`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateBillingFromCsvRef, UpdateBillingFromCsvVariables } from '@dataconnect/generated';

// The `UpdateBillingFromCsv` mutation requires an argument of type `UpdateBillingFromCsvVariables`:
const updateBillingFromCsvVars: UpdateBillingFromCsvVariables = {
  id: ..., 
  accountNo: ..., // optional
  amortAmnt: ..., // optional
  arrearsAmnt: ..., // optional
  arrearsEnv: ..., // optional
  bStatus: ..., // optional
  billAmnt: ..., // optional
  billBrgy: ..., // optional
  billDate: ..., // optional
  billNo: ..., // optional
  billPurok: ..., // optional
  book: ..., // optional
  classType: ..., // optional
  curReading: ..., // optional
  custNo: ..., // optional
  discount: ..., // optional
  disconDate: ..., // optional
  dueDate: ..., // optional
  duePenalty: ..., // optional
  environmentFee: ..., // optional
  fullName: ..., // optional
  mPenalty: ..., // optional
  mrrfDue: ..., // optional
  mrSysNo: ..., // optional
  mtrNo: ..., // optional
  nrWater: ..., // optional
  paid: ..., // optional
  paymentDate: ..., // optional
  paymentReceipt: ..., // optional
  paymentStatus: ..., // optional
  penalized: ..., // optional
  preReading: ..., // optional
  prevUsed: ..., // optional
  prevUsed2: ..., // optional
  prvBillDate: ..., // optional
  prvDiscon: ..., // optional
  prvDueDate: ..., // optional
  purokCode: ..., // optional
  stubOut: ..., // optional
  totalBill: ..., // optional
  verified: ..., // optional
  waterUsage: ..., // optional
};

// Call the `updateBillingFromCsvRef()` function to get a reference to the mutation.
const ref = updateBillingFromCsvRef(updateBillingFromCsvVars);
// Variables can be defined inline as well.
const ref = updateBillingFromCsvRef({ id: ..., accountNo: ..., amortAmnt: ..., arrearsAmnt: ..., arrearsEnv: ..., bStatus: ..., billAmnt: ..., billBrgy: ..., billDate: ..., billNo: ..., billPurok: ..., book: ..., classType: ..., curReading: ..., custNo: ..., discount: ..., disconDate: ..., dueDate: ..., duePenalty: ..., environmentFee: ..., fullName: ..., mPenalty: ..., mrrfDue: ..., mrSysNo: ..., mtrNo: ..., nrWater: ..., paid: ..., paymentDate: ..., paymentReceipt: ..., paymentStatus: ..., penalized: ..., preReading: ..., prevUsed: ..., prevUsed2: ..., prvBillDate: ..., prvDiscon: ..., prvDueDate: ..., purokCode: ..., stubOut: ..., totalBill: ..., verified: ..., waterUsage: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateBillingFromCsvRef(dataConnect, updateBillingFromCsvVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.billingFromCsv_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.billingFromCsv_update);
});
```

## CreateCollectionFromCsv
You can execute the `CreateCollectionFromCsv` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createCollectionFromCsv(vars: CreateCollectionFromCsvVariables): MutationPromise<CreateCollectionFromCsvData, CreateCollectionFromCsvVariables>;

interface CreateCollectionFromCsvRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCollectionFromCsvVariables): MutationRef<CreateCollectionFromCsvData, CreateCollectionFromCsvVariables>;
}
export const createCollectionFromCsvRef: CreateCollectionFromCsvRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createCollectionFromCsv(dc: DataConnect, vars: CreateCollectionFromCsvVariables): MutationPromise<CreateCollectionFromCsvData, CreateCollectionFromCsvVariables>;

interface CreateCollectionFromCsvRef {
  ...
  (dc: DataConnect, vars: CreateCollectionFromCsvVariables): MutationRef<CreateCollectionFromCsvData, CreateCollectionFromCsvVariables>;
}
export const createCollectionFromCsvRef: CreateCollectionFromCsvRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCollectionFromCsvRef:
```typescript
const name = createCollectionFromCsvRef.operationName;
console.log(name);
```

### Variables
The `CreateCollectionFromCsv` mutation requires an argument of type `CreateCollectionFromCsvVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateCollectionFromCsv` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCollectionFromCsvData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCollectionFromCsvData {
  collectionFromCsv_insert: CollectionFromCsv_Key;
}
```
### Using `CreateCollectionFromCsv`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCollectionFromCsv, CreateCollectionFromCsvVariables } from '@dataconnect/generated';

// The `CreateCollectionFromCsv` mutation requires an argument of type `CreateCollectionFromCsvVariables`:
const createCollectionFromCsvVars: CreateCollectionFromCsvVariables = {
  accountNo: ..., 
  amortize: ..., // optional
  arrearsAmt: ..., // optional
  arrearsEnv: ..., // optional
  bankGroup: ..., // optional
  bankId: ..., // optional
  bankOnline: ..., // optional
  batchNo: ..., // optional
  billNo: ..., // optional
  branch: ..., // optional
  cash: ..., 
  check: ..., 
  checkDate: ..., // optional
  checkNo: ..., // optional
  cmrrfAmnt: ..., 
  custNo: ..., 
  discAmnt: ..., 
  envFee: ..., 
  fullName: ..., 
  mrrfAmnt: ..., 
  onlineref: ..., // optional
  othrApply: ..., // optional
  othrIncome: ..., // optional
  othrReconn: ..., // optional
  pacyAmnt: ..., 
  papYAmnt: ..., 
  payArrears: ..., 
  penAmnt: ..., 
  pymtDate: ..., 
  pymtMethod: ..., 
  receiptNo: ..., 
  receiptStatus: ..., 
  receiptType: ..., 
  runBalance: ..., // optional
  sysNo: ..., 
  teller: ..., 
  trackDt: ..., 
  waterBill: ..., 
};

// Call the `createCollectionFromCsv()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCollectionFromCsv(createCollectionFromCsvVars);
// Variables can be defined inline as well.
const { data } = await createCollectionFromCsv({ accountNo: ..., amortize: ..., arrearsAmt: ..., arrearsEnv: ..., bankGroup: ..., bankId: ..., bankOnline: ..., batchNo: ..., billNo: ..., branch: ..., cash: ..., check: ..., checkDate: ..., checkNo: ..., cmrrfAmnt: ..., custNo: ..., discAmnt: ..., envFee: ..., fullName: ..., mrrfAmnt: ..., onlineref: ..., othrApply: ..., othrIncome: ..., othrReconn: ..., pacyAmnt: ..., papYAmnt: ..., payArrears: ..., penAmnt: ..., pymtDate: ..., pymtMethod: ..., receiptNo: ..., receiptStatus: ..., receiptType: ..., runBalance: ..., sysNo: ..., teller: ..., trackDt: ..., waterBill: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCollectionFromCsv(dataConnect, createCollectionFromCsvVars);

console.log(data.collectionFromCsv_insert);

// Or, you can use the `Promise` API.
createCollectionFromCsv(createCollectionFromCsvVars).then((response) => {
  const data = response.data;
  console.log(data.collectionFromCsv_insert);
});
```

### Using `CreateCollectionFromCsv`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCollectionFromCsvRef, CreateCollectionFromCsvVariables } from '@dataconnect/generated';

// The `CreateCollectionFromCsv` mutation requires an argument of type `CreateCollectionFromCsvVariables`:
const createCollectionFromCsvVars: CreateCollectionFromCsvVariables = {
  accountNo: ..., 
  amortize: ..., // optional
  arrearsAmt: ..., // optional
  arrearsEnv: ..., // optional
  bankGroup: ..., // optional
  bankId: ..., // optional
  bankOnline: ..., // optional
  batchNo: ..., // optional
  billNo: ..., // optional
  branch: ..., // optional
  cash: ..., 
  check: ..., 
  checkDate: ..., // optional
  checkNo: ..., // optional
  cmrrfAmnt: ..., 
  custNo: ..., 
  discAmnt: ..., 
  envFee: ..., 
  fullName: ..., 
  mrrfAmnt: ..., 
  onlineref: ..., // optional
  othrApply: ..., // optional
  othrIncome: ..., // optional
  othrReconn: ..., // optional
  pacyAmnt: ..., 
  papYAmnt: ..., 
  payArrears: ..., 
  penAmnt: ..., 
  pymtDate: ..., 
  pymtMethod: ..., 
  receiptNo: ..., 
  receiptStatus: ..., 
  receiptType: ..., 
  runBalance: ..., // optional
  sysNo: ..., 
  teller: ..., 
  trackDt: ..., 
  waterBill: ..., 
};

// Call the `createCollectionFromCsvRef()` function to get a reference to the mutation.
const ref = createCollectionFromCsvRef(createCollectionFromCsvVars);
// Variables can be defined inline as well.
const ref = createCollectionFromCsvRef({ accountNo: ..., amortize: ..., arrearsAmt: ..., arrearsEnv: ..., bankGroup: ..., bankId: ..., bankOnline: ..., batchNo: ..., billNo: ..., branch: ..., cash: ..., check: ..., checkDate: ..., checkNo: ..., cmrrfAmnt: ..., custNo: ..., discAmnt: ..., envFee: ..., fullName: ..., mrrfAmnt: ..., onlineref: ..., othrApply: ..., othrIncome: ..., othrReconn: ..., pacyAmnt: ..., papYAmnt: ..., payArrears: ..., penAmnt: ..., pymtDate: ..., pymtMethod: ..., receiptNo: ..., receiptStatus: ..., receiptType: ..., runBalance: ..., sysNo: ..., teller: ..., trackDt: ..., waterBill: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCollectionFromCsvRef(dataConnect, createCollectionFromCsvVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.collectionFromCsv_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.collectionFromCsv_insert);
});
```

## DeleteCollectionFromCsv
You can execute the `DeleteCollectionFromCsv` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteCollectionFromCsv(vars: DeleteCollectionFromCsvVariables): MutationPromise<DeleteCollectionFromCsvData, DeleteCollectionFromCsvVariables>;

interface DeleteCollectionFromCsvRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCollectionFromCsvVariables): MutationRef<DeleteCollectionFromCsvData, DeleteCollectionFromCsvVariables>;
}
export const deleteCollectionFromCsvRef: DeleteCollectionFromCsvRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteCollectionFromCsv(dc: DataConnect, vars: DeleteCollectionFromCsvVariables): MutationPromise<DeleteCollectionFromCsvData, DeleteCollectionFromCsvVariables>;

interface DeleteCollectionFromCsvRef {
  ...
  (dc: DataConnect, vars: DeleteCollectionFromCsvVariables): MutationRef<DeleteCollectionFromCsvData, DeleteCollectionFromCsvVariables>;
}
export const deleteCollectionFromCsvRef: DeleteCollectionFromCsvRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteCollectionFromCsvRef:
```typescript
const name = deleteCollectionFromCsvRef.operationName;
console.log(name);
```

### Variables
The `DeleteCollectionFromCsv` mutation requires an argument of type `DeleteCollectionFromCsvVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteCollectionFromCsvVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteCollectionFromCsv` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteCollectionFromCsvData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteCollectionFromCsvData {
  collectionFromCsv_delete?: CollectionFromCsv_Key | null;
}
```
### Using `DeleteCollectionFromCsv`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteCollectionFromCsv, DeleteCollectionFromCsvVariables } from '@dataconnect/generated';

// The `DeleteCollectionFromCsv` mutation requires an argument of type `DeleteCollectionFromCsvVariables`:
const deleteCollectionFromCsvVars: DeleteCollectionFromCsvVariables = {
  id: ..., 
};

// Call the `deleteCollectionFromCsv()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteCollectionFromCsv(deleteCollectionFromCsvVars);
// Variables can be defined inline as well.
const { data } = await deleteCollectionFromCsv({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteCollectionFromCsv(dataConnect, deleteCollectionFromCsvVars);

console.log(data.collectionFromCsv_delete);

// Or, you can use the `Promise` API.
deleteCollectionFromCsv(deleteCollectionFromCsvVars).then((response) => {
  const data = response.data;
  console.log(data.collectionFromCsv_delete);
});
```

### Using `DeleteCollectionFromCsv`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteCollectionFromCsvRef, DeleteCollectionFromCsvVariables } from '@dataconnect/generated';

// The `DeleteCollectionFromCsv` mutation requires an argument of type `DeleteCollectionFromCsvVariables`:
const deleteCollectionFromCsvVars: DeleteCollectionFromCsvVariables = {
  id: ..., 
};

// Call the `deleteCollectionFromCsvRef()` function to get a reference to the mutation.
const ref = deleteCollectionFromCsvRef(deleteCollectionFromCsvVars);
// Variables can be defined inline as well.
const ref = deleteCollectionFromCsvRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteCollectionFromCsvRef(dataConnect, deleteCollectionFromCsvVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.collectionFromCsv_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.collectionFromCsv_delete);
});
```

## UpdateCollectionFromCsv
You can execute the `UpdateCollectionFromCsv` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateCollectionFromCsv(vars: UpdateCollectionFromCsvVariables): MutationPromise<UpdateCollectionFromCsvData, UpdateCollectionFromCsvVariables>;

interface UpdateCollectionFromCsvRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCollectionFromCsvVariables): MutationRef<UpdateCollectionFromCsvData, UpdateCollectionFromCsvVariables>;
}
export const updateCollectionFromCsvRef: UpdateCollectionFromCsvRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateCollectionFromCsv(dc: DataConnect, vars: UpdateCollectionFromCsvVariables): MutationPromise<UpdateCollectionFromCsvData, UpdateCollectionFromCsvVariables>;

interface UpdateCollectionFromCsvRef {
  ...
  (dc: DataConnect, vars: UpdateCollectionFromCsvVariables): MutationRef<UpdateCollectionFromCsvData, UpdateCollectionFromCsvVariables>;
}
export const updateCollectionFromCsvRef: UpdateCollectionFromCsvRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCollectionFromCsvRef:
```typescript
const name = updateCollectionFromCsvRef.operationName;
console.log(name);
```

### Variables
The `UpdateCollectionFromCsv` mutation requires an argument of type `UpdateCollectionFromCsvVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpdateCollectionFromCsv` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCollectionFromCsvData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCollectionFromCsvData {
  collectionFromCsv_update?: CollectionFromCsv_Key | null;
}
```
### Using `UpdateCollectionFromCsv`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateCollectionFromCsv, UpdateCollectionFromCsvVariables } from '@dataconnect/generated';

// The `UpdateCollectionFromCsv` mutation requires an argument of type `UpdateCollectionFromCsvVariables`:
const updateCollectionFromCsvVars: UpdateCollectionFromCsvVariables = {
  id: ..., 
  accountNo: ..., // optional
  amortize: ..., // optional
  arrearsAmt: ..., // optional
  arrearsEnv: ..., // optional
  bankGroup: ..., // optional
  bankId: ..., // optional
  bankOnline: ..., // optional
  batchNo: ..., // optional
  billNo: ..., // optional
  branch: ..., // optional
  cash: ..., // optional
  check: ..., // optional
  checkDate: ..., // optional
  checkNo: ..., // optional
  cmrrfAmnt: ..., // optional
  custNo: ..., // optional
  discAmnt: ..., // optional
  envFee: ..., // optional
  fullName: ..., // optional
  mrrfAmnt: ..., // optional
  onlineref: ..., // optional
  othrApply: ..., // optional
  othrIncome: ..., // optional
  othrReconn: ..., // optional
  pacyAmnt: ..., // optional
  papYAmnt: ..., // optional
  payArrears: ..., // optional
  penAmnt: ..., // optional
  pymtDate: ..., // optional
  pymtMethod: ..., // optional
  receiptNo: ..., // optional
  receiptStatus: ..., // optional
  receiptType: ..., // optional
  runBalance: ..., // optional
  sysNo: ..., // optional
  teller: ..., // optional
  trackDt: ..., // optional
  waterBill: ..., // optional
};

// Call the `updateCollectionFromCsv()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateCollectionFromCsv(updateCollectionFromCsvVars);
// Variables can be defined inline as well.
const { data } = await updateCollectionFromCsv({ id: ..., accountNo: ..., amortize: ..., arrearsAmt: ..., arrearsEnv: ..., bankGroup: ..., bankId: ..., bankOnline: ..., batchNo: ..., billNo: ..., branch: ..., cash: ..., check: ..., checkDate: ..., checkNo: ..., cmrrfAmnt: ..., custNo: ..., discAmnt: ..., envFee: ..., fullName: ..., mrrfAmnt: ..., onlineref: ..., othrApply: ..., othrIncome: ..., othrReconn: ..., pacyAmnt: ..., papYAmnt: ..., payArrears: ..., penAmnt: ..., pymtDate: ..., pymtMethod: ..., receiptNo: ..., receiptStatus: ..., receiptType: ..., runBalance: ..., sysNo: ..., teller: ..., trackDt: ..., waterBill: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateCollectionFromCsv(dataConnect, updateCollectionFromCsvVars);

console.log(data.collectionFromCsv_update);

// Or, you can use the `Promise` API.
updateCollectionFromCsv(updateCollectionFromCsvVars).then((response) => {
  const data = response.data;
  console.log(data.collectionFromCsv_update);
});
```

### Using `UpdateCollectionFromCsv`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCollectionFromCsvRef, UpdateCollectionFromCsvVariables } from '@dataconnect/generated';

// The `UpdateCollectionFromCsv` mutation requires an argument of type `UpdateCollectionFromCsvVariables`:
const updateCollectionFromCsvVars: UpdateCollectionFromCsvVariables = {
  id: ..., 
  accountNo: ..., // optional
  amortize: ..., // optional
  arrearsAmt: ..., // optional
  arrearsEnv: ..., // optional
  bankGroup: ..., // optional
  bankId: ..., // optional
  bankOnline: ..., // optional
  batchNo: ..., // optional
  billNo: ..., // optional
  branch: ..., // optional
  cash: ..., // optional
  check: ..., // optional
  checkDate: ..., // optional
  checkNo: ..., // optional
  cmrrfAmnt: ..., // optional
  custNo: ..., // optional
  discAmnt: ..., // optional
  envFee: ..., // optional
  fullName: ..., // optional
  mrrfAmnt: ..., // optional
  onlineref: ..., // optional
  othrApply: ..., // optional
  othrIncome: ..., // optional
  othrReconn: ..., // optional
  pacyAmnt: ..., // optional
  papYAmnt: ..., // optional
  payArrears: ..., // optional
  penAmnt: ..., // optional
  pymtDate: ..., // optional
  pymtMethod: ..., // optional
  receiptNo: ..., // optional
  receiptStatus: ..., // optional
  receiptType: ..., // optional
  runBalance: ..., // optional
  sysNo: ..., // optional
  teller: ..., // optional
  trackDt: ..., // optional
  waterBill: ..., // optional
};

// Call the `updateCollectionFromCsvRef()` function to get a reference to the mutation.
const ref = updateCollectionFromCsvRef(updateCollectionFromCsvVars);
// Variables can be defined inline as well.
const ref = updateCollectionFromCsvRef({ id: ..., accountNo: ..., amortize: ..., arrearsAmt: ..., arrearsEnv: ..., bankGroup: ..., bankId: ..., bankOnline: ..., batchNo: ..., billNo: ..., branch: ..., cash: ..., check: ..., checkDate: ..., checkNo: ..., cmrrfAmnt: ..., custNo: ..., discAmnt: ..., envFee: ..., fullName: ..., mrrfAmnt: ..., onlineref: ..., othrApply: ..., othrIncome: ..., othrReconn: ..., pacyAmnt: ..., papYAmnt: ..., payArrears: ..., penAmnt: ..., pymtDate: ..., pymtMethod: ..., receiptNo: ..., receiptStatus: ..., receiptType: ..., runBalance: ..., sysNo: ..., teller: ..., trackDt: ..., waterBill: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCollectionFromCsvRef(dataConnect, updateCollectionFromCsvVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.collectionFromCsv_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.collectionFromCsv_update);
});
```

