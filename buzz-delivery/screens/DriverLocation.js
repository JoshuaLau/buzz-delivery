import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'

const DriverLocation = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.titleText}> Estimated Arrival Time: 9:54 pm</Text>
      <MapView

    style={styles.map}
    initialRegion={{
    latitude: 33.7756,
    longitude: -84.3963,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}}
>
<Marker
    coordinate={{
      latitude: 33.7756,
      longitude: -84.3963,
    }}
  />
<Marker
    coordinate={{
      latitude: 33.78449,
      longitude: -84.40591,
    }}
    pinColor="blue"
  />
  <Marker
    coordinate={{
      latitude: 33.784,
      longitude: -84.401,
    }}
  > 
  <Image style={styles.car} source={require('../assets/car_icon.jpg')}/>
</Marker>
</MapView>
    </View>
  )
}

export default DriverLocation

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 300,
      },
      car: {
        backgroundColor: 'white',
        width: 10,
        height: 28
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