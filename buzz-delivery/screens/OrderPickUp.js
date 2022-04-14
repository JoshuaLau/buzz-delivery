import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, ScrollView, Image } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'; // used to navigate from screen to screen
import { List, ListItem, Icon } from "react-native-elements";
import { showMessage, hideMessage } from "react-native-flash-message";
import { updateOrderStage } from '../firebase';
import { render } from 'react-dom';
import Card from '../components/card';


const OrderPickUp = () => {

    const navigation = useNavigation()


    const list = [{ //populate from backend
        name: 'Bill Jones',
        order: 'Onion rings'
    }, {
        name: 'John Smith',
        order: 'fries'
    }, 
    {
        name: 'Steve Miller',
        order: 'fries'
    },
    {
        name: 'Rick Sanchez',
        order: 'Cheeseburger with Extra Pickles'
    },
    {
        name: 'Morty Smith',
        order: 'Milkshake, Apple Pie'
    }, 
    {
        name: 'Jerry Smith',
        order: 'Chicken Nuggets'
    }]

    const handleDeliverFood = () => {
        showMessage({
            message: "Delivery has begun. Customers have been notified.",
            type: "info",
          });
        //updateOrderStage("Returning"); won't work until we setup auth
        navigation.navigate("DriverTracking")
    }


  return (
      <View>
        <Image
        style={styles.icon}
        source={require('../assets/delivery_icon.png')}
        />
        <Text style={styles.bigText}> Heading To: West Village</Text>
          <Text style={styles.titleText}>Order Summary</Text>
          <View style={{maxHeight: "40%"}}>
          <ScrollView>
        {
           list.map((item, index) => {
            return <ListItem
            Component={Card}
            containerStyle={{}}
            disabledStyle={{ opacity: 0.5 }}
            key={index}
            pad={20}
          >
            <ListItem.Content>
              <ListItem.Title>
                <Text>{item.name}</Text>
              </ListItem.Title>
              <ListItem.Subtitle>
                <Text>{item.order}</Text>
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
           })
        }
        </ScrollView>
        </View>
    <TouchableOpacity onPress={handleDeliverFood}>
    <View style={styles.button}>
      <Text style={styles.buttonText}>Deliver to Campus</Text>
    </View>
    </TouchableOpacity>    
      </View>
    
  )
}

export default OrderPickUp

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor:'#f01d71',
        marginTop:40
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center'
    }, 
    titleText: {
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10
    }, 
    icon: {
      alignSelf: 'center',
      backgroundColor: 'white',
      width: 240,
      height: 165
    },
    bigText: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 30,
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 10
    }

})