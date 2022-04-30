import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Alert, Linking } from 'react-native'
import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/core'; // used to navigate from screen to screen
import { List, ListItem, Icon, Button } from "react-native-elements";
import { showMessage, hideMessage } from "react-native-flash-message";
import QRCode from 'react-native-qrcode-svg';
import { getVenmo } from '../firebase';

function PaymentScreen({ route }) {
    const navigation = useNavigation()

    const handlePayment = () => {
        navigation.navigate("CustomerTracking", {id: route.params.driver_id});
        showMessage({
            message: "The driver has been notified of your payment!",
            type: "success",
          });
          // TODO: change state of payment of driver screens
    }
    // TODO: replace this link with the driver's Venmo link
    const driver_id = route.params.driver_id
    

    const [venmo, setVenmo] = useState('');

    useEffect(() => {
        getVenmo(driver_id).then(details => {
            setVenmo(details['venmo']);
        });
    }, []);

    const supportedUrl = "https://account.venmo.com/u/" + venmo;

    const OpenUrlButton = ({url, children}) => {
        const handlePress = useCallback(async () => {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert("Cannot open this url: ${url}");
            }
        }, [url]);
        return (
            <TouchableOpacity onPress={handlePress}>
            <View style={styles.button}>
            <Text style={styles.buttonText}>{children}</Text>
            </View>
            </TouchableOpacity>
        )
    };

    return (
        <View style={[styles.container]}>
            <QRCode
                size={400}
                backgroundColor="transparent"
                value={supportedUrl}
            />
            <View>
            <OpenUrlButton url={supportedUrl}>Open Supported Url</OpenUrlButton>
            </View>
            <TouchableOpacity onPress={handlePayment}>
            <View style={styles.button}>
            <Text style={styles.buttonText}>I Have Payed the Driver</Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}

export default PaymentScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
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