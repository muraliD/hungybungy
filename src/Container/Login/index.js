import React, {useEffect, useState} from 'react';
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
import {Colors} from '../../utils/colors';
import {
  checkCircleIcon,
  loginIcon,
  logoIcon,
  mobileIcon,
  passwordIcon,
} from '../../utils/images';
import {
  activeOpacity,
  TYPE_SIGNUP,
  TYPE_LOGIN,
  Constants,
} from '../../utils/constants';
import {SCREEN_NAME} from '../../Navigator';
import {useDispatch, useSelector} from 'react-redux';
import {
  mobileLoginRequest,
  mobileLoginReset,
} from '../../redux/mobile-login-state/MobileLoginAction';
import Loader from '../../components/loader';
import AsyncStorageManager, {LOCAL_KEYS} from '../../utils/AsyncStorageManager';

const Login = ({route, navigation}) => {
  //   const {userType = ''} = route.params;
  const [mmobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const {isLoginLoading, mobileLoginResponse, mobileLoginError} = useSelector(
    state => state.mobileLoginReducer,
  );

  useEffect(() => {
    return () => {
      dispatch(mobileLoginReset());
    };
  }, []);

  useEffect(() => {
    if (mobileLoginResponse) {
      debugger
      if (mobileLoginResponse.status) {
        debugger
        navigation.navigate(SCREEN_NAME.SET_LOCATION_SCREEN);
        AsyncStorageManager.localStorage.storeData(
          LOCAL_KEYS.USER_DATA,
          JSON.stringify(mobileLoginResponse),
        );
        console.log('in mobile login response, ', mobileLoginResponse);
      } else {
        Alert.alert('HungyBingy', "Please Enter Valid login Credentials");
      }
    } else if (mobileLoginError) {
      console.log('in mobile login errorrrr, ', mobileLoginError);
      Alert.alert('HungyBingy', "Please Enter Valid login Credentials");
    }
  }, [mobileLoginResponse, mobileLoginError]);

  const isMobileNoValid = () => {
    if (mmobileNo == '') {
      Alert.alert('HungyBingy', 'Enter Mobile Number');
      return false;
    }
    if (mmobileNo.length < 10) {
      Alert.alert('HungyBingy', 'Enter valid Mobile Number');
      return false;
    }
    if (password == '') {
      Alert.alert('HungyBingy', 'Enter valid Password');
      return false;
    }
    return true;
  };

  return (
    <View style={styles.containerStyle}>
      <ScrollView
        style={{
          width: '100%',
          paddingBottom: 15,
        }}
        containerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, marginHorizontal: 30, alignItems: 'center'}}>
          <Text
            style={{
              marginTop: 20,
              color: Colors.white,
              fontWeight: '400',
              fontSize: 30,
              marginHorizontal: 20,
              textAlign: 'center',
            }}>
            {'LOGIN'}
          </Text>
          <Text
            style={{
              marginTop: 20,
              color: Colors.white,
              fontWeight: '400',
              fontSize: 14,
              textAlign: 'center',
            }}>
            {'Add your details to login'}
          </Text>
          <Image style={{marginTop: 40}} source={loginIcon} />

          {/* mobile number text input */}
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
            <Image source={mobileIcon} />

            <View style={{flex: 1, marginHorizontal: 10}}>
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
                value={mmobileNo}
                editable
                keyboardType="number-pad"
                maxLength={10}
                onChangeText={text => {
                  setMobileNo(text);
                }}
                placeholder="Enter Mobile Number"
                placeholderTextColor={Colors.txtGreyColor}
                selectionColor={Colors.white}
                height={45}
                style={{
                  fontSize: 14,
                  color: Colors.white,
                  fontWeight: '600',
                  marginLeft: 10,
                }}
              />
            </View>

            {mmobileNo.length == 10 && (
              <Image style={{marginRight: 10}} source={checkCircleIcon} />
            )}
          </View>

          {/* password text input */}
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
            <Image source={passwordIcon} />

            <View style={{flex: 1, marginHorizontal: 10}}>
              <Text
                style={{
                  fontSize: 13,
                  marginLeft: 10,
                  fontWeight: '600',
                  color: Colors.colorFC6011,
                }}>
                Password
              </Text>
              <TextInput
                value={password}
                editable
                keyboardType="default"
                secureTextEntry={true}
                onChangeText={text => {
                  setPassword(text);
                }}
                placeholder=""
                placeholderTextColor={Colors.txtGreyColor}
                selectionColor={Colors.white}
                height={45}
                style={{
                  fontSize: 14,
                  color: Colors.white,
                  fontWeight: '600',
                  marginLeft: 10,
                }}
              />
            </View>

            {/* {mmobileNo.length == 10 && (
              <Image style={{marginRight: 10}} source={checkCircleIcon} />
            )} */}
          </View>

          <TouchableOpacity
            style={{alignSelf: 'flex-end', marginTop: 30}}
            onPress={() => {
              navigation.navigate(SCREEN_NAME.RESET_PASSWORD_SCREEN);
            }}>
            <Text
              style={{
                fontSize: 12,
                color: Colors.white,
                textDecorationLine: 'underline',
              }}>
              Forget Password
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (isMobileNoValid()) {
                dispatch(
                  mobileLoginRequest({
                    mobile_number: mmobileNo,
                    user_pass: password,
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
              {`LOGIN`}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(SCREEN_NAME.REGISTRATION);
        }}>
        <Text
          style={{
            fontSize: 14,
            color: Colors.white,
            paddingVertical: 15,
            fontWeight: '400',
          }}>
          Don't have an Account?{' '}
          <Text
            style={{
              fontSize: 14,
              color: Colors.white,
              fontWeight: '700',
            }}>
            Sign Up
          </Text>
        </Text>
      </TouchableOpacity>

      {isLoginLoading && <Loader />}
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

export default Login;
