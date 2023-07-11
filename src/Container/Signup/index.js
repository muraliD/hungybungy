import {background} from 'native-base/lib/typescript/theme/styled-system';
import React, {useEffect, useState, useRef} from 'react';
import {Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../utils/colors';
import {logoIcon, orangeTopShapeIcon} from '../../utils/images';
import {activeOpacity, Constants} from '../../utils/constants';
import {SCREEN_NAME} from '../../Navigator';
import AsyncStorageManager, {LOCAL_KEYS} from '../../utils/AsyncStorageManager';

const Signup = ({route, navigation}) => {
  return (
    <View style={styles.containerStyle}>
      <View style={{height: '50%'}}>
        <Image
          style={{
            position: 'absolute',
            top: -10,
            left: 0,
            width: '100%',
          }}
          source={orangeTopShapeIcon}
          resizeMode="cover"
        />
        <View style={styles.flex} />
        <Image
          style={{
            width: '35%',
            height: '30%',
            alignSelf: 'center',
            marginBottom: -40,
          }}
          source={logoIcon}
          resizeMode="contain"
        />
      </View>

      <View
        style={{
          height: '50%',
          marginHorizontal: 20,
          alignItems: 'center',
          marginTop: 50,
        }}>
        <Text
          style={{
            height: '50%',
            width: '80%',
            color: Colors.black,
            fontWeight: '600',
            fontSize: 13,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          {
            'Discover the best foods from over 1,000+ Spices and fast delivery to your doorstep'
          }
        </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(SCREEN_NAME.LOGIN_SCREEN);
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

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(SCREEN_NAME.REGISTRATION);
          }}
          style={styles.creatAcctBtn}
          activeOpacity={Constants.activeOpacity}>
          <Text
            style={{
              color: '#FF1300',
              fontSize: 16,
              fontWeight: '600',
            }}>
            {`CREATE AN ACCOUNT`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.white,
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
  },
  creatAcctBtn: {
    height: 50,
    width: '80%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF1300',
    marginTop: 20,
  },
});

export default Signup;
