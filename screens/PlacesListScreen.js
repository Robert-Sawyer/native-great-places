import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from "../components/HeaderButton"

const PlacesListScreen = props => {

    return (
        <View>
            <Text>Tu będzie lista miejsc</Text>
        </View>
    )
}

PlacesListScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Wszystkie miejsca',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName='md-add'
                    onPress={() => {
                        console.log('Click')
                        navData.navigation.navigate({routeName: 'NewPlace'});
                    }}
                />
            </HeaderButtons>
        ),
    }
}

const styles = StyleSheet.create({

})

export default PlacesListScreen
