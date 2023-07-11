export const BASEURL = 'https://hungybingy.com/hbmobile/api/';
export const BUILD_VERSION = '1.0.0';

export const APP_KEYS = {
  GOOGLE_KEY: 'AIzaSyB77hin0hNjC6KEypJ33kuVhy4bZjdc4Eo',
}

export const API_METHOD = {
  MOBILE_LOGIN: 'Users/UserLogin',
  GET_STORES: 'Users/getStores',
  REGISTRATION: 'Users/UserDataReg',
  MOBILE_OTP: 'Users/MobileOtp',
  MOBILE_APP_SLIDERS: 'Users/getMobileAppSliders',
  OUR_BRANDS: 'Brands/getBrandsWithItemsList',
  BRAND_DETAILS: 'Brands/getBrandIdBasedItems',
  TODAY_SPECIALITIES: 'Items/geTodaySpecialItemsList',
  POPULAR_CUISINES: 'Items/getCuisineDataList',
  ADD_CART:"/Cart/addItemToCart",
  GET_CART:"/Cart/getCartList",
  DELETE_CART:"/Cart/removeItemToCart",
  UPDATE_CART:"/Cart/cartItemUpdate",
  CUISINES_ITEMS:"/Items/getCuisinesIdBasedItems",
  APPLY_COUPON:"/Cart/verifyCoupons",
  ADDRESSES:"/Users/getUserAddressList",
  ADD_ADDRESSES:"/Users/address",
  UPDATE_ADDRESSES:"Users/addressUpdate",
  DELETE_ADDRESSES:"/Users/deleteUserAddress",
  ORDER:"/Orders/createOrder",
  TRANSACTION:"/Transactions/orderTransaction",
  MY_ORDERS:"/Orders/getUserOrderHistory",
  PROFILE:"/Users/getUserDetails",
  PROFILE_UPDATE:"/Users/profileUpdate",
  ITEM_DETAILS:"/Items/getItemDetails",
  MOBILE_UPDATE:"/Users/userMobileNumberUpdate",
  USER_BINGOS:"/Orders/getUserBingyCoinsHistory"
};


