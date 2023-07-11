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
import Loader from '../../components/loader';

import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';


const Registration = ({ route, navigation }) => {
  //   const {userType = ''} = route.params;
  const [data, setdata] = useState({
    mobile_number: '',
    name: '',
    email: '',
    locality: '',
    create_pass: '',
    confirm_pass: '',
  });
  const [type, setType] = useState();
  const [isloc, setIsloc] = useState(false);

  const dispatch = useDispatch();
  const [location, setLocation] = useState(false);
  const [locname, setLocName] = useState('..Loading');
  const { isSignupDetailsLoading, signupDetailsResponse, signupDetailsError } =
    useSelector(state => state.signupDetailsReducer);


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
            Geocoder.init(APP_KEYS.GOOGLE_KEY, {language : "en"});
            Geocoder.from(position.coords.latitude, position.coords.longitude)
            
              .then(json => {
               
                
                
                
                var addressComponent = json.results[0].formatted_address;
              
                setLocName(addressComponent)
               
                
              })
            
              .catch(error => { setLocName("Error")});

          



          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocName( error.message)
            setLocation(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    });

  };

  useEffect(() => {
    return () => {
      dispatch(signupDetailsReset());
    };
  }, []);

  useEffect(() => {
    if (signupDetailsResponse) {
      if (signupDetailsResponse.status) {
        Alert.alert(
          'HungyBingy',
          JSON.stringify(signupDetailsResponse.message),
        );
        navigation.goBack();
      } else {
        Alert.alert(
          'HungyBingy',
          JSON.stringify(signupDetailsResponse.message),
        );
      }
    } else if (signupDetailsError) {
      Alert.alert('HungyBingy', JSON.stringify(signupDetailsError.message));
    }
  }, [signupDetailsResponse, signupDetailsError]);

  const isRegDataValid = () => {
    if(isloc){
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
    if (data.create_pass == '') {
      Alert.alert('HungyBingy', 'Enter Valid Create Password');
      return false;
    }
    if (data.confirm_pass == '') {
      Alert.alert('HungyBingy', 'Enter Valid Confirm Password');
      return false;
    }
    if (data.create_pass != data.confirm_pass) {
      Alert.alert('HungyBingy', 'Confirm password not matching');
      return false;
    }
    return true;
  };

  return (
    <View style={styles.containerStyle}>
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
          <Text
            style={{
              marginTop: 20,
              color: Colors.white,
              fontWeight: '400',
              fontSize: 30,
              marginHorizontal: 20,
              textAlign: 'center',
            }}>
            {'SIGNUP'}
          </Text>
          <Text
            style={{
              marginTop: 20,
              color: Colors.white,
              fontWeight: '400',
              fontSize: 14,
              textAlign: 'center',
            }}>
            {'Add your details to Register'}
          </Text>

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
                Create Password
              </Text>
              <TextInput
                value={data.create_pass}
                editable
                keyboardType="default"
                secureTextEntry={true}
                onChangeText={text => {
                  let data1 = data;
                  data1.create_pass = text;
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
                Confirm Password
              </Text>
              <TextInput
                value={data.confirm_pass}
                editable
                keyboardType="default"
                onChangeText={text => {
                  let data1 = data;
                  data1.confirm_pass = text;
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
                dispatch(
                  signupDetailsRequest({
                    mobile_number: data.mobile_number,
                    full_name: data.name,
                    email: data.email,
                    locality: data.locality,
                    user_pass: data.create_pass,
                    refcode: '',
                  }),
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
      <TouchableOpacity
        onPress={() => {
          Geolocation.stopObserving();
          navigation.goBack()
        }}>
        <Text
          style={{
            fontSize: 14,
            color: Colors.white,
            paddingVertical: 15,
            fontWeight: '400',
          }}>
          Already have an Account?{' '}
          <Text
            style={{
              fontSize: 14,
              color: Colors.white,
              fontWeight: '400',
              textDecorationLine: 'underline',
            }}>
            LOGIN
          </Text>
        </Text>
      </TouchableOpacity>



      {isSignupDetailsLoading && <Loader />}
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

export default Registration;
