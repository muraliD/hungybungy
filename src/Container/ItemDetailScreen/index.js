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
  Dimensions
} from 'react-native';
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
import { getOurItemsDetailRequest, getOurItemsDetailReset } from '../../redux/get-item-detail/GetItemDetailAction';
import { addCartItemResponse, addCartItemReset, addCartItemRequest } from '../../redux/add-cart-item/AddCartItemAction';

import { useIsFocused } from '@react-navigation/native';
import Counter from '../../components/counter/counter';
import { getOurItemsDetailState } from '../../redux/get-item-detail/GetItemDetailReducer';
const ItemDetailsScreen = ({ route, navigation }) => {

  const { item_id, item_name, item_image_path, item_content, item_price } = route.params;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [userdata, setUserData] = useState(null);
  const [results, setResults] = useState(null);
  const [userid, setuserid] = useState(null);
  const [isCart, setIsCart] = useState(false);














  const {
    getOurItemsDetailStateLoading,
    getOurItemsDetailStateResponse,
    getOurItemsDetailStateError,
  } = useSelector(state => state.getOurItemsDetailReducer);




  const {
    addCartItemReset,
    addCartItemResponse,
    addCartItemError,
  } = useSelector(state => state.defaultAddCartItemReducer);


  const {
    isLoginLoading,
    mobileLoginResponse,
    mobileLoginError,
  } = useSelector(state => state.mobileLoginReducer);


  const { isOurBrandsLoading, getOurBrandsResponse, getOurBrandsError } =
    useSelector(state => state.getOurBrandsReducer);

  const { isOurBrandsDetailsLoading, getOurBrandsDetailsResponse, getOurBrandsDetailsError } =
    useSelector(state => state.getOurBrandsDetailsReducer);


  useEffect(() => {
    if (isFocused) {

      getLocationFromAsync();
    }


  }, [isFocused]);


  const getLocationFromAsync = async () => {

    let UserData = await AsyncStorageManager.localStorage.retrieveData(
      LOCAL_KEYS.USER_DATA,
    );
    if (UserData != undefined && UserData) {
      var dataUser = JSON.parse(UserData);


      setuserid(dataUser && 'data' in dataUser ? dataUser["data"]["user_id"] : "");

    }


    let location = await AsyncStorageManager.localStorage.retrieveData(
      LOCAL_KEYS.SELECTED_LOCATION,
    );

    if (location) {
      var loc = JSON.parse(location)
      //   dispatch(getOurBrandsDetailRequest({
      //     "location_id": loc.store_id,
      //     "brand_id": brand_id
      //   }));

      dispatch(getOurItemsDetailRequest({ "item_id": item_id }))

    }

  };


  useEffect(() => {



    if (getOurItemsDetailStateResponse) {
      if (getOurItemsDetailStateResponse.status) {



        // const arrWithColor = (getOurBrandsDetailsResponse.data).map(object => {
        //   return Object.assign(object, { iscart: false });
        // });


        // setResults(arrWithColor);
        console.log('in item detailssesponse, ', getOurItemsDetailStateResponse);
      } else {
        // Alert.alert('HungyBingy', JSON.stringify(getOurBrandsResponse.message));
      }
    } else if (getOurItemsDetailStateError) {
      Alert.alert('HungyBingy', JSON.stringify(getOurItemsDetailStateError.message));
    }
  }, [getOurItemsDetailStateResponse, getOurItemsDetailStateError]);



  useEffect(() => {



    if (getOurBrandsDetailsResponse) {
      if (getOurBrandsDetailsResponse.status) {



        const arrWithColor = (getOurBrandsDetailsResponse.data).map(object => {
          return Object.assign(object, { iscart: false });
        });


        setResults(arrWithColor);
        console.log('in our brands detailsssmurali response, ', getOurBrandsDetailsResponse);
      } else {
        // Alert.alert('HungyBingy', JSON.stringify(getOurBrandsResponse.message));
      }
    } else if (getOurBrandsDetailsError) {
      Alert.alert('HungyBingy', JSON.stringify(getOurBrandsDetailsError.message));
    }
  }, [getOurBrandsDetailsResponse, getOurBrandsDetailsError]);

  useEffect(() => {

    if (getOurBrandsResponse) {
      if (getOurBrandsResponse.status) {
        console.log('in our brands response, ', getOurBrandsResponse);
      } else {
        // Alert.alert('HungyBingy', JSON.stringify(getOurBrandsResponse.message));
      }
    } else if (getOurBrandsError) {
      Alert.alert('HungyBingy', JSON.stringify(getOurBrandsError.message));
    }
  }, [getOurBrandsResponse, getOurBrandsError]);
  useEffect(() => {

    console.log(mobileLoginResponse);


  }, [mobileLoginResponse]);


  useEffect(() => {

    if (addCartItemResponse) {
      if (addCartItemResponse.status) {

        console.log('in our carts add response, ', addCartItemResponse);
      } else {
        // Alert.alert('HungyBingy', JSON.stringify(getOurBrandsResponse.message));
      }
    } else if (addCartItemError) {
      Alert.alert('HungyBingy', JSON.stringify(addCartItemError.message));
    }
  }, [addCartItemResponse, addCartItemError]);

  const renderOurBrandItem = ({ item, index }) => (
    <TouchableOpacity
      style={{

        justifyContent: "center",

        alignContent: "center",
        alignItems: "center",
        width: width / 2,

        // minHeight: height / 4,


      }}

      onPress={() => {


      }}

    >
      <View
        style={{


          // minHeight: height / 4,

          marginVertical: 20
        }}>
        <View
          style={{
            width: width / 2 - 30,
            height: 230,
            backgroundColor: 'white',
            borderRadius: 15,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}>
          <View>{item.item_image_path ? <Image
            style={{ height: 100 }}
            resizeMode="contain"
            source={{
              uri: item.item_image_path,
            }}
          /> : null}
          </View>
          <Text
            style={{
              marginTop: 5,
              color: Colors.black,
              fontSize: 13,
              fontWeight: '400',
            }}>
            {item.item_name}
          </Text>
          <Text
            style={{
              color: Colors.black,
              fontSize: 8,
              fontWeight: '400',
            }}>
            {item.brand_content}
          </Text>
          <Text style={{ color: 'red', fontSize: 16, fontWeight: '500' }}>
            {"₹"}{item.item_price}{".00"}
          </Text>


          <TouchableOpacity
            style={{





              backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 5,
              borderRadius: 10,
              flex: 1,
              margin: 10

              // minHeight: height / 4,


            }}

            onPress={() => {






              if (isCart == false) {



                setIsCart(true)
                dispatch(addCartItemRequest({
                  "user_id": userid,
                  "item_id": datap.item_id,
                  "qty": "1",
                  "amount": datap.item_price
                }));






              } else {
                navigation.navigate(SCREEN_NAME.CartScreen, item);
              }


            }}

          >
            <View style={styles.addbtn}>
              <Text style={styles.saddubTitle}>{isCart ? "GO to cart" : "Add to cart"}</Text>

            </View>


          </TouchableOpacity>




        </View>


      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Header navigation={navigation}
        onBackPress={() => {
          navigation.goBack();
        }} title={"Item Description"} headerBgColor={'black'} />
      {/* body */}
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: "black" }}>
        <View style={styles.topView}>
          <ImageBackground

            source={require('../../assets/images/Bg.png')}
            style={{ flex: 1, flexDirection: 'column' }}
          >
            <View style={styles.topChildView1}>
              {item_image_path ? <Image
                style={{ height: 100, width: 100 }}
                resizeMode="contain"
                source={{
                  uri: item_image_path,
                }}
              /> : null}


            </View>
            <View style={styles.topChildView2}>
              <Text style={styles.subTitle}>{item_name}</Text>

            </View>


          </ImageBackground>

        </View>
        <View style={styles.bottomView}>
          <View style={styles.bottomViewText}>

            <Text style={styles.bottomDescTxt}> Price : {"₹"}{item_price}{".00"}</Text>




          </View>


          <ScrollView style={styles.sideViewText} showsVerticalScrollIndicator={true}>
            {/* <Text style={styles.bottomDescTxt}> Brand name  :</Text> */}


            <Text style={styles.bottomDescVal}> {getOurItemsDetailStateResponse?.data?.item_content ?? ""}</Text>




          </ScrollView>




          <View style={{ flex: 0.4,  justifyContent: "center", alignContent: "center", alignItems: "center" ,marginBottom:40}}>

            <TouchableOpacity
              style={{

                justifyContent: "center",

                alignContent: "center",
                alignItems: "center",
                height: 53,
                width: 300,
                backgroundColor: "red",

                borderRadius: 40,
           





                // minHeight: height / 4,


              }}

              onPress={() => {
                if (isCart) {
                  navigation.navigate(SCREEN_NAME.CartScreen, route.params);
                } else {
                  dispatch(addCartItemRequest({
                    "user_id": userid,
                    "item_id": item_id,
                    "qty": "1",
                    "amount": item_price
                  }));

                  setIsCart(true)
                }



              }}



            >
              <Text style={{ color: "white", height: 30, fontSize: 20 }}>{isCart ? "Go To Cart" : "Add To Cart"}</Text>

            </TouchableOpacity>
          </View>






        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,


  },
  topChildView1: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",


  },
  topChildView2: {
    flex: 1,
    backgroundColor: Colors.black,

    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    justifyContent: "center",
    alignItems: "flex-start",


  },
  topView: {
    flex: 1,
    backgroundColor: Colors.orange,

  },
  bottomView: {
    flex: 3,

    backgroundColor: Colors.black,



  },
  subTitle: {

    paddingHorizontal: 30,
    marginLeft: 20,
    fontWeight: "bold",
    fontSize: 20,
    color: "#FC6011",
    opacity: 1

  },
  sideViewText: {
    flex:5,
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
    // flexDirection: "row"
  },
  bottomViewText: {

    flex:0.3,
    justifyContent: "center",
    alignItems: "flex-start",





  },
  bottomDescTxt: {
    paddingHorizontal: 45,
    paddingVertical: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#FC6011",



  },
  bottomDescVal: {

    paddingVertical: 2,
    marginHorizontal:45,
    fontSize: 12,

    color: "white",



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
});

export default ItemDetailsScreen;
