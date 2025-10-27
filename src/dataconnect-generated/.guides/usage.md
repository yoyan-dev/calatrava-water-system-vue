# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createBook, createResident, createBilling, createBillingFromCsv, paginatedBillings, getBooks, getBookByName, getResidentByAccountNo, getResidents } from '@dataconnect/generated';


// Operation CreateBook:  For variables, look at type CreateBookVars in ../index.d.ts
const { data } = await CreateBook(dataConnect, createBookVars);

// Operation CreateResident:  For variables, look at type CreateResidentVars in ../index.d.ts
const { data } = await CreateResident(dataConnect, createResidentVars);

// Operation CreateBilling:  For variables, look at type CreateBillingVars in ../index.d.ts
const { data } = await CreateBilling(dataConnect, createBillingVars);

// Operation CreateBillingFromCsv:  For variables, look at type CreateBillingFromCsvVars in ../index.d.ts
const { data } = await CreateBillingFromCsv(dataConnect, createBillingFromCsvVars);

// Operation PaginatedBillings:  For variables, look at type PaginatedBillingsVars in ../index.d.ts
const { data } = await PaginatedBillings(dataConnect, paginatedBillingsVars);

// Operation GetBooks: 
const { data } = await GetBooks(dataConnect);

// Operation GetBookByName:  For variables, look at type GetBookByNameVars in ../index.d.ts
const { data } = await GetBookByName(dataConnect, getBookByNameVars);

// Operation GetResidentByAccountNo:  For variables, look at type GetResidentByAccountNoVars in ../index.d.ts
const { data } = await GetResidentByAccountNo(dataConnect, getResidentByAccountNoVars);

// Operation GetResidents: 
const { data } = await GetResidents(dataConnect);


```