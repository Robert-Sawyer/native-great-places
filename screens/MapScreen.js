import React, {useState, useEffect, useCallback} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Platform} from "react-native"
import MapView, {Marker} from "react-native-maps";
import Colors from '../constants/colors'

const MapScreen = props => {

    //odbieram te dane z ekranu z detalami
    const placeLocation = props.navigation.getParam('initialLocation')
    const isReadOnly = props.navigation.getParam('readOnly')

    //inicjuję stan lokalizacja miejsca - jeśli przechodze z ekranu z detalami; jeśli wchodze z ekranu newPlace to
    //tej wartości nie ma i parametr jest undefined i nie będzie znacznika na mapie
    const [selectedLocation, setSelectedLocation] = useState(placeLocation)

    const mapRegion = {
        latitude: placeLocation ? placeLocation.lat : 52.27,
        longitude: placeLocation ? placeLocation.lon : 21.044,
        latitudeDelta: 0.0252,
        longitudeDelta: 0.0178,
    }

    //w obiekcie event znajduje się coś takeigo jak nativeEvent i ten obiekt przechowuje współrzędne kliknięcia na mapę
    const handleSelectLocation = event => {
        //jeśli mapa jest tylko do odczytu, czyli jeśli przechodzi się z ekranu z detalami to nie można ustawić nowego
        //znacznika
        if (isReadOnly) {
            return;
        }
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
    //jeśli mapa jest tylko do odczytu to nie pokazuj przycisku zapisz
    const isReadOnly = navData.navigation.getParam('readOnly')
    if (isReadOnly) {
        return {}
    }
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
