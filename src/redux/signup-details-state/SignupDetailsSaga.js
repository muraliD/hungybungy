import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
import {
  signupDetailsError,
  signupDetailsResponse,
  SIGNUP_DETAILS_ACTION,
} from './SignupDetailsAction';
import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* signupDetailsRequest(action) {
  try {
    const response = yield call(postSignupDetailsData, action.data);
    yield put(signupDetailsResponse(response));
  } catch (error) {
    yield put(signupDetailsError(error));
  }
}

async function postSignupDetailsData(data) {
  const config = getHeaderConfig();
  console.log(data);
  try {
    const result = await httpClient.post(API_METHOD.REGISTRATION, data, config);
    // console.log("result states: ", result.data);

    return result.data;
  } catch (e) {
    const {response = {}} = e;
    // const { data = { error: "", displayMessage: "" } } = response;
    // if (data.displayMessage) throw new Error(data.displayMessage);
    // console.log("error", e);
    throw e.message;
  }
}

export function* signupDetailsWatcherSaga() {
  yield takeLatest(SIGNUP_DETAILS_ACTION.REQUEST, signupDetailsRequest);
}
