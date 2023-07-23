import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {Button} from 'native-base';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../utils/colors';
import {logoBg, logoIcon, vizagBgIcon} from '../../utils/images';
import {SCREEN_NAME} from '../../Navigator';
import AsyncStorageManager, {LOCAL_KEYS} from '../../utils/AsyncStorageManager';
import Header from '../../components/header';
import {Constants} from '../../utils/constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  getStoresRequest,
  getStoresReset,
} from '../../redux/get-stores-state/GetStoresAction';
import Loader from '../../components/loader';
import { useIsFocused } from '@react-navigation/native';
const SetLocationScreen = ({route, navigation}) => {
  const [storesList, setStoresList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const {isstoresLoading, getStoresResponse, getStoresError} = useSelector(
    state => state.getStoresReducer,
  );

  useEffect(() => {
    dispatch(getStoresRequest());
    return () => {
      dispatch(getStoresReset());
    };
  }, [isFocused]);

  useEffect(() => {
    if (getStoresResponse) {
      if (getStoresResponse.status) {
        setStoresList(getStoresResponse.Data);
        setSelectedIndex(undefined);
        console.log(' response, ', getStoresResponse.Data);
      } else {
        Alert.alert('HungyBingy', JSON.stringify(getStoresResponse.message));
      }
    } else if (getStoresError) {
      Alert.alert('HungyBingy', JSON.stringify(getStoresError.message));
    }
  }, [getStoresResponse, getStoresError]);

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      activeOpacity={Constants.activeOpacity}
      onPress={() => {
        setSelectedIndex(index);
      }}
      style={{
        width: '45%',
        backgroundColor:
          selectedIndex != undefined && selectedIndex == index
            ? Colors.colorFC6011
            : Colors.white,
        margin: 10,
        borderRadius: 50,
      }}>
      <Text
        style={{
          color:
            selectedIndex != undefined && selectedIndex == index
              ? Colors.white
              : Colors.color6A6A6A,
          fontSize: 12,
          alignSelf: 'center',
          fontWeight: '400',
          paddingVertical: 12,
        }}>
        {item.store_area}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        title={'Location'}
        navigation={navigation}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View
        style={{
          flex: 1,
        }}>
        <Image
          style={{width: '100%'}}
          source={vizagBgIcon}
          resizeMode={'stretch'}
        />
        <View
          style={{
            marginTop: -50,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            backgroundColor: Colors.black,
            flex: 1,
            width: '100%',
            height: 'auto',
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              marginTop: 20,
              color: Colors.colorFC6011,
              fontSize: 25,
              width: '90%',
              alignSelf: 'center',
              fontWeight: '400',
            }}>
            Set Location
          </Text>

          <FlatList
            style={{flex: 1, marginVertical: 10}}
            data={storesList}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={(item, index) => index + ''}
            extraData={selectedIndex}
            showsVerticalScrollIndicator={true}
          />

          <TouchableOpacity
            style={{
              height: 50,
              width: '80%',
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: Colors.colorFF1300,
              marginTop: 15,
              marginBottom: 20,
            }}
            activeOpacity={Constants.activeOpacity}
            onPress={() => {
              if (selectedIndex == undefined) {
                Alert.alert('HungyBingy', 'Please select location.');
                return;
              }
              console.log(
                'in location, ',
                selectedIndex,
                storesList,
                storesList[selectedIndex].store_area,
              );

              AsyncStorageManager.localStorage.storeData(
                LOCAL_KEYS.SELECTED_LOCATION,
                JSON.stringify(storesList[selectedIndex])
              );
              navigation.replace(SCREEN_NAME.TABS_SCREEN);
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Colors.white,
              }}>
              {'NEXT'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {isstoresLoading && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SetLocationScreen;
