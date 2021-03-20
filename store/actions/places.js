import * as FileSystem from 'expo-file-system'

export const ADD_PLACE = 'ADD_PLACE'

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
        } catch (e) {
            console.log(e)
            throw e
        }

        dispatch({ type: ADD_PLACE, placeData: { title: title, image: newPath }})
    }
}
