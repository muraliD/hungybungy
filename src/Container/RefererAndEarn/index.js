import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
  Alert,

} from 'react-native';


import Header from '../../components/header';
import AsyncStorageManager, { LOCAL_KEYS } from '../../utils/AsyncStorageManager';
import { useIsFocused } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../utils/colors';
import {
  checkCircleIcon,
  loginIcon,
  logoIcon,
  mobileIcon,
} from '../../utils/images';
import {
  activeOpacity,
  TYPE_SIGNUP,
  TYPE_LOGIN,
  Constants,
} from '../../utils/constants';
import { SCREEN_NAME } from '../../Navigator';
import { useDispatch, useSelector } from 'react-redux';
import {
  signupDetailsRequest,
  signupDetailsReset,
} from '../../redux/signup-details-state/SignupDetailsAction';


import { userProfileDataRequest, userProfileDataReset } from '../../redux/user-profile-data/UserProfileDataAction';
import { userProfileUpdateRequest, userProfileUpdateReset } from '../../redux/user-profile-update/UserProfileUpdateAction';
import { userMobileUpdateRequest,userMobileUpdateReset } from '../../redux/user-mobile-update/UserMobileUpdateAction';
import Loader from '../../components/loader';

import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DebugInstructions } from 'react-native/Libraries/NewAppScreen';

const ReferEarn = ({ route, navigation }) => {
  //   const {userType = ''} = route.params;
  const isFocused = useIsFocused();
  const [data, setdata] = useState({
    mobile_number: '',
    name: '',

    
  });
  const [user, setUser] = useState(' ');
  const [mobiles, setMobiles] = useState(' ');
  const [type, setType] = useState();
  const [isloc, setIsloc] = useState(false);
  const [userid, setuserid] = useState(null);
  const dispatch = useDispatch();
  const [location, setLocation] = useState(false);
  const [locname, setLocName] = useState('..Loading');
  const [bingy, setBingy] = useState("0")







    const {

      userMobileUpdateStateLoading,
      userMobileUpdateStateResponse,
      userMobileUpdateStateError,
  
  
  
    } =
      useSelector(state => state.userMobileUpdateReducer);

      const { userProfileDataStateLoading, userProfileDataStateResponse, userProfileDataStateError } =
      useSelector(state => state.userProfileDataReducer);


  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

 




  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === 'granted') {


        getLocation();
        return true;
      } else {

        return false;
      }
    } catch (err) {
      return false;
    }
  };





  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {

      if (res) {

        Geolocation.getCurrentPosition(
          position => {
            setLocation(true);
            Geocoder.init("AIzaSyDlRbDrP5YrIgVTslPYQyho5wDO_nksibw", { language: "en" });
            Geocoder.from(position.coords.latitude, position.coords.longitude)

              .then(json => {




                var addressComponent = json.results[0].formatted_address;

                setLocName(addressComponent)


              })

              .catch(error => { setLocName("Error") });





          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocName(error.message)
            setLocation(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    });

  };

  useEffect(() => {
    return () => {
      dispatch(userMobileUpdateReset());
      dispatch(userProfileDataReset())
     
    };
  }, []);


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
      setUser(dataUser && 'data' in dataUser ? dataUser["data"]["full_name"] : "");

      setuserid(dataUser && 'data' in dataUser ? dataUser["data"]["user_id"] : "");
      setMobiles(dataUser && 'data' in dataUser ? dataUser["data"]["mobile_number"] : "");

      let data1 = data;
                  data1.name = dataUser && 'data' in dataUser ? dataUser["data"]["mobile_number"] : "";
                  setdata({ ...data1 });
      var request = {
        "user_id": dataUser && 'data' in dataUser ? dataUser["data"]["user_id"] : ""
      }
      dispatch(userProfileDataRequest(request));

    }




  };
  useEffect(() => {
    if (userProfileDataStateResponse) {
      
      if (userProfileDataStateResponse.status) {


  
        AsyncStorageManager.localStorage.storeData(
          LOCAL_KEYS.USER_DATA,
          JSON.stringify(userProfileDataStateResponse),
        );

        console.log('HungyBingy', JSON.stringify(userProfileDataStateResponse));

        let data1 = data;
        data1.name = userProfileDataStateResponse?.data?.mobile_number ?? "";
        data1.mobile_number =  "";
        
        setdata({ ...data1 });

      } else {
        // Alert.alert(
        //   'HungyBingy',
        //   JSON.stringify(signupDetailsResponse.message),
        // );
      }
    } else if (userProfileDataStateError) {
      
      Alert.alert('HungyBingy', JSON.stringify(userProfileDataStateError.message));
    }
  }, [userProfileDataStateResponse, userProfileDataStateError]);
  useEffect(() => {
    if (userMobileUpdateStateResponse) {
      
      if (userMobileUpdateStateResponse.status) {

        Alert.alert('HungyBingy', JSON.stringify(userMobileUpdateStateResponse.message));
        var request = {
          "user_id":  userid
        }
        dispatch(userProfileDataRequest(request));

      } else {
        // Alert.alert(
        //   'HungyBingy',
        //   JSON.stringify(signupDetailsResponse.message),
        // );
      }
    } else if (userMobileUpdateStateError) {
      
      Alert.alert('HungyBingy', JSON.stringify(userMobileUpdateStateError.message));
    }
  }, [userMobileUpdateStateResponse, userMobileUpdateStateError]);






  const isRegDataValid = () => {

    
    if (data.name == '') {
      Alert.alert('HungyBingy', 'Enter Valid Old Mobile Number');
      return false;
    }
    if (data.name.length < 10) {
      Alert.alert('HungyBingy', 'Enter valid Old Mobile Number');
      return false;
    }
    if (data.mobile_number == '') {
      Alert.alert('HungyBingy', 'Enter Valid Mobile Number');
      return false;
    }
    
    if (data.mobile_number.length < 10) {
      Alert.alert('HungyBingy', 'Enter valid Mobile Number');
      return false;
    }
   

    return true;
  };

  return (
    <View style={styles.containerStyle}>
       <Header navigation={navigation}
       
       onBackPress={() => {
         navigation.goBack();
       }} title={"Change Mobile Number"} headerBgColor={'#FF1300'} />
      <ScrollView
        style={{
          width: '100%',
        }}
        containerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 30,
            alignItems: 'center',
            paddingBottom: 20,
          }}>

          <TouchableOpacity onPress={() => {
         

          }}>
            <Image style={{  marginTop: 15}} source={require("../../assets/images/change_mobile.png")}></Image>
           
          </TouchableOpacity>

          <View style={{ flex: 1, alignContent: "center", justifyContent: "center", alignItems: "center", paddingHorizontal: 50, paddingVertical: 5, marginTop: 5}}>
            <Text
              style={{
                fontSize: 18,


                fontWeight: 'bold',
                color: "white",
              }}>
             Change Mobile Number 
            </Text>

          </View>


          {/* name */}
          <View
            style={{
              marginTop: 30,
              borderBottomWidth: 2,
              borderBottomColor: Colors.colorFC6011,
              borderRadius: 0,
              backgroundColor: Colors.color383838,
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingTop: 5,
              width: '100%',
              height: 'auto',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <Text
                style={{
                  fontSize: 13,
                  marginLeft: 10,
                  fontWeight: '600',
                  color: Colors.colorFC6011,
                }}>
               Current Mobile Number
              </Text>
              <TextInput
                value={data.name}
                editable ={false}
                keyboardType="number-pad"
                onChangeText={text => {
                  let data1 = data;
                  data1.name = text;
                  setdata({ ...data1 });
                }}
                placeholder=""
                maxLength={10}
                placeholderTextColor={Colors.txtGreyColor}
                selectionColor={Colors.white}
                height={45}
                style={{ fontSize: 14, color: Colors.white, fontWeight: '600' }}
              />
            </View>
          </View>

          {/* mobile number */}
          <View
            style={{
              marginTop: 30,
              borderBottomWidth: 2,
              borderBottomColor: Colors.colorFC6011,
              borderRadius: 0,
              backgroundColor: Colors.color383838,
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingTop: 5,
              width: '100%',
              height: 'auto',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <Text
                style={{
                  fontSize: 13,
                  marginLeft: 10,
                  fontWeight: '600',
                  color: Colors.colorFC6011,
                }}>
          New Mobile Number
              </Text>
              <TextInput
                value={data.mobile_number}
                editable
                keyboardType="number-pad"
                onChangeText={text => {
                  let data1 = data;
                  data1.mobile_number = text;
                  setdata({ ...data1 });
                }}
                maxLength={10}
                placeholder=""
                placeholderTextColor={Colors.txtGreyColor}
                selectionColor={Colors.white}
                height={45}
                style={{ fontSize: 14, color: Colors.white, fontWeight: '600' }}
              />
            </View>
          </View>

        

          

         

        


          <TouchableOpacity
            onPress={() => {

              
              if (isRegDataValid()) {

                var mdata = {
                  "user_id": userid,
                  "mobile_number":data.mobile_number
                }

                
                dispatch(
                  userMobileUpdateRequest(mdata),
                );
              }
            }}
            style={styles.loginBtn}
            activeOpacity={Constants.activeOpacity}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: '600',
              }}>
              {`SUBMIT`}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
     




     


      {userMobileUpdateStateLoading || userProfileDataStateLoading && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  loginBtn: {
    height: 50,
    width: '80%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#FC6011',
    marginTop: 30,
  },
});

export default ReferEarn;
