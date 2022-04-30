import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'; // used to navigate from screen to screen
import { List, ListItem, Icon } from "react-native-elements";
import { showMessage, hideMessage } from "react-native-flash-message";
import DriverCard from '../components/DriverCard';
import { getAvailableDrivers } from '../firebase';

// retrieve active drivers from FireBase

async function getDrivers() {
    var availableDriversWithDetails = await getAvailableDrivers();
    return availableDriversWithDetails;
}

const AvailableDrivers = () => {

    const [availableDrivers, setAvailableDrivers] = useState([]);

    useEffect(() => {
        var drivers = [];
        getDrivers().then(details => {
            details.forEach(detail => {
                drivers.push(
                    {
                        restaurant: detail.restaurant_name,
                        name: detail.driver,
                        dropoffLocation: detail.drop_location,
                        estimatedTime: detail.estimated_time
                    }
                )
            })
            setAvailableDrivers(drivers);
        });
    }, []);

    return(
        <View>
            <Text style={styles.titleText}> Available Drivers </Text>
            { availableDrivers.map(driver => (
                <DriverCard driver = {driver}></DriverCard>
            )) }
        </View>
    );
}

export default AvailableDrivers;

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor:'#f01d71',
        marginTop:40,
        marginLeft: 40,
        marginRight: 40
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