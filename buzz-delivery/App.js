import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderPickUp from './screens/OrderPickUp'
import TripDetails from './screens/TripDetails'
import RequestsPage  from './screens/RequestsPage';
import DriverLocation from './screens/DriverLocation';
import Login from './screens/Login';
import FlashMessage from "react-native-flash-message";
import AvailableDrivers from './screens/AvailableDrivers';
import CompleteOrder from './screens/CompleteOrder';
import DriverDetail from './screens/DriverDetail';
import SignUp from './screens/SignUp';


const Stack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

//add other screens here and into screens folder
export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{
          title: "Login",
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
        <Stack.Screen name="DriverLocation" component={DriverLocation} options={{
          title: "Driver Location",
        }}/> 
        <Stack.Screen name="AvailableDrivers" component={AvailableDrivers} options={{
          title: "Available Drivers",
        }}/> 
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>

    // [SPRINT 5] need to add new pages into the flow
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
