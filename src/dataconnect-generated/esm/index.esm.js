import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'calatrava-water-system',
  service: 'calatrava-water-system',
  location: 'asia-southeast1'
};

export const paginatedBillingsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'PaginatedBillings', inputVars);
}
paginatedBillingsRef.operationName = 'PaginatedBillings';

export function paginatedBillings(dcOrVars, vars) {
  return executeQuery(paginatedBillingsRef(dcOrVars, vars));
}

export const getBooksRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetBooks');
}
getBooksRef.operationName = 'GetBooks';

export function getBooks(dc) {
  return executeQuery(getBooksRef(dc));
}

export const getBookByNameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetBookByName', inputVars);
}
getBookByNameRef.operationName = 'GetBookByName';

export function getBookByName(dcOrVars, vars) {
  return executeQuery(getBookByNameRef(dcOrVars, vars));
}

export const getResidentByAccountNoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetResidentByAccountNo', inputVars);
}
getResidentByAccountNoRef.operationName = 'GetResidentByAccountNo';

export function getResidentByAccountNo(dcOrVars, vars) {
  return executeQuery(getResidentByAccountNoRef(dcOrVars, vars));
}

export const getResidentsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetResidents');
}
getResidentsRef.operationName = 'GetResidents';

export function getResidents(dc) {
  return executeQuery(getResidentsRef(dc));
}

export const createBookRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateBook', inputVars);
}
createBookRef.operationName = 'CreateBook';

export function createBook(dcOrVars, vars) {
  return executeMutation(createBookRef(dcOrVars, vars));
}

export const createResidentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateResident', inputVars);
}
createResidentRef.operationName = 'CreateResident';

export function createResident(dcOrVars, vars) {
  return executeMutation(createResidentRef(dcOrVars, vars));
}

export const createBillingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateBilling', inputVars);
}
createBillingRef.operationName = 'CreateBilling';

export function createBilling(dcOrVars, vars) {
  return executeMutation(createBillingRef(dcOrVars, vars));
}

