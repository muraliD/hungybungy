export const USER_BINGO_DETAILS_ACTION = {
    REQUEST: 'USER_BINGO_DETAILS_ACTION_REQUEST',
    ERROR: 'USER_BINGO_DETAILS_ACTION_ERROR',
    RESPONSE: 'USER_BINGO_DETAILS_ACTION_RESPONSE',
    RESET: 'USER_BINGO_DETAILS_ACTION_RESET',
  };
  
  export const userBingoDetailsRequest = (data) => ({
    type: USER_BINGO_DETAILS_ACTION .REQUEST,
    data: data,
  });
  
  export const userBingoDetailsResponse = data => ({
    type: USER_BINGO_DETAILS_ACTION .RESPONSE,
    data: data,
  });
  
  export const userBingoDetailsError = data => ({
    type: USER_BINGO_DETAILS_ACTION .ERROR,
    data: data,
  });
  
  export const userBingoDetailsReset = () => ({
    type: USER_BINGO_DETAILS_ACTION .RESET,
  });
  