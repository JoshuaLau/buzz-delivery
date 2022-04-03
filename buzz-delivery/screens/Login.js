import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'; // used to navigate from screen to screen
import { List, ListItem, Icon } from "react-native-elements";
import { showMessage, hideMessage } from "react-native-flash-message";

const assignRole = () => {
    // assign user role in FireBase
}

const Login = () => {

    return(
        <View style={styles.content}>
            <Text style={styles.titleText}>Are you a customer or a driver?</Text>

            <TouchableOpacity onPress={assignRole}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Customer</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={assignRole}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Driver</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

}

export default Login;

const styles = StyleSheet.create({
    content: {
        top: '30%'
    },
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