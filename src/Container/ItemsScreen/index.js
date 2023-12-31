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
import { addCartItemResponse,addCartItemReset,addCartItemRequest } from '../../redux/add-cart-item/AddCartItemAction';
import { useIsFocused } from '@react-navigation/native';

import {
    getTodaySpecialitiesRequest,
    getTodaySpecialitiesReset,
  } from '../../redux/get-today-specialities/GetTodaySpecialitiesAction';


  import { detailCusinItemRequest ,detailCusinItemReset,detailCusinItemResponse } from '../../redux/detail_cuisine_item/DetailCusinItemAction';
const ItemsScreen = ({ route, navigation }) => {

  const { type,item } = route.params;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [userdata, setUserData] = useState(null);
  const [results, setResults] = useState(null);
  const [userid, setuserid] = useState(null);
  const [selectedLocationId, setSelectedLocationId] = useState(' ');

  
  const {
    detailCusinItemStateLoading,
    detailCusinItemStateResponse,
    detailCusinItemStateError,
  } = useSelector(state => state.detailCusinItemReducer);



  const {
    getAddCartItemResponse,
    getAddCartItemError,
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



    const {
        isTodaySpecialitiesLoading,
        getTodaySpecialitiesResponse,
        getTodaySpecialitiesError,
      } = useSelector(state => state.getTodaySpecialitiesReducer);


  useEffect(() => {
    if (isFocused) {

      getLocationFromAsync();
    }


  }, [isFocused]);

  useEffect(() => {

    return () => {
      // dispatch(getTodaySpecialitiesReset());
      // dispatch(getOurBrandsReset());
     
    };
  }, []);
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
      setSelectedLocationId(loc.store_id);
      if(type  == "Today Specials"){
        var request = {
          "location_id":loc.store_id,
          "limit_num":""
      }
        dispatch(getTodaySpecialitiesRequest(request));
        
      }else if (type == "Cuisine"){
        

        var request = {
          "cuisine_id":item.cuisine_id,
          "location_id":loc.store_id
      }

        dispatch(detailCusinItemRequest(request));


      }
     

    }

  };


  useEffect(() => {



    if (detailCusinItemStateResponse) {
      if (detailCusinItemStateResponse.status) {

      

        const arrWithColor = (detailCusinItemStateResponse.data).map(object => {
          return Object.assign(object, { iscart: false });
        });
        

        setResults(arrWithColor);
        console.log('in our brands detailsssmurali response, ', detailCusinItemStateResponse);
      } else {
        setResults([]);
        // Alert.alert('HungyBingy', JSON.stringify(getOurBrandsResponse.message));
      }
    } else if (detailCusinItemStateError) {
      Alert.alert('HungyBingy', JSON.stringify(detailCusinItemStateError.message));
    }
  }, [detailCusinItemStateResponse, detailCusinItemStateError]);


  useEffect(() => {



    if (getOurBrandsDetailsResponse) {
      if (getOurBrandsDetailsResponse.status) {

      

        const arrWithColor = (getOurBrandsDetailsResponse.data).map(object => {
          return Object.assign(object, { iscart: false });
        });
        

        setResults(arrWithColor);
        console.log('in our brands detailsssmurali response, ', getOurBrandsDetailsResponse);
      } else {
        setResults([]);
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

  const updateLocation = async () => {
    console.log("+++++++++ddddddd+++++++++++++")

    let location = await AsyncStorageManager.localStorage.retrieveData(
      LOCAL_KEYS.SELECTED_LOCATION,
    );
    if (location) {
      var loc = JSON.parse(location)
      loc.kitchen_status = "0"

      AsyncStorageManager.localStorage.storeData(
        LOCAL_KEYS.SELECTED_LOCATION,
        JSON.stringify(loc)
      );

    
      navigation.replace(SCREEN_NAME.TABS_SCREEN);
      // setSelectedLocation(loc.store_area);
      // setSelectedLocationId(loc.store_id);

      // if(loc.kitchen_status == "0"){
    }


  }
  useEffect(() => {

    if (getAddCartItemResponse) {
      if (getAddCartItemResponse.status) {
        console.log('in our carts add response, ', getAddCartItemResponse);
      } else {

        if (getAddCartItemResponse.message == "Kitchen Closed") {

         
          updateLocation();


        }
        // Alert.alert('HungyBingy', JSON.stringify(getOurBrandsResponse.message));
      }
    } else if (getAddCartItemError) {
      Alert.alert('HungyBingy', JSON.stringify(getAddCartItemError.message));
    }
  }, [getAddCartItemResponse, getAddCartItemError]);


  useEffect(() => {
    if (getTodaySpecialitiesResponse) {
      if (getTodaySpecialitiesResponse.status) {

        const arrWithColor = (getTodaySpecialitiesResponse.Data
        ).map(object => {
          return Object.assign(object, { iscart: false });
        });


        setResults(arrWithColor);
        console.log('in our brands response, ', getTodaySpecialitiesResponse);
      } else {
        // Alert.alert(
        //   'HungyBingy',
        //   JSON.stringify(getTodaySpecialitiesResponse.message),
        // );
      }
    } else if (getTodaySpecialitiesError) {
      Alert.alert(
        'HungyBingy',
        JSON.stringify(getTodaySpecialitiesError.message),
      );
    }
  }, [getTodaySpecialitiesResponse, getTodaySpecialitiesError]);

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
        navigation.navigate(SCREEN_NAME.ItemDetailsScreen,item);

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
          numberOfLines={2} ellipsizeMode='tail'
            style={{
              marginTop: 5,
              color: Colors.black,
              fontSize: 13,
              height:30,
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
              margin: 10,
              height:50,

              // minHeight: height / 4,


            }}

            onPress={() => {




              var datap = item;

              if (datap.iscart == false) {
                var mainresults = [];

                results.forEach((element) => {
                  var datass = element;

                  if (datass.item_id == datap.item_id) {

                    datass.iscart = true

                  }

                  mainresults.push(datass);





                })

                setResults(mainresults)

                dispatch(addCartItemRequest({
                  "location_id": selectedLocationId,
                  "user_id":userid,
                  "item_id":datap.item_id,
                  "qty":"1",
                  "amount":datap.item_price
              }));


                



              } else {
                navigation.navigate(SCREEN_NAME.CartScreen, item);
              }


            }}

          >
            <View style={styles.addbtn}>
              <Text style={styles.saddubTitle}>{item.iscart ? "GO to cart" : "Add to cart"}</Text>

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
        }} title={type=="Cuisine"?item.cuisine_name:type} headerBgColor={'black'} />
      {/* body */}
      <View style={{ flex: 1, flexDirection: 'column' }}>
        
        <View style={styles.bottomView}>
          

          <View style={styles.bottomViewList}>
            {results && results.length > 0 && (

              <View>


                <FlatList
                  columnWrapperStyle={{

                  }}

                  data={results ?? []}
                  keyExtractor={(item, index) => index + ''}

                  numColumns={2}
                  decelerationRate={'normal'}
                  scrollEventThrottle={16}
                  renderItem={renderOurBrandItem}
                  style={{ marginTop: 5 }}
                />
              </View>
            )}




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
    alignItems: "center",


  },
  topView: {
    flex: 1,
    backgroundColor: Colors.orange,

  },
  bottomView: {
    flex: 1,

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

export default ItemsScreen;
