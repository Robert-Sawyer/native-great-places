import React from 'react'
import {View, Text, StyleSheet} from "react-native"
import MapView from "react-native-maps";

const MapScreen = props => {

    const mapRegion = {
        latitude: 52.27,
        longitude: 21.044,
        latitudeDelta: 0.0252,
        longitudeDelta: 0.0178,
    }

    return (
        //mapview musi mieć ustawiony styl, bo inaczej w ogóle się nie pojawi
        <MapView style={styles.map} region={mapRegion}/>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
})

export default MapScreen
