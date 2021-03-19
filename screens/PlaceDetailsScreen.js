import React from 'react'
import {View, Text, StyleSheet} from "react-native";

const PlaceDetailsScreen = props => {

    return (
        <View>
            <Text>tu będą szczegóły miejsca</Text>
        </View>
    )
}

PlaceDetailsScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('placeTitle')
    }
}

const styles = StyleSheet.create({

})

export default PlaceDetailsScreen
