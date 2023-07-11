import React from "react";
import { View, Button, Text, TouchableOpacity,ActivityIndicator } from "react-native";

const Counter = ({ currentCount, decrement, increment, height ,item,loading,curitem}) => {
  return (
    <View
      style={{

        height: height,


        alignItems: "center",
        justifyContent: "center",

      }}
    >
      <View style={{ flex: 1, flexDirection: "row" }}>

        <TouchableOpacity
          style={{

            justifyContent: "center",
            flex: 1,





            // minHeight: height / 4,


          }}

          onPress={() => {

            decrement(item);
          }}

        >
          <View

            style={{

              justifyContent: "center",
              flex: 1,
              backgroundColor: "#F3F3F3",
              alignItems: "center",
              alignContent: "center",
              padding: 10,
              borderRadius: 10,




              // minHeight: height / 4,


            }}

          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#FC6011" }}>-</Text>
          </View>
        </TouchableOpacity>

        <View

          style={{

            justifyContent: "center",
            flex: 1,
           
            alignItems: "center",
            alignContent: "center"




            // minHeight: height / 4,


          }}

        >


         { curitem && loading && (curitem.item_id == item.item_id)? <ActivityIndicator size="small" color="#0000ff" />:<Text style={{ fontSize: 14, fontWeight: "bold", color: "#FC6011" }}>{currentCount}</Text>}


        </View>



        <TouchableOpacity
          style={{

            justifyContent: "center",
            flex: 1,





            // minHeight: height / 4,


          }}

          onPress={() => {
            increment(item)

          }}

        >
          <View

            style={{

              justifyContent: "center",
              flex: 1,
              backgroundColor: "#FC6011",
              alignItems: "center",
              alignContent: "center",
              padding: 10,
              borderRadius: 10,





              // minHeight: height / 4,


            }}

          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>+</Text>
          </View>
        </TouchableOpacity>


      </View>

    </View>
  );
};

export default Counter;
