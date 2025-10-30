# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { paginatedCollections, countCollectionFromCsv, searchCollectionFromCsv, createBook, createResident, createBillingFromCsv, deleteBillingFromCsv, updateBillingFromCsv, paginatedBillings, countBillingFromCsv } from '@dataconnect/generated';


// Operation PaginatedCollections:  For variables, look at type PaginatedCollectionsVars in ../index.d.ts
const { data } = await PaginatedCollections(dataConnect, paginatedCollectionsVars);

// Operation CountCollectionFromCsv: 
const { data } = await CountCollectionFromCsv(dataConnect);

// Operation SearchCollectionFromCsv:  For variables, look at type SearchCollectionFromCsvVars in ../index.d.ts
const { data } = await SearchCollectionFromCsv(dataConnect, searchCollectionFromCsvVars);

// Operation CreateBook:  For variables, look at type CreateBookVars in ../index.d.ts
const { data } = await CreateBook(dataConnect, createBookVars);

// Operation CreateResident:  For variables, look at type CreateResidentVars in ../index.d.ts
const { data } = await CreateResident(dataConnect, createResidentVars);

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


```