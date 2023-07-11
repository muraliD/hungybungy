import React, { useEffect, useState } from 'react';
import { IconButton } from 'native-base';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import CounterInput from "react-native-counter-input";
const { width, height } = Dimensions.get('window');
import { Button } from 'native-base';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../utils/colors';
import { logoBg, logoIcon } from '../../utils/images';
import { SCREEN_NAME } from '../../Navigator';
import AsyncStorageManager, { LOCAL_KEYS } from '../../utils/AsyncStorageManager';
import Header from '../../components/header';
import { Constants } from '../../utils/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { getOurBrandsDetailRequest, getOurBrandsDetailReset, getOurBrandsDetailResponse } from '../../redux/get-brand-detail/GetBrandDetailAction';
import { getCartItemRequest, getCartItemReset, getCartItemsResponse } from '../../redux/get-cart-items/GetCartItemAction';
import { updateCartItemRequest, updateCartItemReset, updateCartItemsResponse } from '../../redux/update-cart-item/UpdateCartItemAction';
import { deleteCartItemRequest, deleteCartItemReset, deleteCartItemsResponse } from '../../redux/delete-cart-item/DeleteCartItemAction';
import { applyCouponCartRequest, applyCouponCartReset, applyCouponCartResponse } from '../../redux/apply-coupon-cart/ApplyCouponCartAction';
import Counter from '../../components/counter/counter';
import { Value } from 'react-native-reanimated';

import { Chip, withTheme, lightColors } from '@rneui/themed';
import { DebugInstructions } from 'react-native/Libraries/NewAppScreen';
const CartScreen = ({ route, navigation }) => {


  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [userdata, setUserData] = useState(null);
  const [results, setResults] = useState([]);
  const [counts, setcounts] = useState(0);
  const [user, setuser] = useState(null);
  const [curitem, setCuritem] = useState(null);
  const [bing, setBing] = useState(false);
  const [bingCoins, setBingCoins] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [totalz, setTotalz] = useState(null);
  const [deliveryCost, setDeliveryCost] = useState("34");
  const [fintotalz, setFinTotalz] = useState(null);
  const [coupon, setcoupon] = useState(null);
  const [couponT, setcouponT] = useState("");
  const [store, setStore] = useState("");
  const {
    isGetCartItemLoading,
    getCartItemResponse,
    getACartItemError,
  } = useSelector(state => state.getCartItemReducer);

  const {
    upadteCartItemStateLoading,
    updateCartItemStateResponse,
    updateCartItemStateError,
  } = useSelector(state => state.updateCartItemReducer);


  const {
    deleteCartItemStateLoading,
    deleteCartItemStateResponse,
    deleteCartItemStateError,
  } = useSelector(state => state.deleteCartItemReducer);


  const {
    applyCouponCartStateLoading,
    applyCouponCartStateResponse,
    applyCouponCartStateError,
  } = useSelector(state => state.applyCouponCartReducer);


  // const {
  //   isLoginLoading,
  //   mobileLoginResponse,
  //   mobileLoginError,
  // } = useSelector(state => state.mobileLoginReducer);


  // const { isOurBrandsLoading, getOurBrandsResponse, getOurBrandsError } =
  //   useSelector(state => state.getOurBrandsReducer);

  // const { isOurBrandsDetailsLoading, getOurBrandsDetailsResponse, getOurBrandsDetailsError } =
  //   useSelector(state => state.getOurBrandsDetailsReducer);


  useEffect(() => {
    if (isFocused) {

      dispatch(applyCouponCartReset());

      getLocationFromAsync();
    }


  }, [isFocused]);


  const getLocationFromAsync = async () => {

    let UserData = await AsyncStorageManager.localStorage.retrieveData(
      LOCAL_KEYS.USER_DATA,
    );
    if (UserData != undefined && UserData) {
      var dataUser = JSON.parse(UserData);


      setuser(dataUser.data.user_id);
      dispatch(getCartItemRequest({
        "user_id": dataUser.data.user_id
      }));



    }


    let location = await AsyncStorageManager.localStorage.retrieveData(
      LOCAL_KEYS.SELECTED_LOCATION,
    );

    if (location) {
      
      var loc = JSON.parse(location)
      setStore(loc.store_id)
      setDeliveryCost(loc.delivery_charges);


    };
  }
  useEffect(() => {

    return () => {
      setBing(false);
      dispatch(applyCouponCartReset());

    };
  }, []);
  useEffect(() => {

    if (applyCouponCartStateResponse) {
      if (applyCouponCartStateResponse.status) {


        setcoupon(parseInt(applyCouponCartStateResponse.coupon_list.coupon_amount))


        console.log('coupon res, ', applyCouponCartStateResponse);
      } else {
        setcoupon(0)

        // Alert.alert('HungyBingy', JSON.stringify(getOurBrandsResponse.message));
      }
    } else if (applyCouponCartStateError) {
      //Alert.alert('HungyBingy', JSON.stringify(updateCartItemStateError.message));
    }
  }, [applyCouponCartStateResponse, applyCouponCartStateError]);

  useEffect(() => {

    if (updateCartItemStateResponse) {
      if (updateCartItemStateResponse.status) {



        dispatch(getCartItemRequest({
          "user_id": user
        }));

        console.log('cart iupdateresponse, ', updateCartItemsResponse);
      } else {
        // Alert.alert('HungyBingy', JSON.stringify(getOurBrandsResponse.message));
      }
    } else if (updateCartItemStateError) {
      //Alert.alert('HungyBingy', JSON.stringify(updateCartItemStateError.message));
    }
  }, [updateCartItemStateResponse, updateCartItemStateError]);


  useEffect(() => {

    if (deleteCartItemStateResponse) {
      if (deleteCartItemStateResponse.status) {



        dispatch(getCartItemRequest({
          "user_id": user
        }));

        console.log('cart delete, ', deleteCartItemStateResponse);
      } else {
        // Alert.alert('HungyBingy', JSON.stringify(getOurBrandsResponse.message));
      }
    } else if (deleteCartItemStateError) {
      //Alert.alert('HungyBingy', JSON.stringify(deleteCartItemStateError.message));
    }
  }, [deleteCartItemStateResponse, deleteCartItemStateError]);



  useEffect(() => {

    if (getCartItemResponse) {
      if (getCartItemResponse.status) {


        const arrWithColor = (getCartItemResponse.cart_list).map(object => {
          return Object.assign(object, { isload: false });
        });

        totalAmounts(getCartItemResponse.cart_list)
        setResults(arrWithColor);
        setBingCoins(getCartItemResponse.user_bingy_coins)
        setDiscount(getCartItemResponse.user_order_discount_percentage)
        console.log('cart items response, ', getCartItemResponse);
      } else {
        Alert.alert('HungyBingy', JSON.stringify(getCartItemResponse.message));
      }
    } else if (getACartItemError) {
      // Alert.alert('HungyBingy', JSON.stringify(getACartItemError.message));
    }
  }, [getCartItemResponse, getACartItemError]);

  const totalAmounts = (item) => {
    var amount = 0;
    item.forEach(prod => {

      amount = amount + prod.amount * prod.qty

    });

    setTotalz(amount);



  }

  const decrement = (item) => {







    const clone = { ...item };
    setCuritem(clone)
    // clone["isload"] = true;
    // var resultsd = { ...results };


    // var foundIndex = results.findIndex(x => x.item_id == clone.item_id);
    // resultsd[foundIndex] = clone;

    // setResults(resultsd)





    var count = parseInt(clone.qty);

    if (count == 1) {
      dispatch(deleteCartItemRequest({
        "user_id": user,
        "cart_id": clone.cart_id
      }))

    } else {
      count = count - 1;

      clone["qty"] = count.toString();

      dispatch(updateCartItemRequest(clone))

    }



    // counted= counted-1
    // setcounts(counted)


  }
  const increment = (item) => {

    const clone = { ...item };
    setCuritem(clone)
    // clone["isload"] = true;

    // var resultsd = { ...results };


    // var foundIndex = results.findIndex(x => x.item_id == clone.item_id);
    // resultsd[foundIndex] = clone;
    // setResults(resultsd)

    var count = parseInt(clone.qty);
    count = count + 1;

    clone["qty"] = count.toString();


    dispatch(updateCartItemRequest(clone))

  }
  const caliculateAmount = ((item) => {

    return (parseInt(item.amount) * parseInt(item.qty)).toString();

  })
  const renderOurBrandItem = ({ item, index }) => (
    <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5 }}>
      <View style={{ flex: 1.5 }}>
        <Text style={{ padding: 10, height: 40 }}>{item.item_name}</Text>

      </View>
      <View style={{ flex: 1.5 }}>
        <Counter currentCount={item.qty} curitem={curitem} loading={(isGetCartItemLoading || upadteCartItemStateLoading)} item={item} height={44} decrement={decrement} increment={increment}></Counter>
      </View>
      <View style={{ flex: 1.0, justifyContent: "flex-end", alignItems: "center" }}>
        <Text style={{ padding: 10, height: 40 }}>{"₹"}{caliculateAmount(item)}</Text>

      </View>


    </View>
    // <TouchableOpacity
    //   style={{

    //     justifyContent: "center",

    //     alignContent: "center",
    //     alignItems: "center",
    //     width: width / 2,

    //     // minHeight: height / 4,


    //   }}

    //   onPress={() => {

    //   }}

    // >
    //   <View
    //     style={{


    //       // minHeight: height / 4,

    //       marginVertical: 20
    //     }}>
    //     <View
    //       style={{
    //         width: width / 2 - 30,
    //         height: 230,
    //         backgroundColor: 'white',
    //         borderRadius: 15,
    //         paddingHorizontal: 10,
    //         paddingVertical: 5,
    //       }}>
    //       <View>{item.item_image_path ? <Image
    //         style={{ height: 100 }}
    //         resizeMode="contain"
    //         source={{
    //           uri: item.item_image_path,
    //         }}
    //       /> : null}
    //       </View>
    //       <Text
    //         style={{
    //           marginTop: 5,
    //           color: Colors.black,
    //           fontSize: 13,
    //           fontWeight: '400',
    //         }}>
    //         {item.item_name}
    //       </Text>
    //       <Text
    //         style={{
    //           color: Colors.black,
    //           fontSize: 8,
    //           fontWeight: '400',
    //         }}>
    //         {item.brand_content}
    //       </Text>
    //       <Text style={{ color: 'red', fontSize: 16, fontWeight: '500' }}>
    //         ₹250.00
    //       </Text>


    //       <TouchableOpacity
    //         style={{





    //           backgroundColor: "red",
    //           justifyContent:"center",
    //           alignItems:"center",
    //           marginVertical:5,
    //           borderRadius:10,
    //           flex:1,
    //           margin:10

    //           // minHeight: height / 4,


    //         }}

    //         onPress={() => {

    //           var datap = item;


    //           var mainresults = [];

    //         results.forEach((element)=>{
    //           var datass = element;

    //          if(datass.item_id == datap.item_id) {

    //           datass.iscart = true

    //          }

    //          mainresults.push(datass);





    //         })

    //         setResults(mainresults)




    //         }}

    //       >
    //       <View style={styles.addbtn}>
    //           <Text style={styles.saddubTitle}>{item.iscart?"GO to cart":"Add to cart"}</Text>

    //         </View>


    //       </TouchableOpacity>




    //     </View>


    //   </View>
    // </TouchableOpacity>
  );
  const getbitcoinPercentage = (() => {

    var coins = parseInt(bingCoins);
    var fivePer = (coins * (parseInt(discount))) / 100

    var ceil = Math.ceil(fivePer)

    if(coupon!=null && coupon>0){
      
     return ceil+ coupon;
    }
    return ceil;




  })
 

  const earncoinPercentage = ((totl) => {

    var coins = parseInt(bingCoins);
    var fivePer = (totl * (parseInt(discount))) / 100

    return Math.ceil(fivePer)




  })



  return (
    <View

      style={styles.container}>

      <Header navigation={navigation}
        onBackPress={() => {
          navigation.goBack();
        }} title={"My Cart"} headerBgColor={'#FF1300'} />

      {results.length > 0 ? <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={styles.topView}>

          <View style={styles.topViewList}>
            {results && (

              <View>


                <FlatList

                  data={results ?? []}
                  keyExtractor={(item, index) => index + ''}

                  decelerationRate={'normal'}
                  scrollEventThrottle={16}
                  renderItem={renderOurBrandItem}
                  style={{ marginTop: 5 }}
                />
              </View>
            )}




          </View>
          <View style={styles.totalList}>

            <View style={styles.totalheaddiv}>
              <Text style={styles.totalhead}>{"Number of Dishes "}</Text>
            </View>
            <View style={styles.totalvaldiv}>

              <Text style={styles.totalval}>{results && results.length}</Text>
            </View>



          </View>


        </View>
        <View style={styles.bottomView}>

          <ScrollView
            style={{
              width: '100%',
              height: '100%'
            }}
            containerStyle={{ alignItems: 'center' }}
            showsVerticalScrollIndicator={false}>

            <View style={{ height: 60, paddingHorizontal: 5, marginTop: 15 }}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{
                  flex: 3, flexDirection: "column", justifyContent: "center",

                  alignContent: "center",
                  alignItems: "flex-start", paddingHorizontal: 10
                }}>

                  <Text style={{ color: "white" }}>{"Bingy Coins  "}<Text style={{ color: "green" }}>{"(Avl " + "" + bingCoins + ")"}</Text></Text>
                  <Text style={{ color: "white" }}>{"You Can Use " + getbitcoinPercentage() + " Coins (" + discount + "%)"}</Text>


                </View>
                <View style={{
                  flex: 1, justifyContent: "center",

                  alignContent: "center",
                  alignItems: "center"
                }}>
                  <TouchableOpacity
                    style={{

                      justifyContent: "center",

                      alignContent: "center",
                      alignItems: "center",



                      // minHeight: height / 4,


                    }}

                    onPress={() => {
                      setBing(!bing)

                    }}

                  >
                    <Image
                      resizeMode={'cover'}
                      style={styles.tinyLogo}
                      source={!bing ? require('../../assets/images/uncheck.png') : require('../../assets/images/check.png')}
                    />
                  </TouchableOpacity>

                </View>

              </View>

            </View>

            <View style={{ flex: 1, paddingHorizontal: 15, marginTop: 0 }}>
              <Text
                style={{
                  fontSize: 13,

                  fontWeight: '600',
                  color: Colors.white,
                }}>
                Apply Coupon (Get More Coins)
              </Text>
            </View>

            <View style={{ height: 60, paddingHorizontal: 12, marginTop: 5 }}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{
                  flex: 3, flexDirection: "column", justifyContent: "center",

                  alignContent: "center",
                  alignItems: "flex-start", paddingHorizontal: 10,

                  marginTop: 10,
                  borderBottomWidth: 2,
                  borderBottomColor: "#FF1300",
                  borderRadius: 0,








                }}>


                  <View style={{ flex: 1, marginHorizontal: 10 }}>

                    <TextInput

                      editable={true}
                      keyboardType="default"
                      value={couponT}
                      onChangeText={(value) => setcouponT(value)}
                      placeholder=""
                      placeholderTextColor={Colors.txtGreyColor}
                      selectionColor={Colors.white}
                      height={40}
                      style={{ fontSize: 14, color: Colors.white, fontWeight: '600', width: width / 2 }}
                    />
                  </View>


                </View>
                <View style={{
                  flex: 1, justifyContent: "center",
                  marginTop: 10,

                  alignContent: "center",
                  alignItems: "center"
                }}>
                  <TouchableOpacity
                    style={{

                      borderColor: "#FF1300",
                      borderRadius: 5,
                      borderWidth: 1,

                      padding: 15



                      // minHeight: height / 4,


                    }}

                    onPress={() => {


                      dispatch(applyCouponCartRequest({
                        "coupon_code": couponT,
                        "user_id": user
                      }))

                    }}

                  >
                    <Text style={{ color: "#FF1300", fontSize: 14, fontWeight: "bold", marginHorizontal: 5 }}>Apply</Text>

                  </TouchableOpacity>

                </View>

              </View>


            </View>
            <View style={{ flex: 1, paddingHorizontal: 12, marginTop: 5 }}>
              {coupon !== null && coupon == 0 && <Chip
                color='secondary' style={{ backgroundColor: 'red' }}
                title={"Invalid coupon"}


                iconRight
                type="outline"

              />}

            </View>


            <View style={{ flex: 1, paddingHorizontal: 5, marginTop: 15 }}>

              {coupon !== null && coupon > 0 && <Chip
                color='secondary' style={{ backgroundColor: 'red' }}
                title={"you Get " + coupon + " Bingy Coins with this coupon"}
                icon={{
                  name: 'close',
                  type: 'font-awesome',
                  size: 20,
                  color: 'white',
                }}
                onPress={() => {

                  setcoupon(null)
                  setcouponT("")



                }}
                iconRight
                type="outline"

              />}
            </View>



            <View style={{ flex: 1, paddingHorizontal: 12, marginTop: 15 }}>
              <Text
                style={{
                  fontSize: 13,

                  fontWeight: '600',
                  color: Colors.white,
                }}>
                Delivery Instructions
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                marginHorizontal: 12,
                alignItems: 'center',
                paddingBottom: 20,
              }}>




              {/* confirm password */}
              <View
                style={{
                  marginTop: 10,
                  borderBottomWidth: 2,
                  borderBottomColor: "#FF1300",
                  borderRadius: 0,

                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingTop: 5,
                  width: '100%',
                  height: 'auto',
                  alignItems: 'center',
                  justifyContent: 'center',

                }}>

                <View style={{ flex: 1, marginHorizontal: 10 }}>

                  <TextInput
                    numberOfLines={2}
                    editable
                    keyboardType="default"

                    placeholder=""
                    placeholderTextColor={Colors.txtGreyColor}
                    selectionColor={Colors.white}
                    height={50}
                    multiline={true}

                    style={{ fontSize: 14, color: Colors.white, fontWeight: '600' }}
                  />
                </View>
              </View>



            </View>

            <View style={{ height: 40, paddingHorizontal: 5, marginTop: 15 }}>
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>

                <Text style={{ color: "white", fontSize: 14, fontWeight: "bold", marginHorizontal: 5 }}>{"Sub Total"}</Text>
                <Text style={{ color: "#FF1300", fontSize: 14, fontWeight: "bold", marginHorizontal: 5 }}>{"₹"}{totalz}</Text>


              </View>


            </View>



            <View style={{ height: 40, paddingHorizontal: 5, marginTop: 15 }}>
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>

                <Text style={{ color: "white", fontSize: 14, fontWeight: "bold", marginHorizontal: 5 }}>{"Delivery Cost"}</Text>
                <Text style={{ color: "#FF1300", fontSize: 14, fontWeight: "bold", marginHorizontal: 5 }}>{"₹"}{deliveryCost}</Text>


              </View>


            </View>






            <View style={{ height: 40, paddingHorizontal: 5, marginTop: 5 }}>
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>

                <Text style={{ color: "white", fontSize: 14, fontWeight: "bold", marginHorizontal: 5 }}>{"Bingy Coins"}</Text>
                <Text style={{ color: "#FF1300", fontSize: 14, fontWeight: "bold", marginHorizontal: 5 }}>{"-₹"}{bing ? getbitcoinPercentage() : coupon!=null && coupon>0?coupon:0}</Text>


              </View>


            </View>


            <View style={{ height: 50, paddingHorizontal: 5, marginTop: 5 }}>
              <View style={{
                flex: 1, justifyContent: "center", flexDirection: "row",

                alignContent: "center",
                alignItems: "center", backgroundColor: "white", marginHorizontal: 40,
                borderRadius: 40
              }}>
                <Text style={{ color: "black", fontSize: 14, fontWeight: "bold", marginHorizontal: 5, paddingTop: 5 }}>{"Total Price  "}</Text>
                <Text style={{ color: "#FF1300", fontSize: 27, fontWeight: "bold", marginHorizontal: 5 }}>{"₹"}{(parseInt(totalz) - parseInt(bing ? getbitcoinPercentage() : 0) + parseInt(deliveryCost))>0?(parseInt(totalz) - parseInt(bing ? getbitcoinPercentage() : 0) + parseInt(deliveryCost)):"0"}</Text>

              </View>
            </View>

            <View style={{ height: 30, paddingHorizontal: 5, marginTop: 10, justifyContent: "center", alignItems: "center" }}>

              <Text style={{ color: "white", fontSize: 14, fontWeight: "bold", marginHorizontal: 5, marginTop: 10 }}>{"Earn " + (earncoinPercentage(parseInt(totalz) - parseInt(bing ? getbitcoinPercentage() : 0) + parseInt(deliveryCost))) + " on this successfully order"}</Text>
            </View>

            <View style={{ height: 50, paddingHorizontal: 5, marginTop: 20, marginBottom: 150 }}>
              <TouchableOpacity
                style={{

                  justifyContent: "center",

                  alignContent: "center",
                  alignItems: "center",
                  height: 50,
                  backgroundColor: "red",
                  marginHorizontal: 80,
                  borderRadius: 40




                  // minHeight: height / 4,


                }}

                onPress={() => {


                  var data = results.map((data)=>{

                    return {
                      "item_id": data.item_id, 
                      "quantity": data.qty, 
                      "item_price" :  data.amount, 
                      }
                    

                  })

                  var requestObject ={
                    "user_id":user,
                    "store_id":store,
                    "transaction_id":"",
                    "order_amount":(parseInt(totalz) - parseInt(bing ? getbitcoinPercentage() : 0) + parseInt(deliveryCost)).toString(),
                    "coupon_code":coupon!=null&&coupon>0? couponT:"",
                    "bingy_coins":bing ? getbitcoinPercentage().toString() : coupon!=null && coupon>0?coupon.toString():"",
                    "earn_bingy_coins":(earncoinPercentage(parseInt(totalz) - parseInt(bing ? getbitcoinPercentage() : 0) + parseInt(deliveryCost))).toString(),
                    "delivery_cost":deliveryCost.toString(),
                    "payment_amount":(parseInt(totalz) - parseInt(bing ? getbitcoinPercentage() : 0) + parseInt(deliveryCost)).toString(),
                    "address_id":"1",
                    "items":data,
                   
                }

                  // navigation.navigate(SCREEN_NAME.AddressScreen, {"order":requestObject,"from":"cart"});
                  navigation.navigate(SCREEN_NAME.AddressTypeScreen, {"order":requestObject,"from":"cart"});

                  

                }}

              >
                <Text style={{ color: "white", fontSize: 14, fontWeight: "bold", marginHorizontal: 5 }}>NEXT</Text>

                {/* earncoinPercentage */}

              </TouchableOpacity>




            </View>

          </ScrollView>






        </View>

      </View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"


  },
  topChildView1: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",


  },
  topChildView2: {
    flex: 1,
    backgroundColor: Colors.black,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",


  },
  topView: {
    flex: 2,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30

  },
  topViewList: {
    flex: 3.5,

    backgroundColor: Colors.white,


  },
  totalList: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",





  },
  totalhead: {

    fontWeight: "bold",
    fontSize: 16,
    color: "black"


  },
  totalheaddiv: {
    flex: 2,

    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginHorizontal: 10,


  },
  totalvaldiv: {
    flex: 1,

    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderColor: "#FF1300",
    borderWidth: 2,
    marginHorizontal: 60,
    paddingVertical: 5,
    borderRadius: 15


  },

  totalval: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#FF1300"

    //  width:80,




  },

  bottomView: {
    flex: 2.5,

    backgroundColor: Colors.black,



  },
  subTitle: {

    paddingHorizontal: 30,

    fontWeight: "bold",
    fontSize: 16,
    color: "#FC6011",
    opacity: 1

  },
  bottomViewText: {

    justifyContent: "center",
    alignItems: "center",



  },
  bottomDescTxt: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 12,
    color: Colors.white



  },
  bottomViewList: {
    flex: 3.5,

    backgroundColor: Colors.black,


  },
  addbtn: {

    fontSize: 12,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",

  },
  saddubTitle: {




    fontSize: 15,
    fontWeight: "bold",
    color: "white",


  },
  tinyLogo: {
    width: 35, height: 35
  }
});

export default CartScreen;
