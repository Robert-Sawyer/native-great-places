import React from 'react'
import {ActivityIndicator, Image, StyleSheet, Text, View} from "react-native";
import ENV from '../constants/env'

const MapPreview = props => {

    let imagePreviewUrl
    if (props.location) {
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
            props.location.lat
        },${
            props.location.lon
        }&zoom=11&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${
            props.location.lat
        },${props.location.lon}&key=${ENV.googleApiKey}`
    }

    return (
        //jeśli lokalizacja będzie ustawiona to wtedy wyrenderuj obraz mapy a jeśli nie to spinner lub text
        <View style={{...styles.mapPreview, ...props.style}}>
            {props.location ? <Image style={styles.mapImage} source={{uri: imagePreviewUrl}}/> : props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapImage: {
        width: '100%',
        height: '100%',
    },
})

export default MapPreview
