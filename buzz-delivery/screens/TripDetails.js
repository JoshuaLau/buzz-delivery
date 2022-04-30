import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'; // used to navigate from screen to screen
import { List, ListItem, Icon } from "react-native-elements";
import { showMessage, hideMessage } from "react-native-flash-message";

const TripDetails = () => {

    const navigation = useNavigation()

    const [inputField, setInputField] = useState({
        restaurantName: '',
        menuLink: '',
        dropLocation: '',
        estimatedTime: '',
        maxRequests: 0
    })

    const inputHandler = (e) => {
        setInputField( {[e.target.name]: e.target.value})
    }

    const handleTripConfirmation = () => {
        showMessage({
            message: "Trip details have been posted! Customers can now request an order.",
            type: "info",
          });
        // navigation.navigate("OrderPickUp");
        navigation.navigate("DriverStatusUpdate");
        //   navigation.navigate("RequestsPage");
          // eventuall connect to FireBase to store trip info
    }


  return (
        <View>

            <Text style={styles.titleText}>Trip Details</Text>

            <Text style={styles.promptText}> Name of Restaurant </Text>
            <TextInput
            style = {styles.input}
            value = {inputField.restaurantName}
            onChange = {inputHandler}>
            </TextInput>


            <Text style={styles.promptText}> Link to Menu </Text>
            <TextInput
            style = {styles.input}
            value = {inputField.menuLink}
            onChange = {inputHandler}>
            </TextInput>

            <Text style={styles.promptText}> Drop-Off Location </Text>
            <TextInput
            style = {styles.input}
            value = {inputField.dropLocation}
            onChange = {inputHandler}>
            </TextInput>

            <Text style={styles.promptText}> Estimated Time of Arrival </Text>
            <TextInput
            style = {styles.input}
            value = {inputField.estimatedTime}
            onChange = {inputHandler}>
            </TextInput>

            <Text style={styles.promptText}> Maximum Requests </Text>
            <TextInput
            style = {styles.input}
            type = "number"
            value = {inputField.maxRequests}
            onChange = {inputHandler}>
            </TextInput>

            <TouchableOpacity onPress={handleTripConfirmation}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Post Trip</Text>
                </View>
            </TouchableOpacity>
    
        </View>
    
  )
}

export default TripDetails

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
    },
    promptText: {
        fontSize: 16,
        textAlign: 'left',
        marginLeft: 10
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      }
})