import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'calatrava-water-system',
  service: 'calatrava-water-system',
  location: 'asia-southeast1'
};

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

export const createBillingFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateBillingFromCsv', inputVars);
}
createBillingFromCsvRef.operationName = 'CreateBillingFromCsv';

export function createBillingFromCsv(dcOrVars, vars) {
  return executeMutation(createBillingFromCsvRef(dcOrVars, vars));
}

export const deleteBillingFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteBillingFromCsv', inputVars);
}
deleteBillingFromCsvRef.operationName = 'DeleteBillingFromCsv';

export function deleteBillingFromCsv(dcOrVars, vars) {
  return executeMutation(deleteBillingFromCsvRef(dcOrVars, vars));
}

export const updateBillingFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateBillingFromCsv', inputVars);
}
updateBillingFromCsvRef.operationName = 'UpdateBillingFromCsv';

export function updateBillingFromCsv(dcOrVars, vars) {
  return executeMutation(updateBillingFromCsvRef(dcOrVars, vars));
}

export const paginatedBillingsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'PaginatedBillings', inputVars);
}
paginatedBillingsRef.operationName = 'PaginatedBillings';

export function paginatedBillings(dcOrVars, vars) {
  return executeQuery(paginatedBillingsRef(dcOrVars, vars));
}

export const countBillingFromCsvRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'CountBillingFromCsv');
}
countBillingFromCsvRef.operationName = 'CountBillingFromCsv';

export function countBillingFromCsv(dc) {
  return executeQuery(countBillingFromCsvRef(dc));
}

export const searchBillingFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchBillingFromCsv', inputVars);
}
searchBillingFromCsvRef.operationName = 'SearchBillingFromCsv';

export function searchBillingFromCsv(dcOrVars, vars) {
  return executeQuery(searchBillingFromCsvRef(dcOrVars, vars));
}

export const createCollectionFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCollectionFromCsv', inputVars);
}
createCollectionFromCsvRef.operationName = 'CreateCollectionFromCsv';

export function createCollectionFromCsv(dcOrVars, vars) {
  return executeMutation(createCollectionFromCsvRef(dcOrVars, vars));
}

export const deleteCollectionFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteCollectionFromCsv', inputVars);
}
deleteCollectionFromCsvRef.operationName = 'DeleteCollectionFromCsv';

export function deleteCollectionFromCsv(dcOrVars, vars) {
  return executeMutation(deleteCollectionFromCsvRef(dcOrVars, vars));
}

export const updateCollectionFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCollectionFromCsv', inputVars);
}
updateCollectionFromCsvRef.operationName = 'UpdateCollectionFromCsv';

export function updateCollectionFromCsv(dcOrVars, vars) {
  return executeMutation(updateCollectionFromCsvRef(dcOrVars, vars));
}

export const paginatedCollectionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'PaginatedCollections', inputVars);
}
paginatedCollectionsRef.operationName = 'PaginatedCollections';

export function paginatedCollections(dcOrVars, vars) {
  return executeQuery(paginatedCollectionsRef(dcOrVars, vars));
}

export const countCollectionFromCsvRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'CountCollectionFromCsv');
}
countCollectionFromCsvRef.operationName = 'CountCollectionFromCsv';

export function countCollectionFromCsv(dc) {
  return executeQuery(countCollectionFromCsvRef(dc));
}

export const searchCollectionFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchCollectionFromCsv', inputVars);
}
searchCollectionFromCsvRef.operationName = 'SearchCollectionFromCsv';

export function searchCollectionFromCsv(dcOrVars, vars) {
  return executeQuery(searchCollectionFromCsvRef(dcOrVars, vars));
}

export const createLedgerFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateLedgerFromCsv', inputVars);
}
createLedgerFromCsvRef.operationName = 'CreateLedgerFromCsv';

export function createLedgerFromCsv(dcOrVars, vars) {
  return executeMutation(createLedgerFromCsvRef(dcOrVars, vars));
}

export const updateLedgerFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateLedgerFromCsv', inputVars);
}
updateLedgerFromCsvRef.operationName = 'UpdateLedgerFromCsv';

export function updateLedgerFromCsv(dcOrVars, vars) {
  return executeMutation(updateLedgerFromCsvRef(dcOrVars, vars));
}

export const deleteLedgerFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteLedgerFromCsv', inputVars);
}
deleteLedgerFromCsvRef.operationName = 'DeleteLedgerFromCsv';

export function deleteLedgerFromCsv(dcOrVars, vars) {
  return executeMutation(deleteLedgerFromCsvRef(dcOrVars, vars));
}

export const paginatedLedgersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'PaginatedLedgers', inputVars);
}
paginatedLedgersRef.operationName = 'PaginatedLedgers';

export function paginatedLedgers(dcOrVars, vars) {
  return executeQuery(paginatedLedgersRef(dcOrVars, vars));
}

export const countLedgerFromCsvRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'CountLedgerFromCsv');
}
countLedgerFromCsvRef.operationName = 'CountLedgerFromCsv';

export function countLedgerFromCsv(dc) {
  return executeQuery(countLedgerFromCsvRef(dc));
}

export const searchLedgerFromCsvRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchLedgerFromCsv', inputVars);
}
searchLedgerFromCsvRef.operationName = 'SearchLedgerFromCsv';

export function searchLedgerFromCsv(dcOrVars, vars) {
  return executeQuery(searchLedgerFromCsvRef(dcOrVars, vars));
}

