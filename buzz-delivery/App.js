import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderPickUp from './screens/OrderPickUp'
import TripDetails from './screens/TripDetails'
import RequestsPage  from './screens/RequestsPage';
import FlashMessage from "react-native-flash-message";


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
      <Stack.Screen name="OrderPickUp" component={OrderPickUp} options={{
          title: "Order Details",
        }}/> 
        <Stack.Screen name="TripDetails" component={TripDetails} options={{
          title: "Trip Details",
        }}/>
         <Stack.Screen name="RequestsPage" component={RequestsPage} options={{
          title: "Incoming Requests",
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
