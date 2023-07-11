import React, {useEffect,useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share
} from 'react-native';
import {Button} from 'native-base';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../utils/colors';
import {logoBg, logoIcon} from '../../utils/images';
import {SCREEN_NAME} from '../../Navigator';
import AsyncStorageManager, {LOCAL_KEYS} from '../../utils/AsyncStorageManager';
import Header from '../../components/header';
import {Constants} from '../../utils/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';

const MenuScreen = ({route, navigation}) => {

  const [userdata,setUserData] = useState(null);

  const {
    isLoginLoading,
    mobileLoginResponse,
    mobileLoginError,
  } = useSelector(state => state.mobileLoginReducer);

  useEffect(() => {

    getUserDate();

    

  }, []);

  getUserDate = async ()=>{



    let UserData = await AsyncStorageManager.localStorage.retrieveData(
      LOCAL_KEYS.USER_DATA,
    );
    if (UserData != undefined && UserData) {
      setUserData(JSON.parse(UserData));
    
    } 

  }
  useEffect(() => {

    console.log(mobileLoginResponse);


  }, [mobileLoginResponse]);


  return (
    <View style={styles.container}>
      <Header title={'My Account'} headerBgColor={'red'} />
      {/* body */}
      <ScrollView>
        <View style={{flex: 1, marginHorizontal: 20, marginTop: 30}}>
          {/* name */}
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: Colors.white,
              borderRadius: 10,
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 15,
            }}>
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
              }}
            />

            <View style={{flexDirection: 'column', marginLeft: 15}}>
              <Text
                style={{fontSize: 18, color: Colors.black, fontWeight: '600'}}>

                  {userdata && 'data' in userdata ?userdata["data"]["full_name"]:""}

              
              </Text>
              <Text
                style={{
                  marginTop: 3,
                  fontSize: 11,
                  color: Colors.txtGreyColor,
                  fontWeight: '500',
                }}>
                {userdata && 'data' in userdata ?userdata["data"]["email"]:""}
              </Text>
            </View>
          </View>

          {/* buttons */}
          <View
            style={{
              backgroundColor: Colors.white,
              borderRadius: 10,
              justifyContent: 'center',
              paddingHorizontal: 20,
              paddingVertical: 30,
              marginTop: 50,
            }}>
            {/* profile */}
            <TouchableOpacity activeOpacity={Constants.activeOpacity}
             onPress={()=>{

              navigation.navigate(SCREEN_NAME.UserProfile, {})
            }}
            
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <FontAwesome5
                  name="user-circle"
                  size={22}
                  color={Colors.black}
                />

                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.black,
                    fontWeight: '400',
                    marginLeft: 15,
                  }}>
                  Profile
                </Text>

                <View style={{flex: 1}} />

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={22}
                  color={Colors.txtGreyColor}
                  style={{alignSelf: 'center'}}
                />
              </View>
            </TouchableOpacity>

            {/* my orders */}
            <TouchableOpacity activeOpacity={Constants.activeOpacity} 
            onPress={()=>{

              navigation.navigate(SCREEN_NAME.OrdersScreen, {})
            }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <FontAwesome5
                  name="user-circle"
                  size={22}
                  color={Colors.black}
                />

                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.black,
                    fontWeight: '400',
                    marginLeft: 15,
                  }}>
                  My Orders
                </Text>

                <View style={{flex: 1}} />

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={22}
                  color={Colors.txtGreyColor}
                  style={{alignSelf: 'center'}}
                />
              </View>
            </TouchableOpacity>

            {/* refer & earn */}
            <TouchableOpacity activeOpacity={Constants.activeOpacity}
            onPress={async()=>{

        



              try {
                const result = await Share.share({

                  title: 'App link',
                  message: 'Please download and register app using refer mobile '+  userdata["data"]["mobile_number"]+' AppLink :https://play.google.com/store/apps/details?id=com.hungybingy', 
                  url: 'https://play.google.com/store/apps/details?id=com.hungybingy'
                 
                });
                if (result.action === Share.sharedAction) {
                  if (result.activityType) {
                    // shared with activity type of result.activityType
                  } else {
                    // shared
                  }
                } else if (result.action === Share.dismissedAction) {
                  // dismissed
                }
              } catch (error) {
                alert(error.message);
              }
            }}>
            
            
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <FontAwesome5
                  name="user-circle"
                  size={22}
                  color={Colors.black}
                />

                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.black,
                    fontWeight: '400',
                    marginLeft: 15,
                  }}>
                  Refer & Earn
                </Text>

                <View style={{flex: 1}} />

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={22}
                  color={Colors.txtGreyColor}
                  style={{alignSelf: 'center'}}
                />
              </View>
            </TouchableOpacity>

            {/* Bingy coins */}
            <TouchableOpacity activeOpacity={Constants.activeOpacity}

            onPress={()=>{
              navigation.navigate(SCREEN_NAME.BingyCoinsScreen, {})
            }}
            
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <FontAwesome5
                  name="user-circle"
                  size={22}
                  color={Colors.black}
                />

                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.black,
                    fontWeight: '400',
                    marginLeft: 15,
                  }}>
                  Bingy Coins
                </Text>

                <View style={{flex: 1}} />

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={22}
                  color={Colors.txtGreyColor}
                  style={{alignSelf: 'center'}}
                />
              </View>
            </TouchableOpacity> 

            {/* manage address */}
            <TouchableOpacity activeOpacity={Constants.activeOpacity}

            onPress={()=>{
              var requestObject ={
                "user_id":"",
                "store_id":"",
                "transaction_id":"",
                "order_amount":"",
                "coupon_code":"",
                "bingy_coins":"",
                "earn_bingy_coins":"",
                "delivery_cost":"",
                "payment_amount":"",
                "address_id":"1",
                "items":[]
            }

              navigation.navigate(SCREEN_NAME.AddressScreen, {"order":requestObject,"from":"menu"});


            }}
            
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <FontAwesome5
                  name="user-circle"
                  size={22}
                  color={Colors.black}
                />

                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.black,
                    fontWeight: '400',
                    marginLeft: 15,
                  }}>
                  Manage Address
                </Text>

                <View style={{flex: 1}} />

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={22}
                  color={Colors.txtGreyColor}
                  style={{alignSelf: 'center'}}
                />
              </View>
            </TouchableOpacity>

            {/* support & feedback */}
            {/* <TouchableOpacity activeOpacity={Constants.activeOpacity}
            
            onPress={async ()=>{


            


            }}
            
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <FontAwesome5
                  name="user-circle"
                  size={22}
                  color={Colors.black}
                />

                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.black,
                    fontWeight: '400',
                    marginLeft: 15,
                  }}>
                  Support & Feedback
                </Text>

                <View style={{flex: 1}} />

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={22}
                  color={Colors.txtGreyColor}
                  style={{alignSelf: 'center'}}
                />
              </View>
            </TouchableOpacity> */}
            

            {/* change mobile number */}
            <TouchableOpacity activeOpacity={Constants.activeOpacity}
            onPress={()=>{
                    navigation.navigate(SCREEN_NAME.ReferEarn, {})
            }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <FontAwesome5
                  name="user-circle"
                  size={22}
                  color={Colors.black}
                />

                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.black,
                    fontWeight: '400',
                    marginLeft: 15,
                  }}>
                  Change Mobile Number
                </Text>

                <View style={{flex: 1}} />

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={22}
                  color={Colors.txtGreyColor}
                  style={{alignSelf: 'center'}}
                />
              </View>
            </TouchableOpacity>


            <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'HungyBingy',
                'Are you sure you want to logout?',
                [
                  {text: 'NO', onPress: () => console.log('Cancel Pressed')},
                  {
                    text: 'YES',
                    onPress: () => {
                      AsyncStorageManager.localStorage.storeData(
                        LOCAL_KEYS.USER_DATA,
                        '',
                      );
                      AsyncStorageManager.localStorage.storeData(
                        LOCAL_KEYS.SELECTED_LOCATION,
                        '',
                      );
                      navigation.popToTop();
                      navigation.replace(SCREEN_NAME.SIGNUP_SCREEN);
                    },
                  },
                ],
                {cancelable: false},
              );
            }}
            activeOpacity={Constants.activeOpacity}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-end',
              marginTop: 40,
            }}>
            <Text
             style={{
              fontSize: 16,
              color: Colors.red,
              fontWeight: '400',
              marginLeft: 15,
            }}
              >
              LOGOUT
            </Text>
          </TouchableOpacity>
          </View>

          {/* logout button */}
      
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingBottom: 150,
  },
});

export default MenuScreen;
