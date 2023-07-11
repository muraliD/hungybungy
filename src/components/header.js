import React, {useMemo} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  Pressable,
  StatusBar,
  Alert,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SCREEN_NAME} from '../Navigator';
import AsyncStorageManager, {LOCAL_KEYS} from '../utils/AsyncStorageManager';
import {Colors} from '../utils/colors';
import {activeOpacity} from '../utils/constants';

const {width, height} = Dimensions.get('window');

const Header = ({
  title,
  right,
  navigation,
  onBackPress,
  image = undefined,
  imageOnPress,
  headerBgColor = Colors.black,
}) => {
  // const screenType = navigation.getState().type;

  // const toggleDrawer = () => {
  //   navigation.openDrawer();
  // };

  const goBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else BackHandler.exitApp();
  };

  const headerLeftIconPress = useMemo(() => {
    return onBackPress ? onBackPress : goBack;
  }, [navigation]);

  return (
    <View>
      <StatusBar
        animated={true}
        backgroundColor={Colors.white}
        barStyle="dark-content"
      />
      <View style={[styles.container, {backgroundColor: headerBgColor}]}>
        <View style={{flex: 1, flexDirection: 'row', paddingTop: 10}}>
          {onBackPress && (
            <Pressable style={styles.bolck} onPress={onBackPress}>
              <Icon
                name="arrow-left"
                size={height / 45}
                style={{}}
                color={'#FFF'}
              />
            </Pressable>
          )}
          <View style={styles.middleBox}>
            <Text style={[styles.headerTxt, {color: '#FFF'}]}>{title}</Text>
          </View>
          {right && (
            <TouchableOpacity
              style={[styles.bolck, {justifyContent: 'flex-end'}]}
              activeOpacity={activeOpacity}
              onPress={() => {
                imageOnPress();
              }}>
              <View>
              <MaterialIcons
                name={"add"}
                size={34}
                style={{}}
                color={'#FFF'}
              />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 55,
    paddingBottom: 10,
  },
  middleBox: {
    width: '65%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTxt: {
    // alignSelf: 'center',
    fontSize: 20,
    paddingRight: 10,
    fontWeight: '400',
    lineHeight: 27,
    paddingLeft: 25,
    fontFamily: 'SegoeUI-Semibold',
  },
  bolck: {
    // flex: 7.5,
    flexDirection: 'row',
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    marginLeft: 20,
    color: '#fff',
  },
  hamburgerIcon: {
    height: 21,
    width: 21,
    marginLeft: 20,
  },
  userIcon: {
    width: height / 40,
  },
});

export default Header;
