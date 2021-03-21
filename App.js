import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import ReduxThunk from 'redux-thunk'
import PlacesNavigator from "./navigation/PlacesNavigator"
import placesReducer from "./store/reducers/places";
import {init} from "./helpers/db";

//na samm oczątku inicjuję baze danych
init()
    .then(() => {
        console.log('Baza danych zainicjalizowana')
    })
    .catch((err) => {
        console.log('Błąd')
        console.log(err)
    })

const rootReducer = combineReducers({
    places: placesReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
    return (
        <Provider store={store}>
            <PlacesNavigator/>
        </Provider>
    );
}
