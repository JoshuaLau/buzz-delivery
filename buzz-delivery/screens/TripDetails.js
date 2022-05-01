import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'; // used to navigate from screen to screen
import { List, ListItem, Icon } from "react-native-elements";
import { showMessage, hideMessage } from "react-native-flash-message";
import { auth, saveTripDetails } from '../firebase';




const TripDetails = () => {

    const [restaurantName, setRestaurantName] = useState('')
    const [menuLink, setMenuLink] = useState('')
    const [dropLocation, setDropLocation] = useState('')
    const [estimatedTime, setEstimatedTime] = useState('')
    const [maxRequests, setMaxRequests] = useState(0)

    const navigation = useNavigation()

    const inputHandler = (e) => {
        setInputField( {[e.target.name]: e.target.value})
    }

    const [driver_id, setId] = useState('');

    const handleTripConfirmation = () => {
        try {
            var driver_id = auth.currentUser.uid;
            saveTripDetails(restaurantName, menuLink, dropLocation, estimatedTime, maxRequests);
            showMessage({
                message: "Trip details have been posted! Customers can now request an order.",
                type: "info",
              });
              
              navigation.navigate("RequestsPage", {
                  driver_id: driver_id
              });
        } catch (error) {
            showMessage({
                message: "There was something wrong with your information. Please try again." + error,
                type: "error",
              });
              return;
        }
    }


  return (
        <View>

            <Text style={styles.titleText}>Trip Details</Text>

            <Text style={styles.promptText}> Name of Restaurant </Text>
            <TextInput
            style = {styles.input}
            value = {restaurantName}
            onChangeText = {text => setRestaurantName(text)}>
            </TextInput>


            <Text style={styles.promptText}> Link to Menu </Text>
            <TextInput
            style = {styles.input}
            value = {menuLink}
            onChangeText = {text => setMenuLink(text)}>
            </TextInput>

            <Text style={styles.promptText}> Drop-Off Location </Text>
            <TextInput
            style = {styles.input}
            value = {dropLocation}
            onChangeText = {text => setDropLocation(text)}>
            </TextInput>

            <Text style={styles.promptText}> Estimated Time of Arrival </Text>
            <TextInput
            style = {styles.input}
            value = {estimatedTime}
            onChangeText = {text => setEstimatedTime(text)}>
            </TextInput>

            <Text style={styles.promptText}> Maximum Requests </Text>
            <TextInput
            style = {styles.input}
            type = "number"
            value = {maxRequests}
            onChangeText = {text => setMaxRequests(Number(text))}>
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