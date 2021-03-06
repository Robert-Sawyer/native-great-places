import * as FileSystem from 'expo-file-system'
import ENV from '../../constants/env'

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'
import {insertPlace, fetchPlaces} from "../../helpers/db";

export const addPlace = (title, image, location) => {
    return async dispatch => {

        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${
            location.lat},${location.lon}&key=${ENV.googleApiKey}`)

        if (!response.ok) {
            throw new Error('Coś poszło nie tak')
        }
        const resData = await response.json()

        if (!resData.results) {
            throw new Error('Coś poszło nie tak')
        }

        //dobieram się tutaj do adresu miejsca zaznaczonego przez usera (lub wybranego z lokalizacji urzadzenia)
        //resData zawiera tutaj duże ilości danych, ale dzięki geolokazji google maps mogę przekonwertować
        //współrzedne na adres i te dane są w tym obiekcie poniżej
        const address = resData.results[0].formatted_address

        //documentdirectory ptrzebuje nazwy pliku więc biorę ścieżkę i dzielę ją na segmenty po czym
        //wycinam ostatni, czyli np file.jpg
        const fileName = image.split('/').pop()

        //document directory jest schowkiem, który przechowa elementy nawet podczas restartów aplikacji,
        //i po długoch przerwach bez logowania,dlatego jest najlepszym wyborem jeśli chodzi o przechowywanie
        //plików. Zostaną one usunięte dopiero po usunięciu aplikacji
        const newPath = FileSystem.documentDirectory + fileName

        try {
            //moveAsync przenosi pliki z a do b i przyjmuje obiekt który zawiera te informacje
            await FileSystem.moveAsync({
                //moveAynnc zwraca Promisa dlatego musi być await
                from: image,
                to: newPath
            })
            const dbResult = await insertPlace(
                title,
                newPath,
                address,
                location.lat,
                location.lon
            )
            console.log(dbResult)
            dispatch({
                type: ADD_PLACE,
                placeData: {
                    id: dbResult.insertId,
                    title: title,
                    image: newPath,
                    address: address,
                    coords: {
                        latitude: location.lat,
                        longitude: location.lon
                    }
                }})
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}

export const loadPlaces = () => {
    return async dispatch => {
        const dbResult = await fetchPlaces()
        console.log(dbResult)
        dispatch({type: SET_PLACES, places: dbResult.rows._array})
    }
}
