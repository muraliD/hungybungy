import {combineReducers} from 'redux';
import mobileLoginReducer from '../mobile-login-state/MobileLoginReducer';
import getStoresReducer from '../get-stores-state/GetStoresReducer';
import signupDetailsReducer from '../signup-details-state/SignupDetailsReducer';
import otpVerifyReducer from '../otp-verify-state/OtpVerifyReducer';
import getMobileAppSlidersReducer from '../get-mobile-app-sliders/GetMobileAppSlidersReducer';
import getOurBrandsReducer from '../get-our-brands/GetOurBrandsReducer';
import getTodaySpecialitiesReducer from '../get-today-specialities/GetTodaySpecialitiesReducer';
import getPopularCuisinesReducer from '../get-popular-cuisines/GetPopularCuisinesReducer';
import getOurBrandsDetailsReducer from '../get-brand-detail/GetBrandDetailReducer';
import defaultAddCartItemReducer from '../add-cart-item/AddCartItemReducer';
import getCartItemReducer from '../get-cart-items/GetCartItemReducer';
import deleteCartItemReducer from '../delete-cart-item/DeleteCartItemReducer';
import updateCartItemReducer from '../update-cart-item/UpdateCartItemReducer';
import applyCouponCartReducer from '../apply-coupon-cart/ApplyCouponCartReducer';
import detailCusinItemReducer from '../detail_cuisine_item/DetailCusinItemReducer';
import addressCartItemReducer from '../address-cart-item/AddressCartItemReducer';
import createCartItemReducer from '../create-cart-item/CreateCartItemReducer';
import purchaseCartItemReducer from '../purchase-cart-item/PurchaseCartItemReducer';
import addAddressUserReducer from '../add-address-users/AddAddressUsersReducer';
import userOrderDetailsReducer from '../use-order-details/UserOrderDetailsReducer';
import userProfileDataReducer from '../user-profile-data/UserProfileDataReducer';
import userProfileUpdateReducer from '../user-profile-update/UserProfileUpdateReducer';
import getOurItemsDetailReducer from '../get-item-detail/GetItemDetailReducer';
import deleteAddressUserReducer from '../delete-address-users/DeleteAddressUsersReducer';
import userMobileUpdateReducer from '../user-mobile-update/UserMobileUpdateReducer';
import userBingoDetailsReducer from '../user-bingo-details/UserBingoDetailsReducer';
import updateAddressUserReducer from '../update-address-users/UpdateAddressUsersReducer';
import storeAddressUserReducer from '../store-address-users/StoreAddressUsersReducer';
export default combineReducers({
  mobileLoginReducer,
  getStoresReducer,
  signupDetailsReducer,
  otpVerifyReducer,
  getMobileAppSlidersReducer,
  getOurBrandsReducer,
  getTodaySpecialitiesReducer,
  getPopularCuisinesReducer,
  getOurBrandsDetailsReducer,
  defaultAddCartItemReducer,
  getCartItemReducer,
  deleteCartItemReducer,
  updateCartItemReducer,
  applyCouponCartReducer,
  detailCusinItemReducer,
  addressCartItemReducer,
  createCartItemReducer,
  purchaseCartItemReducer,
  addAddressUserReducer,
  userOrderDetailsReducer,
  userProfileDataReducer,
  userProfileUpdateReducer,
  getOurItemsDetailReducer,
  deleteAddressUserReducer,
  userMobileUpdateReducer,
  userBingoDetailsReducer,
  updateAddressUserReducer,
  storeAddressUserReducer
});
