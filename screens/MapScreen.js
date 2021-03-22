import React, {useState} from 'react'
import {View, Text, StyleSheet} from "react-native"
import MapView, {Marker} from "react-native-maps";

const MapScreen = props => {

    const [selectedLocation, setSelectedLocation] = useState()

    const mapRegion = {
        latitude: 52.27,
        longitude: 21.044,
        latitudeDelta: 0.0252,
        longitudeDelta: 0.0178,
    }

    //w obiekcie event znajduje się coś takeigo jak nativeEvent i ten obiekt przechowuje współrzędne kliknięcia na mapę
    const handleSelectLocation = event => {
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lon: event.nativeEvent.coordinate.longitude
        })
    }

    let markerCoordinates

    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lon
        }
    }

    return (
        //mapview musi mieć ustawiony styl, bo inaczej w ogóle się nie pojawi
        <MapView style={styles.map} region={mapRegion} onPress={handleSelectLocation}>
            {markerCoordinates && <Marker title='Wybrana lokalizacja' coordinate={markerCoordinates}></Marker>}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
})

export default MapScreen
