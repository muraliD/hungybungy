import {all, fork} from 'redux-saga/effects';
import {mobileLoginWatcherSaga} from '../mobile-login-state/MobileLoginSaga';
import {getStoresWatcherSaga} from '../get-stores-state/GetStoresSaga';
import {signupDetailsWatcherSaga} from '../signup-details-state/SignupDetailsSaga';
import {otpVerifyWatcherSaga} from '../otp-verify-state/OtpVerifySaga';
import {getMobileAppSlidersWatcherSaga} from '../get-mobile-app-sliders/GetMobileAppSlidersSaga';
import {getOurBrandsWatcherSaga} from '../get-our-brands/GetOurBrandsSaga';
import {getTodaySpecialitiesWatcherSaga} from '../get-today-specialities/GetTodaySpecialitiesSaga';
import {getPopularCuisinesWatcherSaga} from '../get-popular-cuisines/GetPopularCuisinesSaga';
import { getOurBrandsDetailsWatcherSaga } from '../get-brand-detail/GetBrandDetailSaga';
import {addtocartSaga} from '../add-cart-item/AddCartItemSaga'
import { getcartSaga } from '../get-cart-items/GetCartItemSaga';
import { deleteCartSaga } from '../delete-cart-item/DeleteCartItemSaga';
import { updateCartSaga } from '../update-cart-item/UpdateCartItemSaga';
import { applyCouponCartSaga } from '../apply-coupon-cart/ApplyCouponCartSaga';
import { detailCusinItemSaga } from '../detail_cuisine_item/DetailCusinItemSaga';
import { addressCartSaga } from '../address-cart-item/AddressCartItemSaga';
import { createCartSaga } from '../create-cart-item/CreateCartItemSaga';
import { purchaseCartSaga } from '../purchase-cart-item/PurchaseCartItemSaga';
import { addAddressUserSaga } from '../add-address-users/AddAddressUsersSaga';
import { userOrderDetailsSaga } from '../use-order-details/UserOrderDetailsSaga';
import { userProfileDataSaga } from '../user-profile-data/UserProfileDataSaga';
import { userProfileUpdateSaga } from '../user-profile-update/UserProfileUpdateSaga';
import { getOurItemsDetailWatcherSaga } from '../get-item-detail/GetItemDetailSaga';
import { deleteAddressUsersSaga } from '../delete-address-users/DeleteAddressUsersSaga';
import { userMobileUpdateSaga } from '../user-mobile-update/UserMobileUpdateSaga';
import { userBingoDetailsSaga } from '../user-bingo-details/UserBingoDetailsSaga';
import { updateAddressUserSaga } from '../update-address-users/UpdateAddressUsersSaga';
export default function* rootSaga() {
  yield all([fork(mobileLoginWatcherSaga)]);
  yield all([fork(getStoresWatcherSaga)]);
  yield all([fork(signupDetailsWatcherSaga)]);
  yield all([fork(otpVerifyWatcherSaga)]);
  yield all([fork(getMobileAppSlidersWatcherSaga)]);
  yield all([fork(getOurBrandsWatcherSaga)]);
  yield all([fork(getTodaySpecialitiesWatcherSaga)]);
  yield all([fork(getPopularCuisinesWatcherSaga)]);
  yield all([fork(getOurBrandsDetailsWatcherSaga)]);
  yield all([fork(addtocartSaga)]);
  yield all([fork(getcartSaga)]);
  yield all([fork(deleteCartSaga)]);
  yield all([fork(updateCartSaga)]);
  yield all([fork(applyCouponCartSaga)]);
  yield all([fork(detailCusinItemSaga)]);
  yield all([fork(addressCartSaga)]);
  yield all([fork(createCartSaga)]);
  yield all([fork(purchaseCartSaga)]);
  yield all([fork(addAddressUserSaga)]);
  yield all([fork(userOrderDetailsSaga)]);
  yield all([fork(userProfileDataSaga)]);
  yield all([fork(userProfileUpdateSaga)]);
  yield all([fork(getOurItemsDetailWatcherSaga)]);
  yield all([fork(deleteAddressUsersSaga)]);
  yield all([fork(userMobileUpdateSaga)]);
  yield all([fork(userBingoDetailsSaga)]);
  yield all([fork(updateAddressUserSaga)]);
}
