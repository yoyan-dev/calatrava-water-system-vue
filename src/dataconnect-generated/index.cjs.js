const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'calatrava-water-system',
  service: 'calatrava-water-system',
  location: 'asia-southeast1'
};
exports.connectorConfig = connectorConfig;

const paginatedCollectionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'PaginatedCollections', inputVars);
}
paginatedCollectionsRef.operationName = 'PaginatedCollections';
exports.paginatedCollectionsRef = paginatedCollectionsRef;

exports.paginatedCollections = function paginatedCollections(dcOrVars, vars) {
  return executeQuery(paginatedCollectionsRef(dcOrVars, vars));
};

const countCollectionFromCsvRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'CountCollectionFromCsv');
}
countCollectionFromCsvRef.operationName = 'CountCollectionFromCsv';
exports.countCollectionFromCsvRef = countCollectionFromCsvRef;

exports.countCollectionFromCsv = function countCollectionFromCsv(dc) {
  return executeQuery(countCollectionFromCsvRef(dc));
};

const searchCollectionFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchCollectionFromCsv', inputVars);
}
searchCollectionFromCsvRef.operationName = 'SearchCollectionFromCsv';
exports.searchCollectionFromCsvRef = searchCollectionFromCsvRef;

exports.searchCollectionFromCsv = function searchCollectionFromCsv(dcOrVars, vars) {
  return executeQuery(searchCollectionFromCsvRef(dcOrVars, vars));
};

const createConsumerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateConsumer', inputVars);
}
createConsumerRef.operationName = 'CreateConsumer';
exports.createConsumerRef = createConsumerRef;

exports.createConsumer = function createConsumer(dcOrVars, vars) {
  return executeMutation(createConsumerRef(dcOrVars, vars));
};

const updateConsumerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateConsumer', inputVars);
}
updateConsumerRef.operationName = 'UpdateConsumer';
exports.updateConsumerRef = updateConsumerRef;

exports.updateConsumer = function updateConsumer(dcOrVars, vars) {
  return executeMutation(updateConsumerRef(dcOrVars, vars));
};

const deleteConsumerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteConsumer', inputVars);
}
deleteConsumerRef.operationName = 'DeleteConsumer';
exports.deleteConsumerRef = deleteConsumerRef;

exports.deleteConsumer = function deleteConsumer(dcOrVars, vars) {
  return executeMutation(deleteConsumerRef(dcOrVars, vars));
};

const getConsumerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetConsumer', inputVars);
}
getConsumerRef.operationName = 'GetConsumer';
exports.getConsumerRef = getConsumerRef;

exports.getConsumer = function getConsumer(dcOrVars, vars) {
  return executeQuery(getConsumerRef(dcOrVars, vars));
};

const paginatedConsumersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'PaginatedConsumers', inputVars);
}
paginatedConsumersRef.operationName = 'PaginatedConsumers';
exports.paginatedConsumersRef = paginatedConsumersRef;

exports.paginatedConsumers = function paginatedConsumers(dcOrVars, vars) {
  return executeQuery(paginatedConsumersRef(dcOrVars, vars));
};

const searchConsumersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchConsumers', inputVars);
}
searchConsumersRef.operationName = 'SearchConsumers';
exports.searchConsumersRef = searchConsumersRef;

exports.searchConsumers = function searchConsumers(dcOrVars, vars) {
  return executeQuery(searchConsumersRef(dcOrVars, vars));
};

const countConsumersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'CountConsumers');
}
countConsumersRef.operationName = 'CountConsumers';
exports.countConsumersRef = countConsumersRef;

exports.countConsumers = function countConsumers(dc) {
  return executeQuery(countConsumersRef(dc));
};

const createLedgerFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateLedgerFromCsv', inputVars);
}
createLedgerFromCsvRef.operationName = 'CreateLedgerFromCsv';
exports.createLedgerFromCsvRef = createLedgerFromCsvRef;

exports.createLedgerFromCsv = function createLedgerFromCsv(dcOrVars, vars) {
  return executeMutation(createLedgerFromCsvRef(dcOrVars, vars));
};

const updateLedgerFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateLedgerFromCsv', inputVars);
}
updateLedgerFromCsvRef.operationName = 'UpdateLedgerFromCsv';
exports.updateLedgerFromCsvRef = updateLedgerFromCsvRef;

exports.updateLedgerFromCsv = function updateLedgerFromCsv(dcOrVars, vars) {
  return executeMutation(updateLedgerFromCsvRef(dcOrVars, vars));
};

const deleteLedgerFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteLedgerFromCsv', inputVars);
}
deleteLedgerFromCsvRef.operationName = 'DeleteLedgerFromCsv';
exports.deleteLedgerFromCsvRef = deleteLedgerFromCsvRef;

exports.deleteLedgerFromCsv = function deleteLedgerFromCsv(dcOrVars, vars) {
  return executeMutation(deleteLedgerFromCsvRef(dcOrVars, vars));
};

const paginatedLedgersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'PaginatedLedgers', inputVars);
}
paginatedLedgersRef.operationName = 'PaginatedLedgers';
exports.paginatedLedgersRef = paginatedLedgersRef;

exports.paginatedLedgers = function paginatedLedgers(dcOrVars, vars) {
  return executeQuery(paginatedLedgersRef(dcOrVars, vars));
};

const countLedgerFromCsvRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'CountLedgerFromCsv');
}
countLedgerFromCsvRef.operationName = 'CountLedgerFromCsv';
exports.countLedgerFromCsvRef = countLedgerFromCsvRef;

exports.countLedgerFromCsv = function countLedgerFromCsv(dc) {
  return executeQuery(countLedgerFromCsvRef(dc));
};

const searchLedgerFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchLedgerFromCsv', inputVars);
}
searchLedgerFromCsvRef.operationName = 'SearchLedgerFromCsv';
exports.searchLedgerFromCsvRef = searchLedgerFromCsvRef;

exports.searchLedgerFromCsv = function searchLedgerFromCsv(dcOrVars, vars) {
  return executeQuery(searchLedgerFromCsvRef(dcOrVars, vars));
};

const createBillingFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateBillingFromCsv', inputVars);
}
createBillingFromCsvRef.operationName = 'CreateBillingFromCsv';
exports.createBillingFromCsvRef = createBillingFromCsvRef;

exports.createBillingFromCsv = function createBillingFromCsv(dcOrVars, vars) {
  return executeMutation(createBillingFromCsvRef(dcOrVars, vars));
};

const deleteBillingFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteBillingFromCsv', inputVars);
}
deleteBillingFromCsvRef.operationName = 'DeleteBillingFromCsv';
exports.deleteBillingFromCsvRef = deleteBillingFromCsvRef;

exports.deleteBillingFromCsv = function deleteBillingFromCsv(dcOrVars, vars) {
  return executeMutation(deleteBillingFromCsvRef(dcOrVars, vars));
};

const updateBillingFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateBillingFromCsv', inputVars);
}
updateBillingFromCsvRef.operationName = 'UpdateBillingFromCsv';
exports.updateBillingFromCsvRef = updateBillingFromCsvRef;

exports.updateBillingFromCsv = function updateBillingFromCsv(dcOrVars, vars) {
  return executeMutation(updateBillingFromCsvRef(dcOrVars, vars));
};

const paginatedBillingsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'PaginatedBillings', inputVars);
}
paginatedBillingsRef.operationName = 'PaginatedBillings';
exports.paginatedBillingsRef = paginatedBillingsRef;

exports.paginatedBillings = function paginatedBillings(dcOrVars, vars) {
  return executeQuery(paginatedBillingsRef(dcOrVars, vars));
};

const countBillingFromCsvRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'CountBillingFromCsv');
}
countBillingFromCsvRef.operationName = 'CountBillingFromCsv';
exports.countBillingFromCsvRef = countBillingFromCsvRef;

exports.countBillingFromCsv = function countBillingFromCsv(dc) {
  return executeQuery(countBillingFromCsvRef(dc));
};

const searchBillingFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchBillingFromCsv', inputVars);
}
searchBillingFromCsvRef.operationName = 'SearchBillingFromCsv';
exports.searchBillingFromCsvRef = searchBillingFromCsvRef;

exports.searchBillingFromCsv = function searchBillingFromCsv(dcOrVars, vars) {
  return executeQuery(searchBillingFromCsvRef(dcOrVars, vars));
};

const createCollectionFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCollectionFromCsv', inputVars);
}
createCollectionFromCsvRef.operationName = 'CreateCollectionFromCsv';
exports.createCollectionFromCsvRef = createCollectionFromCsvRef;

exports.createCollectionFromCsv = function createCollectionFromCsv(dcOrVars, vars) {
  return executeMutation(createCollectionFromCsvRef(dcOrVars, vars));
};

const deleteCollectionFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteCollectionFromCsv', inputVars);
}
deleteCollectionFromCsvRef.operationName = 'DeleteCollectionFromCsv';
exports.deleteCollectionFromCsvRef = deleteCollectionFromCsvRef;

exports.deleteCollectionFromCsv = function deleteCollectionFromCsv(dcOrVars, vars) {
  return executeMutation(deleteCollectionFromCsvRef(dcOrVars, vars));
};

const updateCollectionFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCollectionFromCsv', inputVars);
}
updateCollectionFromCsvRef.operationName = 'UpdateCollectionFromCsv';
exports.updateCollectionFromCsvRef = updateCollectionFromCsvRef;

exports.updateCollectionFromCsv = function updateCollectionFromCsv(dcOrVars, vars) {
  return executeMutation(updateCollectionFromCsvRef(dcOrVars, vars));
};
