import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native"
import * as TaskManager from "expo-task-manager"
import * as Location from "expo-location"
import { updateLocation, updateOrderStage, DELIVERED } from "../firebase"
import { showMessage } from "react-native-flash-message"


const LOCATION_TASK_NAME = "LOCATION_TASK_NAME"
let foregroundSubscription = null


// Define the background task for location tracking
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error)
    return
  }
  if (data) {
    // Extract location coordinates from data
    const { locations } = data
    const location = locations[0]
    if (location) {
      await updateLocation(location.coords.latitude, location.coords.longitude)
    }
  }
})

export default function DriverTracking() {

  // Request permissions right after starting the app
  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync()
      if (foreground.granted) await Location.requestBackgroundPermissionsAsync()
    }
    requestPermissions()
  }, [])

  const handleHome = () => {
    navigation.navigate("TripDetails")
}


  const startForegroundUpdate = async () => {
    console.log('here')
    // Check if foreground permission is granted
    const { granted } = await Location.getForegroundPermissionsAsync()
    if (!granted) {
      console.log("location tracking denied")
      return
    }

    // Make sure that foreground location tracking is not running
    foregroundSubscription?.remove()

    // Start watching position in real-time
    foregroundSubscription = await Location.watchPositionAsync(
      {
        // For better logs, we set the accuracy to the most sensitive option
        accuracy: Location.Accuracy.BestForNavigation,
      },
      location => {
        updateLocation(location.coords.latitude, location.coords.longitude)
      }
    )
  }

  // Stop location tracking in foreground
  const stopForegroundUpdate = () => {
    foregroundSubscription?.remove()
  }

  // Start location tracking in background
  const startBackgroundUpdate = async () => {
    // Don't track position if permission is not granted
    let { granted } = await Location.getBackgroundPermissionsAsync()
    granted = true;
    if (!granted) {
      console.log("location tracking denied")
      return
    }

    // Make sure the task is defined otherwise do not start tracking
    const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME)
    if (!isTaskDefined) {
      console.log("Task is not defined")
      return
    }

    // Don't track if it is already running in background
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    )
    if (hasStarted) {
      console.log("Already started")
      return
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      // For better logs, we set the accuracy to the most sensitive option
      accuracy: Location.Accuracy.BestForNavigation,
      // Make sure to enable this notification if you want to consistently track in the background
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: "Location",
        notificationBody: "Location tracking in background",
        notificationColor: "#fff",
      },
    })
  }

  // Stop location tracking in background
  const stopBackgroundUpdate = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    )
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
      console.log("Location tacking stopped")
    }
  }

  const handleArrival = async () => {
    showMessage({
        message: "Customers have been notified that you've arrived!",
        type: "success",
      });
    await updateOrderStage(DELIVERED);
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
    <TouchableOpacity onPress={handleHome}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Return to Home</Text>
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