import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Alert } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'; // used to navigate from screen to screen
import { List, ListItem, Icon } from "react-native-elements";
import { showMessage, hideMessage } from "react-native-flash-message";

const RequestsPage = () => {

    const navigation = useNavigation()

    const [refreshed, setRefreshed] = useState(false);
    const [buttonEnabled, setButtonEnabled] = useState(true);
    const [button2Enabled, setButton2Enabled] = useState(true);

    const emptyList = [];
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

    const handleRefresh = () => {
        setRefreshed(true);
        showMessage({
            message: "Fetching new orders.",
            type: "info",
        });
    }

    const handleArrival = () => {
        setButtonEnabled(false);
        setButton2Enabled(false);
        showMessage({
            message: "Customers have been notified that you arrived at the restaurant.",
            type: "info",
        });
        navigation.navigate("OrderPickUp"); 
    }

  return (
    <View>
        <Text style={styles.titleText}>Order Summary</Text>
        {
            refreshed ? list.map((item, index) => {
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
            : emptyList.map((item, index) => {
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
        <TouchableOpacity onPress={handleRefresh}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>Refresh</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleArrival}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>Arrived At Restaurant</Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default RequestsPage;

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