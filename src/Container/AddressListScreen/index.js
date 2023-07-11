import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,

  TouchableOpacity,
  Alert,
  FlatList,
  Dimensions
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

import { Colors } from '../../utils/colors';
import { SCREEN_NAME } from '../../Navigator';
import AsyncStorageManager, { LOCAL_KEYS } from '../../utils/AsyncStorageManager';
import Header from '../../components/header';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');


import Loader from '../../components/loader';
import { addCartItemRequest, addCartItemReset } from '../../redux/add-cart-item/AddCartItemAction';
import { addressCartItemRequest } from '../../redux/address-cart-item/AddressCartItemAction';
import { createCartItemRequest, createCartItemReset } from '../../redux/create-cart-item/CreateCartItemAction';
import { purchaseCartItemRequest, purchaseCartItemReset } from '../../redux/purchase-cart-item/PurchaseCartItemAction';
import { addAddressUsersRequest, addAddressUsersReset } from '../../redux/add-address-users/AddAddressUsersAction';
import { deleteAddressUsersRequest,deleteAddressUsersReset } from '../../redux/delete-address-users/DeleteAddressUsersAction';
import { updateAddressUsersRequest,updateAddressUsersReset } from '../../redux/update-address-users/UpdateAddressUsersAction';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const AddressScreen = ({ route, navigation }) => {
  const { type, order ,from , addressType} = route.params;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [userdata, setUserData] = useState(null);
  const [check, uncheck] = useState(false);
  const [results, setResults] = useState(null);
  const [selAddress, setSelAddress] = useState(null);
  const [user, setuser] = useState(null);
  const [profile, setProfile] = useState(null);
  const {
    purchaseCartItemStateLoading,
    purchaseCartItemStateResponse,
    purchaseCartItemStateError,
  } = useSelector(state => state.purchaseCartItemReducer);


  const {
    addressCartItemStateLoading,
    addressCartItemStateResponse,
    addressCartItemStateError,
  } = useSelector(state => state.addressCartItemReducer);

  const {
    createCartItemStateLoading,
    createCartItemStateResponse,
    createCartItemStateError,
  } = useSelector(state => state.createCartItemReducer);


  const {
    isLoginLoading,
    mobileLoginResponse,
    mobileLoginError,
  } = useSelector(state => state.mobileLoginReducer);


  const {
    isPopularCuisinesLoading,
    getPopularCuisinesResponse,
    getPopularCuisinesError,
  } = useSelector(state => state.getPopularCuisinesReducer);



  const {
    deleteAddressUsersStateLoading,
    deleteAddressUsersStateResponse,
    deleteAddressUsersStateError,
  } = useSelector(state => state.deleteAddressUserReducer);


  const { isOurBrandsLoading, getOurBrandsResponse, getOurBrandsError } =
    useSelector(state => state.getOurBrandsReducer);

  useEffect(() => {



    return () => {

      dispatch(createCartItemReset());
      dispatch(purchaseCartItemReset());
      dispatch(addAddressUsersReset());


    };


  }, []);

  useEffect(() => {

    if (isFocused) {
      dispatch(addAddressUsersReset());
      dispatch(createCartItemReset());
      dispatch(purchaseCartItemReset());
      dispatch(updateAddressUsersReset());

      getUserDate();
    }


  }, [isFocused]);

  useEffect(() => {

    if (deleteAddressUsersStateResponse) {
      if (deleteAddressUsersStateResponse.status) {


        console.log('delete addess, ', deleteAddressUsersStateResponse);
        dispatch(addressCartItemRequest({
          "user_id": user
        }))

      } else {
      }
    } else if (deleteAddressUsersStateError) {
      
     
    }
  }, [deleteAddressUsersStateResponse, deleteAddressUsersStateError]);

  useEffect(() => {

    if (purchaseCartItemStateResponse) {
      if (purchaseCartItemStateResponse.status) {


        console.log('purchaseCartItemStateResponse, ', purchaseCartItemStateResponse);
        // navigation.replace(SCREEN_NAME.TABS_SCREEN);
    
      ;

        Alert.alert('Hungy Bingy', JSON.stringify(purchaseCartItemStateResponse.message?? "Order Completed") , [
         
          {text: 'OK', onPress: () =>   navigation.replace(SCREEN_NAME.TABS_SCREEN)},
        ]);







      } else {
        console.log('error, ', purchaseCartItemStateResponse);
        Alert.alert('HungyBingy', JSON.stringify(purchaseCartItemStateResponse));
      }
    } else if (purchaseCartItemStateError) {
      console.log('error, ', purchaseCartItemStateError);
      
     Alert.alert('Hungy Bingy', JSON.stringify("Error found"));
      // ;
    }
  }, [purchaseCartItemStateResponse, purchaseCartItemStateError]);

  useEffect(() => {


    if (createCartItemStateResponse) {

      debugger

      if (createCartItemStateResponse.status) {

        var key = ""
        if ("data" in createCartItemStateResponse) {
          key = createCartItemStateResponse.data.order_key
        } else {
          key = createCartItemStateResponse.order_key
        }

        var orderid = ""

        if ("data" in createCartItemStateResponse) {
          orderid = createCartItemStateResponse.data.order_id
        } else {
          orderid = createCartItemStateResponse.order_id
        }


if(key.length>0){

        var options = {
          description: 'Creditss towards consultation',
          image: 'https://i.imgur.com/3g7nmJC.jpg',
          currency: 'INR',
          key: 'rzp_test_u5NSepkPmborMK',
          amount: order.order_amount ?? "",
          name: 'Hungy Bingy',
          order_id: key,//Replace this with an order_id created using Orders API.
          prefill: {
            email: profile.email ?? "",
            contact: profile.mobile_number ?? "",
            name: profile.full_name ?? "",
          },
          theme: { color: '#FC6011' }
        }
        RazorpayCheckout.open(options).then((data) => {
          
          // handle success
          //alert(`Success: ${data.razorpay_payment_id}`);

          var datapur = {

            "user_id": user,
            "order_id": orderid,
            "transactionID": data.razorpay_payment_id,
            "transactionAmount": order.order_amount ?? "",
            "transactionMode": "UPI",
            "transactionStatus": "true"
          }

          dispatch(purchaseCartItemRequest(datapur))


        }).catch((error) => {

         



          Alert.alert('Hungy Bingy', error.error.description ?? "Error found" , [
         
            {text: 'OK', onPress: () =>{}},
          ]);
  
          // navigation.replace(SCREEN_NAME.TABS_SCREEN);
          // handle failure

        });
      }else{


        var datapur = {

          "user_id": user,
          "order_id": orderid,
          "transactionID": "COD",
          "transactionAmount": order.order_amount ?? "",
          "transactionMode": "COD",
          "transactionStatus": "true"
        }

        dispatch(purchaseCartItemRequest(datapur))



      }






        console.log('in our create cart order response, ', createCartItemStateResponse);










      } else {
        // Alert.alert('HungyBingy', JSON.stringify(getOurBrandsResponse.message));
      }
    } else if (createCartItemStateError) {
      // Alert.alert('createc error', JSON.stringify(createCartItemStateError.message));
    }
  }, [createCartItemStateResponse, createCartItemStateError]);

  useEffect(() => {

    if (addressCartItemStateResponse) {
      if (addressCartItemStateResponse.status) {
        console.log('in our address response, ', addressCartItemStateResponse);

        

        const arrWithColor = (addressCartItemStateResponse.data).map((object, index) => {



          return Object.assign(object, { isadd: index == 0 ? true : false });
        });

        setSelAddress(arrWithColor[0].addr_id)


        setResults(arrWithColor);






      } else {
        // Alert.alert('HungyBingy', JSON.stringify(getOurBrandsResponse.message));
      }
    } else if (addressCartItemStateError) {

      if (addressCartItemStateError == "Request failed with status code 404") {

        addCartItemReset();


      }

    }
  }, [addressCartItemStateResponse, addressCartItemStateError]);

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

  getUserDate = async () => {


    let UserData = await AsyncStorageManager.localStorage.retrieveData(
      LOCAL_KEYS.USER_DATA,
    );
    if (UserData != undefined && UserData) {
      setUserData(JSON.parse(UserData));

      var dataUser = JSON.parse(UserData);
      setProfile(dataUser.data);

      setuser(dataUser.data.user_id);


      dispatch(addressCartItemRequest({
        "user_id": dataUser.data.user_id
      }))

    }
    let location = await AsyncStorageManager.localStorage.retrieveData(
      LOCAL_KEYS.SELECTED_LOCATION,
    );

    if (location) {
      var loc = JSON.parse(location)

      var request = {
        "location_id": loc.store_id,
        "limit_num": ""
      }


      // if(type == "All Brands"){



      //   dispatch(getOurBrandsRequest(request));

      // }else{
      //   dispatch(getPopularCuisinesRequest(request));
      // }



    }

  }
  useEffect(() => {

    console.log(mobileLoginResponse);


  }, [mobileLoginResponse]);

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );


  const renderOurCusinItem = ({ item, index }) => (





    <View

      style={{

        justifyContent: "center",

        alignContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 10,



        // minHeight: height / 4,


      }}



    >
      <View style={styles.mainCard}>
        <View style={styles.innercard}>

          <View style={styles.innercardtop}>

            <Text style={{ flex: 3, color: "white", fontSize: 18, fontWeight: "bold", color: "#FC6011" }} >{item.name}</Text>
            <View style={{
              flex: 1, justifyContent: "flex-end",

              alignContent: "center",
              alignItems: "flex-end"
            }}>
             {from=="cart" && <TouchableOpacity
                style={{

                  justifyContent: "center",

                  alignContent: "center",
                  alignItems: "center",



                  // minHeight: height / 4,


                }}

                onPress={() => {




                  var datap = item;

                  if (datap.isadd == false) {
                    var mainresults = [];

                    results.forEach((element) => {
                      var datass = element;
                      datass.isadd = false
                      if (datass.addr_id == datap.addr_id) {
                        setSelAddress(datap.addr_id)
                        datass.isadd = true

                      }

                      mainresults.push(datass);





                    })

                    setResults(mainresults)












                    // setBing(!bing)

                  }
                }}

              >
                {/* <Image
                      resizeMode={'cover'}
                      style={styles.tinyLogo}
                      source={!item.isadd ? require('../../assets/images/uncheck.png') : require('../../assets/images/check.png')}
                    /> */}

                <MaterialIcons
                  name={!item.isadd ? "radio-button-off" : "radio-button-on"}
                  size={32}
                  style={{}}
                  color={'#FFF'}
                />
              </TouchableOpacity>}

            </View>


          </View>
          <View style={styles.innercardbottom}>
            {/* <Text style={styles.values}>{item.locality}</Text> */}
            <Text style={styles.values}>{item.landmark}</Text>
            <Text style={styles.values}>{item.address}</Text>
            <Text style={styles.values}>{item.city}</Text>

            



          </View>
          <View style={{flex:1,paddingTop:10,flexDirection:"row", backgroundColor:"transparent",marginVertical:10,borderBottomLeftRadius:15,borderBottomRightRadius:15}}>
      <View style={{flex:1,alignItems:"flex-start",alignContent:"flex-start",justifyContent:"flex-start",marginLeft:20}}>
      <TouchableOpacity 
      onPress={()=>{
        navigation.navigate(SCREEN_NAME.LocationForm, {address:item,from:"Edit"});
       
             }}
       
      style={{backgroundColor:"#6A6A6A",width:120,height:50,borderRadius:5,justifyContent:"center",alignContent:"center",alignItems:"center"}}><Text style={{color:"white"}}>Edit</Text></TouchableOpacity>
      </View>
      <View style={{flex:1,alignItems:"flex-end",alignContent:"flex-end",justifyContent:"flex-end",marginRight:20}}>

      <TouchableOpacity  onPress={()=>{

       dispatch(deleteAddressUsersRequest({
        "addr_id":item.addr_id,
        "user_id":user
    }))


      }} style={{backgroundColor:"red",width:120,height:50,borderRadius:5,justifyContent:"center",alignContent:"center",alignItems:"center"}}><Text style={{color:"white"}}>Delete</Text></TouchableOpacity>
      </View>
      </View>



        </View>


      </View>

    </View>
  );



  return (
    <View style={styles.container}>
      <Header navigation={navigation}
        imageOnPress={() => {

          navigation.navigate(SCREEN_NAME.LocationForm,  {address:{},from:"Add"});

        }}
        right={"add"}
        onBackPress={() => {
          navigation.goBack();
        }} title={"Address"} headerBgColor={'black'} />
      {/* body */}



      {addressCartItemStateResponse && addressCartItemStateResponse.data?.length > 0 ? (
        <View style={{ flex: 1, flexDirection: 'column' }}>

          <View style={{ flex: 3.5 }}>
            <FlatList



              data={addressCartItemStateResponse?.data ?? []}
              keyExtractor={(item, index) => index + ''}

              numColumns={1}
              decelerationRate={'normal'}
              scrollEventThrottle={16}
              renderItem={renderOurCusinItem}

            />
          </View>
          <View style={{ flex: from=="cart"?0.5:0 }}>
            {from=="cart"&&addressCartItemStateResponse && addressCartItemStateResponse.data?.length > 0 && <TouchableOpacity
              style={{

                justifyContent: "center",

                alignContent: "center",
                alignItems: "center",
                height: 50,
                backgroundColor: "red",
                marginHorizontal: 80,
                borderRadius: 40,
                marginVertical: 10




                // minHeight: height / 4,


              }}

              onPress={() => {

                debugger

                

                var data = order
                data["address_id"] = selAddress;
                dispatch(createCartItemRequest(data));

              }}

              onPress1={() => {








              }}

            >
              <Text style={{ color: "white", fontSize: 14, fontWeight: "bold", marginHorizontal: 5 }}>Purchase Order</Text>

              {/* earncoinPercentage */}

            </TouchableOpacity>}
          </View>


        </View>
      ) : <View>

       {!addressCartItemStateLoading && <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 200, flexDirection: "column" }}>


          <Image
            resizeMode={'cover'}
            width={width}
            height={height / 2}


            source={require('../../assets/images/no-files.png')}
          />
          <Text style={{ color: "#FF1300", height: 50,fontSize: 26 }}>{"No Address Found"}</Text>

          <TouchableOpacity
            style={{

              justifyContent: "center",

              alignContent: "center",
              alignItems: "center",
              height: 50,
              width:300,
              backgroundColor: "red",
              marginHorizontal: 80,
              borderRadius: 40,
              marginVertical:5
        




              // minHeight: height / 4,


            }}

            onPress={() => {

              navigation.navigate(SCREEN_NAME.LocationForm, {address:{},from:"Add"});

            }}

            onPress1={() => {








            }}

          >
            <Text style={{ color: "white", height:30,fontSize: 20 }}>{"Add your Address now!"}</Text>

          </TouchableOpacity>


        </View>}


      </View>}
      {(addressCartItemStateLoading ||
        createCartItemStateLoading ||
        deleteAddressUsersStateLoading ||
        purchaseCartItemStateLoading
      ) && <Loader />}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingBottom: 50,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  mainCard: {
    flex:1,
    flexGrow:0,
    width: width - 20,
    paddingHorizontal: 10,
    paddingVertical:10,
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 1


  },
  innercard: {
    flex: 1,
    flexDirection: "column"

  },
  innercardtop: {
    flex: 1,

    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",



  },
  innercardbottom: {

    flex: 2.8,
    flexDirection: "column"


  },
  tinyLogo: {

  },
  values: {
    color: "white",
    fontSize: 18
  }

});

export default AddressScreen;
