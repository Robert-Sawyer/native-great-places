import React from 'react'
import {View, ScrollView, Image, Text, StyleSheet} from "react-native";
import MapPreview from "../components/MapPreview";
import {useSelector} from "react-redux"
import Colors from '../constants/colors'

const PlaceDetailsScreen = props => {

    const placeId = props.navigation.getParam('placeId')
    const selectedPlace = useSelector(state => state.places.places.find(place => place.id === placeId))

    //wysyłam do ekranu z mapą informację o tym, że mapa ma być w przypadku prześcia z ekranu z detalami tylko do
    // odczytu oraz info o lokalizacji miejsca, żeby mapa ustawiła sobie znacznik. Odbiorę te dane w mapscreen
    //jako parametry dzięki getParam
    const selectedPlaceLocation = {lat: selectedPlace.latitude, lon: selectedPlace.longitude}
    const handleShowMap = () => {
        props.navigation.navigate('Map', { readOnly: true, initialLocation: selectedPlaceLocation})
    }

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <Image style={styles.image} source={{uri: selectedPlace.image}}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{selectedPlace.address}</Text>
                </View>
                <MapPreview style={styles.mapPreview} location={selectedPlaceLocation} onPress={handleShowMap}/>
            </View>
        </ScrollView>
    )
}

PlaceDetailsScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('placeTitle')
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '35%',
        minHeight: 300,
        backgroundColor: "#ccc"
    },
    locationContainer: {
        marginVertical: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    addressContainer: {
        padding: 20,
    },
    address: {
        textAlign: 'center',
        color: Colors.mainColor
    },
    mapPreview: {
        width: '100%',
        maxWidth: 350,
        height: 300,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
})

export default PlaceDetailsScreen
