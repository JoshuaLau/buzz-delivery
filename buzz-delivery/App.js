import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderPickUp from './screens/OrderPickUp'
import TripDetails from './screens/TripDetails'
import DriverStatusUpdate from './screens/DriverStatusUpdate';
import RequestsPage  from './screens/RequestsPage';
import CustomerPaymentScreen from './screens/CustomerPaymentScreen';
import FlashMessage from "react-native-flash-message";

const Stack = createNativeStackNavigator();
//add other screens here and into screens folder
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TripDetails" component={TripDetails} options={{
          title: "Trip Details",
        }}/>
        <Stack.Screen name="RequestsPage" component={RequestsPage} options={{
          title: "Incoming Requests",
        }}/>
        <Stack.Screen name="OrderPickUp" component={OrderPickUp} options={{
          title: "Order Details",
        }}/>
        <Stack.Screen name="DriverStatusUpdate" component={DriverStatusUpdate} options={{
          title: "Driver Status Update",
        }}/>
        <Stack.Screen name="CustomerPaymentScreen" component={CustomerPaymentScreen} options={{
          title: "Customer Payment Screen",
        }}/>
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
