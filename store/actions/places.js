import * as FileSystem from 'expo-file-system'

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'
import {insertPlace, fetchPlaces} from "../../helpers/db";

export const addPlace = (title, image) => {
    return async dispatch => {

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
            const dbResult = await insertPlace(title, newPath,'jakiś adres', 55.3, 23.1)
            console.log(dbResult)
            dispatch({ type: ADD_PLACE, placeData: { id: dbResult.insertId, title: title, image: newPath }})
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
