import React, {useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux";
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from "../components/HeaderButton"
import PlaceItem from "../components/PlaceItem";
import * as placeActions from '../store/actions/places'

const PlacesListScreen = props => {

    const places = useSelector(state => state.places.places)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(placeActions.loadPlaces())
    }, [dispatch])

    return (
        <View>
            <Text>Tu będzie lista miejsc: </Text>
            <FlatList data={places} keyExtractor={item => item.id} renderItem={placeItem =>
                <PlaceItem image={placeItem.item.image} title={placeItem.item.title} address={null} onSelect={() => {
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
