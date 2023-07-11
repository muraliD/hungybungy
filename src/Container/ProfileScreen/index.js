import React, {useEffect} from 'react';
import {View, Image, Text, StyleSheet, ImageBackground} from 'react-native';
import {Button} from 'native-base';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../utils/colors';
import {logoBg, logoIcon} from '../../utils/images';
import {SCREEN_NAME} from '../../Navigator';
import AsyncStorageManager, {LOCAL_KEYS} from '../../utils/AsyncStorageManager';

const ProfileScreen = ({route, navigation}) => {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Text style={{color: Colors.white, fontSize: 21, fontWeight: '700'}}>
        Coming Soon
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileScreen;
