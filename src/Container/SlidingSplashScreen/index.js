import React, {useRef} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
  Animated,
  FlatList,
  Dimensions,
} from 'react-native';
import {Colors} from '../../utils/colors';
import {
  checkCircleIcon,
  fbIcon,
  gmailIcon,
  logoIcon,
  mobileIcon,
  splashIcon1,
  splashIcon2,
  splashIcon3,
} from '../../utils/images';
import {activeOpacity, Constants} from '../../utils/constants';
import {SCREEN_NAME} from '../../Navigator';
import {ExpandingDot, ScalingDot} from 'react-native-animated-pagination-dots';
import AsyncStorageManager, {LOCAL_KEYS} from '../../utils/AsyncStorageManager';

const {width, height} = Dimensions.get('window');

const SlidingSplashScreen = ({route, navigation}) => {
  const SLIDER_DATA = [
    {
      key: '1',
      image: splashIcon1,
      title: 'Find Food You Love',
      subTitle:
        'Discover the best foods from over 1,000 restaurants and fast delivery to your doorstep',
    },
    {
      key: '2',
      image: splashIcon2,
      title: 'Fast Delivery',
      subTitle: 'Fast food delivery to your home, office wherever you are',
    },
    {
      key: '3',
      image: splashIcon3,
      title: 'Organic Spices',
      subTitle:
        'Home making food & specialized made spices from direct farm to ur plate',
    },
  ];
  const scrollX = React.useRef(new Animated.Value(0)).current;
  console.log('jayadeep,', scrollX);

  const renderItem = ({item, index}) => (
    <View
      style={{
        width: width,
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        resizeMode="contain"
        style={{
          alignSelf: 'center',
        }}
        source={item.image}
      />
      <Text
        style={{
          marginTop: 30,
          color: Colors.black,
          fontWeight: '400',
          fontSize: 16,
          marginHorizontal: 20,
          textAlign: 'center',
        }}>
        {item.title}
      </Text>
      <Text
        style={{
          width: '60%',
          marginTop: 30,
          color: Colors.color7C7D7E,
          fontWeight: '600',
          fontSize: 13,
          textAlign: 'center',
        }}>
        {item.subTitle}
      </Text>
    </View>
  );

  return (
    <View style={styles.containerStyle}>
      <View style={styles.flex}>
        <FlatList
          data={SLIDER_DATA}
          keyExtractor={item => item.key}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          pagingEnabled
          horizontal
          decelerationRate={'normal'}
          scrollEventThrottle={16}
          renderItem={renderItem}
        />

        <ScalingDot
          data={SLIDER_DATA}
          scrollX={scrollX}
          inActiveDotOpacity={0.3}
          dotSize={10}
          activeDotColor={Colors.red}
          inActiveDotColor={Colors.red}
          dotContainerStyle={{
            top: 30,
          }}
        />
      </View>

      {/* <TouchableOpacity
        onPress={() => {
          //   Next();
          console.log('jayadeep,', scrollX);
        }}
        style={styles.nextBtn}
        activeOpacity={Constants.activeOpacity}>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: height / 45,
            fontFamily: 'SegoeUI-Semibold',
          }}>
          {`Next`}
        </Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        activeOpacity={activeOpacity}
        onPress={() => {
          AsyncStorageManager.localStorage.storeData(
            LOCAL_KEYS.IS_TUTORIAL_SHOWN,
            JSON.stringify(true),
          );
          navigation.replace(SCREEN_NAME.SIGNUP_SCREEN);
        }}>
        <Text style={styles.tCTxtStyle1}>SKIP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  tCTxtStyle1: {
    fontSize: 16,
    color: Colors.black,
    padding: 10,
    marginVertical: 15,
    textDecorationLine: 'underline',
  },
  nextBtn: {
    height: height / 16,
    width: width / 1.6,
    borderRadius: 30,
    marginTop: height / 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#2EAFA2',
  },
});

export default SlidingSplashScreen;
