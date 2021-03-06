import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native'
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'; // used to navigate from screen to screen
import { List, ListItem, Icon } from "react-native-elements";
import { showMessage, hideMessage } from "react-native-flash-message";
import { shouldUseActivityState } from 'react-native-screens';
import { placeOrder } from '../firebase';



function DriverDetail({ route }) {
    const navigation = useNavigation()

    const driver = {
        name: route.params.driver_name,
        restaurant: route.params.driver_restaurant,
        estimatedTime: route.params.driver_time,
        dropoffLocation: route.params.driver_location,
        id: route.params.driver_id
    }

    const [order, setOrder] = useState('')
    const [price, setPrice] = useState('')

    const inputHandler = (e) => {
        setInputField( {[e.target.name]: e.target.value})
    }

    const handleOrderConfirmation = () => {
        try {
            placeOrder(order, price, driver.id)
            showMessage({
                message: "Your order has been placed!",
                type: "info",
            });
            navigation.navigate("PaymentScreen", {
                driver_id: driver.id
              })
        } catch (error) {
            showMessage({
                message: "Something went wrong when trying to place your order. Please try again." + error,
                type: "error",
              });
              return;
        }
    }



  return (
        <View>

            <Text style={styles.titleText}> Driver Detail </Text>

            <View style={styles.driverContainer}>
                <Text style={styles.driverInfo}> { driver.name } </Text>
                <Text style={styles.driverInfo}> { driver.restaurant } </Text>
                <Text style={styles.driverInfo}> { driver.estimatedTime } </Text>
                <Text style={styles.driverInfo}> { driver.dropoffLocation } </Text>
            </View>
            
            <TouchableOpacity>
                <View style={styles.menuButton}>
                    <Text style={styles.buttonText}>View Menu</Text>
                </View>
            </TouchableOpacity>

            <Text style={styles.promptText}> Order </Text>
            <TextInput
            style = {styles.input}
            value = {order}
            onChangeText = {text => setOrder(text)}>
            </TextInput>

            <Text style={styles.promptText}> Total Price </Text>
            <TextInput
            style = {styles.input}
            value = {price}
            onChangeText = {text => setPrice(text)}>
            </TextInput>

            <TouchableOpacity onPress={handleOrderConfirmation}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Confirm Order</Text>
                </View>
            </TouchableOpacity>
    
        </View>
    
  )
}

export default DriverDetail;

const styles = StyleSheet.create({
    driverContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20,
        marginBottom: 20,
        
    },  
    driverInfo: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
    },  
    button: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor:'#f01d71',
        marginTop:40
    },
    menuButton: {
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor:'green',
        marginBottom: 20,
        width: '50%',
        alignSelf: 'center'
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