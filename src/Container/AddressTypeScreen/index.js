import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,

    TouchableOpacity,
    Alert,
    FlatList,
    Dimensions
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

import { Colors } from '../../utils/colors';
import { SCREEN_NAME } from '../../Navigator';
import AsyncStorageManager, { LOCAL_KEYS } from '../../utils/AsyncStorageManager';
import Header from '../../components/header';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');


import Loader from '../../components/loader';
import { addCartItemRequest, addCartItemReset } from '../../redux/add-cart-item/AddCartItemAction';
import { addressCartItemRequest } from '../../redux/address-cart-item/AddressCartItemAction';
import { createCartItemRequest, createCartItemReset } from '../../redux/create-cart-item/CreateCartItemAction';
import { purchaseCartItemRequest, purchaseCartItemReset } from '../../redux/purchase-cart-item/PurchaseCartItemAction';
import { addAddressUsersRequest, addAddressUsersReset } from '../../redux/add-address-users/AddAddressUsersAction';
import { deleteAddressUsersRequest, deleteAddressUsersReset } from '../../redux/delete-address-users/DeleteAddressUsersAction';
import { updateAddressUsersRequest, updateAddressUsersReset } from '../../redux/update-address-users/UpdateAddressUsersAction';


const AddressTypeScreen = ({ route, navigation }) => {
    const { type, order, from } = route.params;
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [userdata, setUserData] = useState(null);
    const [check, uncheck] = useState(false);

    const [selAddress, setSelAddress] = useState("COD");
    const [user, setuser] = useState(null);
    const [profile, setProfile] = useState(null);

    const DATA = [
        {
            addr_id: 'COD',
            name: 'Cash / Pay on Delivery',
            msg:"Pay Cash at Time of Delivery, You can also pay Phonepe at the time of Order",
            isadd: true,
            type: "COD"
        },
        {
            addr_id: 'ONLINE',
            name: 'Pay on Online',
            msg:"You can pay through online via using UPI ID's, Debit/Credit Cards, Wallets etc...",
            isadd: false,
            type: "ONLINE"
        },

    ];
    const [results, setResults] = useState(DATA);


    useEffect(() => {



    }, [isFocused]);





    const renderOurCusinItem = ({ item, index }) => (





        <View

            style={{

                justifyContent: "center",

                alignContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                marginVertical: 10,



                // minHeight: height / 4,


            }}



        >
            <View style={styles.mainCard}>

            <View style={{flex:0.6,marginHorizontal:20, alignItems:"center",justifyContent:"center",alignContent:"center"}}>
                
          <Image
            resizeMode={'cover'}
            width={64}
            height={64}


            source={item.type=="ONLINE"?require('../../assets/images/Online.png'):require('../../assets/images/COD.png')}
          />
                </View>
                <View style={{flex:3}}>
                <View style={styles.innercard}>

                    <View style={styles.innercardtop}>

                        <Text style={{ flex: 3, color: "white", fontSize: 18, fontWeight: "bold", color: "#FC6011" }} >{item.name}</Text>
                        <View style={{
                            flex: 1, justifyContent: "flex-end",

                            alignContent: "center",
                            alignItems: "flex-end"
                        }}>
                            {from == "cart" && <TouchableOpacity
                                style={{

                                    justifyContent: "center",

                                    alignContent: "center",
                                    alignItems: "center",



                                    // minHeight: height / 4,


                                }}

                                onPress={() => {




                                    var datap = item;

                                    if (datap.isadd == false) {
                                        var mainresults = [];

                                        results.forEach((element) => {
                                            var datass = element;
                                            datass.isadd = false
                                            if (datass.addr_id == datap.addr_id) {
                                                setSelAddress(datap.addr_id)
                                                datass.isadd = true

                                            }

                                            mainresults.push(datass);





                                        })

                                        setResults(mainresults)












                                        // setBing(!bing)

                                    }
                                }}

                            >
                                {/* <Image
                      resizeMode={'cover'}
                      style={styles.tinyLogo}
                      source={!item.isadd ? require('../../assets/images/uncheck.png') : require('../../assets/images/check.png')}
                    /> */}

                                <MaterialIcons
                                    name={!item.isadd ? "radio-button-off" : "radio-button-on"}
                                    size={32}
                                    style={{}}
                                    color={'#FFF'}
                                />
                            </TouchableOpacity>}

                        </View>


                    </View>
                    <View style={styles.innercardbottom}>
                         <Text style={styles.values}>{item.msg}</Text>
           




                    </View>
                    



                </View>

                </View>
            </View>

        </View>
    );



    return (
        <View style={styles.container}>
            <Header navigation={navigation}
               
                  
                onBackPress={() => {
                    navigation.goBack();
                }} title={"Payment Options"} headerBgColor={'black'} />
            {/* body */}




            <View style={{ flex: 1, flexDirection: 'column' }}>

                <View style={{ flex: 3.5 }}>
                    <FlatList



                        data={results}
                        keyExtractor={(item, index) => index + ''}

                        numColumns={1}
                        decelerationRate={'normal'}
                        scrollEventThrottle={16}
                        renderItem={renderOurCusinItem}

                    />
                </View>
                <View style={{ flex: from == "cart" ? 0.5 : 0 }}>
                    <TouchableOpacity
                        style={{

                            justifyContent: "center",

                            alignContent: "center",
                            alignItems: "center",
                            height: 50,
                            backgroundColor: "red",
                            marginHorizontal: 80,
                            borderRadius: 40,
                            marginVertical: 10




                            // minHeight: height / 4,


                        }}

                        onPress={() => {



                            // var data = order
                            order["order_type"] = selAddress;
                            // dispatch(createCartItemRequest(data));

                            navigation.navigate(SCREEN_NAME.AddressScreen, { "order": order, "from": from, "orderType": selAddress });

                        }}

                        onPress1={() => {








                        }}

                    >
                        <Text style={{ color: "white", fontSize: 14, fontWeight: "bold", marginHorizontal: 5 }}>Select Address</Text>

                        {/* earncoinPercentage */}

                    </TouchableOpacity>
                </View>


            </View>



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
    mainCard: {
        flex: 1,
        flexDirection:"row",
        flexGrow: 0,
        width: width - 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: "white",
        borderRadius: 10,
        borderWidth: 1


    },
    innercard: {
        flex: 1,
        flexDirection: "column"

    },
    innercardtop: {
        flex: 1,

        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",



    },
    innercardbottom: {

        flex: 2.8,
        flexDirection: "column",
        marginVertical:10


    },
    tinyLogo: {

    },
    values: {
        color: "white",
        fontSize: 18

     
    }

});

export default AddressTypeScreen;
