import React, {useState} from 'react'
import {View, Text, TextInput, ScrollView, Button, StyleSheet} from "react-native";
import Colors from '../constants/colors'
import {useDispatch} from "react-redux";
import * as placeActions from '../store/actions/places'

const NewPlaceScreen = props => {

    const [titleValue, setTitleValue] = useState('')
    const dispatch = useDispatch()

    const handleChangeTitle = text => {
        setTitleValue(text)
    }

    const handleSaveTitle = () => {
        dispatch(placeActions.addPlace(titleValue))
        props.navigation.goBack()
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Nazwa</Text>
                <TextInput style={styles.formInput} value={titleValue} onChangeText={handleChangeTitle} />
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
