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

const getBooksRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetBooks');
}
getBooksRef.operationName = 'GetBooks';
exports.getBooksRef = getBooksRef;

exports.getBooks = function getBooks(dc) {
  return executeQuery(getBooksRef(dc));
};

const getBookByNameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetBookByName', inputVars);
}
getBookByNameRef.operationName = 'GetBookByName';
exports.getBookByNameRef = getBookByNameRef;

exports.getBookByName = function getBookByName(dcOrVars, vars) {
  return executeQuery(getBookByNameRef(dcOrVars, vars));
};

const getResidentByAccountNoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetResidentByAccountNo', inputVars);
}
getResidentByAccountNoRef.operationName = 'GetResidentByAccountNo';
exports.getResidentByAccountNoRef = getResidentByAccountNoRef;

exports.getResidentByAccountNo = function getResidentByAccountNo(dcOrVars, vars) {
  return executeQuery(getResidentByAccountNoRef(dcOrVars, vars));
};

const getResidentsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetResidents');
}
getResidentsRef.operationName = 'GetResidents';
exports.getResidentsRef = getResidentsRef;

exports.getResidents = function getResidents(dc) {
  return executeQuery(getResidentsRef(dc));
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
