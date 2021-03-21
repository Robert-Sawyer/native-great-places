import React, {useState} from 'react'
import {View, Text, TextInput, ScrollView, Button, StyleSheet} from "react-native"
import Colors from '../constants/colors'
import {useDispatch} from "react-redux";
import * as placeActions from '../store/actions/places'
import ImageSelector from "../components/ImageSelector"
import LocationPicker from "../components/LocationPicker"

const NewPlaceScreen = props => {

    const [titleValue, setTitleValue] = useState('')
    const [image, setImage] = useState()
    const dispatch = useDispatch()

    const handleChangeTitle = text => {
        setTitleValue(text)
    }

    const handleSaveTitle = () => {
        dispatch(placeActions.addPlace(titleValue, image))
        props.navigation.goBack()
    }

    const handleTakenImage = imgPath => {
        setImage(imgPath)
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Nazwa</Text>
                <TextInput style={styles.formInput} value={titleValue} onChangeText={handleChangeTitle} />
                <ImageSelector onImageTake={handleTakenImage}/>
                <LocationPicker/>
                <Button title='Dodaj miejsce' color={Colors.mainColor} onPress={handleSaveTitle}/>
            </View>
        </ScrollView>
    )
}

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Dodaj nowe miejsce'
}


const styles = StyleSheet.create({
    form: {
        margin: 30,
    },
    label: {
        marginBottom: 15,
        fontSize: 18,
    },
    formInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2,
    },
})

export default NewPlaceScreen
