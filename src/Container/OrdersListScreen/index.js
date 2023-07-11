import React, { useEffect, useState } from 'react';
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
import RazorpayCheckout from 'react-native-razorpay';
import { Button, Column } from 'native-base';
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
import { useIsFocused } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
import {
  getOurBrandsRequest,
  getOurBrandsReset,
} from '../../redux/get-our-brands/GetOurBrandsAction';

import {
  getPopularCuisinesRequest,
  getPopularCuisinesReset,
} from '../../redux/get-popular-cuisines/GetPopularCuisinesAction';
import Loader from '../../components/loader';
import { addCartItemRequest, addCartItemReset } from '../../redux/add-cart-item/AddCartItemAction';
import { addressCartItemRequest } from '../../redux/address-cart-item/AddressCartItemAction';
import { createCartItemRequest, createCartItemReset } from '../../redux/create-cart-item/CreateCartItemAction';
import { purchaseCartItemRequest, purchaseCartItemReset } from '../../redux/purchase-cart-item/PurchaseCartItemAction';
import { addAddressUsersRequest, addAddressUsersReset, addAddressUsersResponse } from '../../redux/add-address-users/AddAddressUsersAction';
import { userOrderDetailsRequest,userOrderDetailsReset } from '../../redux/use-order-details/UserOrderDetailsAction';
import { addAddressUsersState } from '../../redux/add-address-users/AddAddressUsersReducer';
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

const OrdersScreen = ({ route, navigation }) => {

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [userdata, setUserData] = useState(null);
  const [check, uncheck] = useState(false);
  const [results, setResults] = useState(null);
  const [selAddress, setSelAddress] = useState(null);
  const [user, setuser] = useState(null);
  const [profile, setProfile] = useState(null);


  const {
    userOrderDetailsStateLoading,
    userOrderDetailsStateResponse,
    userOrderDetailsStateError,
  } = useSelector(state => state.userOrderDetailsReducer);



  const {
    addressCartItemStateLoading,
    addressCartItemStateResponse,
    addressCartItemStateError,
  } = useSelector(state => state.addressCartItemReducer);

  



  const { isOurBrandsLoading, getOurBrandsResponse, getOurBrandsError } =
    useSelector(state => state.getOurBrandsReducer);

  useEffect(() => {



    return () => {

 
      dispatch(addAddressUsersReset());


    };


  }, []);

  useEffect(() => {

    if (isFocused) {

      dispatch(createCartItemReset());


      getUserDate();
    }


  }, [isFocused]);



  useEffect(() => {

    if (userOrderDetailsStateResponse) {
      if (userOrderDetailsStateResponse.status) {
        console.log('in our orders response, ', userOrderDetailsStateResponse);

        

        const arrWithColor = (userOrderDetailsStateResponse.order_history
          ).map((object, index) => {



          return Object.assign(object, { isadd: index == 0 ? true : false });
        });

        setSelAddress(arrWithColor[0].addr_id)


        setResults(arrWithColor);






      } else {
        // Alert.alert('HungyBingy', JSON.stringify(getOurBrandsResponse.message));
      }
    } else if (userOrderDetailsStateError) {

     

    }
  }, [userOrderDetailsStateResponse, userOrderDetailsStateError]);
  
 

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

     

    }
  }, [addressCartItemStateResponse, addressCartItemStateError]);



  getUserDate = async () => {


    let UserData = await AsyncStorageManager.localStorage.retrieveData(
      LOCAL_KEYS.USER_DATA,
    );
    if (UserData != undefined && UserData) {
      setUserData(JSON.parse(UserData));

      var dataUser = JSON.parse(UserData);
      setProfile(dataUser.data);

      setuser(dataUser.data.user_id);


      dispatch(userOrderDetailsRequest({
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


  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );


  const renderOurCusinItem = ({ item, index }) => (





    <View

      style={{

        flex:1,
        flexGrow:1,

         backgroundColor:"white",
         justifyContent: "center",
         alignContent: "center",
        // alignItems: "center",
        flexDirection:"column",
        marginHorizontal: 5,
        marginVertical: 10,
        borderRadius:15,borderRadius:15



        // minHeight: height / 4,


      }}
      



    >

      <View style={{flex:1,flexDirection:"column",paddingVertical:10,backgroundColor:"#008B41",borderTopLeftRadius:15,borderTopRightRadius:15}}>
        <Text style={{paddingHorizontal:20,fontSize:16,fontWeight:"bold",color:"white"}}>Order No #{item.order_id}</Text>
      </View>


 
      {item && (item.items_list).map((orderItem)=>{ return <View style={{flex:1,flexDirection:"row",marginVertical:10, backgroundColor:"white"}}>
      <View style={{flex:1,alignItems:"flex-start",alignContent:"flex-start",justifyContent:"flex-start",marginLeft:20}}>

        
           <Text style={{flex:1}}>{orderItem.item_name??""}x {orderItem.quantity??""}</Text>

        
      
      
      </View>
      <View style={{flex:1,alignItems:"flex-end",alignContent:"flex-end",justifyContent:"flex-start",marginRight:20}}>

      <Text >₹ {orderItem.ite_grand_total??""}</Text>
      </View>

      </View>
      })}


     
     
      <View style={{flex:1,flexDirection:"column",marginHorizontal:20, backgroundColor:"white"}}>
        <Text>{item.created_at}</Text>
      </View>

      <View style={{flex:1,flexDirection:"column",marginHorizontal:20,marginVertical:5, backgroundColor:"white"}}>
        <Text>Earned Coins : {item.earned_coins}</Text>
      </View>

     
      
       <View style={{flex:1,flexDirection:"row", backgroundColor:"white",marginVertical:10,borderBottomLeftRadius:15,borderBottomRightRadius:15}}>
      <View style={{flex:1,alignItems:"flex-start",alignContent:"flex-start",justifyContent:"flex-start",marginLeft:20}}>
      {/* <TouchableOpacity  style={{backgroundColor:"#6A6A6A",padding:10,borderRadius:10}}><Text style={{color:"white"}}>Repeat Order</Text></TouchableOpacity> */}
      </View>
      <View style={{flex:1,alignItems:"flex-end",alignContent:"flex-end",justifyContent:"flex-end",marginRight:20}}>

      <TouchableOpacity  style={{backgroundColor:"#008B41",padding:10,borderRadius:10}}><Text style={{color:"white"}}>Total : ₹ {item.transaction_amount}</Text></TouchableOpacity>
      </View>
      </View>
    

    </View>
  );



  return (
    <View style={styles.container}>
      <Header navigation={navigation}
       
        onBackPress={() => {
          navigation.goBack();
        }} title={"Order History"} headerBgColor={'#FF1300'} />
      {/* body */}



      {userOrderDetailsStateResponse && userOrderDetailsStateResponse.order_history?.length > 0 ? (
        <View style={{ flex: 1, flexDirection: 'column' }}>

          <View style={{ flex: 1 }}>
            <FlatList



              data={userOrderDetailsStateResponse?.order_history
                ?? []}
              keyExtractor={(item, index) => index + ''}

              numColumns={1}
              decelerationRate={'normal'}
              scrollEventThrottle={16}
              renderItem={renderOurCusinItem}

            />
          </View>
         

        </View>
      ) : <View>

       {!userOrderDetailsStateLoading && userOrderDetailsStateResponse && userOrderDetailsStateResponse.status==false && <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 200, flexDirection: "column" }}>


          <Image
            resizeMode={'cover'}
            width={width}
            height={height / 2}


            source={require('../../assets/images/no-files.png')}
          />
          <Text style={{ color: "#FF1300", height: 50,fontSize: 26 }}>{"No Orders Found"}</Text>

       


        </View>}


      </View>}
      {(
         userOrderDetailsStateLoading
        
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

    paddingVertical:5,
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor:"#008B41"


  },
  innercard: {
    flex: 1,
    flexDirection: "column",
    backgroundColor:"white"

  },
  header:{
    flex: 1,
    paddingVertical:10,
    flexDirection: "row",
    backgroundColor:"#008B41"
  },
  topLbl:{

  },
  innercardtop: {
    flex: 1,

    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",



  },
  innercardbottom: {

    flex: 2.8,
    flexDirection: "column",
    backgroundColor:"white"


  },
  tinyLogo: {

  },
  values: {
    color: "white",
    fontSize: 18
  }

});

export default OrdersScreen;
