const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'calatrava-water-system',
  service: 'calatrava-water-system',
  location: 'asia-southeast1'
};
exports.connectorConfig = connectorConfig;

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

const createBookRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateBook', inputVars);
}
createBookRef.operationName = 'CreateBook';
exports.createBookRef = createBookRef;

exports.createBook = function createBook(dcOrVars, vars) {
  return executeMutation(createBookRef(dcOrVars, vars));
};

const createResidentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateResident', inputVars);
}
createResidentRef.operationName = 'CreateResident';
exports.createResidentRef = createResidentRef;

exports.createResident = function createResident(dcOrVars, vars) {
  return executeMutation(createResidentRef(dcOrVars, vars));
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
