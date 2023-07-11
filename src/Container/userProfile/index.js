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

import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import Header from '../../components/header';
import AsyncStorageManager, { LOCAL_KEYS } from '../../utils/AsyncStorageManager';
import { useIsFocused } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../utils/colors';
import { APP_KEYS } from '../../utils/environment';
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
import Loader from '../../components/loader';

import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DebugInstructions } from 'react-native/Libraries/NewAppScreen';

const UserProfile = ({ route, navigation }) => {
  //   const {userType = ''} = route.params;
  const isFocused = useIsFocused();
  const [data, setdata] = useState({
    mobile_number: '',
    name: '',
    date: '',
    email: '',
    locality: '',
    state: '',
    city: '',
  });
  const [user, setUser] = useState(' ');
  const [img, setimg] = useState(' ');
  const [isImgUpload, setIsImgUpload] = useState(false);
  const [imageuri, setImageuri] = useState(null);
  const [type, setType] = useState();
  const [isloc, setIsloc] = useState(false);
  const [userid, setuserid] = useState(null);
  const dispatch = useDispatch();
  const [location, setLocation] = useState(false);
  const [locname, setLocName] = useState('..Loading');
  const [bingy, setBingy] = useState("0")

  const { isSignupDetailsLoading, signupDetailsResponse, signupDetailsError } =
    useSelector(state => state.signupDetailsReducer);


  const { userProfileDataStateLoading, userProfileDataStateResponse, userProfileDataStateError } =
    useSelector(state => state.userProfileDataReducer);

  const {

    userProfileUpdateStateLoading,
    userProfileUpdateStateResponse,
    userProfileUpdateStateError,



  } =
    useSelector(state => state.userProfileUpdateReducer);




  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setDateString(currentDate.toLocaleString().split(",")[0])
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
    setShow(true);
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
            Geocoder.init(APP_KEYS.GOOGLE_KEY, { language: "en" });
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
      dispatch(userProfileDataReset());
      dispatch(userProfileUpdateReset());
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
        data1.name = userProfileDataStateResponse?.data?.full_name ?? "";
        data1.mobile_number = userProfileDataStateResponse?.data?.mobile_number ?? "";

        // date:'',
        var finalDate = new Date()
        var dobClone = userProfileDataStateResponse?.data?.dob ?? ""
       



        var finalDate = new Date(dobClone)
        console.log("mmmmmmm",finalDate)
        

        // if(finalDate == 'Invalid Date'){

        //    if (dobClone && dobClone.length > 0) {
        //   dobClone = dobClone.split("/");
        //   finalDate = new Date(dobClone[1] + "/" + dobClone[0] + "/" + dobClone[2])
        // }

        // }
      

        setDate(new Date(userProfileDataStateResponse?.data?.dob ?? ""))
        setDateString(userProfileDataStateResponse?.data?.dob ?? "")
        data1.email = userProfileDataStateResponse?.data?.email ?? "";
        data1.locality = userProfileDataStateResponse?.data?.locality ?? "";
        data1.state = userProfileDataStateResponse?.data?.state ?? "";
        data1.city = userProfileDataStateResponse?.data?.city ?? "";

        setBingy(userProfileDataStateResponse?.data?.bingy_coins ?? "")
        setimg(userProfileDataStateResponse?.data?.profile_file_url ?? "")
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
    if (userProfileUpdateStateResponse) {

      if (userProfileUpdateStateResponse.status) {


        Alert.alert(
          'HungyBingy',
          userProfileUpdateStateResponse.message
        );



      } else {
        // Alert.alert(
        //   'HungyBingy',
        //   JSON.stringify(signupDetailsResponse.message),
        // );
      }
    } else if (userProfileUpdateStateError) {

      Alert.alert('HungyBingy', JSON.stringify(userProfileUpdateStateError.message));
    }
  }, [userProfileUpdateStateResponse, userProfileUpdateStateError]);



  const isRegDataValid = () => {



    if (date) {
      data.date = date;
    }
    if (isloc) {
      data.locality = locname
    }
    if (data.name == '') {
      Alert.alert('HungyBingy', 'Enter Valid Name');
      return false;
    }
    if (data.mobile_number == '') {
      Alert.alert('HungyBingy', 'Enter Valid Mobile Number');
      return false;
    }
    if (data.date == '') {
      Alert.alert('HungyBingy', 'Enter Valid Date');
      return false;
    }
    if (data.mobile_number.length < 10) {
      Alert.alert('HungyBingy', 'Enter valid Mobile Number');
      return false;
    }
    if (data.email == '') {
      Alert.alert('HungyBingy', 'Enter Valid Email');
      return false;
    }

    if (data.locality == '') {
      Alert.alert('HungyBingy', 'Enter Valid Locality');
      return false;
    }
    if (data.state == '') {
      Alert.alert('HungyBingy', 'Enter Valid State');
      return false;
    }
    if (data.city == '') {
      Alert.alert('HungyBingy', 'Enter Valid city');
      return false;
    }

    return true;
  };

  return (
    <View style={styles.containerStyle}>
      <Header navigation={navigation}

        onBackPress={() => {
          navigation.goBack();
        }} title={"My Profile"} headerBgColor={'#FF1300'} />
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

            Alert.alert(
              'Camera Options',
              'You can add pictures in future',
              [
                {
                  text: 'camera',
                  onPress: async () => {
                    let options = {
                      saveToPhotos: true,
                      mediaType: 'photo',
                      quality: 0.5

                    };

                    const granted = await PermissionsAndroid.request(
                      PermissionsAndroid.PERMISSIONS.CAMERA,
                    );
                    if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                      const result = await launchCamera(options);
                      console.log("resultresultresult======>", result);
                      setImageuri({
                        photo: (result.assets[0].uri),
                        type: result.assets[0].type,
                        filename: result.assets[0].fileName
                      })


                      var bodyFormData = new FormData();
                      bodyFormData.append('user_id', userid)
                      bodyFormData.append('profile_image', {
                        uri: (result.assets[0].uri),
                        type: result.assets[0].type,
                        name: result.assets[0].fileName,
                      });

                      setIsImgUpload(true);

                      axios({
                        method: "post",
                        url: "https://hungybingy.com/hbmobile/api/Users/userProfileImageUpdate",
                        data: bodyFormData,
                        headers: { "Content-Transfer-Encoding": "multipart/form-data", "x-api-key": "hungybingy", 'Content-Type': null },

                      })
                        .then(function (response) {
                          console.log(response);
                          var request = {
                            "user_id": userid
                          }
                          setIsImgUpload(false);
                          dispatch(userProfileDataRequest(request));
                          //handle success


                        })
                        .catch(function (response) {
                          //handle error
                          console.log(response);

                        });


                    }
                  },
                },
                {
                  text: 'open Gallery',
                  onPress: async () => {
                    let options = {
                      saveToPhotos: true,
                      mediaType: 'photo',
                      quality: 0.5, storageOptions: {
                        skipBackup: true,
                      },
                    };


                    const result = await launchImageLibrary(options);
                    console.log("resultresultresultlibrary======>", result);

                    setImageuri({
                      photo: (result.assets[0].uri),
                      type: result.assets[0].type,
                      filename: result.assets[0].fileName
                    })


                    var bodyFormData = new FormData();
                    bodyFormData.append('user_id', userid)
                    bodyFormData.append('profile_image', {
                      uri: (result.assets[0].uri),
                      type: result.assets[0].type,
                      name: result.assets[0].fileName,
                    });

                    setIsImgUpload(true);

                    axios({
                      method: "post",
                      url: "https://hungybingy.com/hbmobile/api/Users/userProfileImageUpdate",
                      data: bodyFormData,
                      headers: { "Content-Transfer-Encoding": "multipart/form-data", "x-api-key": "hungybingy", 'Content-Type': null },

                    })
                      .then(function (response) {
                        console.log(response);
                        var request = {
                          "user_id": userid
                        }
                        setIsImgUpload(false);
                        dispatch(userProfileDataRequest(request));
                        //handle success


                      })
                      .catch(function (response) {
                        //handle error
                        console.log(response);

                      });


















                  },
                },

              ],
              {
                cancelable: true,
                onDismiss: () => {

                }
              },
            );


          }}>
            {img && img.length > 0 ? <Image
              style={{ width: 150, height: 150, marginTop: 15, backgroundColor: "white", borderRadius: 75 }}
              source={{ uri: img }}
            /> : <Image style={{ width: 150, height: 150, marginTop: 15, backgroundColor: "white", borderRadius: 75 }} source={require("../../assets/images/avatar.png")}></Image>}
            <MaterialIcons
              name={"camera-alt"}
              size={40}
              color={'#FE7B07'}
              style={{ position: 'absolute', left: 110, top: 120 }}
            />
          </TouchableOpacity>

          <View style={{ flex: 1, alignContent: "center", justifyContent: "center", alignItems: "center", backgroundColor: "white", paddingHorizontal: 50, paddingVertical: 10, marginTop: 25, borderRadius: 10 }}>
            <Text
              style={{
                fontSize: 20,


                fontWeight: 'bold',
                color: "#FF1300",
              }}>
              Avl. Coins {bingy}
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
                Name
              </Text>
              <TextInput
                value={data.name}
                editable
                keyboardType="default"
                onChangeText={text => {
                  let data1 = data;
                  data1.name = text;
                  setdata({ ...data1 });
                }}
                placeholder=""
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
                Mobile No
              </Text>
              <TextInput
                value={data.mobile_number}
                editable={false}
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

          {/* date */}
          <TouchableOpacity

            onPress={showDatepicker}
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
                {"Date of birth"}
              </Text>
              <TextInput
                value={dateString??""}
                editable={false}
                keyboardType="default"
                onChangeText={text => {
                  let data1 = data;
                  data1.name = text;
                  setdata({ ...data1 });
                }}
                placeholder=""
                placeholderTextColor={Colors.txtGreyColor}
                selectionColor={Colors.white}
                height={45}
                style={{ fontSize: 14, color: Colors.white, fontWeight: '600' }}
              />
            </View>
          </TouchableOpacity>

          {/* email id */}
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
                Email ID
              </Text>
              <TextInput
                value={data.email}
                editable
                keyboardType="email-address"
                onChangeText={text => {
                  let data1 = data;
                  data1.email = text;
                  setdata({ ...data1 });
                }}
                placeholder=""
                placeholderTextColor={Colors.txtGreyColor}
                selectionColor={Colors.white}
                height={45}
                style={{ fontSize: 14, color: Colors.white, fontWeight: '600' }}
              />
            </View>
          </View>

          {/* Locality */}
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
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text
                  style={{
                    fontSize: 13,
                    marginLeft: 10,
                    fontWeight: '600',
                    color: Colors.colorFC6011,
                  }}>
                  Locality
                </Text>
                <TouchableOpacity
                  onPress={() => {

                    if (isloc == true) {
                      setIsloc(false)
                      Geolocation.stopObserving();

                      return

                    } else {
                      setIsloc(true)
                    }

                    if (!location) {
                      requestLocationPermission();

                    } else {
                      getLocation();
                    }

                  }}>
                  <MaterialIcons
                    name={isloc ? "location-pin" : "location-off"}
                    size={20}
                    color={'#32B768'}
                    style={{ alignSelf: 'center', marginLeft: 1, marginBottom: 15 }}
                  />
                </TouchableOpacity>
              </View>

              <TextInput
                value={isloc ? locname : data.locality}
                editable={!isloc}
                keyboardType="default"
                onChangeText={text => {
                  if (isloc) {
                    let data1 = data;
                    data1.locality = "mmmm";
                    setdata({ ...data1 });

                  } else {
                    let data1 = data;
                    data1.locality = text;
                    setdata({ ...data1 });

                  }

                }}
                placeholder=""
                placeholderTextColor={Colors.txtGreyColor}
                selectionColor={Colors.white}
                height={45}
                style={{ fontSize: 14, color: Colors.white, fontWeight: '600' }}
              />

            </View>
          </View>

          {/* create password */}
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
                State
              </Text>
              <TextInput
                value={data.state}
                editable
                keyboardType="default"

                onChangeText={text => {
                  let data1 = data;
                  data1.state = text;
                  setdata({ ...data1 });
                }}
                placeholder=""
                placeholderTextColor={Colors.txtGreyColor}
                selectionColor={Colors.white}
                height={45}
                style={{ fontSize: 14, color: Colors.white, fontWeight: '600' }}
              />
            </View>
          </View>

          {/* confirm password */}
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
                City
              </Text>
              <TextInput
                value={data.city}
                editable
                keyboardType="default"
                onChangeText={text => {
                  let data1 = data;
                  data1.city = text;
                  setdata({ ...data1 });
                }}
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
                  "full_name": data.name,
                  "email": data.email,
                  "gender": data.email,
                  "dob": date.toLocaleString().split(",")[0],
                  "state": data.state,
                  "city": data.city,
                  "locality": data.locality
                }


                dispatch(
                  userProfileUpdateRequest(mdata),
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





      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}


      {userProfileDataStateLoading || userProfileUpdateStateLoading || isImgUpload && <Loader />}
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
    backgroundColor: '#FF1300',
    marginTop: 30,
  },
});

export default UserProfile;
