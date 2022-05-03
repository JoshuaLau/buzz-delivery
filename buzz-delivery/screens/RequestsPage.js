import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Alert, ScrollView, RefreshControl, StatusBar } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'; // used to navigate from screen to screen
import { List, ListItem, Icon } from "react-native-elements";
import { showMessage, hideMessage } from "react-native-flash-message";
import { getOrders, ORDER_PLACED, updateOrderStage } from '../firebase';

function RequestsPage({ route }) {

    const navigation = useNavigation()

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

    const [refreshed, setRefreshed] = useState(false);
    const [buttonEnabled, setButtonEnabled] = useState(true);
    const [button2Enabled, setButton2Enabled] = useState(true);

    const emptyList = [];

    const [orders, setOrders] = useState([]);

    const driver_id = route.params.driver_id
    useEffect(() => {
        var orders_temp = [];
        var customers = [];
        var orders_field = [];
        getOrders(driver_id).then(details => {
            console.log(details);
            customers = details['customers'];
            orders_field = details['orders'];
    
            for (var i = 0; i < customers.length; i++) {
                orders_temp.push({
                name: customers[i],
                order: orders_field[i]['order'],
                price: orders_field[i]['price']
                })
            }
            
            setOrders(orders_temp);
      });
      });

    const handleRefresh = React.useCallback(() => {
        setRefreshed(true);
            var orders_temp = [];
            var customers = [];
            var orders_field = [];
            getOrders(driver_id).then(details => {
                console.log(details);
              customers = details['customers'];
              orders_field = details['orders'];
      
              for (var i = 0; i < customers.length; i++) {
                orders_temp.push({
                  name: customers[i],
                  order: orders_field[i]['order'],
                  price: orders_field[i]['price']
                })
              }
              
              setOrders(orders_temp);
          });
        showMessage({
            message: "Fetching new orders.",
            type: "info",
        });
        wait(2000).then(() => setRefreshed(false));
    });

    const handleArrival = () => {
        setButtonEnabled(false);
        setButton2Enabled(false);
        updateOrderStage(ORDER_PLACED);
        showMessage({
            message: "Customers have been notified that you arrived at the restaurant.",
            type: "info",
        });
        navigation.navigate("OrderPickUp"); 
    }

  return (
    <View style={styles.container}>
        <ScrollView refreshControl={<RefreshControl
            refreshing={refreshed}
            onRefresh={handleRefresh}
          />}>
        <Text style={styles.titleText}>Order Summary</Text>
        {
            orders.map((item, index) => {
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
                <ListItem.Subtitle>
                    <Text>{item.price}</Text>
                </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            })
        }
        </ScrollView>
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
        position: 'absolute',
        bottom: 100,
        right: 80,
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
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      }
})