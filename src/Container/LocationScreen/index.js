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
import Header from '../../components/header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../utils/colors';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { APP_KEYS } from '../../utils/environment';


import { Dimensions } from 'react-native';

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
import { flexbox } from 'native-base/lib/typescript/theme/styled-system';


const Location = ({ route, navigation }) => {
    //   const {userType = ''} = route.params;
    const [data, setdata] = useState({
        mobile_number: '',
        name: '',
        email: '',
        locality: '',
        create_pass: '',
        confirm_pass: '',
    });
    const [type, setType] = useState();
    const [isloc, setIsloc] = useState(false);

    const dispatch = useDispatch();
    const [location, setLocation] = useState(false);
    const [locname, setLocName] = useState('..Loading');
    const [latitude, setLatitude] = useState(21.7679);
    const [longitude, setLongitude] = useState(78.8718);
    const [region, setRegion] = useState(null);
    const [pin, setPin] = useState({
        latitude: 21.7679,
        longitude: 78.8718,
    });


    const { isSignupDetailsLoading, signupDetailsResponse, signupDetailsError } =
        useSelector(state => state.signupDetailsReducer);


    const requestLocationPermission = async () => {

    };
    const getAddessFromPin = async () => {




        return ""

    }
    const getLocation = async () => {


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
                

                if(!location){

                Geolocation.getCurrentPosition(
                    position => {
                        
                        setLocation(true);
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude)
                        setRegion({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: 0.025,
                            longitudeDelta: 0.025,
                        })
                        // setPin(position.coords)
                        Geocoder.init(APP_KEYS.GOOGLE_KEY, { language: "en" });
                        Geocoder.from(position.coords.latitude, position.coords.longitude)

                            .then(json => {



                                var addressComponent = json.results[0].formatted_address;

                                // console.log(addressComponent);

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
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 3600000 },
                );

                }



            }
        } catch (err) {
            setLocName("Error")
        }



    };

    useEffect(() => {
        getLocation()
        return () => {


        };
    }, []);

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
        if (data.mobile_number == '') {
            Alert.alert('HungyBingy', 'Enter Valid Mobile Number');
            return false;
        }
        if (data.mobile_number.length < 10) {
            Alert.alert('HungyBingy', 'Enter valid Mobile Number');
            return false;
        }
        if (data.email == '') {
            Alert.alert('HungyBingy', 'Enter Valid Email');
            return false;
        }

        if (data.locality == '') {
            Alert.alert('HungyBingy', 'Enter Valid Locality');
            return false;
        }
        if (data.create_pass == '') {
            Alert.alert('HungyBingy', 'Enter Valid Create Password');
            return false;
        }
        if (data.confirm_pass == '') {
            Alert.alert('HungyBingy', 'Enter Valid Confirm Password');
            return false;
        }
        if (data.create_pass != data.confirm_pass) {
            Alert.alert('HungyBingy', 'Confirm password not matching');
            return false;
        }
        return true;
    };

    return (
        <View style={styles.containerStyle}>
            <Header navigation={navigation}
                onBackPress={() => {
                    navigation.goBack();
                }} title={"Select Address"} headerBgColor={'black'} />
            <View style={{    position: 'absolute',
                        left: '50%',
                        width:Dimensions.get('window').width,
                      
                    
                        zIndex: 1, top: 70, left: 0}}>


                <GooglePlacesAutocomplete
                    currentLocation={true}
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data);
                        console.log("muralii");
                        console.log(details);

                        Geocoder.from(details.description)
                            .then(json => {
                                var location = json.results[0].geometry.location;
                                console.log(location);
                                setLocName(details.description)
                                setRegion({
                                    latitude: location.lat,
                                    longitude: location.lng,
                                    latitudeDelta: 0.025,
                                    longitudeDelta: 0.025,
                                })
                            })
                            .catch(error => console.warn(error));









                    }}
                    query={{
                        key: APP_KEYS.GOOGLE_KEY,
                        language: 'en',
                    }}
                    styles={{
                        textInputContainer: {

                            paddingHorizontal: 10,
                            width: Dimensions.get('window').width
                        },
                        textInput: {
                           
                            color: '#5d5d5d',
                            fontSize: 16,
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb',
                        },
                    }}
                />
            </View>

            <View style={{ flex: 3.5, paddingLeft: 10 }}>

                <View style={styles.map}>
                    <View style={{
                        position: 'absolute',
                        left: '50%',
                        marginLeft: -24,
                        marginTop: -48,

                        zIndex: 1, top: "50%", left: "50%"

                    }}>
                        <Image
                         source={require('../../assets/images/pinimp.png')}

                            // source={{ uri: "https://img.freepik.com/premium-vector/home-pin-map-icon-home-location-red-icon-vector-eps-10_532800-222.jpg" }}
                            style={{ height: 50, width: 50 }}
                            resizeMode="contain"


                        >






                        </Image>



                    </View>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={StyleSheet.absoluteFillObject}
                        showsUserLocation={true}
                        loadingEnabled={true}

                        showsMyLocationButton={true}
                        // onPress={(e) => {

                        //     setPin(e.nativeEvent.coordinate);
                        //     Geocoder.from(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)

                        //         .then(json => {



                        //             var addressComponent = json.results[0].formatted_address;

                        //             // console.log(addressComponent);

                        //             setLocName(addressComponent)


                        //         })

                        //         .catch(error => { setLocName("Error") });
                        // }}
                        onRegionChangeComplete={(region) => {
                            setRegion(region)

                            setPin({ latitude: region.latitude, longitude: region.longitude });

                            Geocoder.from(region.latitude, region.longitude)

                                .then(json => {



                                    var addressComponent = json.results[0].formatted_address;

                                    // console.log(addressComponent);

                                    setLocName(addressComponent)


                                })

                                .catch(error => { setLocName("Error") });

                        }}
                        onRegionChange={(region) => {



                            // setPin(e.nativeEvent.coordinate);
                        }}

                        region={region}
                    >
                        {/* <Marker

                        onDragStart={e => {
                            debugger
                            setPin(e.nativeEvent.coordinate);

                            Geocoder.from(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)

                                .then(json => {



                                    var addressComponent = json.results[0].formatted_address;

                                    // console.log(addressComponent);

                                    setLocName(addressComponent)


                                })

                                .catch(error => { setLocName("Error") });
                        }}
                        draggable={true}

                        coordinate={pin}
                        onDragEnd={e => {
                            debugger
                            setPin(e.nativeEvent.coordinate);
                        }} >
                    </Marker> */}
                    </MapView>


                   

                </View>


            </View>

            <View style={{ flex: 0.7 ,marginTop:5, marginLeft:15,flexDirection:"column",alignContent:"center",justifyContent:"center",alignItems:"center"}}>
            <Text style={{  flex: 0.5,color:"white" ,width:Dimensions.get('window').width}}>{locname}</Text>
            <TouchableOpacity
            style={{
                flex: 0.5,
              justifyContent: "center",


width:300,
              alignContent: "center",
              alignItems: "center",
              marginBottom:10,
             borderRadius:50,
              backgroundColor: "red",
            
      
        




              // minHeight: height / 4,


            }}

            onPress={() => {

               
                navigation.navigate({
                    name: SCREEN_NAME.LocationForm,
                    params: { post: locname },
                    merge: true,
                  });

            }}

            onPress1={() => {








            }}

          >
            <Text style={{ color: "white", height:30,fontSize: 20 }}>{"Select Your Address!"}</Text>

          </TouchableOpacity>
            <View>




</View>
            </View>

            {isSignupDetailsLoading && <Loader />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,

        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        height: "100%",

        width: Dimensions.get('window').width


    },
    containerStyle: {
        flex: 1,
        backgroundColor: Colors.black,
        alignItems: 'center',
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

export default Location;
