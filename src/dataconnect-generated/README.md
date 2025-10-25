# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `calatrava-water-system`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*PaginatedBillings*](#paginatedbillings)
- [**Mutations**](#mutations)
  - [*InsertBook*](#insertbook)
  - [*InsertResident*](#insertresident)
  - [*InsertBilling*](#insertbilling)

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
}
```
### Return Type
Recall that executing the `PaginatedBillings` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `PaginatedBillingsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface PaginatedBillingsData {
  billings: ({
    id: UUIDString;
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
    resident: {
      id: UUIDString;
      accountNo: number;
      fullName: string;
      classType: string;
      book: {
        code: string;
      };
    } & Resident_Key;
      billAmt: number;
      duePenalty: number;
      arrearsEnv: number;
      environmentFee: number;
      totalBill: number;
      waterUsage: number;
      paymentReceipt?: string | null;
      paymentStatus?: string | null;
      paymentDate?: TimestampString | null;
      createdAt: TimestampString;
      updatedAt: TimestampString;
  } & Billing_Key)[];
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
};

// Call the `paginatedBillings()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await paginatedBillings(paginatedBillingsVars);
// Variables can be defined inline as well.
const { data } = await paginatedBillings({ limit: ..., offset: ..., });
// Since all variables are optional for this query, you can omit the `PaginatedBillingsVariables` argument.
const { data } = await paginatedBillings();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await paginatedBillings(dataConnect, paginatedBillingsVars);

console.log(data.billings);

// Or, you can use the `Promise` API.
paginatedBillings(paginatedBillingsVars).then((response) => {
  const data = response.data;
  console.log(data.billings);
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
};

// Call the `paginatedBillingsRef()` function to get a reference to the query.
const ref = paginatedBillingsRef(paginatedBillingsVars);
// Variables can be defined inline as well.
const ref = paginatedBillingsRef({ limit: ..., offset: ..., });
// Since all variables are optional for this query, you can omit the `PaginatedBillingsVariables` argument.
const ref = paginatedBillingsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = paginatedBillingsRef(dataConnect, paginatedBillingsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.billings);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.billings);
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

## InsertBook
You can execute the `InsertBook` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
insertBook(vars: InsertBookVariables): MutationPromise<InsertBookData, InsertBookVariables>;

interface InsertBookRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertBookVariables): MutationRef<InsertBookData, InsertBookVariables>;
}
export const insertBookRef: InsertBookRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertBook(dc: DataConnect, vars: InsertBookVariables): MutationPromise<InsertBookData, InsertBookVariables>;

interface InsertBookRef {
  ...
  (dc: DataConnect, vars: InsertBookVariables): MutationRef<InsertBookData, InsertBookVariables>;
}
export const insertBookRef: InsertBookRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertBookRef:
```typescript
const name = insertBookRef.operationName;
console.log(name);
```

### Variables
The `InsertBook` mutation requires an argument of type `InsertBookVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface InsertBookVariables {
  data: {
    id?: UUIDString | null;
    id_expr?: {
    };
      code?: string | null;
      code_expr?: {
      };
        createdAt?: TimestampString | null;
        createdAt_expr?: {
        };
          createdAt_time?: {
            now?: {
            };
              at?: TimestampString | null;
              add?: {
                milliseconds?: number;
                seconds?: number;
                minutes?: number;
                hours?: number;
                days?: number;
                weeks?: number;
                months?: number;
                years?: number;
              };
                sub?: {
                  milliseconds?: number;
                  seconds?: number;
                  minutes?: number;
                  hours?: number;
                  days?: number;
                  weeks?: number;
                  months?: number;
                  years?: number;
                };
                  truncateTo?: Timestamp_Interval | null;
          };
            createdAt_update?: ({
              inc?: {
                milliseconds?: number;
                seconds?: number;
                minutes?: number;
                hours?: number;
                days?: number;
                weeks?: number;
                months?: number;
                years?: number;
              };
                dec?: {
                  milliseconds?: number;
                  seconds?: number;
                  minutes?: number;
                  hours?: number;
                  days?: number;
                  weeks?: number;
                  months?: number;
                  years?: number;
                };
            })[];
              updatedAt?: TimestampString | null;
              updatedAt_expr?: {
              };
                updatedAt_time?: {
                  now?: {
                  };
                    at?: TimestampString | null;
                    add?: {
                      milliseconds?: number;
                      seconds?: number;
                      minutes?: number;
                      hours?: number;
                      days?: number;
                      weeks?: number;
                      months?: number;
                      years?: number;
                    };
                      sub?: {
                        milliseconds?: number;
                        seconds?: number;
                        minutes?: number;
                        hours?: number;
                        days?: number;
                        weeks?: number;
                        months?: number;
                        years?: number;
                      };
                        truncateTo?: Timestamp_Interval | null;
                };
                  updatedAt_update?: ({
                    inc?: {
                      milliseconds?: number;
                      seconds?: number;
                      minutes?: number;
                      hours?: number;
                      days?: number;
                      weeks?: number;
                      months?: number;
                      years?: number;
                    };
                      dec?: {
                        milliseconds?: number;
                        seconds?: number;
                        minutes?: number;
                        hours?: number;
                        days?: number;
                        weeks?: number;
                        months?: number;
                        years?: number;
                      };
                  })[];
  };
}
```
### Return Type
Recall that executing the `InsertBook` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertBookData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertBookData {
  book_insert: Book_Key;
}
```
### Using `InsertBook`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertBook, InsertBookVariables } from '@dataconnect/generated';

// The `InsertBook` mutation requires an argument of type `InsertBookVariables`:
const insertBookVars: InsertBookVariables = {
  data: ..., 
};

// Call the `insertBook()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertBook(insertBookVars);
// Variables can be defined inline as well.
const { data } = await insertBook({ data: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertBook(dataConnect, insertBookVars);

console.log(data.book_insert);

// Or, you can use the `Promise` API.
insertBook(insertBookVars).then((response) => {
  const data = response.data;
  console.log(data.book_insert);
});
```

### Using `InsertBook`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertBookRef, InsertBookVariables } from '@dataconnect/generated';

// The `InsertBook` mutation requires an argument of type `InsertBookVariables`:
const insertBookVars: InsertBookVariables = {
  data: ..., 
};

// Call the `insertBookRef()` function to get a reference to the mutation.
const ref = insertBookRef(insertBookVars);
// Variables can be defined inline as well.
const ref = insertBookRef({ data: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertBookRef(dataConnect, insertBookVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.book_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.book_insert);
});
```

## InsertResident
You can execute the `InsertResident` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
insertResident(vars: InsertResidentVariables): MutationPromise<InsertResidentData, InsertResidentVariables>;

interface InsertResidentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertResidentVariables): MutationRef<InsertResidentData, InsertResidentVariables>;
}
export const insertResidentRef: InsertResidentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertResident(dc: DataConnect, vars: InsertResidentVariables): MutationPromise<InsertResidentData, InsertResidentVariables>;

interface InsertResidentRef {
  ...
  (dc: DataConnect, vars: InsertResidentVariables): MutationRef<InsertResidentData, InsertResidentVariables>;
}
export const insertResidentRef: InsertResidentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertResidentRef:
```typescript
const name = insertResidentRef.operationName;
console.log(name);
```

### Variables
The `InsertResident` mutation requires an argument of type `InsertResidentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface InsertResidentVariables {
  data: {
    id?: UUIDString | null;
    id_expr?: {
    };
      bookId?: UUIDString | null;
      bookId_expr?: {
      };
        book?: Book_Key | null;
        accountNo?: number | null;
        accountNo_expr?: {
        };
          accountNo_update?: ({
            inc?: number | null;
            dec?: number | null;
          })[];
            classType?: string | null;
            classType_expr?: {
            };
              createdAt?: TimestampString | null;
              createdAt_expr?: {
              };
                createdAt_time?: {
                  now?: {
                  };
                    at?: TimestampString | null;
                    add?: {
                      milliseconds?: number;
                      seconds?: number;
                      minutes?: number;
                      hours?: number;
                      days?: number;
                      weeks?: number;
                      months?: number;
                      years?: number;
                    };
                      sub?: {
                        milliseconds?: number;
                        seconds?: number;
                        minutes?: number;
                        hours?: number;
                        days?: number;
                        weeks?: number;
                        months?: number;
                        years?: number;
                      };
                        truncateTo?: Timestamp_Interval | null;
                };
                  createdAt_update?: ({
                    inc?: {
                      milliseconds?: number;
                      seconds?: number;
                      minutes?: number;
                      hours?: number;
                      days?: number;
                      weeks?: number;
                      months?: number;
                      years?: number;
                    };
                      dec?: {
                        milliseconds?: number;
                        seconds?: number;
                        minutes?: number;
                        hours?: number;
                        days?: number;
                        weeks?: number;
                        months?: number;
                        years?: number;
                      };
                  })[];
                    fullName?: string | null;
                    fullName_expr?: {
                    };
                      updatedAt?: TimestampString | null;
                      updatedAt_expr?: {
                      };
                        updatedAt_time?: {
                          now?: {
                          };
                            at?: TimestampString | null;
                            add?: {
                              milliseconds?: number;
                              seconds?: number;
                              minutes?: number;
                              hours?: number;
                              days?: number;
                              weeks?: number;
                              months?: number;
                              years?: number;
                            };
                              sub?: {
                                milliseconds?: number;
                                seconds?: number;
                                minutes?: number;
                                hours?: number;
                                days?: number;
                                weeks?: number;
                                months?: number;
                                years?: number;
                              };
                                truncateTo?: Timestamp_Interval | null;
                        };
                          updatedAt_update?: ({
                            inc?: {
                              milliseconds?: number;
                              seconds?: number;
                              minutes?: number;
                              hours?: number;
                              days?: number;
                              weeks?: number;
                              months?: number;
                              years?: number;
                            };
                              dec?: {
                                milliseconds?: number;
                                seconds?: number;
                                minutes?: number;
                                hours?: number;
                                days?: number;
                                weeks?: number;
                                months?: number;
                                years?: number;
                              };
                          })[];
  };
}
```
### Return Type
Recall that executing the `InsertResident` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertResidentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertResidentData {
  resident_insert: Resident_Key;
}
```
### Using `InsertResident`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertResident, InsertResidentVariables } from '@dataconnect/generated';

// The `InsertResident` mutation requires an argument of type `InsertResidentVariables`:
const insertResidentVars: InsertResidentVariables = {
  data: ..., 
};

// Call the `insertResident()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertResident(insertResidentVars);
// Variables can be defined inline as well.
const { data } = await insertResident({ data: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertResident(dataConnect, insertResidentVars);

console.log(data.resident_insert);

// Or, you can use the `Promise` API.
insertResident(insertResidentVars).then((response) => {
  const data = response.data;
  console.log(data.resident_insert);
});
```

### Using `InsertResident`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertResidentRef, InsertResidentVariables } from '@dataconnect/generated';

// The `InsertResident` mutation requires an argument of type `InsertResidentVariables`:
const insertResidentVars: InsertResidentVariables = {
  data: ..., 
};

// Call the `insertResidentRef()` function to get a reference to the mutation.
const ref = insertResidentRef(insertResidentVars);
// Variables can be defined inline as well.
const ref = insertResidentRef({ data: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertResidentRef(dataConnect, insertResidentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.resident_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.resident_insert);
});
```

## InsertBilling
You can execute the `InsertBilling` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
insertBilling(vars: InsertBillingVariables): MutationPromise<InsertBillingData, InsertBillingVariables>;

interface InsertBillingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertBillingVariables): MutationRef<InsertBillingData, InsertBillingVariables>;
}
export const insertBillingRef: InsertBillingRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertBilling(dc: DataConnect, vars: InsertBillingVariables): MutationPromise<InsertBillingData, InsertBillingVariables>;

interface InsertBillingRef {
  ...
  (dc: DataConnect, vars: InsertBillingVariables): MutationRef<InsertBillingData, InsertBillingVariables>;
}
export const insertBillingRef: InsertBillingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertBillingRef:
```typescript
const name = insertBillingRef.operationName;
console.log(name);
```

### Variables
The `InsertBilling` mutation requires an argument of type `InsertBillingVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface InsertBillingVariables {
  data: {
    id?: UUIDString | null;
    id_expr?: {
    };
      residentId?: UUIDString | null;
      residentId_expr?: {
      };
        resident?: Resident_Key | null;
        amortAmt?: number | null;
        amortAmt_expr?: {
        };
          amortAmt_update?: ({
            inc?: number | null;
            dec?: number | null;
          })[];
            arrearsAmt?: number | null;
            arrearsAmt_expr?: {
            };
              arrearsAmt_update?: ({
                inc?: number | null;
                dec?: number | null;
              })[];
                arrearsEnv?: number | null;
                arrearsEnv_expr?: {
                };
                  arrearsEnv_update?: ({
                    inc?: number | null;
                    dec?: number | null;
                  })[];
                    bStatus?: string | null;
                    bStatus_expr?: {
                    };
                      billAmt?: number | null;
                      billAmt_expr?: {
                      };
                        billAmt_update?: ({
                          inc?: number | null;
                          dec?: number | null;
                        })[];
                          billBrgy?: string | null;
                          billBrgy_expr?: {
                          };
                            billDate?: DateString | null;
                            billDate_expr?: {
                            };
                              billDate_date?: {
                                today?: {
                                };
                                  on?: DateString | null;
                                  add?: {
                                    days?: number;
                                    weeks?: number;
                                    months?: number;
                                    years?: number;
                                  };
                                    sub?: {
                                      days?: number;
                                      weeks?: number;
                                      months?: number;
                                      years?: number;
                                    };
                                      truncateTo?: Date_Interval | null;
                              };
                                billDate_update?: ({
                                  inc?: {
                                    days?: number;
                                    weeks?: number;
                                    months?: number;
                                    years?: number;
                                  };
                                    dec?: {
                                      days?: number;
                                      weeks?: number;
                                      months?: number;
                                      years?: number;
                                    };
                                })[];
                                  billNo?: number | null;
                                  billNo_expr?: {
                                  };
                                    billNo_update?: ({
                                      inc?: number | null;
                                      dec?: number | null;
                                    })[];
                                      billPurok?: string | null;
                                      billPurok_expr?: {
                                      };
                                        createdAt?: TimestampString | null;
                                        createdAt_expr?: {
                                        };
                                          createdAt_time?: {
                                            now?: {
                                            };
                                              at?: TimestampString | null;
                                              add?: {
                                                milliseconds?: number;
                                                seconds?: number;
                                                minutes?: number;
                                                hours?: number;
                                                days?: number;
                                                weeks?: number;
                                                months?: number;
                                                years?: number;
                                              };
                                                sub?: {
                                                  milliseconds?: number;
                                                  seconds?: number;
                                                  minutes?: number;
                                                  hours?: number;
                                                  days?: number;
                                                  weeks?: number;
                                                  months?: number;
                                                  years?: number;
                                                };
                                                  truncateTo?: Timestamp_Interval | null;
                                          };
                                            createdAt_update?: ({
                                              inc?: {
                                                milliseconds?: number;
                                                seconds?: number;
                                                minutes?: number;
                                                hours?: number;
                                                days?: number;
                                                weeks?: number;
                                                months?: number;
                                                years?: number;
                                              };
                                                dec?: {
                                                  milliseconds?: number;
                                                  seconds?: number;
                                                  minutes?: number;
                                                  hours?: number;
                                                  days?: number;
                                                  weeks?: number;
                                                  months?: number;
                                                  years?: number;
                                                };
                                            })[];
                                              curReading?: number | null;
                                              curReading_expr?: {
                                              };
                                                curReading_update?: ({
                                                  inc?: number | null;
                                                  dec?: number | null;
                                                })[];
                                                  disconDate?: DateString | null;
                                                  disconDate_expr?: {
                                                  };
                                                    disconDate_date?: {
                                                      today?: {
                                                      };
                                                        on?: DateString | null;
                                                        add?: {
                                                          days?: number;
                                                          weeks?: number;
                                                          months?: number;
                                                          years?: number;
                                                        };
                                                          sub?: {
                                                            days?: number;
                                                            weeks?: number;
                                                            months?: number;
                                                            years?: number;
                                                          };
                                                            truncateTo?: Date_Interval | null;
                                                    };
                                                      disconDate_update?: ({
                                                        inc?: {
                                                          days?: number;
                                                          weeks?: number;
                                                          months?: number;
                                                          years?: number;
                                                        };
                                                          dec?: {
                                                            days?: number;
                                                            weeks?: number;
                                                            months?: number;
                                                            years?: number;
                                                          };
                                                      })[];
                                                        discount?: number | null;
                                                        discount_expr?: {
                                                        };
                                                          discount_update?: ({
                                                            inc?: number | null;
                                                            dec?: number | null;
                                                          })[];
                                                            dueDate?: DateString | null;
                                                            dueDate_expr?: {
                                                            };
                                                              dueDate_date?: {
                                                                today?: {
                                                                };
                                                                  on?: DateString | null;
                                                                  add?: {
                                                                    days?: number;
                                                                    weeks?: number;
                                                                    months?: number;
                                                                    years?: number;
                                                                  };
                                                                    sub?: {
                                                                      days?: number;
                                                                      weeks?: number;
                                                                      months?: number;
                                                                      years?: number;
                                                                    };
                                                                      truncateTo?: Date_Interval | null;
                                                              };
                                                                dueDate_update?: ({
                                                                  inc?: {
                                                                    days?: number;
                                                                    weeks?: number;
                                                                    months?: number;
                                                                    years?: number;
                                                                  };
                                                                    dec?: {
                                                                      days?: number;
                                                                      weeks?: number;
                                                                      months?: number;
                                                                      years?: number;
                                                                    };
                                                                })[];
                                                                  duePenalty?: number | null;
                                                                  duePenalty_expr?: {
                                                                  };
                                                                    duePenalty_update?: ({
                                                                      inc?: number | null;
                                                                      dec?: number | null;
                                                                    })[];
                                                                      environmentFee?: number | null;
                                                                      environmentFee_expr?: {
                                                                      };
                                                                        environmentFee_update?: ({
                                                                          inc?: number | null;
                                                                          dec?: number | null;
                                                                        })[];
                                                                          mPenalty?: number | null;
                                                                          mPenalty_expr?: {
                                                                          };
                                                                            mPenalty_update?: ({
                                                                              inc?: number | null;
                                                                              dec?: number | null;
                                                                            })[];
                                                                              mrSysNo?: number | null;
                                                                              mrSysNo_expr?: {
                                                                              };
                                                                                mrSysNo_update?: ({
                                                                                  inc?: number | null;
                                                                                  dec?: number | null;
                                                                                })[];
                                                                                  mrrfDue?: number | null;
                                                                                  mrrfDue_expr?: {
                                                                                  };
                                                                                    mrrfDue_update?: ({
                                                                                      inc?: number | null;
                                                                                      dec?: number | null;
                                                                                    })[];
                                                                                      mtrNo?: string | null;
                                                                                      mtrNo_expr?: {
                                                                                      };
                                                                                        nrWater?: number | null;
                                                                                        nrWater_expr?: {
                                                                                        };
                                                                                          nrWater_update?: ({
                                                                                            inc?: number | null;
                                                                                            dec?: number | null;
                                                                                          })[];
                                                                                            paid?: string | null;
                                                                                            paid_expr?: {
                                                                                            };
                                                                                              paymentDate?: TimestampString | null;
                                                                                              paymentDate_expr?: {
                                                                                              };
                                                                                                paymentDate_time?: {
                                                                                                  now?: {
                                                                                                  };
                                                                                                    at?: TimestampString | null;
                                                                                                    add?: {
                                                                                                      milliseconds?: number;
                                                                                                      seconds?: number;
                                                                                                      minutes?: number;
                                                                                                      hours?: number;
                                                                                                      days?: number;
                                                                                                      weeks?: number;
                                                                                                      months?: number;
                                                                                                      years?: number;
                                                                                                    };
                                                                                                      sub?: {
                                                                                                        milliseconds?: number;
                                                                                                        seconds?: number;
                                                                                                        minutes?: number;
                                                                                                        hours?: number;
                                                                                                        days?: number;
                                                                                                        weeks?: number;
                                                                                                        months?: number;
                                                                                                        years?: number;
                                                                                                      };
                                                                                                        truncateTo?: Timestamp_Interval | null;
                                                                                                };
                                                                                                  paymentDate_update?: ({
                                                                                                    inc?: {
                                                                                                      milliseconds?: number;
                                                                                                      seconds?: number;
                                                                                                      minutes?: number;
                                                                                                      hours?: number;
                                                                                                      days?: number;
                                                                                                      weeks?: number;
                                                                                                      months?: number;
                                                                                                      years?: number;
                                                                                                    };
                                                                                                      dec?: {
                                                                                                        milliseconds?: number;
                                                                                                        seconds?: number;
                                                                                                        minutes?: number;
                                                                                                        hours?: number;
                                                                                                        days?: number;
                                                                                                        weeks?: number;
                                                                                                        months?: number;
                                                                                                        years?: number;
                                                                                                      };
                                                                                                  })[];
                                                                                                    paymentReceipt?: string | null;
                                                                                                    paymentReceipt_expr?: {
                                                                                                    };
                                                                                                      paymentStatus?: string | null;
                                                                                                      paymentStatus_expr?: {
                                                                                                      };
                                                                                                        penalized?: string | null;
                                                                                                        penalized_expr?: {
                                                                                                        };
                                                                                                          preReading?: number | null;
                                                                                                          preReading_expr?: {
                                                                                                          };
                                                                                                            preReading_update?: ({
                                                                                                              inc?: number | null;
                                                                                                              dec?: number | null;
                                                                                                            })[];
                                                                                                              prevUsed?: number | null;
                                                                                                              prevUsed_expr?: {
                                                                                                              };
                                                                                                                prevUsed_update?: ({
                                                                                                                  inc?: number | null;
                                                                                                                  dec?: number | null;
                                                                                                                })[];
                                                                                                                  prevUsed2?: number | null;
                                                                                                                  prevUsed2_expr?: {
                                                                                                                  };
                                                                                                                    prevUsed2_update?: ({
                                                                                                                      inc?: number | null;
                                                                                                                      dec?: number | null;
                                                                                                                    })[];
                                                                                                                      prvBillDate?: string | null;
                                                                                                                      prvBillDate_expr?: {
                                                                                                                      };
                                                                                                                        prvDiscon?: string | null;
                                                                                                                        prvDiscon_expr?: {
                                                                                                                        };
                                                                                                                          prvDueDate?: string | null;
                                                                                                                          prvDueDate_expr?: {
                                                                                                                          };
                                                                                                                            purokCode?: string | null;
                                                                                                                            purokCode_expr?: {
                                                                                                                            };
                                                                                                                              stubOut?: string | null;
                                                                                                                              stubOut_expr?: {
                                                                                                                              };
                                                                                                                                totalBill?: number | null;
                                                                                                                                totalBill_expr?: {
                                                                                                                                };
                                                                                                                                  totalBill_update?: ({
                                                                                                                                    inc?: number | null;
                                                                                                                                    dec?: number | null;
                                                                                                                                  })[];
                                                                                                                                    updatedAt?: TimestampString | null;
                                                                                                                                    updatedAt_expr?: {
                                                                                                                                    };
                                                                                                                                      updatedAt_time?: {
                                                                                                                                        now?: {
                                                                                                                                        };
                                                                                                                                          at?: TimestampString | null;
                                                                                                                                          add?: {
                                                                                                                                            milliseconds?: number;
                                                                                                                                            seconds?: number;
                                                                                                                                            minutes?: number;
                                                                                                                                            hours?: number;
                                                                                                                                            days?: number;
                                                                                                                                            weeks?: number;
                                                                                                                                            months?: number;
                                                                                                                                            years?: number;
                                                                                                                                          };
                                                                                                                                            sub?: {
                                                                                                                                              milliseconds?: number;
                                                                                                                                              seconds?: number;
                                                                                                                                              minutes?: number;
                                                                                                                                              hours?: number;
                                                                                                                                              days?: number;
                                                                                                                                              weeks?: number;
                                                                                                                                              months?: number;
                                                                                                                                              years?: number;
                                                                                                                                            };
                                                                                                                                              truncateTo?: Timestamp_Interval | null;
                                                                                                                                      };
                                                                                                                                        updatedAt_update?: ({
                                                                                                                                          inc?: {
                                                                                                                                            milliseconds?: number;
                                                                                                                                            seconds?: number;
                                                                                                                                            minutes?: number;
                                                                                                                                            hours?: number;
                                                                                                                                            days?: number;
                                                                                                                                            weeks?: number;
                                                                                                                                            months?: number;
                                                                                                                                            years?: number;
                                                                                                                                          };
                                                                                                                                            dec?: {
                                                                                                                                              milliseconds?: number;
                                                                                                                                              seconds?: number;
                                                                                                                                              minutes?: number;
                                                                                                                                              hours?: number;
                                                                                                                                              days?: number;
                                                                                                                                              weeks?: number;
                                                                                                                                              months?: number;
                                                                                                                                              years?: number;
                                                                                                                                            };
                                                                                                                                        })[];
                                                                                                                                          verified?: string | null;
                                                                                                                                          verified_expr?: {
                                                                                                                                          };
                                                                                                                                            waterUsage?: number | null;
                                                                                                                                            waterUsage_expr?: {
                                                                                                                                            };
                                                                                                                                              waterUsage_update?: ({
                                                                                                                                                inc?: number | null;
                                                                                                                                                dec?: number | null;
                                                                                                                                              })[];
  };
}
```
### Return Type
Recall that executing the `InsertBilling` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertBillingData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertBillingData {
  billing_insert: Billing_Key;
}
```
### Using `InsertBilling`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertBilling, InsertBillingVariables } from '@dataconnect/generated';

// The `InsertBilling` mutation requires an argument of type `InsertBillingVariables`:
const insertBillingVars: InsertBillingVariables = {
  data: ..., 
};

// Call the `insertBilling()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertBilling(insertBillingVars);
// Variables can be defined inline as well.
const { data } = await insertBilling({ data: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertBilling(dataConnect, insertBillingVars);

console.log(data.billing_insert);

// Or, you can use the `Promise` API.
insertBilling(insertBillingVars).then((response) => {
  const data = response.data;
  console.log(data.billing_insert);
});
```

### Using `InsertBilling`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertBillingRef, InsertBillingVariables } from '@dataconnect/generated';

// The `InsertBilling` mutation requires an argument of type `InsertBillingVariables`:
const insertBillingVars: InsertBillingVariables = {
  data: ..., 
};

// Call the `insertBillingRef()` function to get a reference to the mutation.
const ref = insertBillingRef(insertBillingVars);
// Variables can be defined inline as well.
const ref = insertBillingRef({ data: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertBillingRef(dataConnect, insertBillingVars);

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

