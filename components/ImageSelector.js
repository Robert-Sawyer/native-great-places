import React, {useState} from 'react'
import {View, Button, Text, StyleSheet, Image, Alert} from "react-native";
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import Colors from '../constants/colors'

const ImageSelector = props => {

    const [pickedImage, setPickedImage] = useState()

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
        //ta funkcja może nie przyjmowac argumentów, ale chcę dodać dodatkową konfigurację, stąd obiekt
        //w środku
        //rezultatem tej asynchronicznej funkcji (zwraca promise) jest obraz więc zapisuję go w takiej zmienej
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5
        })
        setPickedImage(image.uri)
        //przesyłam w propsach odnośnik do obrazka, odbiera go handler w komponencie newplacescreen
        props.onImageTake(image.uri)
        console.log(image)
    }

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!pickedImage
                    ? <Text>Nie wybrano obrazu</Text>
                    : <Image style={styles.image} source={{uri: pickedImage}}/>}


            </View>
            <Button title='Wybierz zdjęcie' color={Colors.mainColor} onPress={handleTakeImage}/>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 10,
    },
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
