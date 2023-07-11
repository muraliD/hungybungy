import {takeLatest, put, call} from '@redux-saga/core/effects';
import {API_METHOD} from '../../utils/environment';
import {httpClient} from '../../utils/http-client';
import {
  otpVerifyError,
  otpVerifyResponse,
  OTP_VERIFY_ACTION,
} from './OtpVerifyAction';
import {getHeaderConfig} from '../../utils/http-client/HeaderManager';

function* otpVerifyRequest(action) {
  try {
    const response = yield call(postOtpVerifyData, action.data);
    yield put(otpVerifyResponse(response));
  } catch (error) {
    yield put(otpVerifyError(error));
  }
}

async function postOtpVerifyData(data) {
  const config = getHeaderConfig();
  try {
    const result = await httpClient.post(API_METHOD.MOBILE_OTP, data, config);
    console.log('result otp verify: ', result.data, data);

    return result.data;
  } catch (e) {
    const {response = {}} = e;
    // const { data = { error: "", displayMessage: "" } } = response;
    // if (data.displayMessage) throw new Error(data.displayMessage);
    // console.log("error", e);
    throw e.message;
  }
}

export function* otpVerifyWatcherSaga() {
  yield takeLatest(OTP_VERIFY_ACTION.REQUEST, otpVerifyRequest);
}
