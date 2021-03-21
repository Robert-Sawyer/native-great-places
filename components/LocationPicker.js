import React, {useState} from 'react'
import {View, Text, Button, StyleSheet, Alert, ActivityIndicator} from "react-native"
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import Colors from '../constants/colors'

const LocationPicker = props => {

    const [isLoading, setIsLoading] = useState(false)
    const [location, setLocation] = useState()

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
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000
            })
            console.log(location)
            setLocation({
                lat: location.coords.latitude,
                lon: location.coords.longitude
            })
        } catch (e) {
            Alert.alert('Nie można pobrac lokalizacji', 'Spróbuj później, albo ustaw lokalizację na mapie', [
                {text: 'OK'}
            ])
        }
        setIsLoading(false)

    }

    return (
        <View style={styles.locationPicker}>
            <View style={styles.mapPreview}>
                {isLoading
                    ? (
                        <ActivityIndicator size='large' color={Colors.mainColor}/>
                    ) : (
                        <Text>Nie ustawiono jescze lokalizacji</Text>
                    )}
            </View>
            <Button title='Pobierz moją lokalizację' color={Colors.mainColor} onPress={handleGetLocation}/>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default LocationPicker
