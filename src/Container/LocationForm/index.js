import React, { useEffect, useState } from 'react';
import {
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    View,
    TextInput,
    ActivityIndicator,
    Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../utils/colors';
import AsyncStorageManager, { LOCAL_KEYS } from '../../utils/AsyncStorageManager';
import {
    checkCircleIcon,
    loginIcon,
    logoIcon,
    mobileIcon,
} from '../../utils/images';
import {
    activeOpacity,
    TYPE_SIGNUP,
    TYPE_LOGIN,
    Constants,
} from '../../utils/constants';
import { SCREEN_NAME } from '../../Navigator';
import { useDispatch, useSelector } from 'react-redux';
import {
    signupDetailsRequest,
    signupDetailsReset,
} from '../../redux/signup-details-state/SignupDetailsAction';
import Loader from '../../components/loader';

import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import Header from '../../components/header';

import { addAddressUsersRequest,addAddressUsersReset } from '../../redux/add-address-users/AddAddressUsersAction';
import { updateAddressUsersRequest,updateAddressUsersReset } from '../../redux/update-address-users/UpdateAddressUsersAction';
import { addressCartItemReset } from '../../redux/address-cart-item/AddressCartItemAction';


const LocationForm = ({ route, navigation }) => {
      const {address , from} = route.params;
     
      
    const [data, setdata] = useState({
        alt_number: '',
        name: '',
        address: '',
        locality: '',
        landmark: '',
        city: '',
    });

   





    const [userid, setuserid] = useState(null);

    const [type, setType] = useState();
    const [isloc, setIsloc] = useState(false);
    const [mainLoc, setMainLoc] = useState("");
    const dispatch = useDispatch();
    const [location, setLocation] = useState(false);
    const [locname, setLocName] = useState('..Loading');
    const { isSignupDetailsLoading, signupDetailsResponse, signupDetailsError } =
        useSelector(state => state.signupDetailsReducer);


        const {
            addAddressUsersStateLoading,
            addAddressUsersStateResponse,
            addAddressUsersStateError,
          } = useSelector(state => state.addAddressUserReducer);


          const {
            updateAddressUsersStateLoading,
          updateAddressUsersStateResponse,
          updateAddressUsersStateError,
          } = useSelector(state => state.updateAddressUserReducer);


        


    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Geolocation Permission',
                    message: 'Can we access your location?',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );

            if (granted === 'granted') {


                getLocation();
                return true;
            } else {

                return false;
            }
        } catch (err) {
            return false;
        }
    };
    const getLocation = () => {
        const result = requestLocationPermission();
        result.then(res => {

            if (res) {

                Geolocation.getCurrentPosition(
                    position => {
                        setLocation(true);
                        Geocoder.init("AIzaSyDlRbDrP5YrIgVTslPYQyho5wDO_nksibw", { language: "en" });
                        Geocoder.from(position.coords.latitude, position.coords.longitude)

                            .then(json => {




                                var addressComponent = json.results[0].formatted_address;

                                setLocName(addressComponent)


                            })

                            .catch(error => { setLocName("Error") });





                    },
                    error => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                        setLocName(error.message)
                        setLocation(false);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                );
            }
        });

    };

    React.useEffect(() => {
        if (route.params?.post) {


            let data1 = data;
                                    // data1.name = text;
                                   
                                     data1.address= route.params?.post??""
                                    // data1.locality= ''
                                    // data1.landmark= ''
                                    // data1.city= ''
            
                                    setdata({ ...data1 });



            
          // Post updated, do something with `route.params.post`
          // For example, send the post to the server
        }
      }, [route.params?.post]);

    useEffect(() => {
        updateAddressUsersReset()
        addAddressUsersReset()
        getLocationFromAsync();


        let data1 = data;
        data1.name = address.name??"";
        data1.alt_number = address.alt_number??"";
         data1.address= address.address??"";
         data1.locality= address.locality??'';
        data1.landmark= address.landmark??'';
       data1.city= address.city??'';

        setdata({ ...data1 });






        return () => {

            addAddressUsersReset()
            updateAddressUsersReset()
           
        };
    }, []);


    const getLocationFromAsync = async () => {

        let UserData = await AsyncStorageManager.localStorage.retrieveData(
          LOCAL_KEYS.USER_DATA,
        );
        if (UserData != undefined && UserData) {
          var dataUser = JSON.parse(UserData);
       
         
          setuserid(dataUser && 'data' in dataUser ? dataUser["data"]["user_id"] : "");
    
        }
       
    
      };

      useEffect(() => {
        if (updateAddressUsersStateResponse) {
            if (updateAddressUsersStateResponse.status) {
                Alert.alert(
                    'HungyBingy',
                    JSON.stringify(updateAddressUsersStateResponse.message),
                );
                navigation.goBack();
            } else {
                Alert.alert(
                    'HungyBingy',
                    JSON.stringify(addAddressUsersStateResponse.message),
                );
            }
        } else if (updateAddressUsersStateError) {
            Alert.alert('HungyBingy', JSON.stringify(updateAddressUsersStateError.message));
        }
    }, [updateAddressUsersStateResponse, updateAddressUsersStateError]);


      useEffect(() => {
        if (addAddressUsersStateResponse) {
            if (addAddressUsersStateResponse.status) {
                Alert.alert(
                    'HungyBingy',
                    JSON.stringify(addAddressUsersStateResponse.message),
                );
                navigation.goBack();
            } else {
                Alert.alert(
                    'HungyBingy',
                    JSON.stringify(addAddressUsersStateResponse.message),
                );
            }
        } else if (addAddressUsersStateError) {
            Alert.alert('HungyBingy', JSON.stringify(addAddressUsersStateError.message));
        }
    }, [addAddressUsersStateResponse, addAddressUsersStateError]);


    useEffect(() => {
        if (signupDetailsResponse) {
            if (signupDetailsResponse.status) {
                Alert.alert(
                    'HungyBingy',
                    JSON.stringify(signupDetailsResponse.message),
                );
                navigation.goBack();
            } else {
                Alert.alert(
                    'HungyBingy',
                    JSON.stringify(signupDetailsResponse.message),
                );
            }
        } else if (signupDetailsError) {
            Alert.alert('HungyBingy', JSON.stringify(signupDetailsError.message));
        }
    }, [signupDetailsResponse, signupDetailsError]);

    const isRegDataValid = () => {
        if (isloc) {
            data.locality = locname
        }
        if (data.name == '') {
            Alert.alert('HungyBingy', 'Enter Valid Name');
            return false;
        }
        if (data.alt_number == '') {
            Alert.alert('HungyBingy', 'Enter Valid Mobile Number');
            return false;
        }
        if (data.alt_number.length < 10) {
            Alert.alert('HungyBingy', 'Enter valid Mobile Number');
            return false;
        }
        if (data.address == '') {
            Alert.alert('HungyBingy', 'Enter Valid Address');
            return false;
        }

        // if (data.locality == '') {
        //     Alert.alert('HungyBingy', 'Enter Valid Locality');
        //     return false;
        // }
        if (data.landmark == '') {
            Alert.alert('HungyBingy', 'Enter Valid Land Mark');
            return false;
        }
        if (data.city == '') {
            Alert.alert('HungyBingy', 'Enter Valid City');
            return false;
        }
       
        return true;
    };

    const getAddress = (address) =>{

    }

    return (
        <View style={styles.containerStyle}>
            <Header navigation={navigation}
                onBackPress={() => {
                    navigation.goBack();
                }} title={from+" Address"} headerBgColor={'black'} />
            <ScrollView
                style={{
                    width: '100%',
                }}
                containerStyle={{ alignItems: 'center' }}
                showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        marginHorizontal: 30,
                        alignItems: 'center',
                        paddingBottom: 20,
                    }}>



                    {/* name */}
                    <View
                        style={{
                            marginTop: 30,
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
                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <Text
                                style={{
                                    fontSize: 13,
                                    marginLeft: 10,
                                    fontWeight: '600',
                                    color: Colors.colorFC6011,
                                }}>
                                Name
                            </Text>
                            <TextInput
                                value={data.name}
                                editable
                                keyboardType="default"
                                onChangeText={text => {
                                    let data1 = data;
                                    data1.name = text;
                                    setdata({ ...data1 });
                                }}
                                placeholder=""
                                placeholderTextColor={Colors.txtGreyColor}
                                selectionColor={Colors.white}
                                height={45}
                                style={{ fontSize: 14, color: Colors.white, fontWeight: '600' }}
                            />
                        </View>
                    </View>

                    {/* mobile number */}
                    <View
                        style={{
                            marginTop: 30,
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
                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <Text
                                style={{
                                    fontSize: 13,
                                    marginLeft: 10,
                                    fontWeight: '600',
                                    color: Colors.colorFC6011,
                                }}>
                                Mobile No
                            </Text>
                            <TextInput
                                value={data.alt_number}
                                editable
                                keyboardType="number-pad"
                                onChangeText={text => {
                                    let data1 = data;
                                    data1.alt_number = text;
                                    setdata({ ...data1 });
                                }}
                                maxLength={10}
                                placeholder=""
                                placeholderTextColor={Colors.txtGreyColor}
                                selectionColor={Colors.white}
                                height={45}
                                style={{ fontSize: 14, color: Colors.white, fontWeight: '600' }}
                            />
                        </View>
                    </View>


                    {/* <Text
            style={{
              marginTop: 20,
              color: Colors.white,
              fontWeight: '400',
              fontSize: 14,
              textAlign: 'center',
            }}>
            {'Add Location details'}
          </Text> */}


                    <View style={{ flex: 1, flexDirection: 'row',marginTop:0 }}>
                        <Text
                            style={{
                                paddingTop: 20,
                                color: Colors.white,
                                fontWeight: '400',
                                fontSize: 20,
                                textAlign: 'center',
                            }}>
                         {"Select Address From Map"}
                        </Text>
                        <TouchableOpacity
                        style={{
                            paddingTop: 20,
                            color: Colors.white,
                            
                            textAlign: 'center',
                        }}
                            onPress={() => {

                                navigation.navigate(SCREEN_NAME.LocationScreen, { location: mainLoc });

                            }}>
                            <MaterialIcons
                                name={"add-circle-outline"}
                                size={30}
                                color={'#32B768'}
                                style={{ alignSelf: 'center', marginLeft: 1, marginBottom: 15 ,paddingHorizontal:10}}
                            />
                        </TouchableOpacity>
                    </View>



                    {/* Locality */}
                    {/* <View
                        style={{
                         
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
                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        marginLeft: 10,
                                        fontWeight: '600',
                                        color: Colors.colorFC6011,
                                    }}>
                                    Locality
                                </Text>

                            </View>

                            <TextInput
                                value={data.locality}
                               
                                keyboardType="default"
                                onChangeText={text => {
                              
                                        let data1 = data;
                                        data1.locality = text;
                                        setdata({ ...data1 });

                                   

                                }}
                                placeholder=""
                                placeholderTextColor={Colors.txtGreyColor}
                                selectionColor={Colors.white}
                                height={45}
                                style={{ fontSize: 14, color: Colors.white, fontWeight: '600' }}
                            />

                        </View>
                    </View> */}

                    {/* address id */}
                    <View
                        style={{
                            marginTop: 30,
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
                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <Text
                                style={{
                                    fontSize: 13,
                                    marginLeft: 10,
                                    fontWeight: '600',
                                    color: Colors.colorFC6011,
                                }}>
                               Address
                            </Text>
                            <TextInput
                                value={data.address}
                                editable
                               
                                keyboardType="default"
                                onChangeText={text => {
                                    let data1 = data;
                                    data1.address = text;
                                    setdata({ ...data1 });
                                }}
                                placeholder=""
                                placeholderTextColor={Colors.txtGreyColor}
                                selectionColor={Colors.white}
                                height={100}
                                multiline={true}
                                style={{ fontSize: 14, color: Colors.white, fontWeight: '600' }}
                            />
                        </View>
                    </View>

                    {/* create password */}
                    <View
                        style={{
                            marginTop: 20,
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
                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <Text
                                style={{
                                    fontSize: 13,
                                    marginLeft: 10,
                                    fontWeight: '600',
                                    color: Colors.colorFC6011,
                                }}>
                               Land Mark
                            </Text>
                            <TextInput
                                value={data.landmark}
                                editable
                                keyboardType="default"
                            
                                onChangeText={text => {
                                    let data1 = data;
                                    data1.landmark = text;
                                    setdata({ ...data1 });
                                }}
                                placeholder=""
                                placeholderTextColor={Colors.txtGreyColor}
                                selectionColor={Colors.white}
                                height={45}
                                style={{ fontSize: 14, color: Colors.white, fontWeight: '600' }}
                            />
                        </View>
                    </View>

                    {/* confirm password */}
                    <View
                        style={{
                            marginTop: 30,
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
                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <Text
                                style={{
                                    fontSize: 13,
                                    marginLeft: 10,
                                    fontWeight: '600',
                                    color: Colors.colorFC6011,
                                }}>
                               City
                            </Text>
                            <TextInput
                                value={data.city}
                                editable
                                keyboardType="default"
                                onChangeText={text => {
                                    let data1 = data;
                                    data1.city = text;
                                    setdata({ ...data1 });
                                }}
                                placeholder=""
                                placeholderTextColor={Colors.txtGreyColor}
                                selectionColor={Colors.white}
                                height={45}
                                style={{ fontSize: 14, color: Colors.white, fontWeight: '600' }}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            if (isRegDataValid()) {


                                var datass = {
                                    user_id:userid,
                                    alt_number: data.alt_number,
                                    name: data.name,
                                    address: data.address,
                                    locality: data.locality,
                                    landmark: data.landmark,
                                    city:data.city,
                                 
                                }


if(from=="Add"){
    dispatch(
        addAddressUsersRequest(datass),
    );

}else{
    datass["addr_id"] = address.addr_id
    dispatch(
        updateAddressUsersRequest(datass),
    );

}
                               
                            }
                        }}
                        style={styles.loginBtn}
                        activeOpacity={Constants.activeOpacity}>
                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontSize: 16,
                                fontWeight: '600',
                            }}>
                            {from=="Add"?`SUBMIT`:"UPDATE"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
           



            {addAddressUsersStateLoading || updateAddressUsersStateLoading && <Loader />}
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: Colors.black,
        alignItems: 'center',
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
        marginTop: 30,
    },
});

export default LocationForm;
