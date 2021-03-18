import React from 'react'
import {View, Text, StyleSheet, Platform} from "react-native"
import {HeaderButtons, Item} from "react-navigation-header-buttons"
import CustomHeaderButton from "../components/HeaderButton"

const PlacesListScreen = props => {

    return (
        <View>
            <Text>Tu będze lista miejsc</Text>
        </View>
    )
}

PlacesListScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Wszystkie miejsca',
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'add-sharp' : 'ios-add-sharp'}
                    onPress={() => {
                        navData.navigation.navigate('EditProducts')
                    }}
                />
            </HeaderButtons>,


    }
}

const styles = StyleSheet.create({

})

export default PlacesListScreen
