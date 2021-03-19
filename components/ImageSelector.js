import React from 'react'
import {View, Button, Text, StyleSheet, Image, Alert} from "react-native";
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import Colors from '../constants/colors'

const ImageSelector = props => {

    //na androidzie nie jest wymagane specjalne pozwolenie na korzystanie z funkcji natywnych, ale na iOS tak,
    //dlatego potrzebuję dodatkowego pakietu expo.
    const verifyPermission = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
        if (result.status !== 'granted') {
            Alert.alert('Wymagane pozwolenie', 'Musisz udzielić dostępu do kamery, żeby kontynuować', [{
                text: 'OK'
            }])
            return false
        }
        return true
    }

    const handleTakeImage = async () => {
        const hasPermission = await verifyPermission()
        if (!hasPermission) {
            return;
        }
        ImagePicker.launchCameraAsync()
    }

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                <Text>Nie wybrano obrazu</Text>
                <Image style={styles.image}/>
            </View>
            <Button title='Wybierz zdjęcie' color={Colors.mainColor} onPress={handleTakeImage}/>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker: {},
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc'
    },
    image: {
        width: '100%',
        height: '100%',
    },
})

export default ImageSelector
