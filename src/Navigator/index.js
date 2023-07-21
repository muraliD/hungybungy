
import React, {useEffect, useState} from 'react';
import { Image, Alert, View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SplashScreen from '../Container/SplashScreen';
import { Colors } from '../utils/colors';
import SlidingSplashScreen from '../Container/SlidingSplashScreen';
import Signup from '../Container/Signup';
import Login from '../Container/Login';
import Registration from '../Container/Registration';
import ResetPassword from '../Container/ResetPassword';
import OtpScreen from '../Container/OtpScreen';
import NewPasswordScreen from '../Container/NewPasswordScreen';
import SetLocationScreen from '../Container/SetlocationScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Container/HomeScreen';
import MenuScreen from '../Container/MenuScreen';
import ProfileScreen from '../Container/ProfileScreen';
import { homeIcon, sideMenuIcon, basketIcon } from '../utils/images';
import { Constants } from '../utils/constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import BrandsScreen from '../Container/AllBrandsScreen';
import BrandsDetailsScreen from '../Container/BrandDetails';
import CartScreen from '../Container/CartScreen';
import { Avatar, Badge, Icon, withBadge } from '@rneui/themed';
import ItemsScreen from '../Container/ItemsScreen';
import AddressScreen from '../Container/AddressListScreen';
import Location from '../Container/LocationScreen';
import LocationForm from '../Container/LocationForm';
import OrdersScreen from '../Container/OrdersListScreen';
import UserProfile from '../Container/userProfile';
import ReferEarn from '../Container/RefererAndEarn';
import ItemDetailsScreen from '../Container/ItemDetailScreen';
import BingyCoinsScreen from '../Container/BingyCoinsScreen';
import AddressTypeScreen from '../Container/AddressTypeScreen';
const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
import { useDispatch, useSelector } from 'react-redux';
const CustomeTabBarBtn = ({ children, onPress }) => (





  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -50,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    activeOpacity={1}>
    <View
      style={{
        width: 130,
        height: 130,
        borderRadius: 100,
        backgroundColor: 'red',
        borderWidth: 30,
        borderColor: Colors.black,
      }}>
      {children}

    </View>
  </TouchableOpacity>
);

const BottomTabsScreen = () => {
  // const [closed, setClosed] = useState(false)

  // useEffect(() => {

    

  //   if (storeAddressUsersStateResponse == "0") {
  //     setClosed(true)
      
      
  //   } else  {
  //     setClosed(false)
  
  //   }
  // }, [storeAddressUsersStateResponse, storeAddressUsersStateError]);


  // const {
   
  //   storeAddressUsersStateLoading,
  //   storeAddressUsersStateResponse,
  //   storeAddressUsersStateError,
  //   } = useSelector(state => state.storeAddressUserReducer);


  const getcartval = () =>{
    var data = "0"

    try{
      data= getCartItemResponse?.cart_list.length??"0"

    }catch(err){

    }

    return data;

   

  }

  


  const {
    isGetCartItemLoading,
    getCartItemResponse,
    getACartItemError,
  } = useSelector(state => state.getCartItemReducer);


  return (
    <BottomTab.Navigator
      initialRouteName={SCREEN_NAME.HOME}
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          width: '100%',
          height: 60,
          paddingVertical: 10,
        },
      }}
      tabBarOptions={{
        showLabel: false,
      }}>
      <BottomTab.Screen
        name={SCREEN_NAME.HOME}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome5
                name="home"
                size={40}
                color={focused ? '#FC6011' : Colors.txtGreyColor}
                style={{ marginBottom: 5 }}
              />
              {/* <Text
                style={{
                  color: focused ? '#FC6011' : Colors.txtGreyColor,
                  fontSize: 12,
                  fontWeight: '500',
                }}>
                Profile
              </Text> */}
            </View>
          ),
          tabBarLabelStyle: () => { },
        }}
      />
      <BottomTab.Screen
        name={SCREEN_NAME.CartScreen}
        component={CartScreen}
        
        options={{
          tabBarLabel: '',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={basketIcon}
                resizeMode={'contain'}
                style={{ alignSelf: 'center' }}
              />
              <Badge
                size="large"
                status="success"
                value={getcartval()}
                containerStyle={{ position: 'absolute', top: - 10, left: 50 }}
              />
            </View>
          ),
          tabBarButton: props => <CustomeTabBarBtn {...props} />,
        }}
      />
      <BottomTab.Screen
        name={SCREEN_NAME.MORE}
        component={MenuScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Foundation
                name="indent-more"
                size={40}
                color={focused ? '#FC6011' : Colors.txtGreyColor}
                style={{ marginBottom: 5 }}
              />
              {/* <Text
                style={{
                  color: focused ? '#FC6011' : Colors.txtGreyColor,
                  fontSize: 12,
                  fontWeight: '500',
                }}>
                More
              </Text> */}
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

function HomeNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREEN_NAME.SPLASH_SCREEN}>

        <Stack.Screen
          name={SCREEN_NAME.Brands}
          component={BrandsScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name={SCREEN_NAME.BrandDetails}
          component={BrandsDetailsScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function Navigators(){

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREEN_NAME.SPLASH_SCREEN}>
        <Stack.Screen
          name={SCREEN_NAME.SPLASH_SCREEN}
          component={SplashScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name={SCREEN_NAME.SLIDING_SPLASH_SCREEN}
          component={SlidingSplashScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name={SCREEN_NAME.SIGNUP_SCREEN}
          component={Signup}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name={SCREEN_NAME.LOGIN_SCREEN}
          component={Login}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name={SCREEN_NAME.REGISTRATION}
          component={Registration}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name={SCREEN_NAME.RESET_PASSWORD_SCREEN}
          component={ResetPassword}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name={SCREEN_NAME.OTP_SCREEN}
          component={OtpScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name={SCREEN_NAME.NEW_PASSWORD_SCREEN}
          component={NewPasswordScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name={SCREEN_NAME.SET_LOCATION_SCREEN}
          component={SetLocationScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />

        <Stack.Screen
          name={SCREEN_NAME.TABS_SCREEN}
          component={BottomTabsScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name={SCREEN_NAME.Brands}
          component={BrandsScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name={SCREEN_NAME.BrandDetails}
          component={BrandsDetailsScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name={SCREEN_NAME.CartScreen}
          component={CartScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name={SCREEN_NAME.ItemsScreen}
          component={ItemsScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name={SCREEN_NAME.AddressScreen}
          component={AddressScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name={SCREEN_NAME.LocationScreen}
          component={Location}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name={SCREEN_NAME.LocationForm}
          component={LocationForm}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name={SCREEN_NAME.OrdersScreen}
          component={OrdersScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
         <Stack.Screen
          name={SCREEN_NAME.UserProfile}
          component={UserProfile}
          options={{ headerShown: false, gestureEnabled: false }}
        />
         <Stack.Screen
          name={SCREEN_NAME.ReferEarn}
          component={ReferEarn}
          options={{ headerShown: false, gestureEnabled: false }}
        />
         <Stack.Screen
          name={SCREEN_NAME.ItemDetailsScreen}
          component={ItemDetailsScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name={SCREEN_NAME.BingyCoinsScreen}
          component={BingyCoinsScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
         <Stack.Screen
          name={SCREEN_NAME.AddressTypeScreen}
          component={AddressTypeScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const SCREEN_NAME = {
  HOME_SCREEN: 'HOME_SCREEN',
  SPLASH_SCREEN: 'SPLASH_SCREEN',
  SLIDING_SPLASH_SCREEN: 'SLIDING_SPLASH_SCREEN',
  LOGIN_SCREEN: 'LOGIN_SCREEN',
  SIGNUP_SCREEN: 'INFO_SCREEN',
  OTP_SCREEN: 'OTP_SCREEN',
  HOME: 'Home',
  REGISTRATION: 'REGISTRATION',
  RESET_PASSWORD_SCREEN: 'RESET_PASSWORD_SCREEN',
  NEW_PASSWORD_SCREEN: 'NEW_PASSWORD_SCREEN',
  SET_LOCATION_SCREEN: 'SET_LOCATION_SCREEN',
  TABS_SCREEN: 'TABS_SCREEN',
  HOME: 'Home',
  PROFILE: 'Profile',
  MORE: 'MORE',
  Brands: 'Brands',
  BrandDetails: 'BrandDetails',
  CartScreen: 'CartScreen',
  ItemsScreen: 'ItemsScreen',
  AddressScreen: 'AddressScreen',
  LocationScreen:"LocationScreen",
  LocationForm:"LocationForm",
  OrdersScreen:"OrdersScreen",
  UserProfile:"UserProfile",
  ReferEarn:"ReferEarn",
  ItemDetailsScreen:"ItemDetailsScreen",
  BingyCoinsScreen:"BingyCoinsScreen",
  AddressTypeScreen:"AddressTypeScreen"
};

export default Navigators;
