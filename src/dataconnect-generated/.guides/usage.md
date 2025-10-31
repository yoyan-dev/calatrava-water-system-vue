# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createBillingFromCsv, deleteBillingFromCsv, updateBillingFromCsv, paginatedBillings, countBillingFromCsv, searchBillingFromCsv, createCollectionFromCsv, deleteCollectionFromCsv, updateCollectionFromCsv, paginatedCollections } from '@dataconnect/generated';


// Operation CreateBillingFromCsv:  For variables, look at type CreateBillingFromCsvVars in ../index.d.ts
const { data } = await CreateBillingFromCsv(dataConnect, createBillingFromCsvVars);

// Operation DeleteBillingFromCsv:  For variables, look at type DeleteBillingFromCsvVars in ../index.d.ts
const { data } = await DeleteBillingFromCsv(dataConnect, deleteBillingFromCsvVars);

// Operation UpdateBillingFromCsv:  For variables, look at type UpdateBillingFromCsvVars in ../index.d.ts
const { data } = await UpdateBillingFromCsv(dataConnect, updateBillingFromCsvVars);

// Operation PaginatedBillings:  For variables, look at type PaginatedBillingsVars in ../index.d.ts
const { data } = await PaginatedBillings(dataConnect, paginatedBillingsVars);

// Operation CountBillingFromCsv: 
const { data } = await CountBillingFromCsv(dataConnect);

// Operation SearchBillingFromCsv:  For variables, look at type SearchBillingFromCsvVars in ../index.d.ts
const { data } = await SearchBillingFromCsv(dataConnect, searchBillingFromCsvVars);

// Operation CreateCollectionFromCsv:  For variables, look at type CreateCollectionFromCsvVars in ../index.d.ts
const { data } = await CreateCollectionFromCsv(dataConnect, createCollectionFromCsvVars);

// Operation DeleteCollectionFromCsv:  For variables, look at type DeleteCollectionFromCsvVars in ../index.d.ts
const { data } = await DeleteCollectionFromCsv(dataConnect, deleteCollectionFromCsvVars);

// Operation UpdateCollectionFromCsv:  For variables, look at type UpdateCollectionFromCsvVars in ../index.d.ts
const { data } = await UpdateCollectionFromCsv(dataConnect, updateCollectionFromCsvVars);

// Operation PaginatedCollections:  For variables, look at type PaginatedCollectionsVars in ../index.d.ts
const { data } = await PaginatedCollections(dataConnect, paginatedCollectionsVars);


```