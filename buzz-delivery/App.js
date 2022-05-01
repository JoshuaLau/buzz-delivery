import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from "react"
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderPickUp from './screens/OrderPickUp'
import TripDetails from './screens/TripDetails'
import RequestsPage  from './screens/RequestsPage';
import Login from './screens/Login';
import FlashMessage from "react-native-flash-message";
import AvailableDrivers from './screens/AvailableDrivers';
import CompleteOrder from './screens/CompleteOrder';
import DriverDetail from './screens/DriverDetail';
import DriverTracking from './screens/DriverTracking';
import SignUp from './screens/SignUp';
import CustomerViewTracking from './screens/CustomerViewTracking';
import PaymentScreen from './screens/PaymentScreen';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


const Stack = createNativeStackNavigator();

export let pushToken = "";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

//add other screens here and into screens folder
export default function App() {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  

  useEffect(async () => {
    registerForPushNotificationsAsync().then(token => pushToken=token);

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{
          title: "Login",
        }}/> 
      <Stack.Screen name="DriverTracking" component={DriverTracking} options={{
          title: "Driver Tracking",
        }}/> 
        <Stack.Screen name="CompleteOrder" component={CompleteOrder} options={{
          title: "Order Completed",
        }}/> 
        <Stack.Screen name="DriverDetail" component={DriverDetail} options={{
          title: "Driver Details",
        }}/> 
        <Stack.Screen name="CustomerTracking" component={CustomerViewTracking} options={{
          title: "Driver Location",
        }}/> 
        <Stack.Screen name="SignUp" component={SignUp} options={{
          title: "SignUp",
        }}/> 
        <Stack.Screen name="TripDetails" component={TripDetails} options={{
          title: "Trip Details",
        }}/>
         <Stack.Screen name="RequestsPage" component={RequestsPage} options={{
          title: "Incoming Requests",
        }}/>
        <Stack.Screen name="OrderPickUp" component={OrderPickUp} options={{
          title: "Order Details",
        }}/> 
        <Stack.Screen name="AvailableDrivers" component={AvailableDrivers} options={{
          title: "Available Drivers",
        }}/> 
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{
          title: "Payment Screen",
        }}/>
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>

    // [SPRINT 5] need to add new pages into the flow
  );
}

export async function sendPushNotification(expoPushToken, title, body, data) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title,
    body: body,
    data: { someData: data },
  };
  console.log('gothere')
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
