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
  mobileResetIcon,
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
  otpVerifyRequest,
  otpVerifyReset,
} from '../../redux/otp-verify-state/OtpVerifyAction';
import Loader from '../../components/loader';

const ResetPassword = ({route, navigation}) => {
  //   const {userType = ''} = route.params;
  const [mmobileNo, setMobileNo] = useState('');
  const [type, setType] = useState();

  const dispatch = useDispatch();
  const {isOtpVerifyLoading, otpVerifyResponse, otpVerifyError} = useSelector(
    state => state.otpVerifyReducer,
  );

  useEffect(() => {
    return () => {
      dispatch(otpVerifyReset());
    };
  }, []);

  useEffect(() => {
    if (otpVerifyResponse) {
      if (otpVerifyResponse.status) {
        console.log('jayadeep', otpVerifyResponse);
        dispatch(otpVerifyReset());
        navigation.navigate(SCREEN_NAME.OTP_SCREEN, {
          mobile: mmobileNo,
          OTP: otpVerifyResponse.data.OTP,
        });
      } else {
        Alert.alert('HungyBingy', JSON.stringify(otpVerifyResponse.message));
      }
    } else if (otpVerifyError) {
      Alert.alert('HungyBingy', JSON.stringify(otpVerifyError.message));
    }
  }, [otpVerifyResponse, otpVerifyError]);

  const isMobileNoValid = () => {
    if (mmobileNo == undefined) {
      Alert.alert('HungyBingy', 'Enter Mobile Number');
      return false;
    }
    if (mmobileNo.length < 10) {
      Alert.alert('HungyBingy', 'Enter valid Mobile Number');
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
            {'Reset Password'}
          </Text>
          <Text
            style={{
              width: '80%',
              marginTop: 20,
              color: Colors.white,
              fontWeight: '400',
              fontSize: 14,
              textAlign: 'center',
            }}>
            {
              'Please enter your email to receive a link to create a new password via email'
            }
          </Text>
          <Image style={{marginTop: 40}} source={mobileResetIcon} />

          {/* mobile number text input */}
          <View
            style={{
              marginTop: 50,
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
            {/* <Image source={mobileIcon} /> */}

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
                autoFocus
                editable
                keyboardType="number-pad"
                maxLength={10}
                onChangeText={text => {
                  setMobileNo(text);
                }}
                placeholder="Enter Mobile Number"
                placeholderTextColor={Colors.txtGreyColor}
                selectionColor={Colors.color383838}
                height={45}
                style={{fontSize: 14, color: Colors.white, fontWeight: '600'}}
              />
            </View>

            {mmobileNo.length == 10 && (
              <Image style={{marginRight: 10}} source={checkCircleIcon} />
            )}
          </View>

          <TouchableOpacity
            onPress={() => {
              if (isMobileNoValid()) {
                dispatch(
                  otpVerifyRequest({
                    mobile_number: mmobileNo,
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

      {isOtpVerifyLoading && <Loader />}
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
    backgroundColor: Colors.colorFF1300,
    marginTop: 50,
  },
});

export default ResetPassword;
