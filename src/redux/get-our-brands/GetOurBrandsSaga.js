import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
import {
  getOurBrandsError,
  getOurBrandsResponse,
  GET_OUR_BRANDS_ACTION,
} from './GetOurBrandsAction';
import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* getOurBrandsRequest(action) {

  try {
    const response = yield call(postGetOurBrandsData, action.data);
    yield put(getOurBrandsResponse(response));
  } catch (error) {
    yield put(getOurBrandsError(error));
  }
}

async function postGetOurBrandsData(data) {

  const config = getHeaderConfig();
  try {
  
    const result = await httpClient.post(API_METHOD.OUR_BRANDS,data
  , config);

 
    console.log('brands info: ', result.data);

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

export function* getOurBrandsWatcherSaga() {
  yield takeLatest(GET_OUR_BRANDS_ACTION.REQUEST, getOurBrandsRequest);
}
