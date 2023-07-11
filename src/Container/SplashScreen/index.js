import React, {useEffect} from 'react';
import {View, Image, Text, StyleSheet, ImageBackground} from 'react-native';
import {Button} from 'native-base';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../utils/colors';
import {logoBg, logoIcon} from '../../utils/images';
import {SCREEN_NAME} from '../../Navigator';
import AsyncStorageManager, {LOCAL_KEYS} from '../../utils/AsyncStorageManager';

const SplashScreen = ({route, navigation}) => {

  const navigate = async () => {
    let isTutorialShown = await AsyncStorageManager.localStorage.retrieveData(
      LOCAL_KEYS.IS_TUTORIAL_SHOWN,
    );
    isTutorialShown = JSON.parse(isTutorialShown);
    if (isTutorialShown != undefined && isTutorialShown) {
      let UserData = await AsyncStorageManager.localStorage.retrieveData(
        LOCAL_KEYS.USER_DATA,
      );
      if (UserData != undefined && UserData) {
        navigation.replace(SCREEN_NAME.TABS_SCREEN);
      } else {
        navigation.replace(SCREEN_NAME.SIGNUP_SCREEN);
      }
    } else {
      navigation.replace(SCREEN_NAME.SLIDING_SPLASH_SCREEN);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      navigate();
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Image source={logoBg} resizeMode="cover" style={styles.backdrop} />
      </View>
      <View style={styles.overlay}>
        <Image style={styles.logo} source={logoIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    backgroundColor: 'transparent',
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default SplashScreen;
