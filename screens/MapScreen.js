import React, {useState, useEffect, useCallback} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Platform} from "react-native"
import MapView, {Marker} from "react-native-maps";
import Colors from '../constants/colors'

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

    const handleSavePickedLocation = useCallback(() => {
        if (!selectedLocation) {
            //można dodać alert, że nie wybrano żadnej lokalizacji
            return;
        }
        //zapisuję w state lokalizację markera i przekazuję go na ekran zapisu miejsca gdzie kieruję usera po kliknięciu
        //w zapisz
        props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation})

        //gdy tylko selectedloation się zmieni, czyli user kliknie i ustawi marker wtedy wykona się funkcja powrotu
    },[selectedLocation])

    useEffect(() => {
        props.navigation.setParams({saveLocation: handleSavePickedLocation})
    }, [handleSavePickedLocation])

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

MapScreen.navigationOptions = navData => {
    const saveFunction = navData.navigation.getParam('saveLocation')
    return {
        headerTitle: 'Mapa',
        headerRight: () => (
            <TouchableOpacity styles={styles.headerButton} onPress={saveFunction}>
                <Text style={styles.headerButtonText}>Zapisz</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    headerButton: {
        marginHorizontal: 20,
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? '#fff' : Colors.mainColor
    },
})

export default MapScreen
