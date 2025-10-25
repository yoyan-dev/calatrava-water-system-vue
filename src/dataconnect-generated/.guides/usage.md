# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { insertBook, insertResident, insertBilling, paginatedBillings } from '@dataconnect/generated';


// Operation InsertBook:  For variables, look at type InsertBookVars in ../index.d.ts
const { data } = await InsertBook(dataConnect, insertBookVars);

// Operation InsertResident:  For variables, look at type InsertResidentVars in ../index.d.ts
const { data } = await InsertResident(dataConnect, insertResidentVars);

// Operation InsertBilling:  For variables, look at type InsertBillingVars in ../index.d.ts
const { data } = await InsertBilling(dataConnect, insertBillingVars);

// Operation PaginatedBillings:  For variables, look at type PaginatedBillingsVars in ../index.d.ts
const { data } = await PaginatedBillings(dataConnect, paginatedBillingsVars);


```