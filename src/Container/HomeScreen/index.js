import React, { useEffect, useState } from 'react';

import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  FlatList,
  Animated,
  Dimensions,
  TouchableOpacity,
  Alert,
  
} from 'react-native';
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
const {width: screenWidth} = Dimensions.get('window');
import Carousel , { ParallaxImage }  from 'react-native-snap-carousel';
import { Button } from 'native-base';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../utils/colors';
import { logoBg, logoIcon, sideMenuIcon } from '../../utils/images';
import { SCREEN_NAME } from '../../Navigator';
import AsyncStorageManager, { LOCAL_KEYS } from '../../utils/AsyncStorageManager';
import { ScalingDot } from 'react-native-animated-pagination-dots';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader';
import { useIsFocused } from '@react-navigation/native';
import {
  getMobileAppSlidersRequest,
  getMobileAppSlidersReset,
} from '../../redux/get-mobile-app-sliders/GetMobileAppSlidersAction';
import {
  getOurBrandsRequest,
  getOurBrandsReset,
} from '../../redux/get-our-brands/GetOurBrandsAction';
import {
  getTodaySpecialitiesRequest,
  getTodaySpecialitiesReset,
} from '../../redux/get-today-specialities/GetTodaySpecialitiesAction';
import {
  getPopularCuisinesRequest,
  getPopularCuisinesReset,
} from '../../redux/get-popular-cuisines/GetPopularCuisinesAction';


import { storeAddressUsersRequest } from '../../redux/store-address-users/StoreAddressUsersAction';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const { width, height } = Dimensions.get('window');


import { addCartItemResponse, addCartItemReset, addCartItemRequest } from '../../redux/add-cart-item/AddCartItemAction';

import { getCartItemRequest, getCartItemReset, getCartItemsResponse } from '../../redux/get-cart-items/GetCartItemAction';

const HomeScreen = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const [user, setUser] = useState(' ');
  const [selectedLocation, setSelectedLocation] = useState(' ');
  const [selectedLocationId, setSelectedLocationId] = useState(' ');
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [results, setResults] = useState(null);
  const [userid, setuserid] = useState(null);
  const dispatch = useDispatch();
  const [closed, setClosed] = useState(false);

  const {
 
    getAddCartItemResponse,
    getAddCartItemError,
  } = useSelector(state => state.defaultAddCartItemReducer);


  const {
    isGetCartItemLoading,
    getCartItemResponse,
    getACartItemError,
  } = useSelector(state => state.getCartItemReducer);



  const {
    isMobileAppSlidersLoading,
    getMobileAppSlidersResponse,
    getMobileAppSlidersError,
  } = useSelector(state => state.getMobileAppSlidersReducer);

  const { isOurBrandsLoading, getOurBrandsResponse, getOurBrandsError } =
    useSelector(state => state.getOurBrandsReducer);

  const {
    isTodaySpecialitiesLoading,
    getTodaySpecialitiesResponse,
    getTodaySpecialitiesError,
  } = useSelector(state => state.getTodaySpecialitiesReducer);

  const {
    isPopularCuisinesLoading,
    getPopularCuisinesResponse,
    getPopularCuisinesError,
  } = useSelector(state => state.getPopularCuisinesReducer);


  const {
   
  storeAddressUsersStateLoading,
  storeAddressUsersStateResponse,
  storeAddressUsersStateError,
  } = useSelector(state => state.storeAddressUserReducer);






  useEffect(() => {

   
    if (isFocused) {
      dispatch(addCartItemReset());
    checkstore()
    }


  }, [isFocused]);

  const checkstore = async () => {
    
      let location = await AsyncStorageManager.localStorage.retrieveData(
        LOCAL_KEYS.SELECTED_LOCATION,
      );
      if (location) {
        var loc = JSON.parse(location)
       
        setSelectedLocation(loc.store_area);
        setSelectedLocationId(loc.store_id);

        if(loc.kitchen_status == "0"){
          dispatch(storeAddressUsersRequest("0"));
          
          let UserData = await AsyncStorageManager.localStorage.retrieveData(
            LOCAL_KEYS.USER_DATA,
          );
          if (UserData != undefined && UserData) {
            var dataUser = JSON.parse(UserData);
            setUser(dataUser && 'data' in dataUser ? dataUser["data"]["full_name"] : "");
           
            setuserid(dataUser && 'data' in dataUser ? dataUser["data"]["user_id"] : "");
      
           
      
          }
          dispatch(getMobileAppSlidersRequest());
        }else{
          dispatch(storeAddressUsersRequest("1"));
         
          getLocationFromAsync();

        }
       
      

      }

     
    
    
  };
  useEffect(() => {

    return () => {
      setClosed(true);
      dispatch(addCartItemReset());
      dispatch(getMobileAppSlidersReset());
      dispatch(getOurBrandsReset());
      dispatch(getTodaySpecialitiesReset());
      dispatch(getPopularCuisinesReset());
    };
  }, []);

  const getLocationFromAsync = async () => {

    debugger

    let UserData = await AsyncStorageManager.localStorage.retrieveData(
      LOCAL_KEYS.USER_DATA,
    );
    if (UserData != undefined && UserData) {
      var dataUser = JSON.parse(UserData);
      setUser(dataUser && 'data' in dataUser ? dataUser["data"]["full_name"] : "");
     
      setuserid(dataUser && 'data' in dataUser ? dataUser["data"]["user_id"] : "");

      dispatch(getCartItemRequest({
        "user_id": dataUser && 'data' in dataUser ? dataUser["data"]["user_id"] : "",
        "location_id":selectedLocationId,
      }));

    }
    let location = await AsyncStorageManager.localStorage.retrieveData(
      LOCAL_KEYS.SELECTED_LOCATION,
    );

    if (location) {
      var loc = JSON.parse(location)
      setSelectedLocation(loc.store_area);
      setSelectedLocationId(loc.store_id);
      dispatch(getMobileAppSlidersRequest());


      var request = {
        "location_id":loc.store_id,
        "limit_num":"5"
    }

    
      dispatch(getOurBrandsRequest(request));
      dispatch(getTodaySpecialitiesRequest(request));
      dispatch(getPopularCuisinesRequest(request));
    }

  };

  useEffect(() => {

    

    if (storeAddressUsersStateResponse == "0") {
      setClosed(true)
      
      
    } else  {
      setClosed(false)
    // Alert.alert('HungyBingy', JSON.stringify(getACartItemError.message));
    }
  }, [storeAddressUsersStateResponse, storeAddressUsersStateError]);

  useEffect(() => {

    if (getCartItemResponse) {
      if (getCartItemResponse.status) {


       
        console.log('cart items response, ', getCartItemResponse);
      } else {
        //  Alert.alert('HungyBingy', JSON.stringify(getCartItemResponse.message));
      }
    } else if (getACartItemError) {
    // Alert.alert('HungyBingy', JSON.stringify(getACartItemError.message));
    }
  }, [getCartItemResponse, getACartItemError]);

  useEffect(() => {
    if (getMobileAppSlidersResponse) {
      if (getMobileAppSlidersResponse.status) {
        console.log('in sliders response, ', getMobileAppSlidersResponse);
      } else {
        // Alert.alert(
        //   'HungyBingy',
        //   JSON.stringify(getMobileAppSlidersResponse.message),
        // );
      }
    } else if (getMobileAppSlidersError) {
      // Alert.alert(
      //   'HungyBingy',
      //   JSON.stringify(getMobileAppSlidersError.message),
      // );
    }
  }, [getMobileAppSlidersResponse, getMobileAppSlidersError]);

  useEffect(() => {
    
    if (getOurBrandsResponse) {
      if (getOurBrandsResponse.status) {
        console.log('in our brands response, ', getOurBrandsResponse);
      } else {
        // Alert.alert('HungyBingy', JSON.stringify(getOurBrandsResponse.message));
      }
    } else if (getOurBrandsError) {
      // Alert.alert('HungyBingy', JSON.stringify(getOurBrandsError.message));
    }
  }, [getOurBrandsResponse, getOurBrandsError]);

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
        setResults([])
        // Alert.alert(
        //   'HungyBingy',
        //   JSON.stringify(getTodaySpecialitiesResponse.message),
        // );
      }
    } else if (getTodaySpecialitiesError) {
      setResults([])
      // Alert.alert(
      //   'HungyBingy',
      //   JSON.stringify(getTodaySpecialitiesError.message),
      // );
    }
  }, [getTodaySpecialitiesResponse, getTodaySpecialitiesError]);

  useEffect(() => {
    if (getPopularCuisinesResponse) {
      
      if (getPopularCuisinesResponse.status) {
        console.log('in our cuisines response, ', getPopularCuisinesResponse);
      } else {
        // Alert.alert(
        //   'HungyBingy',
        //   JSON.stringify(getPopularCuisinesResponse.message),
        // );
      }
    } else if (getPopularCuisinesError) {
      // Alert.alert(
      //   'HungyBingy',
      //   JSON.stringify(getPopularCuisinesError.message),
      // );
    }
  }, [getPopularCuisinesResponse, getPopularCuisinesError]);


  const updateLocation = async () => {


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
      
    checkstore();
      // setSelectedLocation(loc.store_area);
      // setSelectedLocationId(loc.store_id);

      // if(loc.kitchen_status == "0"){
    }


  }
  useEffect(() => {

    console.log(getAddCartItemResponse)

    const checkResponse = async () => {
      if (getAddCartItemResponse) {
        if (getAddCartItemResponse.status) {
  
          dispatch(getCartItemRequest({
            "user_id": userid,
            "location_id":selectedLocationId,
          }));
  
          console.log('in our carts add response, ', addCartItemResponse);
        } else {
          
          if(getAddCartItemResponse.message == "Kitchen Closed"){

            console.log("kit closssssed")

            updateLocation();
            
  
          }
          // Alert.alert('HungyBingy', JSON.stringify(getOurBrandsResponse.message));
        }
      } else if (getAddCartItemError) {
        // Alert.alert('HungyBingy', JSON.stringify(getAddCartItemError.message));
      }

    }

    
    checkResponse();

    
  }, [getAddCartItemResponse, getAddCartItemError]);






    
    const renderSliderItem = ({ item, index }) => (
      <View>{item.image ? <Image
        resizeMode="contain"
        style={{
          width: width - 40,
          height: 150,
        }}
        source={{
          uri: item.image,
        }}
      /> : null}</View>
    );

 

  const renderOurBrandItem = ({ item, index }) => (
    <TouchableOpacity


      onPress={() => {
        navigation.navigate(SCREEN_NAME.BrandDetails, item);
      }}

    >
      <View
        style={{
          width: 150,
          // minHeight: height / 4,
          marginRight: 20,
        }}>
        <View
          style={{
            width: 150,
            height: height / 3.7,
            backgroundColor: 'white',
            borderRadius: 15,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
          <View>{item.item_image_path ? <Image
            style={{ height: 123 }}
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
            {item.brand_name}
          </Text>
          <Text
            numberOfLines={2} ellipsizeMode='tail'
            style={{
              color: Colors.black,
              fontSize: 8,
              fontWeight: '400',
            }}>
            {item.brand_content}
          </Text>
          <Text style={{ color: 'red', fontSize: 16, fontWeight: '500' }}>
            ₹250.00
          </Text>
        </View>

        <View>{item.brand_file_url ? <Image
          style={{
            width: 60,
            height: 60,
            marginTop: -30,
            backgroundColor: Colors.white,
            alignSelf: 'flex-end',
            marginRight: 5,
            borderRadius: 60,
          }}
          resizeMode="contain"
          source={{
            uri: item.brand_file_url,
          }}
        /> : null}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTodaySpecialsItem = ({ item, index }) => (
    <TouchableOpacity
                
   

   

      // minHeight: height / 4,




    onPress={() => {

      navigation.navigate(SCREEN_NAME.ItemDetailsScreen,item);

   
      // navigation.navigate(SCREEN_NAME.BrandDetails,item);
    }}>
    <View
      style={{
        width: 130,
        minHeight: height / 4.5,
        backgroundColor: 'white',
        borderRadius: 25,
        paddingHorizontal: 5,
        paddingTop: 5,
        paddingBottom: 10,
        marginRight: 20,
      }}>
      <View>{item.item_image_path ? <Image
        style={{
          height: 80,
          backgroundColor: 'red',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        resizeMode="contain"
        source={{
          uri: item.item_image_path,
        }}
      /> : null}
      </View>
      <Text
       numberOfLines={1} ellipsizeMode='tail'
        style={{
          marginTop: 5,
          color: Colors.black,
          fontSize: 14,
          fontWeight: '400',
          paddingHorizontal: 5,
        }}>
        {item.item_name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 5,
          marginTop: 5,
        }}>
        <MaterialIcons
          name="location-pin"
          size={12}
          color={'#32B768'}
          style={{ alignSelf: 'center' }}
        />
        <Text
          style={{
            color: Colors.txtGreyColor,
            fontSize: 8,
            fontWeight: '400',
            marginLeft: 2,
          }}>
          {selectedLocation}
        </Text>
      </View>

      <Text
        style={{
          color: Colors.black,
          fontSize: 16,
          fontWeight: '500',
          paddingHorizontal: 5,
          marginTop: 5,
        }}>
        {`₹${item.item_price}`}
      </Text>

      <TouchableOpacity
        style={{





          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 15,
          paddingVertical: 10,
          borderRadius: 10,
          flex: 1,
          margin: 10

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
              "user_id": userid,
              "item_id": datap.item_id,
              "location_id":selectedLocationId,
              "qty": "1",
              "amount": datap.item_price
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
    </TouchableOpacity>
  );

  const renderPopularCuisinesItem = ({ item, index }) => (
    <TouchableOpacity
                
   

   

      // minHeight: height / 4,




    onPress={() => {

      navigation.navigate(SCREEN_NAME.ItemsScreen,{type:"Cuisine",item:item});

   
      // navigation.navigate(SCREEN_NAME.BrandDetails,item);
    }}

  >
    <View
      style={{
        marginRight: 20,
      }}>
      <View>{item.cuisine_file_url ? <Image
        style={{
          width: 80,
          height: 80,
          backgroundColor: 'red',
          borderRadius: 80,
        }}
        resizeMode="contain"
        source={{
          uri: item.cuisine_file_url,
        }}
      /> : null}
      </View>
      <Text
        style={{
          marginTop: 7,
          color: Colors.white,
          fontSize: 12,
          fontWeight: '400',
          paddingHorizontal: 5,
          alignSelf: 'center',
          textAlign: 'center',
        }}>
        {item.cuisine_name}
      </Text>
    </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(SCREEN_NAME.MORE);
          }}>
          <Image source={sideMenuIcon} />
        </TouchableOpacity>
        <Text
          style={{
            color: Colors.white,
            flex: 1,
            marginHorizontal: 20,
            fontSize: 20,
            fontWeight: '400',
          }}>
          {"Welcome" + " " + user}
        </Text>

        <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5}
          onPress={() => {
            navigation.navigate(SCREEN_NAME.SET_LOCATION_SCREEN);
          }}
        >

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text
              style={{
                color: Colors.txtGreyColor,



              }}>
              {selectedLocation}
            </Text>

            <MaterialIcons
              name="keyboard-arrow-down"
              size={22}
              color={'red'}
              style={{ alignSelf: 'center', marginLeft: 5 }}
            />
          </View>
        </TouchableOpacity>

      </View>

      {/* body */}
      <ScrollView
        style={{ marginBottom: 150, marginTop: 20 }}
        contentContainerStyle={{ flexGrow: 1 }}>
       <View style={{ flex: 1 }}>
          {/* sliders */}
          {getMobileAppSlidersResponse &&
            getMobileAppSlidersResponse.Data?.length > 0 && (
              <View
                style={{
                  height: 200,
                  marginHorizontal: 0,
                  marginBottom: 2,
                  marginTop: 20,
                }}>
                <FlatList
                  data={getMobileAppSlidersResponse?.Data ?? []}
                  keyExtractor={(item, index) => index + ''}
                  showsHorizontalScrollIndicator={false}
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                      useNativeDriver: false,
                    },
                  )}
                  pagingEnabled
                  horizontal
                  decelerationRate={'normal'}
                  scrollEventThrottle={16}
                  renderItem={renderSliderItem}
                />
                {/* <Carousel

          data={getMobileAppSlidersResponse?.Data ?? []}
          renderItem={renderSliderItem}
          sliderWidth={SLIDER_WIDTH}
       
      
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={1}
          activeSlideAlignment="start"
          hasParallaxImages={true}
          // onSnapToItem={(index) => this.setState({ index })}
          // scrollInterpolator={scrollInterpolator}
          // slideInterpolatedStyle={animatedStyles}
            
        /> */}

                <ScalingDot
                  data={getMobileAppSlidersResponse?.Data ?? []}
                  scrollX={scrollX}
                  inActiveDotOpacity={0.3}
                  dotSize={10}
                  activeDotColor={Colors.red}
                  inActiveDotColor={Colors.red}
                  dotContainerStyle={{
                    bottom: 0,
                  }}
                  style={{ backgroundColor: 'red' }}
                />
              </View>
            )}

          {/* our brands */}
          {closed == false?<View>
          {getOurBrandsResponse && getOurBrandsResponse.Data?.length > 0 && (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 10,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    flex: 1,
                    fontSize: 16,
                    fontWeight: '400',
                  }}>
                  Our Brandss
                </Text>

                <TouchableOpacity


                  onPress={() => {

                    navigation.navigate(SCREEN_NAME.Brands,{type:"All Brands"});
                  }}

                >

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        color: Colors.txtGreyColor,
                        fontSize: 10,
                        fontWeight: '400',
                      }}>
                      {`See All`}
                    </Text>

                    <MaterialIcons
                      name="arrow-right"
                      size={22}
                      color={Colors.white}
                      style={{ alignSelf: 'center', marginLeft: 5 }}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <FlatList
                data={getOurBrandsResponse?.Data ?? []}
                keyExtractor={(item, index) => index + ''}
                showsHorizontalScrollIndicator={false}
                horizontal
                decelerationRate={'normal'}
                scrollEventThrottle={16}
                renderItem={renderOurBrandItem}
                style={{ marginTop: 5 }}
              />
            </View>
          )}

          {/* today specials */}
          {results &&
            results.length > 0 && (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    marginBottom: 10,
                    alignItems: 'center',
                    height: 'auto',
                  }}>
                  <Text
                    style={{
                      color: 'red',
                      flex: 1,
                      fontSize: 16,
                      fontWeight: '400',
                    }}>
                    {'Today Specials\n'}
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: 10,
                        fontWeight: '400',
                      }}>
                      Best of the today food list update
                    </Text>
                  </Text>

                  <TouchableOpacity

                    onPress={() => {

                      navigation.navigate(SCREEN_NAME.ItemsScreen,{type:"Today Specials",rand_name:"none", item_image_path:"", brand_content:"test", brand_id:16 });


                      
                    
                    }}

                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          color: Colors.txtGreyColor,
                          fontSize: 10,
                          fontWeight: '400',
                        }}>
                        {`See All`}
                      </Text>

                      <MaterialIcons
                        name="arrow-right"
                        size={22}
                        color={Colors.white}
                        style={{ alignSelf: 'center', marginLeft: 5 }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={results ?? []}
                  keyExtractor={(item, index) => index + ''}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  decelerationRate={'normal'}
                  scrollEventThrottle={16}
                  renderItem={renderTodaySpecialsItem}
                  style={{ marginTop: 5 }}
                />
              </View>
            )}

          {/* popular cuisines */}
          {getPopularCuisinesResponse &&
            getPopularCuisinesResponse.Data?.length > 0 && (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 15,
                    marginBottom: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: Colors.white,
                      flex: 1,
                      fontSize: 16,
                      fontWeight: '400',
                    }}>
                    Popular Cuisines
                  </Text>

                  <TouchableOpacity
                   onPress={() => {

                    navigation.navigate(SCREEN_NAME.Brands,{type:"Cuisines"});
                    }}
                  
                  >
                 
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          color: Colors.txtGreyColor,
                          fontSize: 10,
                          fontWeight: '400',
                        }}>
                        {`See All`}
                      </Text>

                      <MaterialIcons
                        name="arrow-right"
                        size={22}
                        color={Colors.white}
                        style={{ alignSelf: 'center', marginLeft: 5 }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={getPopularCuisinesResponse?.Data ?? []}
                  keyExtractor={(item, index) => index + ''}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  decelerationRate={'normal'}
                  scrollEventThrottle={16}
                  renderItem={renderPopularCuisinesItem}
                  style={{ marginTop: 5 }}
                />
              </View>
            )}
            </View>:
            <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignContent:"center",alignItems:"center"}}>
              <Image
            resizeMode={'cover'}
            width={width}
            height={height / 2}


            source={require('../../assets/images/shop_closed.png')}
          />
          <Text style={{ color: "#FF1300", height: 50,fontSize: 26,marginTop:10 }}>{"Kitchen is Currently Closed"}</Text>
              <Text style={{color:"white",paddingHorizontal:50,textAlign:"center"}}>Sorry for the inconvience ! Please check-in after some time for your favourite tasty items.</Text>
            </View>}
        </View>
      </ScrollView>

      {(isMobileAppSlidersLoading ||
        isOurBrandsLoading ||
        isTodaySpecialitiesLoading ||
        isPopularCuisinesLoading || isGetCartItemLoading) && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: screenWidth ,
    height: screenWidth,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: 'lightblue',
    marginBottom: Platform.select({ ios: 0, android: 1 }),
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  carouselContainer: {
    marginTop: 50
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue'
  },
  itemLabel: {
    color: 'white',
    fontSize: 24
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: 20,
  },
  saddubTitle: {




    fontSize: 15,
    fontWeight: "bold",
    color: "white",


  },
});

export default HomeScreen;
