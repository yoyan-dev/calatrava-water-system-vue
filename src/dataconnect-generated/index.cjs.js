const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'calatrava-water-system',
  service: 'calatrava-water-system',
  location: 'asia-southeast1'
};
exports.connectorConfig = connectorConfig;

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

const createBillingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateBilling', inputVars);
}
createBillingRef.operationName = 'CreateBilling';
exports.createBillingRef = createBillingRef;

exports.createBilling = function createBilling(dcOrVars, vars) {
  return executeMutation(createBillingRef(dcOrVars, vars));
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
