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
import { userOrderDetailsRequest, userOrderDetailsReset } from '../../redux/use-order-details/UserOrderDetailsAction';
import { addAddressUsersState } from '../../redux/add-address-users/AddAddressUsersReducer';
import { userBingoDetailsRequest, userBingoDetailsReset } from '../../redux/user-bingo-details/UserBingoDetailsAction';
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

const BingyCoinsScreen = ({ route, navigation }) => {
  const { type } = route.params;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [userdata, setUserData] = useState(null);
  const [check, uncheck] = useState(false);
  const [results, setResults] = useState(null);
  const [selAddress, setSelAddress] = useState(null);
  const [user, setuser] = useState(null);
  const [profile, setProfile] = useState(null);





  const {
    userBingoDetailsStateLoading,
    userBingoDetailsStateResponse,
    userBingoDetailsStateError,
  } = useSelector(state => state.userBingoDetailsReducer);

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


      dispatch(userBingoDetailsReset());


    };


  }, []);

  useEffect(() => {

    if (isFocused) {




      getUserDate();
    }


  }, [isFocused]);



  useEffect(() => {

    if (userBingoDetailsStateResponse) {
      if (userBingoDetailsStateResponse.status) {
        console.log('in our orders response, ', userBingoDetailsStateResponse);

        

        const arrWithColor = (userBingoDetailsStateResponse.bing_coins_history
        ).map((object, index) => {



          return Object.assign(object, { isadd: index == 0 ? true : false });
        });




        setResults(arrWithColor);






      } else {
        // Alert.alert('HungyBingy', JSON.stringify(getOurBrandsResponse.message));
      }
    } else if (userBingoDetailsStateError) {



    }
  }, [userBingoDetailsStateResponse, userBingoDetailsStateError]);



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


      dispatch(userBingoDetailsRequest({
        "user_id": dataUser.data.user_id
      }))

    }
    // let location = await AsyncStorageManager.localStorage.retrieveData(
    //   LOCAL_KEYS.SELECTED_LOCATION,
    // );

    // if (location) {
    //   var loc = JSON.parse(location)

    //   var request = {
    //     "location_id": loc.store_id,
    //     "limit_num": ""
    //   }


    //   // if(type == "All Brands"){



    //   //   dispatch(getOurBrandsRequest(request));

    //   // }else{
    //   //   dispatch(getPopularCuisinesRequest(request));
    //   // }



    // }

  }


  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );


  const renderOurCusinItem = ({ item, index }) => (





    <View

      style={{

        flex: 1,
        flexGrow: 1,

        backgroundColor: "white",
        justifyContent: "center",
        alignContent: "center",
        // alignItems: "center",
        flexDirection: "column",
        marginHorizontal: 5,
        marginVertical: 10,
        borderRadius: 15, borderRadius: 15



        // minHeight: height / 4,


      }}




    >

      <View style={{ flex: 1, flexDirection: "column", paddingVertical: 10, backgroundColor: "white", borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
        <Text style={{ paddingHorizontal: 20, fontSize: 16, color: "#333333" }}>Txn ID :</Text>
      </View>


      <View style={{ flex: 1, flexDirection: "row", marginVertical: 10, backgroundColor: "white" }}>
        <View style={{ flex: 1, alignItems: "flex-start", alignContent: "flex-start", justifyContent: "flex-start", marginLeft: 20 }}>

          <Text style={{ flex: 1, fontWeight: "bold" }}>{item.bingyTransactionId ?? ""}</Text>


        </View>
        <View style={{ flex: 1, alignItems: "flex-end", alignContent: "flex-end", justifyContent: "flex-start", marginRight: 20 }}>

          <Text > {item.transactionOn ?? ""}</Text>
        </View>
      </View>


      <View style={{ flex: 1, flexDirection: "row", marginTop: 5, marginBottom: 20, backgroundColor: "white" }}>
        <View style={{ flex: 1, alignItems: "flex-start", alignContent: "flex-start", justifyContent: "flex-start", marginLeft: 20 }}>

          <Text style={{ flex: 1 }}>{item.bingytype ?? ""}</Text>

        </View>
        <View style={{ flex: 1, alignItems: "flex-end", alignContent: "flex-end", justifyContent: "flex-start", marginRight: 20 }}>

          <Text style={{ color: "#ED2700", fontSize: 18, fontWeight: "bold" }}>₹  {item.binyAmount ?? ""}</Text>

        </View>
      </View>







    </View>
  );



  return (
    <View style={styles.container}>
      <Header navigation={navigation}

        onBackPress={() => {
          navigation.goBack();
        }} title={"Bingy Coins"} headerBgColor={'#FF1300'} />
      {/* body */}




      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 5, marginVertical: 10, borderRadius: 15, backgroundColor: "white" }}>

          <View style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
            <Image style={{ marginLeft: 20, width: 70, height: 70 }} source={require("../../assets/images/apple.png")}></Image>

          </View>

          <View style={{ flex: 3, flexDirection: "column", justifyContent: "center" }}>
            <Text style={{ marginLeft: 20, paddingBottom: 2, fontSize: 20 }}>Total Bingy Coins </Text>
           {userBingoDetailsStateResponse && userBingoDetailsStateResponse.user_bingy_coins.length>0 &&   <Text style={{ marginLeft: 20, paddingTop: 2, fontSize: 24, color: "#ED2700" }}>{userBingoDetailsStateResponse?.user_bingy_coins ?? ""}</Text>}
          </View>



        </View>


        <View style={{ flex: 4 }}>
          {userBingoDetailsStateResponse && userBingoDetailsStateResponse.bing_coins_history?.length > 0 &&
            <FlatList



              data={userBingoDetailsStateResponse?.bing_coins_history
                ?? []}
              keyExtractor={(item, index) => index + ''}

              numColumns={1}
              decelerationRate={'normal'}
              scrollEventThrottle={16}
              renderItem={renderOurCusinItem}

            />
          }
        </View>


      </View>

      {(
        userBingoDetailsStateLoading

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
    flex: 1,
    flexGrow: 0,
    width: width - 20,

    paddingVertical: 5,
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#008B41"


  },
  innercard: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white"

  },
  header: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: "row",
    backgroundColor: "#008B41"
  },
  topLbl: {

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
    backgroundColor: "white"


  },
  tinyLogo: {

  },
  values: {
    color: "white",
    fontSize: 18
  }

});

export default BingyCoinsScreen;
