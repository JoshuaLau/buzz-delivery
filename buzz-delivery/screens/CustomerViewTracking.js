import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import { getLocation, getOrderStatus, DELIVERED } from '../firebase';



function CustomerViewTracking({route}) {
    const mapRef = useRef()
    const markerRef = useRef()
    const navigation = useNavigation()
    

    const [state, setState] = useState({latitude: 33.7756, longitude: -84.3963,
        coordinate: new AnimatedRegion({
            latitude: 33.7756,
            longitude: -84.3963,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421

        })})

        const onCenter = () => {
            mapRef.current.animateToRegion({
                latitude: state.latitude,
                longitude: state.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            })
        }

    const animate = (latitude, longitude) => {
        const newCoordinate = { latitude, longitude };
        if (Platform.OS == 'android') {
            if (markerRef.current) {
                markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
            }
        } else {
            state.coordinate.timing(newCoordinate).start();
        }
    }

    useEffect(() => {
        onCenter();
      }, []);

    useEffect(() => {
        async function updateLoc() {
            const interval = setInterval(async () => {
                var position = await getLocation(null) //TODO: get specific driver_id and pass in here
                animate(position[0], position[1])
                setState({latitude: position[0], longitude: position[1],
                    coordinate: new AnimatedRegion({
                        latitude: position[0],
                        longitude: position[1],
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
            
                    })})
            }, 5000)
        }
        updateLoc()
        
    })

    useEffect(async () => {
        var status = await getOrderStatus(route.params.id);
        if (status == DELIVERED) {
            navigation.navigate("CompleteOrder")
        }
    })

  return (
    <View style={styles.container}>
        <MapView
                    ref={mapRef}
                    style={StyleSheet.absoluteFill}
                    initialRegion={{
                        latitude: 37.33097983,
                        longitude: -122.03063943,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >

                    <Marker.Animated
                        ref={markerRef}
                        coordinate={state.coordinate}
                    >
                          <Image style={styles.car} source={require('../assets/car_icon.jpg')}/>
                    
                    </Marker.Animated>

                </MapView>
    </View>
  )
}

export default CustomerViewTracking

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
  car: {
    backgroundColor: 'white',
    width: 10,
    height: 28
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
}, })