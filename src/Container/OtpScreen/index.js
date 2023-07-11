import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {Colors} from '../../utils/colors';
import {Constants, UserDataManager} from '../../utils/constants';
import {SCREEN_NAME} from '../../Navigator';
import {useDispatch, useSelector} from 'react-redux';
import {
  otpVerifyRequest,
  otpVerifyReset,
} from '../../redux/otp-verify-state/OtpVerifyAction';
import AsyncStorageManager, {LOCAL_KEYS} from '../../utils/AsyncStorageManager';
import {StackActions} from '@react-navigation/native';
import Loader from '../../components/loader';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const OtpScreen = ({route, navigation}) => {
  const {OTP, mobile} = route.params;
  const [otp, setOtp] = useState('');
  const [displayTimer, setDisplayTimer] = useState(true);
  const [timervalue, setTimervalue] = useState(30);

  const API_OTP = useRef(OTP);

  const dispatch = useDispatch();

  const {isOtpVerifyLoading, otpVerifyResponse, otpVerifyError} = useSelector(
    state => state.otpVerifyReducer,
  );

  useEffect(() => {
    if (otpVerifyResponse) {
      if (otpVerifyResponse.status) {
        console.log('jayadeep-1', otpVerifyResponse);
        API_OTP.current = otpVerifyResponse.data.OTP;
      } else {
        Alert.alert('HungyBingy', JSON.stringify(otpVerifyResponse.message));
      }
    } else if (otpVerifyError) {
      Alert.alert('HungyBingy', JSON.stringify(otpVerifyError.message));
    }
  }, [otpVerifyResponse, otpVerifyError]);

  useEffect(() => {
    if (timervalue > 0) {
      setTimeout(() => {
        setTimervalue(timervalue - 1);
      }, 1000);
    } else {
      setDisplayTimer(false);
    }
  }, [timervalue]);

  useEffect(() => {
    console.log('OTP value', API_OTP.current);

    // RNOtpVerify.getHash().then(console.log).catch(console.log);
    // otpListner();
    return () => {
      //   RNOtpVerify.removeListener();
      dispatch(otpVerifyReset());
    };
  }, []);

  //   const otpListner = () => {
  //     RNOtpVerify.getOtp()
  //       .then(p => {
  //         RNOtpVerify.addListener(otpHandler);
  //       })
  //       .catch(p => console.log(p));
  //   };

  //   const otpHandler = message => {
  //     if (
  //       message == null ||
  //       message == undefined ||
  //       message.includes('Timeout Error.')
  //     ) {
  //       return;
  //     }
  //     let otp = '';
  //     if (type == 'TYPE_SIGNUP') {
  //       otp = /(\d{4})/g.exec(message)[1];
  //     } else {
  //       otp = /(\d{6})/g.exec(message)[1];
  //     }
  //     setOtp(otp);
  //   };

  const isOTPValid = () => {
    if (otp == undefined || otp.trim().length < 6) {
      Alert.alert('HungyBingy', 'Enter Valid OTP');
      return false;
    }
    if (otp != API_OTP.current) {
      Alert.alert('HungyBingy', 'Incorrect OTP');
      return false;
    }
    return true;
  };

  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity
        activeOpacity={Constants.activeOpacity}
        onPress={() => {
          navigation.goBack();
        }}
        style={{marginTop: 10}}>
        <SimpleLineIcons name="arrow-left" size={18} color={Colors.black} />
      </TouchableOpacity>
      <Text
        style={{
          marginTop: 10,
          color: Colors.white,
          fontSize: 25,
          textAlign: 'center',
          width: '90%',
          alignSelf: 'center',
          fontWeight: '400',
        }}>
        We have sent an OTP to your Mobile
      </Text>

      <Text
        style={{
          fontSize: 14,
          alignSelf: 'center',
          marginTop: 20,
          color: Colors.white,
          textAlign: 'center',
          fontWeight: '600',
          width: '90%',
        }}>
        {`Please check your mobile number ${mobile} continue to reset your password`}
      </Text>

      <TextInput
        value={otp}
        maxLength={6}
        onChangeText={text => {
          setOtp(text);
        }}
        selectionColor={Colors.white}
        autoFocus
        editable
        keyboardType="number-pad"
        // letterSpacing={30}
        style={{
          fontSize: 21,
          color: Colors.white,
          backgroundColor: Colors.txtGreyColor,
          borderColor: Colors.colorFC6011,
          borderBottomWidth: 2,
          borderRadius: 0,
          width: 'auto',
          minWidth: '80%',
          paddingHorizontal: 15,
          alignSelf: 'center',
          marginTop: '20%',
          textAlign: 'left',
          letterSpacing: 30,
        }}
      />

      <TouchableOpacity
        style={{width: '90%'}}
        activeOpacity={Constants.activeOpacity}
        onPress={() => {
          if (displayTimer) {
            return;
          }
          dispatch(
            otpVerifyRequest({
              mobile_number: mobile,
            }),
          );
        }}>
        <Text style={styles.txtStyle1}>
          Didn't Received?{` `}
          {displayTimer ? (
            <Text style={styles.txtStyle2}>
              {`00:` + (timervalue < 10 ? `0` + timervalue : timervalue)}
            </Text>
          ) : (
            <Text style={styles.txtStyle2}>Resend OTP</Text>
          )}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginTop: '20%',
          height: 50,
          width: '80%',
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          backgroundColor: Colors.colorFF1300,
        }}
        activeOpacity={Constants.activeOpacity}
        onPress={() => {
          if (isOTPValid()) {
            navigation.replace(SCREEN_NAME.NEW_PASSWORD_SCREEN,{mobile:mobile});
          }
        }}>
        <Text
          style={{
            fontSize: 16,
            color: Colors.white,
          }}>
          {'NEXT'}
        </Text>
      </TouchableOpacity>

      {isOtpVerifyLoading && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: 20,
  },
  flex: {
    flex: 1,
  },
  txtStyle1: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.white,
    marginTop: '10%',
    alignSelf: 'flex-end',
  },
  txtStyle2: {
    fontWeight: '600',
    fontSize: 14,
    color: Colors.white,
    textDecorationLine: 'underline',
  },
});

export default OtpScreen;
