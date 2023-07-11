export const GET_STORES_ACTION = {
  REQUEST: 'GET_STORES_REQUEST',
  ERROR: 'GET_STORES_ERROR',
  RESPONSE: 'GET_STORES_RESPONSE',
  RESET: 'GET_STORES_RESET',
};

export const getStoresRequest = () => ({
  type: GET_STORES_ACTION.REQUEST,
});

export const getStoresResponse = data => ({
  type: GET_STORES_ACTION.RESPONSE,
  data: data,
});

export const getStoresError = data => ({
  type: GET_STORES_ACTION.ERROR,
  data: data,
});

export const getStoresReset = () => ({
  type: GET_STORES_ACTION.RESET,
});
