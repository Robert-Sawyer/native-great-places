import React, {useState} from 'react'
import {View, Text, Button, StyleSheet, Alert, ActivityIndicator} from "react-native"
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import Colors from '../constants/colors'
import MapPreview from "./MapPreview";

const LocationPicker = props => {

    const [isLoading, setIsLoading] = useState(false)
    const [pickedLocation, setPickedLocation] = useState()

    const verifyPermission = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION)
        if (result.status !== 'granted') {
            Alert.alert('Wymagane pozwolenie', 'Musisz udzielić dostępu do lokalizacji urządzenia, żeby kontynuować', [{
                text: 'OK'
            }])
            return false
        }
        return true
    }

    const handleGetLocation = async () => {
        const hasPermission = await verifyPermission()
        if (!hasPermission) {
            return;
        }

        try {
            setIsLoading(true)
            const location = await Location.getCurrentPositionAsync()
            console.log(location.coords.latitude)
            setPickedLocation({
                lat: location.coords.latitude,
                lon: location.coords.longitude
            })
        } catch (e) {
            Alert.alert('Nie można pobrac lokalizacji', 'Spróbuj później, albo ustaw lokalizację na mapie', [
                {text: 'OK'}
            ])
        }
        setIsLoading(false)
        console.log(pickedLocation)
    }

    const handlePickOnMap = () => {
        //props.navigation jest dostępny tylko w przypadku komponentów stanowiących ekrany, a mniejsze komponenty
        //nie mogą korzystać z tego w taki sposób, dlatego przekazuję props.navigation jako kolejny prop z NewPlaceScreen
        props.navigation.navigate('Map')
    }

    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={handlePickOnMap}>
                {isLoading
                    ? (
                        <ActivityIndicator size='large' color={Colors.mainColor}/>
                    ) : (
                        <Text>Nie ustawiono jescze lokalizacji</Text>
                    )}
            </MapPreview>
            <View style={styles.buttonsContainer}>
                <Button title='Pobierz lokalizację' color={Colors.mainColor} onPress={handleGetLocation}/>
                <Button title='Wskaż na mapie' color={Colors.mainColor} onPress={handlePickOnMap}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
})

export default LocationPicker
