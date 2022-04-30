import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Alert } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'; // used to navigate from screen to screen
import { List, ListItem, Icon } from "react-native-elements";
import { showMessage, hideMessage } from "react-native-flash-message";

const OrderPickUp = () => {

    const [buttonEnabled, setButtonEnabled] = useState(true);
    const [button2Enabled, setButton2Enabled] = useState(false);

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
        setButtonEnabled(false);
        setButton2Enabled(true);
        showMessage({
            message: "Delivery has begun. Customers have been notified.",
            type: "info",
          });
    }

    const handleArrival = () => {
        setButton2Enabled(false);
        showMessage({
            message: "Customers have been notified that you've arrived!",
            type: "success",
          });
    }


  return (
      <View>
          <Text style={styles.titleText}>Order Summary</Text>
        {
           list.map((item, index) => {
            return <ListItem
            Component={TouchableHighlight}
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
    <TouchableOpacity disabled={!buttonEnabled} onPress={handleDeliverFood}>
    <View style={[styles.button, {opacity: buttonEnabled ? 1 : 0.2}]}>
      <Text style={styles.buttonText}>Deliver to Campus</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity disabled={!button2Enabled} onPress={handleArrival}>
    <View style={[styles.button, {opacity: button2Enabled ? 1 : 0.2}]}>
      <Text style={styles.buttonText}>Arrived On Campus</Text>
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
        marginTop: 40,
        marginBottom: 10
    }
})