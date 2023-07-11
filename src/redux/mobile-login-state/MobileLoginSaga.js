import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
import {
  mobileLoginError,
  mobileLoginResponse,
  MOBILE_LOGIN_ACTION,
} from './MobileLoginAction';
import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* mobileLoginRequest(action) {
  try {
    const response = yield call(postMobileLoginData, action.data);
    yield put(mobileLoginResponse(response));
  } catch (error) {
    yield put(mobileLoginError(error));
  }
}

async function postMobileLoginData(data) {
  const config = getHeaderConfig();
  let body = {
    mobile_number: data.mobile_number,
    user_pass: data.user_pass,
  };

  
  try {
    var url = API_METHOD.MOBILE_LOGIN;
    const result = await httpClient.post(url, body, config);
    console.log('result info: ', result.data);

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

export function* mobileLoginWatcherSaga() {
  yield takeLatest(MOBILE_LOGIN_ACTION.REQUEST, mobileLoginRequest);
}
