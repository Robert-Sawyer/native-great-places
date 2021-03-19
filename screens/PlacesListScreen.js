import React from 'react'
import {useSelector} from "react-redux";
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from "../components/HeaderButton"
import PlaceItem from "../components/PlaceItem";

const PlacesListScreen = props => {

    const places = useSelector(state => state.places.places)

    return (
        <View>
            <Text>Tu będzie lista miejsc: </Text>
            <FlatList data={places} keyExtractor={item => item.id} renderItem={placeItem =>
                <PlaceItem image={null} title={placeItem.item.title} address={null} onSelect={() => {
                    props.navigation.navigate('Details', {
                        placeTitle: placeItem.item.title,
                        placeId: placeItem.item.id,
                    })
                }}/>}/>
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
