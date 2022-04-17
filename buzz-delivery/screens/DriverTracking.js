import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native"
import * as TaskManager from "expo-task-manager"
import * as Location from "expo-location"
import { updateLocation } from "../firebase"
import { showMessage } from "react-native-flash-message"

//much borrowed from https://chafikgharbi.com/expo-location-tracking/

let foregroundSubscription = null

export default function DriverTracking() {

    const startForegroundUpdate = async () => {
      const { granted } = await Location.getForegroundPermissionsAsync()
      if (!granted) {
        console.log("location tracking denied")
        return
      }
  
      foregroundSubscription?.remove()
  
      foregroundSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 0
        },
        location => {
          updateLocation(location.coords.latitude, location.coords.longitude)
        }
      )
    }
  
    const stopForegroundUpdate = () => {
      foregroundSubscription?.remove()
      console.log("stopping")
    }

  const handleArrival = () => {
    showMessage({
        message: "Customers have been notified that you've arrived!",
        type: "success",
      });
    //updateOrderStage("Arrived"); won't work until we setup auth
}


  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      <Button
        onPress={startForegroundUpdate}
        title="Start sharing location"
        color="green"
      />
      <View style={styles.separator} />
      <Button
        onPress={stopForegroundUpdate}
        title="Stop sharing location"
        color="red"
      />
      <View style={styles.separator} />

  <TouchableOpacity onPress={handleArrival}>
    <View style={styles.button}>
      <Text style={styles.buttonText}>Arrived On Campus</Text>
    </View>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginTop: 15,
  },
  separator: {
    marginVertical: 8,
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
})