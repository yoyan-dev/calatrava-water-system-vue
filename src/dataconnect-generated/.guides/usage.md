# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { paginatedCollections, countCollectionFromCsv, searchCollectionFromCsv, createConsumer, updateConsumer, deleteConsumer, getConsumer, paginatedConsumers, searchConsumers, countConsumers } from '@dataconnect/generated';


// Operation PaginatedCollections:  For variables, look at type PaginatedCollectionsVars in ../index.d.ts
const { data } = await PaginatedCollections(dataConnect, paginatedCollectionsVars);

// Operation CountCollectionFromCsv: 
const { data } = await CountCollectionFromCsv(dataConnect);

// Operation SearchCollectionFromCsv:  For variables, look at type SearchCollectionFromCsvVars in ../index.d.ts
const { data } = await SearchCollectionFromCsv(dataConnect, searchCollectionFromCsvVars);

// Operation CreateConsumer:  For variables, look at type CreateConsumerVars in ../index.d.ts
const { data } = await CreateConsumer(dataConnect, createConsumerVars);

// Operation UpdateConsumer:  For variables, look at type UpdateConsumerVars in ../index.d.ts
const { data } = await UpdateConsumer(dataConnect, updateConsumerVars);

// Operation DeleteConsumer:  For variables, look at type DeleteConsumerVars in ../index.d.ts
const { data } = await DeleteConsumer(dataConnect, deleteConsumerVars);

// Operation GetConsumer:  For variables, look at type GetConsumerVars in ../index.d.ts
const { data } = await GetConsumer(dataConnect, getConsumerVars);

// Operation PaginatedConsumers:  For variables, look at type PaginatedConsumersVars in ../index.d.ts
const { data } = await PaginatedConsumers(dataConnect, paginatedConsumersVars);

// Operation SearchConsumers:  For variables, look at type SearchConsumersVars in ../index.d.ts
const { data } = await SearchConsumers(dataConnect, searchConsumersVars);

// Operation CountConsumers: 
const { data } = await CountConsumers(dataConnect);


```