import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import DriverDetail from '../screens/DriverDetail';


export default function DriverCard({driver}) {
  const navigation = useNavigation();

  function move() {
    navigation.navigate("DriverDetail", {
      driver_name: driver.name,
      driver_restaurant: driver.restaurant,
      driver_time: driver.estimatedTime,
      driver_location: driver.dropoffLocation,
      driver_id: driver.id
    })
  }

  return (
    <TouchableOpacity onPress={move} style={styles.card}>
        <View>
            <Text> Restaurant: {driver.restaurant} </Text>
            <Text> Driver: {driver.name}</Text>
            <Text> ETA: {driver.estimatedTime} </Text>
            <Text> Drop-Off Location: {driver.dropoffLocation} </Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.9,
    shadowRadius: 2,
    marginTop: 20,
    marginBottom: 10,
    marginRight: 40,
    marginLeft: 40,
    padding: 10
  },
  cardContent: {
    marginHorizontal: 10,
    marginVertical: 10,
  }
});