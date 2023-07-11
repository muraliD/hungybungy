import React, {useEffect,useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
  Dimensions
} from 'react-native';
import {Button} from 'native-base';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../utils/colors';
import {logoBg, logoIcon} from '../../utils/images';
import {SCREEN_NAME} from '../../Navigator';
import AsyncStorageManager, {LOCAL_KEYS} from '../../utils/AsyncStorageManager';
import Header from '../../components/header';
import {Constants} from '../../utils/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
const { width, height } = Dimensions.get('window');
import Loader from '../../components/loader';
import {
  getOurBrandsRequest,
  getOurBrandsReset,
} from '../../redux/get-our-brands/GetOurBrandsAction';

import {
  getPopularCuisinesRequest,
  getPopularCuisinesReset,
} from '../../redux/get-popular-cuisines/GetPopularCuisinesAction';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const BrandsScreen = ({route, navigation}) => {
  const { type } = route.params;
  const dispatch = useDispatch();

  const [userdata,setUserData] = useState(null);

  const {
    isLoginLoading,
    mobileLoginResponse,
    mobileLoginError,
  } = useSelector(state => state.mobileLoginReducer);


  const {
    isPopularCuisinesLoading,
    getPopularCuisinesResponse,
    getPopularCuisinesError,
  } = useSelector(state => state.getPopularCuisinesReducer);


  const { isOurBrandsLoading, getOurBrandsResponse, getOurBrandsError } =
  useSelector(state => state.getOurBrandsReducer);

  useEffect(() => {

    getUserDate();

    

  }, []);
  useEffect(() => {
    if (getPopularCuisinesResponse) {
      
      if (getPopularCuisinesResponse.status) {
        console.log('in our cuisines response, ', getPopularCuisinesResponse);
      } else {
        // Alert.alert(
        //   'HungyBingy',
        //   JSON.stringify(getPopularCuisinesResponse.message),
        // );
      }
    } else if (getPopularCuisinesError) {
      Alert.alert(
        'HungyBingy',
        JSON.stringify(getPopularCuisinesError.message),
      );
    }
  }, [getPopularCuisinesResponse, getPopularCuisinesError]);


  useEffect(() => {

    if (getOurBrandsResponse) {
      if (getOurBrandsResponse.status) {
        console.log('in our brands response, ', getOurBrandsResponse);
      } else {
        // Alert.alert('HungyBingy', JSON.stringify(getOurBrandsResponse.message));
      }
    } else if (getOurBrandsError) {
      Alert.alert('HungyBingy', JSON.stringify(getOurBrandsError.message));
    }
  }, [getOurBrandsResponse, getOurBrandsError]);

  getUserDate = async ()=>{


    let UserData = await AsyncStorageManager.localStorage.retrieveData(
      LOCAL_KEYS.USER_DATA,
    );
    if (UserData != undefined && UserData) {
      setUserData(JSON.parse(UserData));
    
    } 
    let location = await AsyncStorageManager.localStorage.retrieveData(
      LOCAL_KEYS.SELECTED_LOCATION,
    );

    if (location) {
      var loc = JSON.parse(location)
     
      var request = {
        "location_id":loc.store_id,
        "limit_num":""
    }
if(type == "All Brands"){
 


  dispatch(getOurBrandsRequest(request));

}else{
  dispatch(getPopularCuisinesRequest(request));
}

    
      
    }

  }
  useEffect(() => {

    console.log(mobileLoginResponse);


  }, [mobileLoginResponse]);

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  const renderOurBrandItem = ({ item, index }) => (
    <TouchableOpacity
                
    style={{

      justifyContent: "center",

      alignContent: "center",
      alignItems: "center",
      width: width / 2,

   

      // minHeight: height / 4,


    }}

    onPress={() => {
   
      navigation.navigate(SCREEN_NAME.BrandDetails,item);
    }}

  >
    <View
      style={{
      
        marginVertical: 10,
    
        // minHeight: height / 4,
       
      }}>
      <View
        style={{
          width: width/2-25,
          height: height / 3.7,
          backgroundColor: 'white',
          borderRadius: 15,
          paddingHorizontal: 30,
          paddingVertical: 10,
        }}>
        <View>{item.item_image_path ? <Image
          style={{ height: 123 }}
          resizeMode="contain"
          source={{
            uri: item.item_image_path,
          }}
        /> : null}
        </View>
        <Text
          style={{
            marginTop: 5,
            color: Colors.black,
            fontSize: 13,
            fontWeight: '400',
          }}>
          {item.brand_name}
        </Text>
        <Text
         numberOfLines={2} ellipsizeMode='tail'
          style={{
            color: Colors.black,
            fontSize: 8,
            fontWeight: '400',
          }}>
          {item.brand_content}
        </Text>
        <Text style={{ color: 'red', fontSize: 16, fontWeight: '500' }}>
          ₹250.00
        </Text>
      </View>

      <View>{item.brand_file_url ? <Image
        style={{
          width: 60,
          height: 60,
          marginTop: -30,
          backgroundColor: Colors.white,
          alignSelf: 'flex-end',
          marginRight: 5,
          borderRadius: 60,
        }}
        resizeMode="contain"
        source={{
          uri: item.brand_file_url,
        }}
      /> : null}
      </View>
    </View>
    </TouchableOpacity>
  );

  const renderOurCusinItem = ({ item, index }) => (
    <TouchableOpacity
                
    style={{

      justifyContent: "center",

      alignContent: "center",
      alignItems: "center",
      width: width / 2,

   

      // minHeight: height / 4,


    }}

    onPress={() => {

      navigation.navigate(SCREEN_NAME.ItemsScreen,{type:"Cuisine",item:item});

   
      // navigation.navigate(SCREEN_NAME.BrandDetails,item);
    }}

  >
    <View
      style={{
      
        marginVertical: 10,
       
    
        // minHeight: height / 4,
       
      }}>
       <View>{item.cuisine_file_url ? <Image
        style={{
          width: 120,
          height: 120,
          backgroundColor: 'red',
          borderRadius: 80,
        }}
        resizeMode="contain"
        source={{
          uri: item.cuisine_file_url,
        }}
      /> : null}
      </View>
      <Text
        style={{
          marginTop: 7,
          color: Colors.white,
          fontSize: 12,
          
          fontWeight: '400',
          paddingHorizontal: 5,
          alignSelf: 'center',
          textAlign: 'center',
        }}>
        {item.cuisine_name}
      </Text>
    </View>
    </TouchableOpacity>
  );
  


  return (
    <View style={styles.container}>
      <Header navigation={navigation}
        onBackPress={() => {
          navigation.goBack();
        }} title={type} headerBgColor={'black'} />
      {/* body */}
     
     {type=="All Brands"?getOurBrandsResponse && getOurBrandsResponse.Data?.length > 0 && (
            <View >
             

              <FlatList
              columnWrapperStyle={{ 
              
              } }
            
                data={getOurBrandsResponse?.Data ?? []}
                keyExtractor={(item, index) => index + ''}
            
                numColumns={2}
                decelerationRate={'normal'}
                scrollEventThrottle={16}
                renderItem={renderOurBrandItem}
               
              />
            </View>
          ):getPopularCuisinesResponse && getPopularCuisinesResponse.Data?.length > 0 && (
            <View >
             

              <FlatList
              columnWrapperStyle={{ 
              
              } }
            
                data={getPopularCuisinesResponse?.Data ?? []}
                keyExtractor={(item, index) => index + ''}
            
                numColumns={2}
                decelerationRate={'normal'}
                scrollEventThrottle={16}
                renderItem={renderOurCusinItem}
               
              />
            </View>
          )}
          {(isOurBrandsLoading || isPopularCuisinesLoading) && <Loader />}
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingBottom: 50,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default BrandsScreen;
