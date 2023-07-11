import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import axios from 'axios';
import {Colors} from '../../utils/colors';
import {activeOpacity, Constants, UserDataManager} from '../../utils/constants';
import {SCREEN_NAME} from '../../Navigator';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorageManager, {LOCAL_KEYS} from '../../utils/AsyncStorageManager';
import {StackActions} from '@react-navigation/native';
import Loader from '../../components/loader';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const NewPasswordScreen = ({route, navigation}) => {
  const [otp, setOtp] = useState('');
  const { mobile} = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const isPasswordValid = () => {
    if (newPassword == '') {
      Alert.alert('HungyBingy', 'Enter Valid New Password');
      return false;
    }
    if (confirmPassword == '') {
      Alert.alert('HungyBingy', 'Enter Valid Confirm Password');
      return false;
    }
    if (newPassword != confirmPassword) {
      Alert.alert('HungyBingy', 'Confirm password not matching');
      return false;
    }
    return true;
  };

  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity
        activeOpacity={activeOpacity}
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
        New Password
      </Text>

      <Text
        style={{
          fontSize: 14,
          alignSelf: 'center',
          marginTop: 20,
          color: Colors.white,
          textAlign: 'center',
          fontWeight: '600',
          width: '75%',
        }}>
        Please enter your email to receive a link to create a new password via
        email
      </Text>

      {/* new password */}
      <View
        style={{
          marginTop: '20%',
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
        <View style={{flex: 1, marginHorizontal: 10}}>
          <TextInput
            value={newPassword}
            editable
            keyboardType="default"
            onChangeText={text => {
              setNewPassword(text);
            }}
            placeholder="New Password"
            placeholderTextColor={Colors.txtGreyColor}
            selectionColor={Colors.white}
            height={45}
            style={{fontSize: 14, color: Colors.white, fontWeight: '600'}}
          />
        </View>
      </View>

      {/* confirm password */}
      <View
        style={{
          marginTop: '15%',
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
        <View style={{flex: 1, marginHorizontal: 10}}>
          <TextInput
            value={confirmPassword}
            editable
            keyboardType="default"
            onChangeText={text => {
              setConfirmPassword(text);
            }}
            placeholder="Confirm Password"
            placeholderTextColor={Colors.txtGreyColor}
            selectionColor={Colors.white}
            height={45}
            style={{fontSize: 14, color: Colors.white, fontWeight: '600'}}
          />
        </View>
      </View>

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
          if (isPasswordValid()) {
            


            axios({
              method: "post",
              url: "https://hungybingy.com/hbmobile/api/Users/userPasswordUpdate",
              data: {
                "mobile_number":mobile,
                "password":newPassword
            },
              headers: { "Content-Type": "application/json", "x-api-key": "hungybingy" },

            })
              .then(function (response) {

                if(response.data.status){
                  
                    // navigation.popToTop();
                   navigation.replace(SCREEN_NAME.LOGIN_SCREEN);
            Alert.alert('HungyBingy', response.data.message??"error");

                }

                
                
                //handle success


              })
              .catch(function (response) {
                //handle error
                console.log(response);

              });




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

      {/* {(false) && (
        <Loader />
      )} */}
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
});

export default NewPasswordScreen;
