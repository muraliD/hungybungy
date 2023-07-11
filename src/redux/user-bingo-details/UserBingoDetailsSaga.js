import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
// import {
//   getOurBrandsError,
//   getOurBrandsResponse,
//   GET_OUR_BRANDS_ACTION,
// } from './GetOurBrandsAction';

import { userBingoDetailsError,userBingoDetailsResponse,USER_BINGO_DETAILS_ACTION } from './UserBingoDetailsAction';

import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* userBingoDetailsRequest(action) {
  
  try {
    const response = yield call(userBingoDetailsData, action.data);
    yield put(userBingoDetailsResponse(response));
  } catch (error) {
    yield put(userBingoDetailsError(error));
  }
}

async function userBingoDetailsData(data) {
  
  const config = getHeaderConfig();
  try {
  
    const result = await httpClient.post(API_METHOD.USER_BINGOS,data
  , config);

  
    console.log('Bingo Details ', result.data);

    return result.data;
  } catch (e) {
    const {response = {}} = e;
    // console.log("login error", JSON.stringify(e))
    // const { data = { error: "", displayMessage: "" } } = response;
    // if (data.displayMessage) throw new Error(data.displayMessage);
    // console.log("error", e);
    throw e.message;
  }
}

export function* userBingoDetailsSaga() {

  yield takeLatest(USER_BINGO_DETAILS_ACTION.REQUEST, userBingoDetailsRequest);
}
