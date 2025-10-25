const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'calatrava-water-system',
  service: 'calatrava-water-system',
  location: 'asia-southeast1'
};
exports.connectorConfig = connectorConfig;

const insertBookRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertBook', inputVars);
}
insertBookRef.operationName = 'InsertBook';
exports.insertBookRef = insertBookRef;

exports.insertBook = function insertBook(dcOrVars, vars) {
  return executeMutation(insertBookRef(dcOrVars, vars));
};

const insertResidentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertResident', inputVars);
}
insertResidentRef.operationName = 'InsertResident';
exports.insertResidentRef = insertResidentRef;

exports.insertResident = function insertResident(dcOrVars, vars) {
  return executeMutation(insertResidentRef(dcOrVars, vars));
};

const insertBillingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertBilling', inputVars);
}
insertBillingRef.operationName = 'InsertBilling';
exports.insertBillingRef = insertBillingRef;

exports.insertBilling = function insertBilling(dcOrVars, vars) {
  return executeMutation(insertBillingRef(dcOrVars, vars));
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
